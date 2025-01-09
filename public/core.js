const CONFIG = {
    WIDTH: 640,
    HEIGHT: 360,
    DEBUG: true,
};

const vertexShaderSRC =
[
'precision mediump float;',
'',
'attribute vec3 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'uniform mat4 worldMatrix;',
'uniform mat4 viewMatrix;',
'uniform mat4 projMatrix;',
'',
'void main()',
'{',
'  fragColor = vertColor;',
'  gl_Position = projMatrix * viewMatrix * worldMatrix * vec4(vertPosition, 1.0);',
'}'
].join('\n');

const fragmentShaderSRC =
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'void main()',
'{',
'  gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');

const BOX_VERTEX_DATA = [
//  X     Y     Z         R    G    B
-1.0, 1.0, -1.0,   0.5, 0.5, 0.5,
		-1.0, 1.0, 1.0,    0.5, 0.5, 0.5,
		1.0, 1.0, 1.0,     0.5, 0.5, 0.5,
		1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

		// Left
		-1.0, 1.0, 1.0,    0.75, 0.25, 0.5,
		-1.0, -1.0, 1.0,   0.75, 0.25, 0.5,
		-1.0, -1.0, -1.0,  0.75, 0.25, 0.5,
		-1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

		// Right
		1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
		1.0, -1.0, 1.0,   0.25, 0.25, 0.75,
		1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
		1.0, 1.0, -1.0,   0.25, 0.25, 0.75,

		// Front
		1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
		1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
		-1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
		-1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

		// Back
		1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
		1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
		-1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
		-1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

		// Bottom
		-1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
		-1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
		1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
		1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
//  X     Y     Z         R    G    B
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

/** @type {WebGLRenderingContext} */
let GL;

let WORLD_MATRIX;
let VIEW_MATRIX;
let PROJ_MATRIX;

let WORLD_MATRIX_UNIFORM_LOC;
let VIEW_MATRIX_UNIFORM_LOC;
let PROJ_MATRIX_UNIFORM_LOC;

function init() {

    createUI(document, CONFIG.WIDTH, CONFIG.HEIGHT);

    /** @type {WebGLRenderingContext} */
    GL = document.getElementById('canvas').getContext('webgl');
    if(!GL) {
        GL = document.getElementById('canvas').getContext('experimental-webgl');
        if(!GL) {
            console.error('WEBGL not supported.');
            alert('WEBGL not supported.');
            return false;
        }
    };

    GL.enable(GL.DEPTH_TEST);
    GL.enable(GL.CULL_FACE);
    GL.cullFace(GL.BACK);
    GL.frontFace(GL.CCW);

    const SHADER_PROGRAM = createShaderProgram(GL, CONFIG.DEBUG, vertexShaderSRC, fragmentShaderSRC);
    createVertexBuffer(GL, BOX_VERTEX_DATA);
    createIndexBuffer(GL, BOX_INDEX_DATA);
    enableVertexAttributeArrays( GL, SHADER_PROGRAM );

    GL.useProgram(SHADER_PROGRAM);

    [
    WORLD_MATRIX,
    VIEW_MATRIX,
    PROJ_MATRIX,
    WORLD_MATRIX_UNIFORM_LOC,
    VIEW_MATRIX_UNIFORM_LOC,
    PROJ_MATRIX_UNIFORM_LOC
    ] = setupMatrixUniforms(GL, SHADER_PROGRAM);

    return true;
    
};

// LOOP variables:
let angle = 0;
let identityMatrix = new Float32Array(16);
glMatrix.mat4.identity(identityMatrix);

function loop() {

    angle = performance.now() / 1000 / 3 * 2 * Math.PI;
    glMatrix.mat4.rotate(WORLD_MATRIX, identityMatrix, angle, [1, 1, 1]);
    GL.uniformMatrix4fv(WORLD_MATRIX_UNIFORM_LOC, GL.FALSE, WORLD_MATRIX);

    gpuClearScreen(GL,[0.1,0.1,0.2,1.0]);
    GL.drawElements(GL.TRIANGLES, BOX_INDEX_DATA.length, GL.UNSIGNED_SHORT, 0);

    requestAnimationFrame(loop);

}

if(init()) {
    requestAnimationFrame(loop);
};