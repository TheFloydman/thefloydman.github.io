var colorDisabled = "gray";
var colorEnabled = "black";
var colorHighlight = "yellow";
var circleList = [];
var arcList = new Map();

function startup(svg, disabledColor, enabledColor, highlightColor) {
	colorDisabled = disabledColor;
	colorEnabled = enabledColor;
	colorHighlight = highlightColor;
	var mainWidth = +svg.getAttribute("width");
	
	circleList = [];
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
	
	arcList = new Map();
	for (var i = 0; i < circleList.length; i++) {
		var arcId = circleList[i].startInt;
		arcList.set(arcId, new Arc(circleList[i].x - Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)),
				circleList[i].y - Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)),
				circleList[i].x + Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)),
				circleList[i].y - Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)), circleList[i].r, arcId++));
		arcList.set(arcId, new Arc(circleList[i].x + Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)),
				circleList[i].y - Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)),
				circleList[i].x + Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)),
				circleList[i].y + Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)), circleList[i].r, arcId++));
		arcList.set(arcId, new Arc(circleList[i].x + Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)),
				circleList[i].y + Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)),
				circleList[i].x - Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)),
				circleList[i].y + Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)), circleList[i].r, arcId++));
		arcList.set(arcId, new Arc(circleList[i].x - Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)),
				circleList[i].y + Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)),
				circleList[i].x - Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)),
				circleList[i].y - Math.sqrt(2 * Math.pow(circleList[i].r / 2, 2)), circleList[i].r, arcId++));
	}
	
	var arcListValues =  Array.from(arcList.values());
	arcListValues.forEach(function(arc, index, arr) {
		var element = document.createElementNS("http://www.w3.org/2000/svg", "path");
		element.setAttribute("id", arc.id)
		element.setAttribute("d", "M " + arc.startX + " " + arc.startY + "A " + arc.r + " " + arc.r + " 0 0 1 " + arc.endX + " " + arc.endY);
		element.setAttribute("fill", "none");
		element.setAttribute("stroke-width", "0.35em");
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