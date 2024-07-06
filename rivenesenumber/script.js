let currentSize = 256;
let centerOffset = 128;
let currentValue = 0;
class Digit {
    constructor(position) {
        this.position = position;
        this.level = Math.floor(this.position / 3);
    }
    draw(svgParent) {
        const svgDigitContainer = document.getElementById("digit-container").cloneNode(true);
        const svgDigit = svgDigitContainer.children.item(0);
        let relativePos = { x: 0, y: 0 };
        switch (this.position % 3) {
            case 0:
                svgDigit.setAttribute("transform", "rotate(-120 64 64)");
                relativePos = polToCar(52, 30);
                break;
            case 2:
                svgDigit.setAttribute("transform", "rotate(120 64 64)");
                relativePos = polToCar(52, 150);
                break;
            default:
                svgDigit.setAttribute("transform", "rotate(0 64 64)");
                relativePos = polToCar(52, -90);
                break;
        }
        relativePos.x *= this.level;
        relativePos.y *= -this.level;
        svgDigitContainer.setAttribute("x", `${(relativePos.x + centerOffset - 64)}`);
        svgDigitContainer.setAttribute("y", `${(relativePos.y + centerOffset - 64)}`);
        svgParent.append(svgDigitContainer);
    }
}
function onBodyLoad() {
    const inputField = document.getElementById("input-field");
    inputField.addEventListener("input", event => {
        currentValue = parseInt(inputField.value) ? parseInt(inputField.value) : 0;
        refresh();
    });
    const sizeField = document.getElementById("size-field");
    sizeField.addEventListener("input", event => {
        currentSize = parseInt(sizeField.value) && parseInt(sizeField.value) >= 192 ? parseInt(sizeField.value) : 192;
        centerOffset = currentSize / 2;
        document.getElementById("svgMain").setAttribute("viewBox", `0 0 ${currentSize} ${currentSize}`);
        refresh();
    });
    refresh();
}
function refresh() {
    const svgMain = document.getElementById("svgMain");
    svgMain.innerHTML = "";
    drawCenterCircle(svgMain);
    const digits = [];
    const levels = Math.ceil(currentValue / 6);
    switch (currentValue % 6) {
        case 1:
            for (let i = 0; i < Math.ceil(currentValue / 6) * 3; i += 3) {
                digits.push(new Digit(i));
            }
            break;
        case 2:
            for (let i = 1; i < (Math.ceil(currentValue / 6) * 3) + 1; i += 3) {
                digits.push(new Digit(i));
            }
            break;
        case 3:
            for (let i = 2; i < (Math.ceil(currentValue / 6) * 3) + 2; i += 3) {
                digits.push(new Digit(i));
            }
            break;
        case 4:
            for (let i = 0; i < Math.ceil(currentValue / 6) * 3; i += 3) {
                digits.push(new Digit(i));
            }
            for (let i = 1; i < (Math.ceil(currentValue / 6) * 3) + 1; i += 3) {
                digits.push(new Digit(i));
            }
            break;
        case 5:
            for (let i = 1; i < (Math.ceil(currentValue / 6) * 3) + 1; i += 3) {
                digits.push(new Digit(i));
            }
            for (let i = 2; i < (Math.ceil(currentValue / 6) * 3) + 2; i += 3) {
                digits.push(new Digit(i));
            }
            break;
        default:
            if (currentValue != 0) {
                for (let i = 2; i < (Math.ceil(currentValue / 6) * 3) + 2; i += 3) {
                    digits.push(new Digit(i));
                }
                for (let i = 0; i < Math.ceil(currentValue / 6) * 3; i += 3) {
                    digits.push(new Digit(i));
                }
            }
            break;
    }
    for (let i = 0; i < digits.length; i++) {
        digits[i].draw(svgMain);
    }
}
function drawCenterCircle(svgParent) {
    const svgCircleContainer = document.getElementById("circle-container").cloneNode(true);
    svgCircleContainer.setAttribute("x", (centerOffset - 64).toString());
    svgCircleContainer.setAttribute("y", (centerOffset - 64).toString());
    svgParent.append(svgCircleContainer);
}
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
function polToCar(radius, angle, isRadians = false) {
    if (!isRadians) {
        angle *= Math.PI / 180;
    }
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x: x, y: y };
}
function saveImage() {
    const svgMain = document.getElementById("svgMain");
    var canvas = document.createElement('CANVAS');
    var svgWidth = parseInt(svgMain.getAttribute('width'));
    var realWidth = Math.sqrt(Math.pow(svgWidth, 2) * 2);
    canvas.width = canvas.height = realWidth + 10;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.innerHTML = svgMain.innerHTML;
    svg.setAttribute('width', svgWidth.toString());
    svg.setAttribute('height', svgWidth.toString());
    var ctx = canvas.getContext('2d');
    var data = (new XMLSerializer()).serializeToString(svg);
    var img = new Image();
    var svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    var url = URL.createObjectURL(svgBlob);
    var imgURI;
    img.onload = function () {
        ctx.fillStyle = "#FFFFFF";
        ctx.lineWidth = 4;
        ctx.fillRect((canvas.width - svgWidth) / 2, (canvas.height - svgWidth) / 2, svgWidth, svgWidth);
        ctx.drawImage(img, (canvas.width - svgWidth) / 2, (canvas.height - svgWidth) / 2);
        ctx.strokeRect((canvas.width - svgWidth) / 2, (canvas.height - svgWidth) / 2, svgWidth, svgWidth);
        URL.revokeObjectURL(url);
        imgURI = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
        var link = document.createElement('a');
        link.download = 'villein.png';
        link.href = imgURI;
        link.click();
    };
    img.src = url;
}
function clearFields() {
    document.getElementById("input-field").value = "0";
    currentValue = 0;
    document.getElementById("size-field").value = "256";
    currentSize = 256;
    centerOffset = currentSize / 2;
    document.getElementById("svgMain").setAttribute("viewBox", `0 0 ${currentSize} ${currentSize}`);
    refresh();
}
//# sourceMappingURL=script.js.map