/** @type {CanvasRenderingContext2D} */
const CTX = create_ui(document, 192, 128);

let game_data = {

    player: { x: 100, y: 100, direction: Math.PI },
    walls: [

        [[175, 255, 175], 20, 20, 120, 1],
        [[175, 255, 175], 140, 20, 1, 64],
        [[175, 255, 175], 20, 65, 32, 1],
        [[175, 255, 175], 80, 65, 128, 1],
        [[175, 255, 175], 140, 110, 1, 32],
        [[175, 255, 175], 0, 125, 96, 1],
        [[175, 255, 175], 0, 200, 96, 1],
        [[175, 255, 175], 96, 150, 1, 80],
        [[175, 255, 175], 130, 140, 64, 1],
        [[175, 255, 175], 230, 50, 1, 56],
        [[100, 100, 255], 200, 100, 8, 8],
        [[225, 100, 100], 216, 116, 8, 8],
        [[175, 255, 175], 200, 200, 64, 1],
        [[175, 255, 175], 200, 168, 1, 64],
        [[100, 100, 255], 160, 160, 16, 16],
        [[100, 100, 255], 160, 188, 16, 16],
        [[255, 100, 100], 132, 216, 16, 16],

    ], // World coordinates go from [0,0] (top-left) all the way to [256,256] (bottom-right)

};
let input = { 'move': 0, 'turn': 0, 'mouse1': 0, 'number': 3 };

let health = 100;
let ammo = 200;
let gun = "Shotgun"
canShootShotgun = true;
canShootPistol = true;
canShootKnife = true;

function master_loop() {

    game_data = update_player(input, game_data, CTX);

    if(input['number'] == 1 ) {
        gun = "Knife__";
    };

    if(input['number'] == 2 ) {
        gun = "Pistol_";
        document.getElementById("GUN_DISPLAY").src = "/pistol.png"
    };

    if(input['number'] == 3 ) {
        gun = "Shotgun";
        document.getElementById("GUN_DISPLAY").src = "/shotgun.png"
    };

    update_ui(health,ammo,gun);

    requestAnimationFrame(master_loop);

};

setup_input();

let rendering_data = raycast(game_data);
render_walls(CTX, rendering_data);

master_loop();