/** @type {CanvasRenderingContext2D} */
const CTX = create_ui(document, 128, 128);

let game_data = {

    player: { x: 100, y: 100, direction: Math.PI },
    walls: [
        [[100, 255, 100], 20, 20, 10, 50],
        [[135, 255, 135], 20, 70, 10, 1],
        [[135, 255, 135], 20, 20, 10, 1],
        [[100, 100, 255], 60, 60, 30, 30],
        [[135, 135, 255], 60, 90, 30, 1],
        [[135, 135, 255], 60, 60, 30, 1],
    ], // World coordinates go from [0,0] (top-left) all the way to [128,128] (bottom-right)

};
let input = { 'move': 0, 'turn': 0, 'mouse1': 0 };

function master_loop() {

    game_data = update_player(input, game_data, CTX);

    requestAnimationFrame(master_loop);

};

setup_input();

let rendering_data = raycast(game_data);
render_walls(CTX, rendering_data);

master_loop();