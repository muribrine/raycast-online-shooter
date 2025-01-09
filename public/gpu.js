/** @function @param {WebGLRenderingContext} GL */
function gpuClearScreen(GL, COLOR) {
    GL.clearColor(COLOR[0], COLOR[1], COLOR[2], COLOR[3]);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
}

/** @function @param {WebGLRenderingContext} GL */
function createShaderProgram(GL, DEBUG, vertexShaderSRC, fragmentShaderSRC) {

    const vertexShader = GL.createShader(GL.VERTEX_SHADER);
    const fragmentShader = GL.createShader(GL.FRAGMENT_SHADER);

    GL.shaderSource(vertexShader, vertexShaderSRC);
    GL.shaderSource(fragmentShader, fragmentShaderSRC);

    GL.compileShader(vertexShader);
    if(!GL.getShaderParameter(vertexShader, GL.COMPILE_STATUS)) {
        console.error('ERROR COMPILING VERTEX SHADER', GL.getShaderInfoLog(vertexShader));
        return;
    }

    GL.compileShader(fragmentShader);
    if(!GL.getShaderParameter(fragmentShader, GL.COMPILE_STATUS)) {
        console.error('ERROR COMPILING FRAGMENT SHADER', GL.getShaderInfoLog(fragmentShader));
        return;
    }

    const PROGRAM = GL.createProgram();
    GL.attachShader(PROGRAM, vertexShader);
    GL.attachShader(PROGRAM, fragmentShader);
    GL.linkProgram(PROGRAM);
    GL.useProgram(PROGRAM);
    if(!GL.getProgramParameter(PROGRAM, GL.LINK_STATUS)) {
        console.error('ERROR LINKING PROGRAM', GL.getProgramInfoLog(PROGRAM));
        return;
    }

    if(DEBUG) {
        GL.validateProgram(PROGRAM);
        if(!GL.getProgramParameter(PROGRAM, GL.VALIDATE_STATUS)) {
            console.error('ERROR VALIDATING PROGRAM', GL.getProgramInfoLog(PROGRAM));
            return;
        }
    };

    return PROGRAM;

}

/** @function @param {WebGLRenderingContext} GL */
function createVertexBuffer(GL, VertexData) {
    const BUFFER = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, BUFFER);
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(VertexData), GL.STATIC_DRAW);
    return BUFFER;
};

/** @function @param {WebGLRenderingContext} GL */
function createIndexBuffer(GL, IndexData) {

    const BUFFER = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BUFFER);
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(IndexData), GL.STATIC_DRAW);
    return BUFFER;
};

/** @function @param {WebGLRenderingContext} GL */
function enableVertexAttributeArrays(GL, SHADER_PROGRAM) {

    const POSITION_ATTRIBUTE_LOCATION = GL.getAttribLocation(SHADER_PROGRAM, 'vertPosition');
    const TEXTURE_ATTRIBUTE_LOCATION = GL.getAttribLocation(SHADER_PROGRAM, 'vertTextureCoord');
    GL.vertexAttribPointer(
        POSITION_ATTRIBUTE_LOCATION,
        3,
        GL.FLOAT,
        GL.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    GL.vertexAttribPointer(
        TEXTURE_ATTRIBUTE_LOCATION,
        2,
        GL.FLOAT,
        GL.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT
    );

    GL.enableVertexAttribArray(POSITION_ATTRIBUTE_LOCATION);
    GL.enableVertexAttribArray(TEXTURE_ATTRIBUTE_LOCATION);

};

/** @function @param {WebGLRenderingContext} GL */
function setupMatrixUniforms(GL,PROGRAM) {

    const worldMatrixUniformLocation = GL.getUniformLocation(PROGRAM,'worldMatrix');
    const viewMatrixUniformLocation  = GL.getUniformLocation(PROGRAM,'viewMatrix');
    const projMatrixUniformLocation  = GL.getUniformLocation(PROGRAM,'projMatrix');

    const worldMatrix = new Float32Array(16);
    const viewMatrix  = new Float32Array(16);
    const projMatrix  = new Float32Array(16);

    glMatrix.mat4.identity(worldMatrix);
    glMatrix.mat4.lookAt(viewMatrix, [0,0,-8],[0,0,0],[0,1,0]);
    glMatrix.mat4.perspective(projMatrix, Math.PI / 4, 16 / 9, 0.1, 1000.0);

    GL.uniformMatrix4fv(worldMatrixUniformLocation, GL.FALSE, worldMatrix);
    GL.uniformMatrix4fv(viewMatrixUniformLocation, GL.FALSE, viewMatrix);
    GL.uniformMatrix4fv(projMatrixUniformLocation, GL.FALSE, projMatrix);

    return [worldMatrix, viewMatrix, projMatrix, worldMatrixUniformLocation, viewMatrixUniformLocation, projMatrixUniformLocation];

}

/** @function @param {WebGLRenderingContext} GL @param {Document} doc */
function setupTexture(GL,doc) {

    const CRATE_TEXTURE_IMG = doc.getElementById('CRATE-TEXTURE');

    const CRATE_TEXTURE = GL.createTexture();
    GL.bindTexture(GL.TEXTURE_2D, CRATE_TEXTURE);

    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);

    GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, CRATE_TEXTURE_IMG);

    GL.bindTexture(GL.TEXTURE_2D, null);

    return CRATE_TEXTURE;
};



const vertexShaderSRC =
[
'precision mediump float;',
'',
'attribute vec3 vertPosition;',
'attribute vec2 vertTextureCoord;',
'varying vec2 fragTextureCoord;',
'uniform mat4 worldMatrix;',
'uniform mat4 viewMatrix;',
'uniform mat4 projMatrix;',
'',
'void main()',
'{',
'  fragTextureCoord = vertTextureCoord;',
'  gl_Position = projMatrix * viewMatrix * worldMatrix * vec4(vertPosition, 1.0);',
'}'
].join('\n');

const fragmentShaderSRC =
[
'precision mediump float;',
'',
'varying vec2 fragTextureCoord;',
'uniform sampler2D sampler;',
'',
'void main()',
'{',
'  gl_FragColor = texture2D(sampler, fragTextureCoord);',
'}'
].join('\n');

const BOX_VERTEX_DATA = 
[ // X, Y, Z           U, V
    // Top
    -1.0, 1.0, -1.0,   0, 0,
    -1.0, 1.0, 1.0,    0, 1,
    1.0, 1.0, 1.0,     1, 1,
    1.0, 1.0, -1.0,    1, 0,

    // Left
    -1.0, 1.0, 1.0,    0, 0,
    -1.0, -1.0, 1.0,   1, 0,
    -1.0, -1.0, -1.0,  1, 1,
    -1.0, 1.0, -1.0,   0, 1,

    // Right
    1.0, 1.0, 1.0,     1, 1,
    1.0, -1.0, 1.0,    0, 1,
    1.0, -1.0, -1.0,   0, 0,
    1.0, 1.0, -1.0,    1, 0,

    // Front
    1.0, 1.0, 1.0,     1, 1,
    1.0, -1.0, 1.0,    1, 0,
    -1.0, -1.0, 1.0,   0, 0,
    -1.0, 1.0, 1.0,    0, 1,

    // Back
    1.0, 1.0, -1.0,    0, 0,
    1.0, -1.0, -1.0,   0, 1,
    -1.0, -1.0, -1.0,  1, 1,
    -1.0, 1.0, -1.0,   1, 0,

    // Bottom
    -1.0, -1.0, -1.0,  1, 1,
    -1.0, -1.0, 1.0,   1, 0,
    1.0, -1.0, 1.0,    0, 0,
    1.0, -1.0, -1.0,   0, 1,
];

const BOX_INDEX_DATA =
	[
		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
];



/** @function @param {WebGLRenderingContext} GL @param {Object} CONFIG @param {Document} doc */
function setupWebGL(GL, CONFIG, doc) {

    try {
        
        GL.enable(GL.DEPTH_TEST);
        GL.enable(GL.CULL_FACE);
        GL.cullFace(GL.BACK);
        GL.frontFace(GL.CCW);
    
        const SHADER_PROGRAM = createShaderProgram(GL, CONFIG.DEBUG, vertexShaderSRC, fragmentShaderSRC);
        createVertexBuffer(GL, BOX_VERTEX_DATA);
        createIndexBuffer(GL, BOX_INDEX_DATA);
        enableVertexAttributeArrays( GL, SHADER_PROGRAM );
    
        let CRATE_TEXTURE = setupTexture(GL,doc);
    
        GL.useProgram(SHADER_PROGRAM);
    
        let [
            WORLD_MATRIX,
            VIEW_MATRIX,
            PROJ_MATRIX,
            WORLD_MATRIX_UNIFORM_LOC,
            VIEW_MATRIX_UNIFORM_LOC,
            PROJ_MATRIX_UNIFORM_LOC
        ] = setupMatrixUniforms(GL, SHADER_PROGRAM);

        return [
            WORLD_MATRIX,
            VIEW_MATRIX,
            PROJ_MATRIX,
            WORLD_MATRIX_UNIFORM_LOC,
            VIEW_MATRIX_UNIFORM_LOC,
            PROJ_MATRIX_UNIFORM_LOC,
            CRATE_TEXTURE,
            null
        ];

    } catch (error) {
        
        return [ null, null, null, null, null, null, null, error ];

    };

};