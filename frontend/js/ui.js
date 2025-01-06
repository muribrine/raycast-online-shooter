/** @param {Document} document @param {number} width @param {number} height @returns {object} */
function create_ui(document, width, height) {

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);

    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    const HUD = document.createElement('div');
    HUD.id = 'HUD';

    const HEALTH = document.createElement('h1');
    HEALTH.id = 'HEALTH';
    HEALTH.innerText = 'HEALTH: 100%';
    const AMMO = document.createElement('h1');
    AMMO.id = 'AMMO';
    AMMO.innerText = 'AMMO: 200';
    const GUN = document.createElement('h1');
    GUN.id = 'GUN';
    GUN.innerText = 'GUN: Pistol | [ 1 ] [ 2 ] [ 3 ] |';

    HUD.appendChild(HEALTH);
    HUD.appendChild(AMMO);
    HUD.appendChild(GUN);
    overlay.appendChild(HUD);

    const GUN_DISPLAY = document.createElement('img');
    GUN_DISPLAY.id = 'GUN_DISPLAY';
    GUN_DISPLAY.src = "/SHOTGUN.png"
    const BOOM = document.createElement('img');
    BOOM.id = 'BOOM';
    BOOM.src = '/BOOM.png';

    const CROSSHAIR = document.createElement('div');
    CROSSHAIR.id  ='CROSSHAIR';

    overlay.appendChild(GUN_DISPLAY);
    overlay.appendChild(CROSSHAIR);
    overlay.appendChild(BOOM);

    document.body.appendChild(overlay);

    return canvas.getContext('2d');

};

function update_ui(health,ammo,gun) {

    const HEALTH = document.getElementById('HEALTH');
    const AMMO = document.getElementById('AMMO');
    const GUN = document.getElementById('GUN');

    HEALTH.innerText = `HEALTH: ${health}%`;
    AMMO.innerText = `AMMO: ${ammo}`;
    GUN.innerText = `GUN: ${gun} | [ 1 ] [ 2 ] [ 3 ] |`;

};