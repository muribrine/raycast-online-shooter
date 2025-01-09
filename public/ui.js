
/** @function @param {Document} doc @param {number} CANVAS_HEIGHT @param {number} CANVAS_WIDTH */
function createUI(doc, CANVAS_WIDTH, CANVAS_HEIGHT) {

    doc.body.appendChild(
        createUIElement(doc, 'canvas', 
            [['id', 'canvas'], ['width', CANVAS_WIDTH], ['height', CANVAS_HEIGHT]]
        )
    );

}

/** @function @param {Document} doc @param {String} type @param {Array} props  */
function createUIElement(doc, type, props) {

    const ELEMENT = doc.createElement(type);
    for (let i = 0; i < props.length; i++) {
        ELEMENT[props[i][0]] = props[i][1];
    };

    return ELEMENT;

}