const vertexShaderSRC =
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'',
'void main()',
'{',
'   gl_Position = vec4(vertPosition, 0.0, 1.0);',
'}'
].join('\n');

const fragmentShaderSRC =
[
'precision mediump float;',
'',
'void main()',
'{',
'   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
'}'
].join('\n');

function gpuClearScreen(GL, COLOR) {
    GL.clearColor(COLOR[0], COLOR[1], COLOR[2], COLOR[3]);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
}

/** @function @param {WebGLRenderingContext} GL */
function createShaderProgram(GL, DEBUG) {

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