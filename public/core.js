const CONFIG = {
    WIDTH: 640,
    HEIGHT: 360,
    DEBUG: true,
};

const vertexShaderSRC =
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'',
'void main()',
'{',
'  fragColor = vertColor;',
'  gl_Position = vec4(vertPosition, 0.0, 1.0);',
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

const TRIANGLE_VERTICES = [
    0.0, 0.5,   1.0, 0.0, 0.0,
    -0.5, -0.5, 0.0, 1.0, 0.0,
    0.5, -0.5,  0.0, 0.0, 1.0
];

let GL;

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

    gpuClearScreen(GL,[0.75,0.85,0.8,1.0]);

    const SHADER_PROGRAM = createShaderProgram(GL, CONFIG.DEBUG, vertexShaderSRC, fragmentShaderSRC);
    createVertexBuffer(GL, TRIANGLE_VERTICES);
    eanbleVertexAttributeArrays( GL, SHADER_PROGRAM );

    GL.useProgram(SHADER_PROGRAM);
    GL.drawArrays(GL.TRIANGLES, 0, 3);

    return true;
    
};

function loop() {

    requestAnimationFrame(loop);

}

if(init()) {
    requestAnimationFrame(loop);
};