/** @param {Document} document @param {number} width @param {number} height @returns {object} */
function create_ui(document, width, height) {

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);

    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    document.body.appendChild(overlay);

    return canvas.getContext('2d');

};