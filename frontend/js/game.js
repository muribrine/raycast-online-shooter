function update_player(input, game_data, CTX) {

    game_data.player.direction += input['turn'] / 360 * 8;
    game_data.player.x += input['move'] * Math.cos(game_data.player.direction);
    game_data.player.y += input['move'] * Math.sin(game_data.player.direction);

    const PX = game_data.player.x;
    const PY = game_data.player.y;

    game_data.walls.forEach(wall => {
                
        const X1 = wall[1];
        const Y1 = wall[2];
        const WIDTH = wall[3];
        const HEIGHT = wall[4];

        if(PX < X1 + WIDTH && PX > X1 && PY < Y1 + HEIGHT && PY > Y1) {
            game_data.player.x -= input['move'] * Math.cos(game_data.player.direction);
            game_data.player.y -= input['move'] * Math.sin(game_data.player.direction);
        };

    });

    if(PX < 0 || PY < 0 || PX > 256 || PY > 256) {
        game_data.player.x -= input['move'] * Math.cos(game_data.player.direction);
        game_data.player.y -= input['move'] * Math.sin(game_data.player.direction);
    }

    if(game_data.player.direction >= 2 * Math.PI) { game_data.player.direction = 0 };
    if(game_data.player.direction * -1 >= 2 * Math.PI) { game_data.player.direction = 0 };
    if(game_data.player.direction < 0) { game_data.player.direction = 2 * Math.PI - 0.000000001 };

    if(input['mouse1'] && (canShootShotgun && gun == "Shotgun" || canShootPistol && gun == "Pistol_" || canShootKnife && gun == "Knife__")) {

        const gunSoundHandle = gun_fire();

        gunSoundHandle.play();
        document.getElementById('BOOM').style['display'] = "block";
        document.getElementById('CROSSHAIR').style['display'] = 'none';

        setTimeout(() => {
            document.getElementById('BOOM').style['display'] = "none";
        }, 100);

        setTimeout(() => {
            gunSoundHandle.remove();
            canShootShotgun = true;
            canShootPistol = true;
            canShootKnife = true;
            document.getElementById('CROSSHAIR').style['display'] = 'block';
        }, 750);

    }

    if(input['turn'] || input['move']) {
        let rendering_data = raycast(game_data);
        render_walls(CTX, rendering_data);
    };

    return game_data;

};

function gun_fire() {
    switch (gun) {
        case "Knife__":
            canShootKnife = false;
            break;
        case "Shotgun":
            const SHOTGUN_FIRE = document.createElement('audio');
            SHOTGUN_FIRE.id = 'SHOTGUN-FIRE';
            SHOTGUN_FIRE.src = '/shotgun-fire.mp3';
            document.body.appendChild(SHOTGUN_FIRE);
            canShootShotgun = false;
            return SHOTGUN_FIRE;
        case "Pistol_":
            const PISTOL_FIRE = document.createElement('audio');
            PISTOL_FIRE.id = 'PISTOL-FIRE';
            PISTOL_FIRE.src = '/pistol-fire.mp3';
            document.body.appendChild(PISTOL_FIRE);
            canShootPistol = false;
            return PISTOL_FIRE;
    
        default: break;
    };
}