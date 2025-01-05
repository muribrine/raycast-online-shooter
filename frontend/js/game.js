function update_player(input, game_data, CTX) {

    game_data.player.direction += input['turn'] / 360 * 8;
    game_data.player.x += input['move'] * Math.cos(game_data.player.direction) / 4;
    game_data.player.y += input['move'] * Math.sin(game_data.player.direction) / 4;

    if(game_data.player.direction >= 2 * Math.PI) { game_data.player.direction = 0 };
    if(game_data.player.direction * -1 >= 2 * Math.PI) { game_data.player.direction = 0 };
    if(game_data.player.direction < 0) { game_data.player.direction = 2 * Math.PI - 0.000000001 };

    if(input['turn'] || input['move']) {
        let rendering_data = raycast(game_data);
        render_walls(CTX, rendering_data);
    };

    return game_data;

};