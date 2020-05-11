var colorDisabled = "gray";
var colorEnabled = "black";
var colorHighlight = "yellow";

var circleList = [];

function startup(svg, disabledColor, enabledColor, highlightColor) {
	colorDisabled = disabledColor;
	colorEnabled = enabledColor;
	colorHighlight = highlightColor;
	var mainWidth = +svg.getAttribute("width");
	
	circleList = [];
	// Big circle.
	circleList.push(new Circle(mainWidth / 2, mainWidth / 2, mainWidth / 2, 4, true));
	// Smaller canon circles starting in upper-right and moving clockwise.
	circleList.push(new Circle((mainWidth / 2) + Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			(mainWidth / 2) - Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			mainWidth / 4, 8, true));
	circleList.push(new Circle((mainWidth / 2) + Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			(mainWidth / 2) + Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			mainWidth / 4, 12, true));
	circleList.push(new Circle((mainWidth / 2) - Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			(mainWidth / 2) + Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			mainWidth / 4, 16, true));
	circleList.push(new Circle((mainWidth / 2) - Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			(mainWidth / 2) - Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			mainWidth / 4, 20, true));
	// Smaller non-canon circles starting at the top and moving clockwise.
	circleList.push(new Circle(mainWidth / 2, (mainWidth / 2) - mainWidth / 4, mainWidth / 4, 24, false));
	circleList.push(new Circle((mainWidth / 2) + (mainWidth / 4), mainWidth / 2, mainWidth / 4, 28, false));
	circleList.push(new Circle(mainWidth / 2, (mainWidth / 2) + mainWidth / 4, mainWidth / 4, 32, false));
	circleList.push(new Circle((mainWidth / 2) - (mainWidth / 4), mainWidth / 2, mainWidth / 4, 36, false));
	// Smaller non-canon circle in middle.
	circleList.push(new Circle(mainWidth / 2, mainWidth / 2, mainWidth / 4, 40, false));
	
	arcList = [];
	circleList.forEach(function(circle, index, arr) {
		var arcList = [];
		var arcId = circle.startInt;
		arcList.push(new Arc(circle.x - Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y - Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.x + Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y - Math.sqrt(2 * Math.pow(circle.r / 2, 2)), circle.r, arcId++, circle.visible));
		arcList.push(new Arc(circle.x + Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y - Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.x + Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y + Math.sqrt(2 * Math.pow(circle.r / 2, 2)), circle.r, arcId++, circle.visible));
		arcList.push(new Arc(circle.x + Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y + Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.x - Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y + Math.sqrt(2 * Math.pow(circle.r / 2, 2)), circle.r, arcId++, circle.visible));
		arcList.push(new Arc(circle.x - Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y + Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.x - Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y - Math.sqrt(2 * Math.pow(circle.r / 2, 2)), circle.r, arcId++, circle.visible));
		circle.arcList = arcList;
	});
	
	refresh(svg);
		
}

function refresh(svg) {
	svg.innerHTML = "";
	circleList.forEach(function(circle, cirInd, cirArr) {
		circle.arcList.forEach(function(arc, arcInd, arcArr) {
			if (arc.visible) {
			var element = document.createElementNS("http://www.w3.org/2000/svg", "path");
			element.setAttribute("id", arc.id)
			element.setAttribute("d", "M " + arc.startX + " " + arc.startY + "A " + arc.r + " " + arc.r + " 0 0 1 " + arc.endX + " " + arc.endY);
			element.setAttribute("fill", "none");
			element.setAttribute("stroke-width", svg.getAttribute("width") / 64);
			element.setAttribute("stroke", arc.getColor());
			element.setAttribute("stroke-linecap", "round");
			element.setAttribute("opacity", arc.getOpacity());
			element.addEventListener("mouseenter", function() {
				element.setAttribute("stroke", colorHighlight);
				svg.removeChild(document.getElementById(arc.id));
				svg.appendChild(element);
			});
			element.addEventListener("mouseleave", function() {
				element.setAttribute("stroke", arc.getColor());
				svg.removeChild(document.getElementById(arc.id));
				if (arc.enabled) {
					svg.appendChild(element);
				} else {
					svg.prepend(element);
				}
			});
			element.addEventListener("click", function() {
				arc.clicked();
				element.setAttribute("stroke", arc.getColor());
				element.setAttribute("opacity", arc.getOpacity());
				svg.removeChild(document.getElementById(arc.id));
				if (arc.enabled) {
					svg.appendChild(element);
				} else {
					svg.prepend(element);
				}
			});
			svg.appendChild(element);
			}
		});
	});
}

function save() {
	
	var word = document.getElementById("word").value.toLowerCase();
	var array = [];
	circleList.forEach(function(circle, cirInd, cirArr) {
		if (circle.visible) {
			circle.arcList.forEach(function(arc, arcInd, arcArr) {
				if (arc.enabled && arc.visible) {
					array.push(arc.id);
				}
			});
		}
	});
	
	var data = [{word: word, arcs: array}];
	var jsonData = JSON.stringify(data, null, 4);

	var a = document.createElement("a");
    var file = new Blob([jsonData], {type: "text/plain"});
    a.href = URL.createObjectURL(file);
    a.download = "mystcraft_word_" + word + ".json";
    a.click();
    
}

class Circle {
	
	constructor(x, y, r, startInt, visible) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.startInt = startInt;
		this.visible = visible;
		this.arcList = [];
	}
	
	setVisible(visible) {
		this.visible = visible;
		this.arcList.forEach(function(arc, index, arr) {
			arc.visible = visible;
		});
	}
	
}

class Arc {
	
	constructor(startX, startY, endX, endY, r, id, visible) {
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
		this.r = r;
		this.id = id;
		this.enabled = false;
		this.visible = visible;
	}
	
	getColor() {
		return this.enabled ? colorEnabled : colorDisabled;
	}
	
	getOpacity() {
		return this.enabled ? 1.0 : 1.0;
	}
	
	clicked() {
		this.enabled = !this.enabled;
	}
}