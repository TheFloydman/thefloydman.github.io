class SwapCircle {
    id;
    position;
    rotation;
    isAnimating = false;

    constructor(id, pos, rot) {
        this.id = id;
        this.position = pos;
        this.rotation = rot;
    }
}

var validPositions = [{ x: 200, y: 50 }, { x: 200, y: 350 }, { x: 50, y: 200 }, { x: 350, y: 200 }, { x: 0, y: 0 }];

var circles = new Map([
    ['svg-circle-main', new SwapCircle('svg-circle-main', 4, { deg: 0, x: 300, y: 300 })],
    ['svg-circle-90-a', new SwapCircle('svg-circle-90-a', 0, { deg: 0, x: 100, y: 100 })],
    ['svg-circle-90-b', new SwapCircle('svg-circle-90-b', 1, { deg: 270, x: 100, y: 100 })],
    ['svg-circle-bent-a', new SwapCircle('svg-circle-bent-a', 2, { deg: 0, x: 100, y: 100 })],
    ['svg-circle-bent-b', new SwapCircle('svg-circle-bent-b', 3, { deg: 0, x: 100, y: 100 })],
    ['svg-circle-straight', new SwapCircle('svg-circle-straight', 4, { deg: 0, x: 100, y: 100 })]
]);

function getPos(pos) {
    return validPositions[pos];
}

function getRot(rot) {
    return rot % 4 * 90;
}

function onLoad() {
    for (const circle of circles.values()) {
        let element = document.getElementById(circle.id);
        element.setAttribute('transform', `translate(${getPos(circle.position).x}, ${getPos(circle.position).y}) rotate(${circle.rotation.deg}, ${circle.rotation.x}, ${circle.rotation.y})`);
        element.addEventListener('click', function(event) {
            if (!circle.isAnimating) {
                if (circle.id == 'svg-circle-main') {
                    let mainCircle = circles.get(circle.id);
                    let animationRotate = document.getElementById(`svg-maray-circles-animation-rotate`);
                    animationRotate.setAttribute('from', `${mainCircle.rotation.deg}, 300, 300`);
                    mainCircle.rotation.deg += 90;
                    animationRotate.setAttribute('to', `${mainCircle.rotation.deg}, 300, 300`);
                    animationRotate.beginElement();
                    if (mainCircle.rotation.deg >= 360) {
                        mainCircle.rotation.deg = 0;
                    }
                    let element = document.getElementById('svg-maray-circles');
                    element.setAttribute('transform', `rotate(${mainCircle.rotation.deg}, 300, 300)`);
                    animationRotate.addEventListener('beginEvent', function(event) {
                        mainCircle.isAnimating = true;
                    });
                    animationRotate.addEventListener('endEvent', function(event) {
                        mainCircle.isAnimating = false;
                    });
                } else {
                    rotate(circle, 90, circle.rotation.x, circle.rotation.y);
                }
            }
        });

        let animationRotate = document.getElementById(`${circle.id}-animation-rotate`);
        animationRotate.addEventListener('beginEvent', function(event) {
            circle.isAnimating = true;
        });
        animationRotate.addEventListener('endEvent', function(event) {
            circle.isAnimating = false;
        });
    }
}

function rotate(circle, degrees, x, y) {
    let animationRotate = document.getElementById(`${circle.id}-animation-rotate`);
    animationRotate.setAttribute('from', `${circle.rotation.deg}, ${x + getPos(circle.position).x}, ${y + getPos(circle.position).y}`);
    let animationTranslate = document.getElementById(`${circle.id}-animation-translate`);
    animationTranslate.setAttribute('from', `${getPos(circle.position).x}, ${getPos(circle.position).y}`);
    circle.rotation.deg += degrees;
    animationRotate.setAttribute('to', `${circle.rotation.deg}, ${x + getPos(circle.position).x}, ${y + getPos(circle.position).y}`);
    animationRotate.beginElement();
    animationTranslate.setAttribute('to', `${getPos(circle.position).x}, ${getPos(circle.position).y}`);
    animationTranslate.beginElement();
    if (circle.rotation.deg >= 360) {
        circle.rotation.deg -= 360;
    }
    let element = document.getElementById(circle.id);
    element.setAttribute('transform', `translate(${getPos(circle.position).x}, ${getPos(circle.position).y}) rotate(${circle.rotation.deg}, ${x}, ${y})`);
}

function swap() {
    let marayCircle;
    let hunrathCircle;
    let pos = 4;
    let mainRotation = circles.get('svg-circle-main').rotation.deg;

    for (const circle of circles.values()) {
        if (circle.id != 'svg-circle-main') {
            if ((mainRotation == 0 && getPos(circle.position).x == 200 && getPos(circle.position).y == 350) ||
                (mainRotation == 90 && getPos(circle.position).x == 350 && getPos(circle.position).y == 200) ||
                (mainRotation == 180 && getPos(circle.position).x == 200 && getPos(circle.position).y == 50) ||
                (mainRotation == 270 && getPos(circle.position).x == 50 && getPos(circle.position).y == 200)) {
                marayCircle = circle;
                pos = circle.position
            } else if (getPos(circle.position).x == 0 && getPos(circle.position).y == 0) {
                hunrathCircle = circle;
            }
        }
    }

    marayCircle.position = 4;
    marayCircle.rotation.deg += mainRotation;
    if (marayCircle.rotation.deg >= 360) {
        marayCircle.rotation.deg -= 360;
    }
    hunrathCircle.position = pos;
    hunrathCircle.rotation.deg -= mainRotation;
    if (hunrathCircle.rotation.deg < 360) {
        hunrathCircle.rotation.deg += 360;
    }

    let marayElement = document.getElementById(marayCircle.id);
    let hunrathElement = document.getElementById(hunrathCircle.id);
    marayElement.setAttribute('transform', `translate(${getPos(marayCircle.position).x}, ${getPos(marayCircle.position).y}) rotate(${marayCircle.rotation.deg}, ${marayCircle.rotation.x}, ${marayCircle.rotation.y})`);
    hunrathElement.setAttribute('transform', `translate(${getPos(hunrathCircle.position).x}, ${getPos(hunrathCircle.position).y}) rotate(${hunrathCircle.rotation.deg}, ${hunrathCircle.rotation.x}, ${hunrathCircle.rotation.y})`);

    const marayParent = document.getElementById('svg-maray-circles');
    const hunrathParent = document.getElementById('svg-hunrath-parent');
    marayParent.removeChild(marayElement)
    hunrathParent.removeChild(hunrathElement);
    marayParent.append(hunrathElement);
    hunrathParent.append(marayElement);
}