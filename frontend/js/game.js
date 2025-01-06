let health = 100; let ammo = 200; let gun = "Shotgun"
let canShootShotgun = true; let canShootPistol = true; let canShootKnife = true;

function update_game(input, game_data) {

    game_data.player.direction += input['turn'] / 360 * 8;
    game_data.player.x += input['move'] * Math.cos(game_data.player.direction);
    game_data.player.y += input['move'] * Math.sin(game_data.player.direction);

    const PX = game_data.player.x;
    const PY = game_data.player.y;
    do_collisions(game_data, PX, PY)

    if (game_data.player.direction >= 2 * Math.PI) { game_data.player.direction = 0 };
    if (game_data.player.direction * -1 >= 2 * Math.PI) { game_data.player.direction = 0 };
    if (game_data.player.direction < 0) { game_data.player.direction = 2 * Math.PI - 0.000000001 };

    if(input['number']) {
        guns_hud_update();
    }

    update_guns(input);

    return game_data;

};



function do_collisions(game_data, PX, PY) {

    game_data.walls.forEach(wall => {

        const X1 = wall[1];
        const Y1 = wall[2];
        const WIDTH = wall[3];
        const HEIGHT = wall[4];

        if (PX < X1 + WIDTH && PX > X1 && PY < Y1 + HEIGHT && PY > Y1) {
            game_data.player.x -= input['move'] * Math.cos(game_data.player.direction);
            game_data.player.y -= input['move'] * Math.sin(game_data.player.direction);
        };

    });

    if (PX < 0 || PY < 0 || PX > 256 || PY > 256) {
        game_data.player.x -= input['move'] * Math.cos(game_data.player.direction);
        game_data.player.y -= input['move'] * Math.sin(game_data.player.direction);
    };

};

function update_guns(input) {

    if (input['mouse1']) {

        if (canShootShotgun && gun == "Shotgun") {

            canShootShotgun = false;
            const gunSoundHandle = create_audio_handler('/shotgun-fire.mp3', 1);

            gunSoundHandle.play();
            document.getElementById('BOOM').style['display'] = "block";
            document.getElementById('CROSSHAIR').style['display'] = 'none';

            setTimeout(() => {
                document.getElementById('BOOM').style['display'] = "none";
            }, 100);

            setTimeout(() => {
                gunSoundHandle.remove();
                canShootShotgun = true;
                document.getElementById('CROSSHAIR').style['display'] = 'block';

            }, 750);

        };

        if (canShootPistol && gun == "Pistol") {

            canShootPistol = false;
            const gunSoundHandle = create_audio_handler('/pistol-fire.mp3', 0.4);

            gunSoundHandle.play();
            document.getElementById('BOOM').style['display'] = "block";
            document.getElementById('CROSSHAIR').style['display'] = 'none';

            setTimeout(() => {
                document.getElementById('BOOM').style['display'] = "none";
            }, 100);

            setTimeout(() => {
                gunSoundHandle.remove();
                canShootPistol = true;
                document.getElementById('CROSSHAIR').style['display'] = 'block';
            }, 750);

        };

        if (canShootKnife && gun == "Knife") {

            canShootKnife = false;
            const gunSoundHandle = create_audio_handler('/knife-fire.mp3', 1);

            gunSoundHandle.play();
            document.getElementById('BOOM').style['display'] = "block";
            document.getElementById('CROSSHAIR').style['display'] = 'none';

            setTimeout(() => {
                document.getElementById('BOOM').style['display'] = "none";
            }, 100);

            setTimeout(() => {
                gunSoundHandle.remove();
                canShootKnife = true;
                document.getElementById('CROSSHAIR').style['display'] = 'block';
            }, 500);

        };

    };

};

function guns_hud_update() {

    if (input['number'] == 1) {

        gun = "Knife";
        input['number'] = 0;
        const gunSoundHandle = create_audio_handler('/knife-select.mp3', 1);
        gunSoundHandle.play();
        document.getElementById("GUN_DISPLAY").src = "/knife.png";
        setTimeout(() => {
            gunSoundHandle.remove();
        }, 750);

    };

    if (input['number'] == 2) {

        gun = "Pistol";
        input['number'] = 0;
        const gunSoundHandle = create_audio_handler('/pistol-select.mp3', 1);
        gunSoundHandle.play();
        document.getElementById("GUN_DISPLAY").src = "/pistol.png";
        setTimeout(() => {
            gunSoundHandle.remove();
        }, 750);

    };

    if (input['number'] == 3) {

        gun = "Shotgun";
        input['number'] = 0;
        const gunSoundHandle = create_audio_handler('/shotgun-select.mp3', 1);
        gunSoundHandle.play();
        document.getElementById("GUN_DISPLAY").src = "/shotgun.png";
        setTimeout(() => {
            gunSoundHandle.remove();
        }, 750);

    };

};