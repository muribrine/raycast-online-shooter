function setup_input() {

    document.addEventListener('keydown', e => {
        switch (e.key) {
            case 'w': input['move'] = 1; break;
            case 's': input['move'] = -1; break;
            case 'a': input['turn'] = -1; break;
            case 'd': input['turn'] = 1; break;

            case 'ArrowUp': input['move'] = 1; break;
            case 'ArrowDown': input['move'] = -1; break;
            case 'ArrowLeft': input['turn'] = -1; break;
            case 'ArrowRight': input['turn'] = 1; break;
            default: break;
        }
    });

    document.addEventListener('keyup', e => {
        switch (e.key) {
            case 'w': input['move'] = 0; break;
            case 's': input['move'] = 0; break;
            case 'a': input['turn'] = 0; break;
            case 'd': input['turn'] = 0; break;

            case 'ArrowUp': input['move'] = 0; break;
            case 'ArrowDown': input['move'] = 0; break;
            case 'ArrowLeft': input['turn'] = 0; break;
            case 'ArrowRight': input['turn'] = 0; break;
            default: break;
        }
    });

    document.addEventListener('mousedown', e => {
        input['mouse1'] = 1;
    })

    document.addEventListener('mouseup', e => {
        input['mouse1'] = 0;
    });

}
