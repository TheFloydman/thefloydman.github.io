const imageBoard = new Image();
const imageLargeCircle = new Image();
const imageSmallCircle = new Image();
const imageTriangle = new Image();

var imagesLoaded = new Map([
    [imageBoard, false],
    [imageLargeCircle, false],
    [imageSmallCircle, false],
    [imageTriangle, false],
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

class Triangle {
    canvas;
    position;
    rotation;

    constructor(position) {
        this.position = position;
        this.canvas = new OffscreenCanvas(40, 40);
    }

    draw(ctx) {
        let localContext = this.canvas.getContext("2d");
        localContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        localContext.save();
        localContext.translate(20, 20);
        localContext.rotate(((this.rotation + 2) * Math.PI) / 2);
        localContext.translate(-20, -20);
        localContext.drawImage(imageTriangle, 0, 0);
        let pos = this.getRelativePosition();
        localContext.restore();
        ctx.drawImage(this.canvas, Math.floor(pos.x), Math.floor(pos.y));
    }

    getRelativePosition() {
        let x =
            trianglePositions[this.position].x * this.parentObject.radius * 2 - 20;
        let y =
            trianglePositions[this.position].y * this.parentObject.radius * 2 - 20;
        return { x: x, y: y };
    }

    isWithin(x, y) { }

    mouseClicked(x, y) { }

    mouseMoved(x, y) { }
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

const swapCircle = new SmallCircle(-1);

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
        triangles[i].rotation = i;
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
    loadImage(imageTriangle, "./assets/triangle.png");
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
    outerCircle.mouseMoved(moveEvent.offsetX * scale, moveEvent.offsetY * scale);
}