var currentSize;
var currentNumber;
var circleArray;
var layers;
var layerMap;
var posMap;
var totalDigits;
var connecting = false;
var startCoords = [-100, 0];
var endCoords = [-90, 0];
var connection;
var startCircle;
var spacing;
var digitMap;
var connectionArray;
var circleSize;
var svgMain;

function onPageLoad() {
  document.getElementById("sizeField").addEventListener("change", textFieldChanged);
  document.getElementById("layersField").addEventListener("change", textFieldChanged);
  document.getElementById("inputField").addEventListener("change", arabicToVillein);
  document.getElementById("svgMain").addEventListener("mousemove", mouseMoved);
  textFieldChanged();
}

function textFieldChanged() {

  var newSize = document.getElementById("sizeField").value;
  if (newSize < 1) {
    newSize = 1;
    document.getElementById("sizeField").value = 1;
  }
  currentSize = newSize;

  var div = document.getElementById("divSvg");
  div.style.height = div.style.width = (Math.floor(Math.sqrt(Math.pow(newSize, 2) * 2)) - ((Math.floor(Math.sqrt(Math.pow(newSize, 2) * 2)) - newSize) / 2) + 4) + "px";
  div.style.paddingTop = div.style.paddingLeft = ((Math.floor(Math.sqrt(Math.pow(newSize, 2) * 2)) - newSize) / 2) + "px";
  div.style.paddingRight = div.style.paddingBottom = -div.style.paddingTop;

  svgMain = document.getElementById("svgMain");
  svgMain.innerHTML = "";
  svgMain.setAttribute("width", currentSize)
  svgMain.setAttribute("height", currentSize);

  layers = document.getElementById("layersField").value;
  if (layers < 1) {
    layers = 1;
    document.getElementById("layersField").value = 1;
  }

  circleSize = currentSize / (layers * 5);
  var layersLeft = layers;
  layerMap = [];
  totalDigits = 1;
  while (layersLeft > 0) {
    var digitsInLayer = (layersLeft - 1) * 4;
    totalDigits += digitsInLayer;
    while (digitsInLayer > 0) {
      layerMap.push(layersLeft - 1);
      digitsInLayer--;
    }
    layersLeft--;
  }
  layerMap.push(0);
  layerMap = layerMap.reverse();
  generatePosMap();
  digitMap = new Map();
  circleArray = [];
  connectionArray = [];
  for (var i = 0; i < totalDigits; i++) {
    digitMap.set(placeToCoords(i, currentSize).toString(), new Digit(i));
  }

  var inputField = document.getElementById("inputField");
  var max = Math.pow(4, totalDigits) - 1;
  inputField.setAttribute("max", max);
  var newNumber = inputField.value;
  currentNumber = newNumber;

  spacing = currentSize / (layers * 2);
  connecting = false;
  startCoords = [-100, 0];
  endCoords = [-90, 0];

  generate();
}

function generate() {
  var svgMain = document.getElementById("svgMain");
  svgMain.innerHTML = "";

  if (!svgMain.contains(document.getElementById("connectionLine"))) {
    connection = document.createElementNS("http://www.w3.org/2000/svg", "line");
  }
  connection.setAttribute("id", "connectionLine");
  connection.setAttribute("x1", startCoords[0]);
  connection.setAttribute("y1", startCoords[1]);
  connection.setAttribute("x2", endCoords[0]);
  connection.setAttribute("y2", endCoords[1]);
  connection.setAttribute("stroke", "red");
  connection.setAttribute("stroke-width", circleSize / 2);
  svgMain.appendChild(connection);

  var iterator = digitMap.values();
  var done = false
  while (done == false) {
    var next = iterator.next();
    if (next.done == true) {
      done = true;
      break;
    }
    drawDigit(svgMain, next.value);
  }

  for (var i = 0; i < connectionArray.length; i++) {
    drawConnection(svgMain, connectionArray[i]);
  }

  for (var i = 0; i < circleArray.length; i++) {
    drawCircle(svgMain, circleArray[i]);
  }

}

function drawCircle(svg, circle) {
  var element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  element.setAttribute("cx", circle.x);
  element.setAttribute("cy", circle.y);
  element.setAttribute("r", circle.r);
  element.setAttribute("fill", circle.fill);
  element.setAttribute("type", circle.type);
  element.addEventListener("click", function() {
    digitClicked(circle);
  });
  svg.appendChild(element);
}

function drawDigit(svg, digit) {
  var coords = placeToCoords(digit.place, currentSize);
  var fill = "black";
  var circle = [new Circle(coords[0], coords[1], circleSize, fill, "digit"),
    new Circle(coords[0], coords[1] - spacing, circleSize, fill, "circle"),
    new Circle(coords[0] + spacing, coords[1], circleSize, fill, "circle"),
    new Circle(coords[0], coords[1] + spacing, circleSize, fill, "circle"),
    new Circle(coords[0] - spacing, coords[1], circleSize, fill, "circle")
  ];
  for (var i = 0; i < circle.length; i++) {
    var hasCircle = false;
    for (var j = 0; j < circleArray.length; j++) {
      if (circleArray[j].x == circle[i].x && circleArray[j].y == circle[i].y) {
        hasCircle = true;
      }
    }
    if (!hasCircle) {
      circleArray.push(circle[i]);
    }
  }

  var coords = [];
  if (digit.up) {
    coords = [circle[0].x, circle[0].y, circle[0].x, circle[0].y - spacing];
    if (indexOfArrayInArray(connectionArray, coords) < 0) connectionArray.push(coords);
  }
  if (digit.right) {
    coords = [circle[0].x, circle[0].y, circle[0].x + spacing, circle[0].y];
    if (indexOfArrayInArray(connectionArray, coords) < 0) connectionArray.push(coords);
  }
  if (digit.down) {
    coords = [circle[0].x, circle[0].y, circle[0].x, circle[0].y + spacing];
    if (indexOfArrayInArray(connectionArray, coords) < 0) connectionArray.push(coords);
  }
  if (digit.left) {
    coords = [circle[0].x, circle[0].y, circle[0].x - spacing, circle[0].y];
    if (indexOfArrayInArray(connectionArray, coords) < 0) connectionArray.push(coords);
  }
}

function drawConnection(svg, coords) {
  var x1 = coords[0];
  var y1 = coords[1];
  var x2 = coords[2];
  var y2 = coords[3];
  var element = document.createElementNS("http://www.w3.org/2000/svg", "path");
  if (x1 == x2) {
    element.setAttribute("d", "M " + (x1 - circleSize) + " " + y1 + " Q " + (x2 - circleSize + (circleSize / 2)) + " " + ((y2 + y1) / 2) + " " + (x2 - circleSize) + " " + y2 + " L " + (x2 + circleSize) + " " + y2 + " Q " + (x2 + circleSize - (circleSize / 2)) + " " + ((y2 + y1) / 2) + " " + (x1 + circleSize) + " " + y1);
  } else {
    element.setAttribute("d", "M " + x1 + " " + (y1 - circleSize) + " Q " + ((x1 + x2) / 2) + " " + (y2 - circleSize + (circleSize / 2)) + " " + x2 + " " + (y2 - circleSize) + " L " + x2 + " " + (y2 + circleSize) + " Q " + ((x2 + x1) / 2) + " " + (y2 + circleSize - (circleSize / 2)) + " " + x1 + " " + (y1 + circleSize));
  }
  element.setAttribute("fill", "black");
  element.setAttribute("stroke", "none");
  element.setAttribute("stroke-width", 0);
  element.setAttribute("id", coords);
  svg.appendChild(element);
}

function placeToCoords(place, size) {
  return [(size / 2) + ((size / (layers * 2)) * posMap[place].x),
    (size / 2) + ((size / (layers * 2)) * posMap[place].y)
  ];
}

function generatePosMap() {
  posMap = [];
  var currentPos = [0, 0];
  var currentLayer = 0;
  var i = 0;
  while (i < totalDigits) {
    if (i == 0) {
      posMap.push(new DigitPos(0, 0));
      i++;
    }
    if (currentLayer != layerMap[i]) {
      currentLayer++;
      currentPos[0] -= 1;
      currentPos[1] -= 1;
    }
    while (currentPos[1] <= layerMap[i] && currentPos[1] >= -layerMap[i]) {
      posMap.push(new DigitPos(currentPos[0], currentPos[1]))
      if (currentPos[1] == -layerMap[i]) {
        currentPos[0] += 2;
        i++;
        break;
      } else {
        currentPos[1] -= 2;
      }
      i++;
    }
    while (currentPos[0] <= layerMap[i] && currentPos[0] >= -layerMap[i]) {
      posMap.push(new DigitPos(currentPos[0], currentPos[1]))
      if (currentPos[0] == layerMap[i]) {
        currentPos[1] += 2;
        i++;
        break;
      } else {
        currentPos[0] += 2;
      }
      i++;
    }
    while (currentPos[1] <= layerMap[i] && currentPos[1] >= -layerMap[i]) {
      posMap.push(new DigitPos(currentPos[0], currentPos[1]))
      if (currentPos[1] == layerMap[i]) {
        currentPos[0] -= 2;
        i++;
        break;
      } else {
        currentPos[1] += 2;
      }
      i++;
    }
    while (currentPos[0] <= layerMap[i] && currentPos[0] >= -layerMap[i]) {
      posMap.push(new DigitPos(currentPos[0], currentPos[1]))
      if (currentPos[0] == -layerMap[i]) {
        i++;
        break;
      } else {
        currentPos[0] -= 2;
      }
      i++;
    }
  }
}

function digitClicked(circle) {
  if (connecting) {
    if (startCircle.type == "circle" && circle.type == "circle" || distance(startCircle.x, startCircle.y, circle.x, circle.y) > spacing * 1.25) {
      startCoords = [-100, 0];
      endCoords = [-90, 0];
      connecting = !connecting;
      return;
    }
    endCoords = [circle.x, circle.y];
    connection.setAttribute("x2", circle.x);
    connection.setAttribute("y2", circle.y);
    if (digitMap.has([circle.x, circle.y].toString())) {
      var element1 = [startCoords[0], startCoords[1], endCoords[0], endCoords[1]];
      var element2 = [endCoords[0], endCoords[1], startCoords[0], startCoords[1]];
      var index1 = indexOfArrayInArray(connectionArray, element1);
      var index2 = indexOfArrayInArray(connectionArray, element2);
      if (index1 >= 0) {
        connectionArray.splice(index1, 1);
      } else if (index2 >= 0) {
        connectionArray.splice(index2, 1);
      }
      connectDots(digitMap.get([circle.x, circle.y].toString()), startCircle);

    } else if (digitMap.has([startCircle.x, startCircle.y].toString())) {
      var element1 = [startCoords[0], startCoords[1], endCoords[0], endCoords[1]];
      var element2 = [endCoords[0], endCoords[1], startCoords[0], startCoords[1]];
      var index1 = indexOfArrayInArray(connectionArray, element1);
      var index2 = indexOfArrayInArray(connectionArray, element2);
      if (index1 >= 0) {
        connectionArray.splice(index1, 1);
      } else if (index2 >= 0) {
        connectionArray.splice(index2, 1);
      }
      connectDots(digitMap.get([startCircle.x, startCircle.y].toString()), circle);

    }
    generate();
  } else {
    startCoords = [circle.x, circle.y];
    startCircle = circle;
    connection.setAttribute("x1", circle.x);
    connection.setAttribute("y1", circle.y);
    endCoords = [circle.x, circle.y];
    connection.setAttribute("x2", circle.x);
    connection.setAttribute("y2", circle.y);
  }
  connecting = !connecting;
}

function mouseMoved(event) {
  if (connecting) {
    connection.setAttribute("x2", event.offsetX);
    connection.setAttribute("y2", event.offsetY);
  }
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function connectDots(digit, circle) {
  digitCoords = placeToCoords(digit.place, currentSize);
  if (digitCoords[0] == circle.x) {
    if (digitCoords[1] > circle.y) {
      digit.up = !digit.up;
    } else {
      digit.down = !digit.down;
    }
  } else if (digitCoords[1] == circle.y) {
    if (digitCoords[0] < circle.x) {
      digit.right = !digit.right;
    } else {
      digit.left = !digit.left;
    }
  }
  startCoords = [-100, 0];
  endCoords = [-90, 0];
}

function indexOfArrayInArray(parent, child) {
  for (var i = 0; i < parent.length; i++) {
    var matched = true;
    for (var j = 0; j < child.length; j++) {
      if (parent[i][j] != child[j]) {
        matched = false;
        break;
      }
    }
    if (matched) {
      return i;
    }
  }
  return -1;
}

function correctDigits() {
  connectionArray = [];
  var iterator = digitMap.values();
  var done = false
  while (done == false) {
    var next = iterator.next();
    if (next.done == true) {
      done = true;
      break;
    }
    var digit = next.value;
    var score = 0;
    if (digit.up) score++;
    if (digit.right) score++;
    if (digit.down) score++;
    if (digit.left) score++;
    if (score == 1) {
      digit.up = digit.right = digit.down = false;
      digit.left = true;
    }
    if (score == 2) {
      digit.down = digit.left = false;
      digit.up = digit.right = true;
    }
    if (score == 3) {
      digit.right = false;
      digit.up = digit.down = digit.left = true;
    }
    if (score == 4) {
      digit.up = digit.right = digit.down = digit.left = false;
    }
  }
  generate();
}

function villeinToArabic() {
  correctDigits();

  var iterator = digitMap.values();
  var done = false
  var value = 0;
  while (done == false) {
    var next = iterator.next();
    if (next.done == true) {
      done = true;
      break;
    }
    var digit = next.value;
    value += (digit.up + digit.right + digit.down + digit.left) * Math.pow(4, digit.place);
  }

  document.getElementById("inputField").value = value;
}

function arabicToVillein() {
  var base10 = +document.getElementById("inputField").value;
  var base4 = base10.toString(4);
  var digits = Math.log(base4) * Math.LOG10E + 1 | 0;
  if (base4 == 0 && digits == 0) {
    digits += 1;
  }

  var iterator = digitMap.values();
  var done = false;
  for (var i = 0; done == false; i++) {
    var next = iterator.next();
    if (next.done == true) {
      done = true;
      break;
    }
    setDigit(next.value, base4.charAt(base4.length - 1 - i))
  }

  connectionArray = [];
  generate();
}

function setDigit(digit, value) {
  switch (parseInt(value)) {
    case 1:
      digit.left = true;
      digit.up = digit.right = digit.down = false;
      break;
    case 2:
      digit.up = digit.right = true;
      digit.down = digit.left = false;
      break;
    case 3:
      digit.up = digit.down = digit.left = true;
      digit.right = false;
      break;
    default:
      digit.up = digit.right = digit.down = digit.left = false;
      break;
  }
}

function saveImage() {
  html2canvas(document.getElementById("divSvg")).then(canvas => {
    var link = document.createElement('a');
    link.download = 'villein.png';
    link.href = canvas.toDataURL()
    link.click();
  });
}