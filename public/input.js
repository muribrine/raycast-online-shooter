
/** @function @param {Document} doc */
function setupInput(doc) {

    const inputMap = {
        'up': false,
        'down': false,
        'right': false,
        'left': false,
        'mousePrimary': false,
        'mouseSecondary': false,
        'mouseMiddle': false,
        'spaceBar': false,
    };

    doc.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w': inputMap['up'] = true; break;
            case 's': inputMap['down'] = true; break;
            case 'd': inputMap['right'] = true; break;
            case 'a': inputMap['left'] = true; break;

            case 'arrowUp': inputMap['up'] = true; break;
            case 'arrowDown': inputMap['down'] = true; break;
            case 'arrowRight': inputMap['right'] = true; break;
            case 'arrowLeft': inputMap['left'] = true; break;

            case ' ': inputMap['spaceBar'] = true; break;
            default: break;
        };
    });

    doc.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'w': inputMap['up'] = false; break;
            case 's': inputMap['down'] = false; break;
            case 'd': inputMap['right'] = false; break;
            case 'a': inputMap['left'] = false; break;

            case 'arrowUp': inputMap['up'] = false; break;
            case 'arrowDown': inputMap['down'] = false; break;
            case 'arrowRight': inputMap['right'] = false; break;
            case 'arrowLeft': inputMap['left'] = false; break;

            case ' ': inputMap['spaceBar'] = false; break;
            default: break;
        };
    });

    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    doc.addEventListener('mousedown', (event) => {
        switch (event.button) {
            case 0: inputMap['mousePrimary'] = true; break;
            case 1: inputMap['mouseMiddle'] = true; break;
            case 2: inputMap['mouseSecondary'] = true; break;
            default: break;
        };
    });

    doc.addEventListener('mouseup', (event) => {
        switch (event.button) {
            case 0: inputMap['mousePrimary'] = false; break;
            case 1: inputMap['mouseMiddle'] = false; break;
            case 2: inputMap['mouseSecondary'] = false; break;
            default: break;
        };
    });

    return inputMap;

};