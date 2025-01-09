const CONFIG = {
    WIDTH: 640,
    HEIGHT: 360,
    DEBUG: true,
};

function init() {

    createUI(document, CONFIG.WIDTH, CONFIG.HEIGHT);

    /** @type {WebGLRenderingContext} */
    const GL = document.getElementById('canvas').getContext('webgl');
    if(!GL) {
        GL = document.getElementById('canvas').getContext('experimental-webgl');
        if(!GL) {
            console.error('WEBGL not supported.');
            alert('WEBGL not supported.');
            return;
        }
    };

    const [
        WORLD_MATRIX, VIEW_MATRIX, PROJ_MATRIX,
        WORLD_MATRIX_UNIFORM_LOC, VIEW_MATRIX_UNIFORM_LOC, PROJ_MATRIX_UNIFORM_LOC,
        CRATE_TEXTURE,
        WEBGL_STATUS
    ] = setupWebGL(GL, CONFIG, document);

    if(WEBGL_STATUS != null) {
        console.error(WEBGL_STATUS);
        alert('Could Not Setup WebGL.');
        return;
    }

    const inputMap = setupInput(document);

    let angle = 0;
    let identityMatrix = new Float32Array(16);
    glMatrix.mat4.identity(identityMatrix);
    let lastTime = performance.now(); let currentTime; let deltaTime;

    const loop = () => {

        currentTime = performance.now(); deltaTime = (currentTime - lastTime) / 1000; lastTime = currentTime;

        angle = performance.now() / 1000 / 3 * 2 * Math.PI;
        glMatrix.mat4.rotate(WORLD_MATRIX, identityMatrix, angle, [0.5, 1.0, 0.75]);
        GL.uniformMatrix4fv(WORLD_MATRIX_UNIFORM_LOC, GL.FALSE, WORLD_MATRIX);
    
        gpuClearScreen(GL,[0.1,0.1,0.2,1.0]);
        GL.bindTexture(GL.TEXTURE_2D, CRATE_TEXTURE);
        GL.activeTexture(GL.TEXTURE0);
        GL.drawElements(GL.TRIANGLES, BOX_INDEX_DATA.length, GL.UNSIGNED_SHORT, 0);
    
        requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
    
};


init();