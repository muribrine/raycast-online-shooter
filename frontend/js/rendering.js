/** @param {CanvasRenderingContext2D} CTX @param {Array} rendering_data @returns {void} */
function render_walls(CTX, rendering_data) {
    
    CTX.clearRect(0,0,192,128);
    CTX.lineWidth = 2;

    let i = 0;

    while(i < rendering_data.length) {

        const COLOR = rendering_data[i]; i++;
        const X1 = rendering_data[i]; i++;
        const Y1 = rendering_data[i]; i++;
        const X2 = rendering_data[i]; i++;
        const Y2 = rendering_data[i]; i++;

        CTX.strokeStyle = COLOR;
        CTX.beginPath();
        CTX.moveTo(X1, Y1);
        CTX.lineTo(X2, Y2);
        CTX.stroke();
        CTX.closePath();

    }

};

/** @param {Object} game_data @returns {Array} */
function raycast(game_data) {

    let rendering_data = [];
    let wall_layer = [];

    const WALLS = game_data.walls;

    const PX = game_data.player.x;
    const PY = game_data.player.y;
    const PD = game_data.player.direction - 0.5;

    const TOTAL_RAYS = 192;
    const MAX_RAY_DISTANCE = 272;

    for (let ray_index = 0; ray_index < TOTAL_RAYS; ray_index++) {

        const RAY_DIRECTION = PD + ray_index / TOTAL_RAYS;
        const SIN = Math.sin(RAY_DIRECTION);
        const COS = Math.cos(RAY_DIRECTION)

        for (let distance = 0; distance < MAX_RAY_DISTANCE; distance++) {
            
            const RX = PX+COS*distance;
            const RY = PY+SIN*distance;

            let FLAG = false;
            WALLS.forEach(wall => {
                
                const COLOR = wall[0];
                const X1 = wall[1];
                const Y1 = wall[2];
                const WIDTH = wall[3];
                const HEIGHT = wall[4];

                if(RX < X1 + WIDTH && RX > X1 && RY < Y1 + HEIGHT && RY > Y1) {
                    const WALL_HEIGHT = 1750 / distance;
                    wall_layer.push(
                        rgbToHex(COLOR[0]-distance, COLOR[1]-distance, COLOR[2]-distance),
                        ray_index,
                        64 + WALL_HEIGHT,
                        ray_index,
                        64 - WALL_HEIGHT
                    );
                    FLAG = true;
                };

            });
            if(FLAG) { break; };

            if(RX < 0 || RY < 0 || RX > 256 || RY > 256) {
                const WALL_HEIGHT = 1750 / distance;
                rendering_data.push(
                    rgbToHex(255-distance, 255-distance, 255-distance),
                    ray_index,
                    64 + WALL_HEIGHT,
                    ray_index,
                    64 - WALL_HEIGHT
                );
                break;
            };
            
        }
    };

    wall_layer.forEach(wall => {
        rendering_data.push(wall);
    })

    return rendering_data;

};

const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  