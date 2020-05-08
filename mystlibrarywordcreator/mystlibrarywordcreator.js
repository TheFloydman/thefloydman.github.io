var colorDisabled = "gray";
var colorEnabled = "black";
var colorHighlight = "yellow";
var arcList = [];

function startup(svg, disabledColor, enabledColor, highlightColor) {
	colorDisabled = disabledColor;
	colorEnabled = enabledColor;
	colorHighlight = highlightColor;
	var mainWidth = +svg.getAttribute("width");
	
	var circleList = [];
	circleList.push(new Circle(mainWidth / 2, mainWidth / 2, mainWidth / 2, 4));
	circleList.push(new Circle((mainWidth / 2) + Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			(mainWidth / 2) - Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			mainWidth / 4, 8));
	circleList.push(new Circle((mainWidth / 2) + Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			(mainWidth / 2) + Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			mainWidth / 4, 12));
	circleList.push(new Circle((mainWidth / 2) - Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			(mainWidth / 2) + Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			mainWidth / 4, 16));
	circleList.push(new Circle((mainWidth / 2) - Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			(mainWidth / 2) - Math.sqrt(Math.pow(mainWidth / 4, 2) / 2),
			mainWidth / 4, 20));
	circleList.push(new Circle(mainWidth / 2, (mainWidth / 2) - mainWidth / 4, mainWidth / 4, 24));
	circleList.push(new Circle((mainWidth / 2) + (mainWidth / 4), mainWidth / 2, mainWidth / 4, 28));
	circleList.push(new Circle(mainWidth / 2, (mainWidth / 2) + mainWidth / 4, mainWidth / 4, 32));
	circleList.push(new Circle((mainWidth / 2) - (mainWidth / 4), mainWidth / 2, mainWidth / 4, 36));
	circleList.push(new Circle(mainWidth / 2, mainWidth / 2, mainWidth / 4, 40));
	
	arcList = [];
	circleList.forEach(function(circle, index, arr) {
		var arcId = circle.startInt;
		arcList.push(new Arc(circle.x - Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y - Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.x + Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y - Math.sqrt(2 * Math.pow(circle.r / 2, 2)), circle.r, arcId++));
		arcList.push(new Arc(circle.x + Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y - Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.x + Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y + Math.sqrt(2 * Math.pow(circle.r / 2, 2)), circle.r, arcId++));
		arcList.push(new Arc(circle.x + Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y + Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.x - Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y + Math.sqrt(2 * Math.pow(circle.r / 2, 2)), circle.r, arcId++));
		arcList.push(new Arc(circle.x - Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y + Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.x - Math.sqrt(2 * Math.pow(circle.r / 2, 2)),
				circle.y - Math.sqrt(2 * Math.pow(circle.r / 2, 2)), circle.r, arcId++));
	});
	
	refresh(svg);
		
}

function refresh(svg) {
	svg.innerHTML = "";
	arcList.forEach(function(arc, index, arr) {
		var element = document.createElementNS("http://www.w3.org/2000/svg", "path");
		element.setAttribute("id", arc.id)
		element.setAttribute("d", "M " + arc.startX + " " + arc.startY + "A " + arc.r + " " + arc.r + " 0 0 1 " + arc.endX + " " + arc.endY);
		element.setAttribute("fill", "none");
		element.setAttribute("stroke-width", svg.getAttribute("width") / 64);
		element.setAttribute("stroke", arc.getColor());
		element.setAttribute("opacity", arc.getOpacity());
		element.addEventListener("mouseenter", function() {
			element.setAttribute("stroke", colorHighlight);
		  });
		element.addEventListener("mouseleave", function() {
			element.setAttribute("stroke", arc.getColor());
		  });
		element.addEventListener("click", function() {
			arc.clicked();
			element.setAttribute("stroke", arc.getColor());
			element.setAttribute("opacity", arc.getOpacity());
		  });
		svg.appendChild(element);
	});
}

function save() {
	
	var word = document.getElementById("word").value.toLowerCase();
	var array = [];
	arcList.forEach(function(arc, index, arr) {
		if (arc.enabled && arc.visible) {
			array.push(arc.id);
		}
	});
	
	var data = {word: word, arcs: array};
	var jsonData = JSON.stringify(data, null, 4);

	var a = document.createElement("a");
    var file = new Blob([jsonData], {type: "text/plain"});
    a.href = URL.createObjectURL(file);
    a.download = "mystcraft_word_" + word + ".json";
    a.click();
    
}

class Circle {
	constructor(x, y, r, startInt) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.startInt = startInt;
	}
}

class Arc {
	
	constructor(startX, startY, endX, endY, r, id) {
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
		this.r = r;
		this.id = id;
		this.enabled = false;
		this.visible = true;
	}
	
	getColor() {
		return this.enabled ? colorEnabled : colorDisabled;
	}
	
	getOpacity() {
		return this.enabled ? 1.0 : 0.5;
	}
	
	clicked() {
		this.enabled = !this.enabled;
	}
}