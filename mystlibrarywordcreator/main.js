function onPageLoad() {
	var svg = document.getElementById("svg");
	startup(svg, "#D8D8D8", "orange");
	
	var checkBoxBigCircle = document.getElementById("showCircleBig");
	checkBoxBigCircle.addEventListener("click", function() {
		circleList[0].setVisible(checkBoxBigCircle.checked);
		refresh(svg);
	});
	
	var checkBoxBigCircle = document.getElementById("showCircleBig");
	checkBoxBigCircle.addEventListener("click", function() {
		circleList[0].setVisible(checkBoxBigCircle.checked);
		refresh(svg);
	});
	
	var checkBoxSmallCircles = document.getElementById("showCirclesSmallCanon");
	checkBoxSmallCircles.addEventListener("click", function() {
		for (var i = 1; i < 5; i++) {
			circleList[i].setVisible(checkBoxSmallCircles.checked);
		}
		refresh(svg);
	});
	
	var checkBoxSmallExtraCircles = document.getElementById("showCirclesSmallNonCanon");
	checkBoxSmallExtraCircles.addEventListener("click", function() {
		for (var i = 5; i < 10; i++) {
			circleList[i].setVisible(checkBoxSmallExtraCircles.checked);
		}
		refresh(svg);
	});
}