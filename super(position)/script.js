const imageLargeCircles = new Image();
const imageSmallCircles = new Image();

var imagesLoaded = new Map([
    [imageLargeCircles, false],
    [imageSmallCircles, false]
]);

const largeCirclePositions = [
    { x: 1 / 2, y: 1 / 5 },
    { x: 4 / 5, y: 1 / 2 },
    { x: 1 / 2, y: 4 / 5 },
    { x: 1 / 5, y: 1 / 2 },
    { x: 1 / 2, y: 1 / 2 }
];

const smallCirclePositions = [
    { x: 1 / 2, y: 7 / 30 },
    { x: 23 / 30, y: 1 / 2 },
    { x: 1 / 2, y: 23 / 30 },
    { x: 7 / 30, y: 1 / 2 },
    { x: 1 / 2, y: 1 / 2 }
];

const trianglePositions = [
    { x: 1 / 2, y: 73 / 180 },
    { x: 107 / 180, y: 1 / 2 },
    { x: 1 / 2, y: 107 / 180 },
    { x: 73 / 180, y: 1 / 2 },
];

const triangleVariations = [[[-40, -20], [0, 20], [40, -20]], [[20, -40], [-20, 0], [20, 40]], [[-40, 20], [0, -20], [40, 20]], [[-20, -40], [20, 0], [-20, 40]]];

var mouseX = 0;
var mouseY = 0;
var mouseMoved = false;
var mouseMoveTimeout = mouseTimeout();
var numberOfPlatforms = 0;

class SwapButton {
    canvas;
    position;
    rotation;
    dimensions;
    path = new Path2D();
    platform;

    constructor(position) {
        this.position = position;
        this.rotation = position;
        if (this.position % 2 == 0) {
            this.dimensions = { x: 80, y: 40 };
        } else {
            this.dimensions = { x: 40, y: 80 };
        }
        this.canvas = new OffscreenCanvas(this.dimensions.x, this.dimensions.y);

        const pos = this.getAbsolutePosition();
        let points = triangleVariations[this.rotation];
        for (const foo of points) {
            foo[0] += pos.x + this.dimensions.x / 2;
            foo[1] += pos.y + this.dimensions.y / 2;
        }

        this.path.moveTo(points[0][0], points[0][1]);
        this.path.lineTo(points[1][0], points[1][1]);
        this.path.lineTo(points[2][0], points[2][1]);
        this.path.lineTo(points[0][0], points[0][1]);
    }

    draw(ctx) {
        let localContext = this.canvas.getContext("2d");
        localContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        localContext.save();
        localContext.translate(this.dimensions.x / 2, this.dimensions.y / 2);
        localContext.rotate(((this.rotation + 2) * Math.PI) / 2);
        localContext.translate(-this.dimensions.x / 2, -this.dimensions.y / 2);
        if (!this.isWithin(Math.floor(mouseX), Math.floor(mouseY)) || !mouseMoved) {
            localContext.globalAlpha = 0.75;
        }
        localContext.fillStyle = '#db4242';
        //localContext.strokeStyle = '#542828';
        localContext.lineWidth = 2;
        localContext.beginPath();
        localContext.moveTo(this.dimensions.x / 2 - 39, this.dimensions.y / 2 + 19);
        localContext.lineTo(this.dimensions.x / 2, this.dimensions.y / 2 - 20);
        localContext.lineTo(this.dimensions.x / 2 + 39, this.dimensions.y / 2 + 19);
        localContext.lineTo(this.dimensions.x / 2 - 39, this.dimensions.y / 2 + 19);
        localContext.fill();
        localContext.stroke();
        localContext.restore();
        let pos = this.getAbsolutePosition();
        ctx.drawImage(this.canvas, Math.floor(pos.x), Math.floor(pos.y));
    }

    getAbsolutePosition() {
        let x =
            trianglePositions[this.position].x * 900 - (this.dimensions.x / 2);
        let y =
            trianglePositions[this.position].y * 900 - (this.dimensions.y / 2);
        return { x: x, y: y };
    }

    isWithin(x, y) {
        return document.getElementById('main-canvas').getContext('2d').isPointInPath(this.path, x, y);
    }

    mouseClicked(x, y) {
        if (this.isWithin(x, y)) {
            let size = (board.children.length - 1) / 2;
            const centerCircle = board.children[board.children.length - size - 1];
            const swapPos = (this.position + 2) % 4;
            const childCircle = this.platform.children[(swapPos - this.platform.rotation + 4) % 4];
            this.platform.children[(swapPos - this.platform.rotation + 4) % 4] = centerCircle;
            centerCircle.position = childCircle.position;
            centerCircle.rotation = (centerCircle.rotation - this.platform.rotation + 4) % 4;
            centerCircle.parentObject = this.platform;
            childCircle.position = 4;
            childCircle.rotation = (childCircle.rotation + this.platform.rotation) % 4;
            board.setChild(board.children.length - size - 1, childCircle);
            clearTimeout(mouseMoveTimeout);
            mouseMoved = true;
            mouseMoveTimeout = mouseTimeout();
        }
    }

    mouseMoved(x, y) {
        let canvas = document.getElementById('main-canvas');
        if (canvas.style.cursor != 'pointer' && this.isWithin(x, y)) {
            canvas.style.cursor = 'pointer';
        }
    }
}

class Circle {
    radius;
    image;
    canvas;
    position;
    rotation = 0;
    parentObject;
    children = [];
    animation = { rotating: false, startTime: 0 };

    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
        this.canvas = new OffscreenCanvas(this.radius * 2, this.radius * 2);
    }

    addChild(child) {
        this.children.push(child);
        child.parentObject = this;
    }

    setChild(index, child) {
        this.children[index] = child;
        child.parentObject = this;
    }

    getRelativePosition() {
        return { x: 0, y: 0 };
    }

    getAbsolutePosition() {
        let pos = this.getRelativePosition();
        if (this.parentObject) {
            let parentPos = this.parentObject.getAbsolutePosition();
            pos.x += parentPos.x;
            pos.y += parentPos.y;
        }
        return pos;
    }

    isWithin(x, y) {
        let xDif = x - (this.getAbsolutePosition().x + this.radius);
        let yDif = y - (this.getAbsolutePosition().y + this.radius);
        return Math.sqrt(xDif * xDif + yDif * yDif) <= this.radius;
    }

    draw(ctx) {
        let partial = 0;
        if (this.animation.rotating == true) {
            partial = (performance.now() - this.animation.startTime) / 100;
            if (partial >= 1) {
                partial = 0;
                this.animation.rotating = false;
                this.rotation = (this.rotation + 1) % 4;
                clearTimeout(mouseMoveTimeout);
                mouseMoved = true;
                mouseMoveTimeout = mouseTimeout();
            }
        }
        let localContext = this.canvas.getContext("2d");
        localContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        localContext.save();
        localContext.translate(this.radius, this.radius);
        localContext.rotate(((this.rotation + partial) * Math.PI) / 2);
        localContext.translate(-this.radius, -this.radius);
        localContext.drawImage(this.image.src, 0, 0, this.radius * 2, this.radius * 2, 0, 0, this.radius * 2, this.radius * 2);
        localContext.drawImage(this.image.src, this.image.x, this.image.y, this.radius * 2, this.radius * 2, 0, 0, this.radius * 2, this.radius * 2);
        let pos = this.getRelativePosition();
        for (const child of this.children) {
            child.draw(localContext);
        }
        if (this.parentObject instanceof Board && (!this.isWithin(Math.floor(mouseX), Math.floor(mouseY)) || !mouseMoved) && this.animation.rotating == false) {
            localContext.save();
            localContext.fillStyle = '#FFFFFF';
            localContext.globalAlpha = 0.25;
            localContext.fillRect(0, 0, this.radius * 2, this.radius * 2);
            localContext.restore();
        }
        localContext.restore();
        ctx.drawImage(this.canvas, Math.floor(pos.x), Math.floor(pos.y));
    }

    mouseClicked(x, y) {
        for (const child of this.children) {
            child.mouseClicked(x, y);
        }
    }

    mouseMoved(x, y) {
        for (const child of this.children) {
            child.mouseMoved(x, y);
        }
    }

    rotate() {
        this.animation.rotating = true;
        this.animation.startTime = performance.now();
    }

}

class Board extends Circle {
    constructor(position) {
        super(position, 450);
    }

    /* Override */
    getRelativePosition() {
        return { x: 0, y: 0 };
    }

    /* Override */
    getAbsolutePosition() {
        return { x: 0, y: 0 };
    }

    /* Override */
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, this.radius * 2, this.radius * 2);
        ctx.restore();
        for (const child of this.children) {
            child.draw(ctx);
        }
    }

    /* Override */
    mouseMoved(x, y) {
        let canvas = document.getElementById('main-canvas');
        if (canvas.style.cursor != 'default' && this.isWithin(x, y)) {
            canvas.style.cursor = 'default';
        }
        super.mouseMoved(x, y);
    }
}

class Platform extends Circle {
    image = { src: undefined, x: 0, y: 0 };
    swapButton;

    constructor(position, imageX, imageY) {
        super(position, 150);
        this.image.x = imageX;
        this.image.y = imageY;
    }

    /* Override */
    getRelativePosition() {
        let x =
            largeCirclePositions[this.position].x * this.parentObject.radius * 2 -
            this.radius;
        let y =
            largeCirclePositions[this.position].y * this.parentObject.radius * 2 -
            this.radius;
        return { x: x, y: y };
    }

    /* Override */
    mouseClicked(x, y) {
        if (this.animation.rotating == false && this.isWithin(x, y)) {
            this.rotate();
        }
    }

    /* Override */
    mouseMoved(x, y) {
        let canvas = document.getElementById('main-canvas');
        if (canvas.style.cursor != 'pointer' && this.isWithin(x, y)) {
            canvas.style.cursor = 'pointer';
        }
    }
}

const smallCircleSubImages = [[100, 0], [200, 0], [300, 0], [0, 100], [100, 100], [200, 100], [300, 100], [0, 200], [100, 200], [200, 200], [300, 200]];

class Sphere extends Circle {
    image = { src: imageSmallCircles, x: 0, y: 0 };
    style;

    constructor(position, style, rotation) {
        super(position, 50);
        this.image.x = smallCircleSubImages[style][0];
        this.image.y = smallCircleSubImages[style][1];
        this.style = style;
        this.rotation = rotation;
    }

    /* Override */
    getRelativePosition() {
        let x =
            smallCirclePositions[this.position].x * this.parentObject.radius * 2 -
            this.radius;
        let y =
            smallCirclePositions[this.position].y * this.parentObject.radius * 2 -
            this.radius;
        return { x: x, y: y };
    }

    /* Override */
    mouseClicked(x, y) {
        if (
            this.animation.rotating == false &&
            this.parentObject instanceof Board
        ) {
            if (this.isWithin(x, y)) {
                this.rotate();
            }
        }
    }

    /* Override */
    mouseMoved(x, y) {
        let canvas = document.getElementById('main-canvas');
        if (
            canvas.style.cursor != 'pointer' &&
            this.parentObject instanceof Board &&
            this.isWithin(x, y)
        ) {
            canvas.style.cursor = 'pointer';
        }
    }
}

const board = new Board();

var spheres = [];

const triangles = [
    new SwapButton(0),
    new SwapButton(1),
    new SwapButton(2),
    new SwapButton(3),
];

var solution;

function onLoad() {
    const params = new URL(window.location.href).searchParams;
    const puzzle = params.get('puzzle');
    if (puzzle) {
        fetch(`./puzzles/${puzzle}.json`)
            .then(response => response.json())
            .then(json => {
                loadPuzzleFromJson(puzzle, json);
            })
            .catch(error => {
                window.location.href = './';
            });
    } else {
        document.getElementById('intro').style.display = 'block';
    }
}

function loadFrontPage() {

}

function loadPuzzleFromJson(puzzle, json) {

    solution = json.solution;
    console.log(solution);

    /* Stops mouse clicks on canvas from selecting text on page. */
    document
        .getElementById('main-canvas')
        .addEventListener("mousedown", function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
    document
        .getElementById('main-canvas')
        .addEventListener("click", onClickCanvas);
    document
        .getElementById('main-canvas')
        .addEventListener('mousemove', onMouseMoveCanvas);

    loadImage(imageLargeCircles, `./assets/large-circles-${puzzle}.png`);
    loadImage(imageSmallCircles, './assets/small-circles.png');

    numberOfPlatforms = parseInt(json.platforms);

    if (numberOfPlatforms == 2) {
        largeCirclePositions[1] = largeCirclePositions[2];
        triangles[1] = triangles[2];
        trianglePositions[1] = trianglePositions[2];
        triangleVariations[1] = triangleVariations[2];
    }

    for (let i = 0; i < json.start.spheres.length - 1; i++) {
        let circle = json.start.spheres[i];
        spheres.push(new Sphere(i % 4, parseInt(parseInt(circle.style)), parseInt(circle.rotation)));
    }
    let circle = json.start.spheres[json.start.spheres.length - 1];
    spheres.push(new Sphere(4, parseInt(circle.style), parseInt(circle.rotation)));

    for (let i = 0; i < numberOfPlatforms; i++) {
        let newPlatform = new Platform(i, i * 300, 0);
        board.addChild(newPlatform);
        for (let j = 0; j < 4; j++) {
            newPlatform.image.src = imageLargeCircles;
            newPlatform.addChild(spheres[i * 4 + j]);
            newPlatform.swapButton = triangles[i];
            triangles[i].platform = newPlatform;
        }
    }

    board.addChild(spheres[spheres.length - 1]);

    for (let i = 0; i < numberOfPlatforms; i++) {
        board.addChild(triangles[i]);
    }

}

function loadImage(image, source) {
    image.src = source;
    image.addEventListener('load', function (event) {
        imageLoaded(this);
    });
}

function imageLoaded(image) {
    imagesLoaded.set(image, true);
    for (const value of imagesLoaded.values()) {
        if (value == false) {
            return;
        }
    }
    draw();
}

function draw() {
    const mainCanvas = document.getElementById('main-canvas');
    const ctx = mainCanvas.getContext('2d');
    ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    board.draw(ctx, 0, 0);
    requestAnimationFrame(draw);
}

function onClickCanvas(clickEvent) {
    let canvasRect = this.getBoundingClientRect();
    let scale = this.width / canvasRect.width;
    board.mouseClicked(
        clickEvent.offsetX * scale,
        clickEvent.offsetY * scale
    );
}

function onMouseMoveCanvas(moveEvent) {
    moveEvent.preventDefault();
    moveEvent.stopPropagation();
    mouseMoved = true;
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = mouseTimeout();
    let canvasRect = this.getBoundingClientRect();
    let scale = this.width / canvasRect.width;
    mouseX = moveEvent.offsetX * scale;
    mouseY = moveEvent.offsetY * scale;
    board.mouseMoved(moveEvent.offsetX * scale, moveEvent.offsetY * scale);
}

function mouseTimeout() {
    return setTimeout(() => { mouseMoved = false; }, 1000);
}

function isSolved() {

}

function exportPuzzle() {
    let exportPlatforms = board.children.slice(0, numberOfPlatforms + 1);
    let exportSpheres = [];
    for (const singlePlatform of exportPlatforms) {
        for (const childSphere of singlePlatform.children) {
            exportSpheres.push({ style: childSphere.style, rotation: childSphere.rotation });
        }
    }
    let centerSphere = board.children[numberOfPlatforms];
    exportSpheres.push({ style: centerSphere.style, rotation: centerSphere.rotation });
    let json = {
        platforms: numberOfPlatforms,
        start: {
            spheres: exportSpheres,
            platforms: exportPlatforms.slice(0, numberOfPlatforms).map(singlePlatform => { return { rotation: singlePlatform.rotation }; })
        }
    };
    console.log(JSON.stringify(json));
}