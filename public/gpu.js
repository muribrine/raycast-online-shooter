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

function createVertexBuffer(GL, VertexData) {
    const BUFFER = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, BUFFER);
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(VertexData), GL.STATIC_DRAW);
    return BUFFER;
};

function createIndexBuffer(GL, IndexData) {

    const BUFFER = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BUFFER);
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(IndexData), GL.STATIC_DRAW);
    return BUFFER;
};

function enableVertexAttributeArrays(GL, SHADER_PROGRAM) {

    const POSITION_ATTRIBUTE_LOCATION = GL.getAttribLocation(SHADER_PROGRAM, 'vertPosition');
    const COLOR_ATTRIBUTE_LOCATION = GL.getAttribLocation(SHADER_PROGRAM, 'vertColor');
    GL.vertexAttribPointer(
        POSITION_ATTRIBUTE_LOCATION,
        3,
        GL.FLOAT,
        GL.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    GL.vertexAttribPointer(
        COLOR_ATTRIBUTE_LOCATION,
        3,
        GL.FLOAT,
        GL.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT
    );

    GL.enableVertexAttribArray(POSITION_ATTRIBUTE_LOCATION);
    GL.enableVertexAttribArray(COLOR_ATTRIBUTE_LOCATION);

};

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