class PieceTemplate {
    constructor(shape, border, fill) {
        this.shape = shape;
        this.border = border;
        this.fill = fill;
    }
}
class Square {
    constructor(x, y, border, fill) {
        this.x = x;
        this.y = y;
        this.border = border;
        this.fill = fill;
    }
    draw(x, y, waiting = false) {
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const svgBorder = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        svgBorder.setAttribute("width", squareSize.toString());
        svgBorder.setAttribute("height", squareSize.toString());
        svgBorder.setAttribute("x", (x + (this.x * squareSize)).toString());
        svgBorder.setAttribute("y", (y + (this.y * squareSize)).toString());
        svgBorder.setAttribute("fill", this.border);
        const svgFill = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        svgFill.setAttribute("width", (squareSize - 2).toString());
        svgFill.setAttribute("height", (squareSize - 2).toString());
        svgFill.setAttribute("x", (x + (this.x * squareSize) + 1).toString());
        svgFill.setAttribute("y", (y + (this.y * squareSize) + 1).toString());
        svgFill.setAttribute("fill", this.fill);
        svgBorder.append(svgFill);
        this.svgElement.append(svgBorder, svgFill);
        if (waiting) {
            svgInfo.append(this.svgElement);
        }
        else {
            svgMain.append(this.svgElement);
        }
    }
    canMove(x, y) {
        const newX = this.x + x;
        const newY = this.y + y;
        const newSpaceOccupied = board[newY] && board[newY][newX];
        const leftWallCrossed = newX < 0;
        const rightWallCrossed = newX >= boardSize.x;
        const ceilingCrossed = newY < 0;
        const floorCrossed = newY >= boardSize.y;
        return !newSpaceOccupied && !leftWallCrossed && !rightWallCrossed && !ceilingCrossed && !floorCrossed;
    }
    move(x, y) {
        if (this.canMove(x, y)) {
            this.x += x;
            this.y += y;
        }
    }
}
class PieceInPlay {
    constructor(template, waiting = false) {
        this.squares = [];
        this.shadowSquares = [];
        this.template = template;
        this.border = template.border;
        this.fill = template.fill;
        this.waiting = waiting;
        for (let i = 0; i < template.shape.length; i++) {
            for (let j = 0; j < template.shape[i].length; j++) {
                if (template.shape[i][j]) {
                    this.squares.push(new Square(j, i, this.border, this.fill));
                }
            }
        }
    }
    draw(x, y) {
        if (!this.waiting) {
            this.drawShadow();
        }
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].draw(x, y, this.waiting);
        }
    }
    drawShadow() {
        for (let i = 0; i < this.shadowSquares.length; i++) {
            this.shadowSquares[i].svgElement.remove();
        }
        this.shadowSquares = [];
        let yOffset = 1;
        while (this.canMove(0, yOffset)) {
            yOffset++;
        }
        yOffset--;
        for (let i = 0; i < this.squares.length; i++) {
            this.shadowSquares.push(new Square(this.squares[i].x, this.squares[i].y + yOffset, "#A0A0A0", "#A0A0A0"));
        }
        for (let i = 0; i < this.shadowSquares.length; i++) {
            this.shadowSquares[i].draw(0, 0);
        }
    }
    canMove(x, y) {
        for (let i = 0; i < this.squares.length; i++) {
            const currentSquare = this.squares[i];
            if (!currentSquare.canMove(x, y)) {
                return false;
            }
        }
        return true;
    }
    move(x, y) {
        let canMove = this.canMove(x, y);
        if (canMove) {
            for (let i = 0; i < this.squares.length; i++) {
                const currentSquare = this.squares[i];
                currentSquare.move(x, y);
            }
        }
    }
    drop() {
        let yOffset = 1;
        while (this.canMove(0, yOffset)) {
            yOffset++;
        }
        yOffset--;
        this.move(0, yOffset);
    }
    convert() {
        for (let i = 0; i < this.squares.length; i++) {
            const currentSquare = this.squares[i];
            if (board[currentSquare.y][currentSquare.x]) {
                return false;
            }
            board[currentSquare.y][currentSquare.x] = currentSquare;
        }
        return true;
    }
    rotate() {
        const offsetX = Math.min(...this.squares.map(square => square.x));
        const offsetY = Math.min(...this.squares.map(square => square.y));
        const output = this.rotate2DArray(this.template.shape);
        const newSquares = [];
        for (let i = 0; i < output.length; i++) {
            for (let j = 0; j < output[i].length; j++) {
                if (output[i][j]) {
                    newSquares.push(new Square(offsetX + j, offsetY + i, this.border, this.fill));
                }
            }
        }
        let minX = Math.min(...newSquares.map(square => square.x));
        let maxX = Math.max(...newSquares.map(square => square.x));
        let minY = Math.min(...newSquares.map(square => square.y));
        let maxY = Math.max(...newSquares.map(square => square.y));
        let moveX = 0;
        let moveY = 0;
        if (minX < 0) {
            moveX = -minX;
        }
        else if (maxX >= boardSize.x) {
            moveX = boardSize.x - 1 - maxX;
        }
        if (minY < 0) {
            moveY = -minY;
        }
        else if (maxY >= boardSize.y) {
            moveY = boardSize.y - 1 - maxY;
        }
        for (let square of newSquares) {
            square.x += moveX;
            square.y += moveY;
        }
        const isValid = newSquares.every(square => {
            const x = square.x;
            const y = square.y;
            return x >= 0 && x < boardSize.x && y >= 0 && y < boardSize.y && (!board[y] || !board[y][x]);
        });
        if (isValid) {
            this.template = new PieceTemplate(output, this.border, this.fill);
            this.squares = newSquares;
        }
    }
    rotate2DArray(array) {
        const result = [];
        array.forEach(function (a, i, aa) {
            a.forEach(function (b, j, bb) {
                result[j] = result[j] || [];
                result[j][aa.length - i - 1] = b;
            });
        });
        return result;
    }
}
const red = ["#961b12", "#ff695e"];
const green = ["#10691e", "#bdffc8"];
const orange = ["#db8700", "#ffd99c"];
const blue = ["#0058bd", "#7dbaff"];
const violet = ["#6800b3", "#dba8ff"];
const yellow = ["#d6cf00", "#fffcb0"];
const colorCombos = [red, green, orange, blue, violet, yellow];
const randomIndices = [];
while (randomIndices.length < colorCombos.length) {
    var random = Math.floor(Math.random() * colorCombos.length);
    if (randomIndices.indexOf(random) === -1 && random < colorCombos.length) {
        randomIndices.push(random);
    }
}
const templatePrison = new PieceTemplate([[true]], colorCombos[randomIndices[0]][0], colorCombos[randomIndices[0]][1]);
const templateBoiler = new PieceTemplate([[true, true], [true, true]], colorCombos[randomIndices[1]][0], colorCombos[randomIndices[1]][1]);
const templateTemple = new PieceTemplate([[true, true, false], [true, true, true]], colorCombos[randomIndices[2]][0], colorCombos[randomIndices[2]][1]);
const templateSurvey = new PieceTemplate([[true, false], [true, false], [true, true]], colorCombos[randomIndices[3]][0], colorCombos[randomIndices[3]][1]);
const templateJungle = new PieceTemplate([[true, true, true, true], [true, true, true, true], [false, true, true, true]], colorCombos[randomIndices[4]][0], colorCombos[randomIndices[4]][1]);
const templateStraight = new PieceTemplate([[true, true, true, true, true]], colorCombos[randomIndices[5]][0], colorCombos[randomIndices[5]][1]);
const allTemplates = [templatePrison, templateBoiler, templateTemple, templateSurvey, templateJungle, templateStraight];
const squareSize = 8;
const boardSize = { x: 10, y: 23 };
const infoSize = { x: 5, y: 4 };
const board = [];
for (let i = 0; i < boardSize.y; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize.x; j++) {
        board[i][j] = undefined;
    }
}
let svgMain;
let svgInfo;
let tickTime = 1000;
let tickTimer = setInterval(tick, tickTime);
let pieceInPlay;
let pieceInWaiting;
let okayToAddPiece = true;
let isGameOver = false;
let isPaused = false;
let score = 0;
let level = 0;
let linesCleared = 0;
function onBodyLoad() {
    setBoardProperties();
    addEventListeners();
}
function setBoardProperties() {
    svgMain = document.getElementById("svg-main");
    svgMain.setAttribute("viewBox", `0 0 ${boardSize.x * squareSize} ${boardSize.y * squareSize}`);
    svgMain.style.maxWidth = "256px";
    svgMain.style.width = "100%";
    svgInfo = document.getElementById("svg-info");
    svgInfo.setAttribute("viewBox", `0 0 ${infoSize.x * squareSize} ${infoSize.y * squareSize}`);
    svgInfo.style.maxWidth = "128px";
    svgInfo.style.width = "100%";
    addPieceToWaiting();
}
function addPieceToWaiting() {
    const randomPiece = allTemplates[Math.floor(Math.random() * allTemplates.length)];
    const foo = new PieceInPlay(randomPiece, true);
    pieceInWaiting = foo;
}
function addPieceToBoard() {
    pieceInPlay = pieceInWaiting;
    pieceInPlay.waiting = false;
    addPieceToWaiting();
    okayToAddPiece = false;
}
function convertPiece(piece) {
    const continueGame = piece.convert();
    if (continueGame) {
        pieceInPlay = undefined;
        okayToAddPiece = true;
    }
    piece.draw(0, 0);
    return continueGame;
}
function clearLines() {
    let currentLinesCleared = 0;
    let fullLine = scanForFullLines();
    while (fullLine >= 0) {
        currentLinesCleared += 1;
        for (let i = fullLine; i > 0; i--) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i - 1][j]) {
                    board[i][j] = board[i - 1][j];
                    board[i][j].y += 1;
                }
                else {
                    board[i][j] = undefined;
                }
            }
        }
        for (let j = 0; j < board[0].length; j++) {
            board[0][j] = undefined;
        }
        fullLine = scanForFullLines();
    }
    addToScore(currentLinesCleared == 5 ? currentLinesCleared * 125 : currentLinesCleared * 5);
    increaseLinesCleared(currentLinesCleared);
}
function addToScore(points) {
    score += points;
    document.getElementById("score-value").innerHTML = score.toString();
}
function increaseLinesCleared(lines) {
    linesCleared += lines;
    level = Math.floor(linesCleared / 5) + 1;
    document.getElementById("level-value").innerHTML = level.toString();
    let tickTime = 1050 - (50 * level);
    clearInterval(tickTimer);
    tickTimer = setInterval(tick, tickTime);
}
function scanForFullLines() {
    for (let i = 0; i < board.length; i++) {
        let complete = true;
        for (let j = 0; j < board[i].length; j++) {
            if (!board[i][j]) {
                complete = false;
                break;
            }
        }
        if (complete) {
            return i;
        }
    }
    return -1;
}
function doGameOver() {
    clearInterval(tickTimer);
    const gameOverSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const gameOverBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    gameOverBg.setAttribute("width", "100%");
    gameOverBg.setAttribute("height", "100%");
    gameOverBg.setAttribute("x", "0");
    gameOverBg.setAttribute("y", "0");
    gameOverBg.setAttribute("fill", "#FFFFFF");
    gameOverBg.setAttribute("fill-opacity", "75%");
    const gameOverText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    gameOverText.setAttribute("x", "50%");
    gameOverText.setAttribute("y", "50%");
    gameOverText.setAttribute("text-anchor", "middle");
    gameOverText.classList.add("overlay-text");
    gameOverText.innerHTML = "Game Over";
    gameOverSvg.append(gameOverBg, gameOverText);
    svgMain.append(gameOverSvg);
}
function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        doPause();
    }
    else {
        undoPause();
    }
}
function doPause() {
    clearInterval(tickTimer);
    const pauseSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    pauseSvg.id = "pause-svg";
    const pauseBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    pauseBg.setAttribute("width", "100%");
    pauseBg.setAttribute("height", "100%");
    pauseBg.setAttribute("x", "0");
    pauseBg.setAttribute("y", "0");
    pauseBg.setAttribute("fill", "#FFFFFF");
    pauseBg.setAttribute("fill-opacity", "100%");
    const pauseText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    pauseText.setAttribute("x", "50%");
    pauseText.setAttribute("y", "50%");
    pauseText.setAttribute("text-anchor", "middle");
    pauseText.classList.add("overlay-text");
    pauseText.innerHTML = "Paused";
    pauseSvg.append(pauseBg, pauseText);
    svgMain.append(pauseSvg);
}
function undoPause() {
    document.getElementById("pause-svg").remove();
    tickTimer = setInterval(tick, tickTime);
}
function tick() {
    let isGameOver = false;
    svgMain.innerHTML = "";
    svgInfo.innerHTML = "";
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] != undefined) {
                board[i][j].draw(0, 0);
            }
        }
    }
    if (!isPaused) {
        if (pieceInPlay) {
            if (pieceInPlay.canMove(0, 1)) {
                pieceInPlay.move(0, 1);
            }
            else {
                isGameOver = !convertPiece(pieceInPlay);
                clearLines();
                if (!isGameOver) {
                    tick();
                    return;
                }
            }
        }
        if (okayToAddPiece) {
            addPieceToBoard();
        }
    }
    pieceInWaiting.draw(0, 0);
    if (pieceInPlay) {
        pieceInPlay.draw(0, 0);
    }
    if (isGameOver) {
        doGameOver();
    }
}
function addEventListeners() {
    const pauseButton = document.getElementById("pause-button");
    pauseButton.addEventListener("click", (event) => {
        pauseButton.blur();
        event.stopPropagation();
    });
    document.addEventListener("keydown", event => {
        if (!isGameOver && pieceInPlay) {
            if (event.code == "ArrowLeft" || event.code == "KeyA") {
                movePieceLeft();
            }
            else if (event.code == "ArrowRight" || event.code == "KeyD") {
                movePieceRight();
            }
            else if (event.code == "ArrowDown" || event.code == "KeyS") {
                movePieceDown();
            }
            else if (event.code == "ArrowUp" || event.code == "KeyW") {
                rotatePiece();
            }
            else if (event.code == "Space") {
                dropPiece();
            }
            else if (event.code == "Escape") {
                togglePause();
            }
        }
    });
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let moving = false;
    let moveInterval;
    document.addEventListener("touchstart", event => {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        moving = true;
        movePieceContinuously();
    });
    document.addEventListener("touchmove", event => {
        touchEndX = event.touches[0].clientX;
        touchEndY = event.touches[0].clientY;
    });
    document.addEventListener("touchend", event => {
        moving = false;
        if (moveInterval !== undefined) {
            clearInterval(moveInterval);
            moveInterval = undefined;
        }
        handleTouchGesture();
    });
    document.addEventListener("click", event => {
        if (!isGameOver && pieceInPlay) {
            rotatePiece();
        }
    });
    function handleTouchGesture() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 50) {
                movePieceRight();
            }
            else if (deltaX < -50) {
                movePieceLeft();
            }
        }
        else {
            if (deltaY < -100) {
                dropPiece();
            }
        }
    }
    function movePieceContinuously() {
        moveInterval = setInterval(() => {
            if (moving && !isGameOver && pieceInPlay) {
                const deltaX = touchEndX - touchStartX;
                if (deltaX > 50) {
                    movePieceRight();
                    touchStartX = touchEndX;
                }
                else if (deltaX < -50) {
                    movePieceLeft();
                    touchStartX = touchEndX;
                }
            }
        }, 100);
    }
    function movePieceLeft() {
        if (pieceInPlay.canMove(-1, 0)) {
            pieceInPlay.move(-1, 0);
            redrawPieceInPlay();
        }
    }
    function movePieceRight() {
        if (pieceInPlay.canMove(1, 0)) {
            pieceInPlay.move(1, 0);
            redrawPieceInPlay();
        }
    }
    function movePieceDown() {
        if (pieceInPlay.canMove(0, 1)) {
            pieceInPlay.move(0, 1);
            redrawPieceInPlay();
        }
    }
    function dropPiece() {
        if (pieceInPlay.canMove(0, 1)) {
            pieceInPlay.drop();
            redrawPieceInPlay();
        }
    }
    function rotatePiece() {
        for (let i = 0; i < pieceInPlay.squares.length; i++) {
            pieceInPlay.squares[i].svgElement.remove();
        }
        pieceInPlay.rotate();
        pieceInPlay.draw(0, 0);
    }
    function redrawPieceInPlay() {
        for (let i = 0; i < pieceInPlay.squares.length; i++) {
            pieceInPlay.squares[i].svgElement.remove();
        }
        pieceInPlay.draw(0, 0);
    }
}
//# sourceMappingURL=script.js.map