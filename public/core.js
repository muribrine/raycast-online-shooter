const CONFIG = {
    WIDTH: 800,
    HEIGHT: 600,
    DEBUG: true,
};

function init(CONFIG) {

    createUI(document, CONFIG.WIDTH, CONFIG.HEIGHT);

    /** @type {WebGLRenderingContext} */
    let GL = document.getElementById('canvas').getContext('webgl');
    if(!GL) {
        GL = document.getElementById('canvas').getContext('experimental-webgl');
    };

    gpuClearScreen(GL,[0.75,0.85,0.8,1.0]);

    const SHADER_PROGRAM = createShaderProgram(GL, CONFIG.DEBUG);

    const TRIANGLE_VERTICES = [
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ]

    const TRIANGLE_VERTEX_BUFFER = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX_BUFFER);
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(TRIANGLE_VERTICES), GL.STATIC_DRAW);

    const POSITION_ATTRIBUTE_LOCATION = GL.getAttribLocation(SHADER_PROGRAM, 'vertPosition');
    GL.vertexAttribPointer(
        POSITION_ATTRIBUTE_LOCATION,
        2,
        GL.FLOAT,
        GL.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0
    );

    GL.enableVertexAttribArray(POSITION_ATTRIBUTE_LOCATION);

    GL.useProgram(SHADER_PROGRAM);
    GL.drawArrays(GL.TRIANGLES, 0, 3);
    
};

init(CONFIG);