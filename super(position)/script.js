const imageBoard = new Image();
const imageLargeCircle = new Image();
const imageSmallCircle = new Image();

var imagesLoaded = new Map([
    [imageBoard, false],
    [imageLargeCircle, false],
    [imageSmallCircle, false]
]);

const circlePositions = [
    { x: 1 / 2, y: 1 / 5 },
    { x: 4 / 5, y: 1 / 2 },
    { x: 1 / 2, y: 4 / 5 },
    { x: 1 / 5, y: 1 / 2 },
    { x: 1 / 2, y: 1 / 2 },
];

const trianglePositions = [
    { x: 1 / 2, y: 73 / 180 },
    { x: 107 / 180, y: 1 / 2 },
    { x: 1 / 2, y: 107 / 180 },
    { x: 73 / 180, y: 1 / 2 },
];

let mouseX = 0;
let mouseY = 0;

class Triangle {
    canvas;
    position;
    rotation;
    dimensions;
    path = new Path2D();

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
        const variations = [[[-40, -20], [0, 20], [40, -20]], [[20, -40], [-20, 0], [20, 40]], [[-40, 20], [0, -20], [40, 20]], [[-20, -40], [20, 0], [-20, 40]]];
        let points = variations[this.rotation];
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
        //localContext.drawImage(imageTriangle, 0, 0);
        if (!this.isWithin(Math.floor(mouseX), Math.floor(mouseY))) {
            localContext.globalAlpha = 0.75;
        }
        localContext.fillStyle = '#db4242';
        localContext.strokeStyle = '#542828';
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
            const centerCircle = outerCircle.children[4];
            const swapPos = (this.position + 2) % 4;
            const childCircle = largeCircles[this.position].children[(swapPos - largeCircles[this.position].rotation + 4) % 4];
            largeCircles[this.position].children[(swapPos - largeCircles[this.position].rotation + 4) % 4] = centerCircle;
            centerCircle.position = childCircle.position;
            centerCircle.rotation = (centerCircle.rotation - largeCircles[this.position].rotation + 4) % 4;
            centerCircle.parentObject = largeCircles[this.position];
            childCircle.position = 4;
            childCircle.rotation = (childCircle.rotation + largeCircles[this.position].rotation) % 4;
            outerCircle.setChild(4, childCircle);
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
        let x =
            circlePositions[this.position].x * this.parentObject.radius * 2 -
            this.radius;
        let y =
            circlePositions[this.position].y * this.parentObject.radius * 2 -
            this.radius;
        return { x: x, y: y };
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
            partial = (Date.now() - this.animation.startTime) / 100;
            if (partial >= 1) {
                partial = 0;
                this.animation.rotating = false;
                this.rotation = (this.rotation + 1) % 4;
            }
        }
        let localContext = this.canvas.getContext("2d");
        localContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        localContext.save();
        localContext.translate(this.radius, this.radius);
        if (this.parentObject instanceof Board && !this.isWithin(Math.floor(mouseX), Math.floor(mouseY))) {
            localContext.globalAlpha = 0.75;
        }
        localContext.rotate(((this.rotation + partial) * Math.PI) / 2);
        localContext.translate(-this.radius, -this.radius);
        localContext.drawImage(this.image, 0, 0);
        let pos = this.getRelativePosition();
        for (const child of this.children) {
            child.draw(localContext);
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
        this.animation.startTime = Date.now();
    }

}

class Board extends Circle {
    image = imageBoard;

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
        ctx.drawImage(this.image, 0, 0);
        for (const child of this.children) {
            child.draw(ctx);
        }
    }

    /* Override */
    mouseMoved(x, y) {
        let canvas = document.getElementById("main-canvas");
        if (canvas.style.cursor != "default" && this.isWithin(x, y)) {
            canvas.style.cursor = "default";
        }
        super.mouseMoved(x, y);
    }
}

class LargeCircle extends Circle {
    image = imageLargeCircle;

    constructor(position) {
        super(position, 150);
    }

    /* Override */
    mouseClicked(x, y) {
        if (this.animation.rotating == false && this.isWithin(x, y)) {
            this.rotate();
        }
    }

    /* Override */
    mouseMoved(x, y) {
        let canvas = document.getElementById("main-canvas");
        if (canvas.style.cursor != "pointer" && this.isWithin(x, y)) {
            canvas.style.cursor = "pointer";
        }
    }
}

class SmallCircle extends Circle {
    image = imageSmallCircle;

    constructor(position) {
        super(position, 50);
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
        let canvas = document.getElementById("main-canvas");
        if (
            canvas.style.cursor != "pointer" &&
            this.parentObject instanceof Board &&
            this.isWithin(x, y)
        ) {
            canvas.style.cursor = "pointer";
        }
    }
}

const outerCircle = new Board();

const largeCircles = [
    new LargeCircle(0),
    new LargeCircle(1),
    new LargeCircle(2),
    new LargeCircle(3),
];

const smallCircles = [
    new SmallCircle(0),
    new SmallCircle(1),
    new SmallCircle(2),
    new SmallCircle(3),
    new SmallCircle(0),
    new SmallCircle(1),
    new SmallCircle(2),
    new SmallCircle(3),
    new SmallCircle(0),
    new SmallCircle(1),
    new SmallCircle(2),
    new SmallCircle(3),
    new SmallCircle(0),
    new SmallCircle(1),
    new SmallCircle(2),
    new SmallCircle(3),
    new SmallCircle(4),
];

const triangles = [
    new Triangle(0),
    new Triangle(1),
    new Triangle(2),
    new Triangle(3),
];

function onLoad() {
    for (let i = 0; i < 4; i++) {
        outerCircle.addChild(largeCircles[i]);
        for (let j = 0; j < 4; j++) {
            largeCircles[i].addChild(smallCircles[i * 4 + j]);
        }
    }

    outerCircle.addChild(smallCircles[16]);

    for (let i = 0; i < 4; i++) {
        outerCircle.addChild(triangles[i]);
    }

    document
        .getElementById("main-canvas")
        .addEventListener("click", onClickCanvas);
    document
        .getElementById("main-canvas")
        .addEventListener("mousemove", onMouseMoveCanvas);

    loadImage(imageBoard, "./assets/outer-circle.png");
    loadImage(imageLargeCircle, "./assets/large-circle.png");
    loadImage(imageSmallCircle, "./assets/small-circle.png");
}

function loadImage(image, source) {
    image.src = source;
    image.addEventListener("load", function (event) {
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
    const mainCanvas = document.getElementById("main-canvas");
    const ctx = mainCanvas.getContext("2d");
    ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    outerCircle.draw(ctx, 0, 0);
    requestAnimationFrame(draw);
}

function onClickCanvas(clickEvent) {
    let canvasRect = this.getBoundingClientRect();
    let scale = this.width / canvasRect.width;
    outerCircle.mouseClicked(
        clickEvent.offsetX * scale,
        clickEvent.offsetY * scale
    );
}

function onMouseMoveCanvas(moveEvent) {
    moveEvent.preventDefault();
    moveEvent.stopPropagation();
    let canvasRect = this.getBoundingClientRect();
    let scale = this.width / canvasRect.width;
    mouseX = moveEvent.offsetX * scale;
    mouseY = moveEvent.offsetY * scale;
    outerCircle.mouseMoved(moveEvent.offsetX * scale, moveEvent.offsetY * scale);
}