/* Created by Dan Floyd (Floydman) for use in solving the "Puzzlelisimo" puzzle
(also known as the "maze") in the video game Obduction. Please send comments,
suggestions, and/or corrections to danielwellsfloyd@gmail.com. */

function initialize () {
	
	// Clears instruction area.
	document.getElementById("solutionarea").value = "";
	
	//Declare useful strings.
	pathError = "Path Error!\nPath value is not between 0 and 2";
	baseRotationError = "Base Rotation Error!\nBase Rotation value is not between 0 and 3";
	insertRotationError = "Insert Rotation Error!\nInsert Rotation value is not between 0 and 3";
	rotateBaseError = "Error in function \"rotateBase\"";
	correctRotationError = "Error in function \"correctRotation\"";
	rotateInsertToError = "Error in function \"rotateInsertTo\"";
	rotateBaseToError = "Error in function \"rotateBaseTo\"";

	// Create input variables.
	base = {rotation:0};
	insert0 = {location:0,rotation:0};
	insert1 = {location:0,rotation:0};
	insert2 = {location:0,rotation:0};
	insert3 = {location:0,rotation:0};
	insert4 = {location:0,rotation:0};
	path = 0;

	// Assign values from input boxes.
	base.rotation = document.getElementById("baserotation").value;
	insert0.location = document.getElementById("insert0location").value;
	insert0.rotation = document.getElementById("insert0rotation").value;
	insert1.location = document.getElementById("insert1location").value;
	insert1.rotation = document.getElementById("insert1rotation").value;
	insert2.location = document.getElementById("insert2location").value;
	insert2.rotation = document.getElementById("insert2rotation").value;
	insert3.location = document.getElementById("insert3location").value;
	insert3.rotation = document.getElementById("insert3rotation").value;
	insert4.location = document.getElementById("insert4location").value;
	insert4.rotation = document.getElementById("insert4rotation").value;
	path = document.getElementById("pathnumber").value;
	
	// Solve for the chosen path.
	solvePuzzlelisimo();
	
	// Cleanup instructions. (Remove groups of instructions that essentially do nothing.)
	for (i = 0; i < 20; i++) {
		cleanupTextArea();
	}
	
	// Draw graphics.
	drawGraphics();
}

function drawGraphics () {
	
	document.getElementById("solutionTD").innerHTML = "";
	
	stepNumber = 1;
	originalInstructions = res14;
	startPlace = 2;
	fullInstructions = res14;
	restOfInstructions = res14;
	
	for (i = 0; i < 50; i++) {
		
		breakPlace = fullInstructions.indexOf("\n");
		currentInstruction = fullInstructions.slice(startPlace,breakPlace);
		
		if (currentInstruction == "Rotate base once clockwise.") {
			stepImage = document.createElement("img");
			stepImage.src = "graphics/BaseC.png";
			stepImage.width = 100;
			stepImage.height = 100;
			buildDiv();
		} else if (currentInstruction == "Rotate base once counterclockwise.") {
			stepImage = document.createElement("img");
			stepImage.src = "graphics/BaseCC.png";
			stepImage.width = 100;
			stepImage.height = 100;
			buildDiv();
		} else if (currentInstruction == "Rotate base twice either clockwise or counterclockwise.") {
			stepImage = document.createElement("img");
			stepImage.src = "graphics/Base2.png";
			stepImage.width = 100;
			stepImage.height = 100;
			buildDiv();
		} else if (currentInstruction == "Go to basement and swap to Hunrath.") {
			stepImage = document.createElement("img");
			stepImage.src = "graphics/InsertH.png";
			stepImage.width = 100;
			stepImage.height = 100;
			buildDiv();
		} else if (currentInstruction == "Go to basement and swap to Maray.") {
			stepImage = document.createElement("img");
			stepImage.src = "graphics/InsertM.png";
			stepImage.width = 100;
			stepImage.height = 100;
			buildDiv();
		} else if (currentInstruction == "Rotate insert once clockwise.") {
			stepImage = document.createElement("img");
			stepImage.src = "graphics/InsertC.png";
			stepImage.width = 100;
			stepImage.height = 100;
			buildDiv();
		} else if (currentInstruction == "Rotate insert once counterclockwise.") {
			stepImage = document.createElement("img");
			stepImage.src = "graphics/InsertCC.png";
			stepImage.width = 100;
			stepImage.height = 100;
			buildDiv();
		} else if (currentInstruction == "Rotate insert twice either clockwise or counterclockwise.") {
			stepImage = document.createElement("img");
			stepImage.src = "graphics/Insert2.png";
			stepImage.width = 100;
			stepImage.height = 100;
			buildDiv();
		} else if (currentInstruction == "Go to triple-swap area and swap to Maray. Return to Puzzlelisimo.") {
			stepImage = document.createElement("img");
			stepImage.src = "graphics/TripleM.png";
			stepImage.width = 100;
			stepImage.height = 100;
			buildDiv();
		} else if (currentInstruction == "Go to triple-swap area and swap to Hunrath. Go to insert rotator.") {
			stepImage = document.createElement("img");
			stepImage.src = "graphics/TripleH.png";
			stepImage.width = 100;
			stepImage.height = 100;
			buildDiv();
		}
		
		restOfInstructions = fullInstructions.slice(breakPlace + 1);
		fullInstructions = restOfInstructions;
		
	}
	
	
}

function buildDiv () {
	stepString = "Step " + String(stepNumber) + ": ";
	instructionP = document.createElement("p");
	instructionP.innerHTML = stepString.bold() + currentInstruction;
			
	leftCell = document.createElement("div");
	leftCell.style = "width:25%;";
	leftCell.appendChild(stepImage);
			
	rightCell = document.createElement("div");
	rightCell.style = "width:75%;";
	rightCell.className = "instructions";
	rightCell.appendChild(instructionP);
			
	bigCell = document.createElement("div");
	bigCell.style = "width:400px";
	if (stepNumber == 1) {
		bigCell.style = "width:400px; border-top: 1px solid black;";
	}
	bigCell.className = "step";
	bigCell.appendChild(leftCell);
	bigCell.appendChild(rightCell);

	document.getElementById("solutionTD").appendChild(bigCell);
	stepNumber = stepNumber + 1;
}

function solvePuzzlelisimo () {
	// Choose which path to solve. Error checking enabled for invalid paths.
	if (path == 0) {
		solvePath0();
	} else if (path == 1) {
		solvePath1();
	} else if (path == 2) {
		solvePath2();
	} else {
		alert(pathError);
	}
}

function solvePath0 () {
	// Solve Path 0.
	solvePath0Insert1(insert1);
	solvePath0Insert4(insert4);
	solvePath0Insert2(insert2);
	solvePath0Insert0(insert0);
}

function solvePath1 () {
	// Solve Path 1.
	solvePath1Insert1(insert1);
	solvePath1Insert4(insert4);
	solvePath1Insert2(insert2);
}

function solvePath2 () {
	// Solve Path 2.
	solvePath2Insert1(insert1);
	solvePath2Insert3(insert3);
	solvePath2Insert0(insert0);
}

// Start of functions that solve for a specific path and insert.

function solvePath0Insert1 (item) {
	if (item.location == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,2);
		swapToMaray(item);
	} else if (item.location == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,2);
		hunrathGauntletMaray(item);
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,2);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,2);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 4) {
		rotateBaseTo(2);
		marayGauntletHunrath();
		rotateInsertTo(item,2);
		swapToMaray(item);
	}
	
	addLineBreak();
}

function solvePath0Insert4 (item) {
	if (item.location == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		swapToMaray(item);
	} else if (item.location == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray(item);
		rotateBaseTo(1);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(1);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(1);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 4) {
		rotateBaseTo(1);
		marayGauntletHunrath();
		rotateInsertTo(item,1);
		swapToMaray(item);
	}
	
	addLineBreak();
}

function solvePath0Insert2 (item) {
	if (item.location == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		swapToMaray(item);
	} else if (item.location == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray(item);
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 4) {
		rotateBaseTo(0);
		marayGauntletHunrath();
		rotateInsertTo(item,0);
		swapToMaray(item);
	}
	
	addLineBreak();
}

function solvePath0Insert0 (item) {
	if (item.location == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		swapToMaray(item);
	} else if (item.location == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray(item);
		rotateBaseTo(3);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(3);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(3);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 4) {
		rotateBaseTo(3);
		marayGauntletHunrath();
		rotateInsertTo(item,0);
		swapToMaray(item);
	}
	
	addLineBreak();
}

function solvePath1Insert1 (item) {
	if (item.location == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		swapToMaray(item);
	} else if (item.location == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 4) {
		rotateBaseTo(2);
		marayGauntletHunrath();
		rotateInsertTo(item,1);
		swapToMaray(item);
	}
	
	addLineBreak();
}

function solvePath1Insert4 (item) {
	if (item.location == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		swapToMaray(item);
	} else if (item.location == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(1);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(1);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(1);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 4) {
		rotateBaseTo(1);
		marayGauntletHunrath();
		rotateInsertTo(item,1);
		swapToMaray(item);
	}
	
	addLineBreak();
}

function solvePath1Insert2 (item) {
	if (item.location == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		swapToMaray(item);
	} else if (item.location == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 4) {
		rotateBaseTo(0);
		marayGauntletHunrath();
		rotateInsertTo(item,1);
		swapToMaray(item);
	}
	
	addLineBreak();
}

function solvePath2Insert1 (item) {
	if (item.location == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		swapToMaray(item);
	} else if (item.location == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 4) {
		rotateBaseTo(2);
		marayGauntletHunrath();
		rotateInsertTo(item,1);
		swapToMaray(item);
	}
	
	addLineBreak();
}

function solvePath2Insert3 (item) {
	if (item.location == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		swapToMaray(item);
	} else if (item.location == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(3);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(3);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(3);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 4) {
		rotateBaseTo(3);
		marayGauntletHunrath();
		rotateInsertTo(item,0);
		swapToMaray(item);
	}
	
	addLineBreak();
}

function solvePath2Insert0 (item) {
	if (item.location == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		swapToMaray(item);
	} else if (item.location == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.location == 4) {
		rotateBaseTo(0);
		marayGauntletHunrath();
		rotateInsertTo(item,0);
		swapToMaray(item);
	}
	
	addLineBreak();
}

// End of functions that solve for a specific path and insert.

function rotateBase (rotationvalue) {
	
	// Rotate base and, consequently, each insert, except for the one in Hunrath. Does not rotate the insert in Hunrath.
	base.rotation = Number(base.rotation) + Number(rotationvalue);
	if (insert0.location >=0 && insert0.location <=3) {
		insert0.rotation = Number(insert0.rotation) + Number(rotationvalue);
	}
	if (insert1.location >=0 && insert1.location <=3) {
		insert1.rotation = Number(insert1.rotation) + Number(rotationvalue);
	}
	if (insert2.location >=0 && insert2.location <=3) {
		insert2.rotation = Number(insert2.rotation) + Number(rotationvalue);
	}
	if (insert3.location >=0 && insert3.location <=3) {
		insert3.rotation = Number(insert3.rotation) + Number(rotationvalue);
	}
	if (insert4.location >=0 && insert4.location <=3) {
		insert4.rotation = Number(insert4.rotation) + Number(rotationvalue);
	}
	
	// Add readable instructions.
	if (rotationvalue == 1) {
		document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat("- Rotate base once clockwise.\n");
	} else if (rotationvalue == -1) {
		document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat("- Rotate base once counterclockwise.\n");
	} else if (rotationvalue == 2) {
		document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat("- Rotate base twice either clockwise or counterclockwise.\n");
	} else {
		alert(rotateBaseError);
	}
	
	// Correct rotation values if they are too high or too low.
	correctRotation(base);
	correctRotation(insert0);
	correctRotation(insert1);
	correctRotation(insert2);
	correctRotation(insert3);
	correctRotation(insert4);
}

function correctRotation (item) {
	// Keep rotation values between 0 and 3, inclusive.
	if (item.rotation >= 4) {
		item.rotation = Number(item.rotation) - 4;
	} else if (item.rotation <= -1) {
		item.rotation = Number(item.rotation) + 4;
	}
}

function swapToHunrath (item) {
	
	// Swaps an insert from Maray to Hunrath. Also swaps the insert already in Hunrath to Maray.
	
	document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat("- Go to basement and swap to Hunrath.\n");
	
	if (item.location == 4) {
		if (base.rotation == 0) {
			if (insert0.location == 2) {
				insert0.location = 4;
				item.location = 2;
			} else if (insert1.location == 2) {
				insert1.location = 4;
				item.location = 2;
			} else if (insert2.location == 2) {
				insert2.location = 4;
				item.location = 2;
			} else if (insert3.location == 2) {
				insert3.location = 4;
				item.location = 2;
				} else if (insert4.location == 2) {
					insert4.location = 4;
					item.location = 2;
				}
		} else if (base.rotation == 1) {
			if (insert0.location == 1) {
				insert0.location = 4;
				item.location = 1;
			} else if (insert1.location == 1) {
				insert1.location = 4;
				item.location = 1;
			} else if (insert2.location == 1) {
				insert2.location = 4;
				item.location = 1;
			} else if (insert3.location == 1) {
				insert3.location = 4;
				item.location = 1;
			} else if (insert4.location == 1) {
				insert4.location = 4;
				item.location = 1;
			}
		} else if (base.rotation == 2) {
			if (insert0.location == 0) {
				insert0.location = 4;
				item.location = 0;
			} else if (insert1.location == 0) {
				insert1.location = 4;
				item.location = 0;
			} else if (insert2.location == 0) {
				insert2.location = 4;
				item.location = 0;
			} else if (insert3.location == 0) {
				insert3.location = 4;
				item.location = 0;
			} else if (insert4.location == 0) {
				insert4.location = 4;
				item.location = 0;
			}
		} else if (base.rotation == 3) {
			if (insert0.location == 3) {
				insert0.location = 4;
				item.location = 3;
			} else if (insert1.location == 3) {
				insert1.location = 4;
				item.location = 3;
			} else if (insert2.location == 3) {
				insert2.location = 4;
				item.location = 3;
			} else if (insert3.location == 3) {
				insert3.location = 4;
				item.location = 3;
			} else if (insert4.location == 3) {
				insert4.location = 4;
				item.location = 3;
			}
		}
		return
	}
	
	if (insert0.location == 4) {
		insert0.location = Number(item.location);
	} else if (insert1.location == 4) {
		insert1.location = Number(item.location);
	} else if (insert2.location == 4) {
		insert2.location = Number(item.location);
	} else if (insert3.location == 4) {
		insert3.location = Number(item.location);
	} else if (insert4.location == 4) {
		insert4.location = Number(item.location);
	}
	
	item.location = 4;
}

function swapToMaray (item) {
	
	// Swaps an insert from Hunrath to Maray. Also swaps the insert already in Maray to Hunrath.
	
	document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat("- Go to basement and swap to Maray.\n");
	
	if (base.rotation == 0) {
		if (insert0.location == 2) {
			insert0.location = 4;
			item.location = 2;
		} else if (insert1.location == 2) {
			insert1.location = 4;
			item.location = 2;
		} else if (insert2.location == 2) {
			insert2.location = 4;
			item.location = 2;
		} else if (insert3.location == 2) {
			insert3.location = 4;
			item.location = 2;
		} else if (insert4.location == 2) {
			insert4.location = 4;
			item.location = 2;
		}
	} else if (base.rotation == 1) {
		if (insert0.location == 1) {
			insert0.location = 4;
			item.location = 1;
		} else if (insert1.location == 1) {
			insert1.location = 4;
			item.location = 1;
		} else if (insert2.location == 1) {
			insert2.location = 4;
			item.location = 1;
		} else if (insert3.location == 1) {
			insert3.location = 4;
			item.location = 1;
		} else if (insert4.location == 1) {
			insert4.location = 4;
			item.location = 1;
		}
	} else if (base.rotation == 2) {
		if (insert0.location == 0) {
			insert0.location = 4;
			item.location = 0;
		} else if (insert1.location == 0) {
			insert1.location = 4;
			item.location = 0;
		} else if (insert2.location == 0) {
			insert2.location = 4;
			item.location = 0;
		} else if (insert3.location == 0) {
			insert3.location = 4;
			item.location = 0;
		} else if (insert4.location == 0) {
			insert4.location = 4;
			item.location = 0;
		}
	} else if (base.rotation == 3) {
		if (insert0.location == 3) {
			insert0.location = 4;
			item.location = 3;
		} else if (insert1.location == 3) {
			insert1.location = 4;
			item.location = 3;
		} else if (insert2.location == 3) {
			insert2.location = 4;
			item.location = 3;
		} else if (insert3.location == 3) {
			insert3.location = 4;
			item.location = 3;
		} else if (insert4.location == 3) {
			insert4.location = 4;
			item.location = 3;
		}
	}
}

function hunrathGauntletMaray () {
	
	// Prints instructions on how to return to Maray without swapping an insert.
	document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat("- Go to triple-swap area and swap to Maray. Return to Puzzlelisimo.\n");
}

function marayGauntletHunrath () {
	
	// Prints instructions on how to return to Hunrath without swapping an insert.
	document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat("- Go to triple-swap area and swap to Hunrath. Go to insert rotator.\n");
}

function rotateInsert (item,rotationvalue) {
	
	// Rotates an insert in Hunrath.
	
	item.rotation = Number(item.rotation) + Number(rotationvalue);
	
	if (rotationvalue == 1) {
		document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat("- Rotate insert once clockwise.\n");
	} else if (rotationvalue == -1) {
		document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat("- Rotate insert once counterclockwise.\n");
	} else if (rotationvalue == 2) {
		document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat("- Rotate insert twice either clockwise or counterclockwise.\n");
	} else {
		alert(rotateBaseError);
	}
	
	// Correct rotation values if they are too high or too low.
	correctRotation(base);
	correctRotation(insert0);
	correctRotation(insert1);
	correctRotation(insert2);
	correctRotation(insert3);
	correctRotation(insert4);
}

function rotateInsertTo (item,rotationvalue) {
	
	//Determines how many times to rotate an insert to have it reach a specific rotation.
	
	if (item.rotation == 0) {
		if (rotationvalue == 1) {
			rotateInsert(item,1);
		} else if (rotationvalue == 2) {
			rotateInsert(item,2);
		} else if (rotationvalue == 3) {
			rotateInsert(item,-1);
		}
	} else if (item.rotation == 1) {
		if (rotationvalue == 0) {
			rotateInsert(item,-1);
		} else if (rotationvalue == 2) {
			rotateInsert(item,1);
		} else if (rotationvalue == 3) {
			rotateInsert(item,2);
		}
	} else if (item.rotation == 2) {
		if (rotationvalue == 0) {
			rotateInsert(item,2);
		} else if (rotationvalue == 1) {
			rotateInsert(item,-1);
		} else if (rotationvalue == 3) {
			rotateInsert(item,1);
		}
	} else if (item.rotation == 3) {
		if (rotationvalue == 0) {
			rotateInsert(item,1);
		} else if (rotationvalue == 1) {
			rotateInsert(item,2);
		} else if (rotationvalue == 2) {
			rotateInsert(item,-1);
		}
	} else {
		alert(rotateInsertToError);
	}
}

function addLineBreak () {
	
	// Used to add space between groups of instructions.
	
	document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat("\n");
}

function rotateBaseTo (rotationvalue) {
	
	//Determines how many times to rotate the base to have it reach a specific rotation.
	
	if (base.rotation == 0) {
		if (rotationvalue == 1) {
			rotateBase(1);
		} else if (rotationvalue == 2) {
			rotateBase(2);
		} else if (rotationvalue == 3) {
			rotateBase(-1);
		}
	} else if (base.rotation == 1) {
		if (rotationvalue == 0) {
			rotateBase(-1);
		} else if (rotationvalue == 2) {
			rotateBase(1);
		} else if (rotationvalue == 3) {
			rotateBase(2);
		}
	} else if (base.rotation == 2) {
		if (rotationvalue == 0) {
			rotateBase(2);
		} else if (rotationvalue == 1) {
			rotateBase(-1);
		} else if (rotationvalue == 3) {
			rotateBase(1);
		}
	} else if (base.rotation == 3) {
		if (rotationvalue == 0) {
			rotateBase(1);
		} else if (rotationvalue == 1) {
			rotateBase(2);
		} else if (rotationvalue == 2) {
			rotateBase(-1);
		}
	} else {
		alert(rotateBaseToError);
	}
}

function cleanupTextArea () {
	
	// Remove groups of instructions that essentially do nothing.
	
	var str = document.getElementById("solutionarea").value;
	var res1 = str.replace("\n\n- Rotate insert twice either clockwise or counterclockwise.\n\n","\n\n");
	var res2 = res1.replace("\n\n- Rotate insert once counterclockwise.\n\n","\n\n");
	var res3 = res2.replace("\n\n- Rotate insert once clockwise.\n\n","\n\n");
	var res4 = res3.replace("\n\n- Go to triple-swap area and swap to Hunrath.\n- Go to insert rotator.\n\n","\n\n");
	var res5 = res4.replace("\n\n- Go to triple-swap area and swap to Maray.\n- Return to Puzzlelisimo.\n\n","\n\n");
	var res6 = res5.replace("\n\n- Go to basement and swap to Maray.\n\n","\n\n");
	var res7 = res6.replace("\n\n- Go to basement and swap to Hunrath.\n\n","\n\n");
	var res8 = res7.replace("\n\n- Rotate base twice either clockwise or counterclockwise.\n\n","\n\n");
	var res9 = res8.replace("\n\n- Rotate base once counterclockwise.\n\n","\n\n");
	var res10 = res9.replace("\n\n- Rotate base once clockwise.\n\n","\n\n");
	var res11 = res10.replace("\n\n- Rotate base twice either clockwise or counterclockwise.\n\n","\n\n");
	var res12 = res11.replace("- Go to basement and swap to Maray.\n- Go to basement and swap to Hunrath.","");
	var res13 = res12.replace("- Go to basement and swap to Hunrath.\n- Go to basement and swap to Maray.","");
	res14 = res13.replace("\n\n\n","\n\n");
	
	document.getElementById("solutionarea").value = res14;
}
