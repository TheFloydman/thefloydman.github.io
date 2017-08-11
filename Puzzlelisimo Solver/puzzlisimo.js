pageLoad();

window.onfocus = drawCanvases();

function pageLoad () {
	
	rotateIconAlreadyClicked = 0;
	swapIconAlreadyClicked = 0;
	absoluteLocation0AlreadyClicked = 0;
	absoluteLocation1AlreadyClicked = 0;
	absoluteLocation2AlreadyClicked = 0;
	absoluteLocation3AlreadyClicked = 0;
	location4AlreadyClicked = 0;
	swapSphere0Selected = 0;
	
	// Start canvas info.
	finalCanvas = document.createElement("canvas");
	finalCanvas.addEventListener("click",canvasClicked);
	finalCanvas.width = 600;
	finalCanvas.height = finalCanvas.width*(2/3);
	finalCanvasCenter = finalCanvas.width/2;
	finalCanvasThird = finalCanvas.width/3;
	
	baseCanvas = document.createElement("canvas");
	baseCanvas.width = finalCanvas.height;
	baseCanvas.height = baseCanvas.width;
	baseCanvasCenter = baseCanvas.width/2;
	
	for (i = 0; i < 5; i++) {
		eval("insert" + i + "Canvas = document.createElement(\"canvas\")");
		eval("insert" + i + "Canvas.width = baseCanvas.width/3");
		eval("insert" + i + "Canvas.height = insert" + i + "Canvas.width");
		eval("insert" + i + "CanvasCenter = insert" + i + "Canvas.width/2");
	}
	// End canvas info.
	
	baseDiameter = baseCanvas.width*(9/10);
	baseRadius = baseDiameter/2;
	baseX = finalCanvasThird;
	baseY = finalCanvasCenter;
	insertDiameter = baseDiameter/3;
	insertRadius = insertDiameter/2;
	insertDistance = baseDiameter*(19/75);
	baseAngle = Math.asin(18/375);
	insertAngle = Math.asin(18/125);
	squareLength = insertDiameter/Math.sqrt(2);
	squareStartPoint = (insert0Canvas.width-squareLength)/2;
	
	// Start input variable creation.
	base = {rotation:0};
	path = 0;
	absoluteLocation0 = {x:finalCanvasThird - insert0Canvas.width/2,y:finalCanvas.height/2 - insertDistance - insert0Canvas.width/2};
	absoluteLocation1 = {x:finalCanvas.height/2 + insertDistance - insert0Canvas.width/2,y:finalCanvasThird - insert0Canvas.width/2};
	absoluteLocation2 = {x:finalCanvasThird - insert0Canvas.width/2,y:finalCanvas.height/2 + insertDistance - insert0Canvas.width/2};
	absoluteLocation3 = {x:finalCanvas.height/2 - insertDistance - insert0Canvas.width/2,y:finalCanvasThird - insert0Canvas.width/2};
	absoluteLocation0End = {x:finalCanvasThird - insert0Canvas.width/2 + insert0Canvas.width,y:finalCanvas.height/2 - insertDistance - insert0Canvas.width/2 + insert0Canvas.width};
	absoluteLocation1End = {x:finalCanvas.height/2 + insertDistance - insert0Canvas.width/2 + insert0Canvas.width,y:finalCanvasThird - insert0Canvas.width/2 + insert0Canvas.width};
	absoluteLocation2End = {x:finalCanvasThird - insert0Canvas.width/2 + insert0Canvas.width,y:finalCanvas.height/2 + insertDistance - insert0Canvas.width/2 + insert0Canvas.width};
	absoluteLocation3End = {x:finalCanvas.height/2 - insertDistance - insert0Canvas.width/2 + insert0Canvas.width,y:finalCanvasThird - insert0Canvas.width/2 + insert0Canvas.width};
	absoluteLocation0Center = {x:(absoluteLocation0End.x + absoluteLocation0.x)/2,y:(absoluteLocation0End.y + absoluteLocation0.y)/2};
	absoluteLocation1Center = {x:(absoluteLocation1End.x + absoluteLocation1.x)/2,y:(absoluteLocation1End.y + absoluteLocation1.y)/2};
	absoluteLocation2Center = {x:(absoluteLocation2End.x + absoluteLocation2.x)/2,y:(absoluteLocation2End.y + absoluteLocation2.y)/2};
	absoluteLocation3Center = {x:(absoluteLocation3End.x + absoluteLocation3.x)/2,y:(absoluteLocation3End.y + absoluteLocation3.y)/2};
	calculateLocations();
	location4 = {x:finalCanvasThird*2 + insertDistance - insert0Canvas.width/2,y:finalCanvas.height/2 + insertDistance - insert0Canvas.width/2};
	location4End = {x:finalCanvasThird*2 + insertDistance - insert0Canvas.width/2 + insert0Canvas.width,y:finalCanvas.height/2 + insertDistance - insert0Canvas.width/2 + insert0Canvas.width};
	location4Center = {x:(location4End.x + location4.x)/2,y:(location4End.y + location4.y)/2};
	insert0 = {location:4,rotation:1,solveLocation:4,solveRotation:1,x:0,y:0};
	insert1 = {location:0,rotation:2,solveLocation:0,solveRotation:2,x:0,y:0};
	insert2 = {location:2,rotation:1,solveLocation:2,solveRotation:1,x:0,y:0};
	insert3 = {location:1,rotation:3,solveLocation:1,solveRotation:3,x:0,y:0};
	insert4 = {location:3,rotation:2,solveLocation:3,solveRotation:2,x:0,y:0};
	
	updateSphereCoordinates();
	// End input variable creation.
	
	rotateIconX = location4.x;
	rotateIconY = finalCanvas.height/10;
	rotateIconWidth = insertDiameter;
	rotateIconHeight = insertDiameter/2.5;
	swapIconX = rotateIconX;
	swapIconY = rotateIconY + finalCanvas.height/7.5;
	swapIconWidth = insertDiameter;
	swapIconHeight = insertDiameter/2.5;
	
	lineWidthValue = 1;
	
	drawCanvases();
	
}

function calculateLocations () {
		if (base.rotation == 0) {
		location0 = absoluteLocation0;
		location1 = absoluteLocation1;
		location2 = absoluteLocation2;
		location3 = absoluteLocation3;
	} else if (base.rotation == 1) {
		location0 = absoluteLocation1;
		location1 = absoluteLocation2;
		location2 = absoluteLocation3;
		location3 = absoluteLocation0;
	} else if (base.rotation == 2) {
		location0 = absoluteLocation2;
		location1 = absoluteLocation3;
		location2 = absoluteLocation0;
		location3 = absoluteLocation1;
	} else if (base.rotation == 3) {
		location0 = absoluteLocation3;
		location1 = absoluteLocation0;
		location2 = absoluteLocation1;
		location3 = absoluteLocation2;
	}
}

function updateSphereCoordinates () {
	calculateLocations();
	for (i = 0; i < 5; i++) {
		for (j = 0; j < 5; j++) {
			if (eval("insert" + i + ".location") == j) {
				eval("insert" + i + ".x = location" + j +".x");
				eval("insert" + i + ".y = location" + j +".y");
			}
		}
	}
}

function drawCanvases () {
	
	rotateIcon = new Image();
	swapIcon = new Image();
	if (rotateIconAlreadyClicked == 0) {
		rotateIcon.src = "graphics/rotateIcon.svg";
	} else {
		rotateIcon.src = "graphics/rotateIconInv.svg";
	}
	if (swapIconAlreadyClicked == 0) {
		swapIcon.src = "graphics/swapIcon.svg";
	} else {
		swapIcon.src = "graphics/swapIconInv.svg";
	}
	
	document.getElementById("mainDiv").innerHTML = "";
	
	drawInsert0();
	drawInsert1();
	drawInsert2();
	drawInsert3();
	drawInsert4();
	drawBase();
	drawFinal();
	
	document.getElementById("mainDiv").removeChild(baseCanvas);
	document.getElementById("mainDiv").removeChild(insert0Canvas);
	document.getElementById("mainDiv").removeChild(insert1Canvas);
	document.getElementById("mainDiv").removeChild(insert2Canvas);
	document.getElementById("mainDiv").removeChild(insert3Canvas);
	document.getElementById("mainDiv").removeChild(insert4Canvas);
	
	initialize();
}

function canvasClicked (evt) {
	mouseX = evt.clientX - finalCanvas.getBoundingClientRect().left;
	mouseY = evt.clientY - finalCanvas.getBoundingClientRect().top;
	
	clickedOnLocation(mouseX,mouseY);
}


function clickedOnLocation (mouseX,mouseY) {
	if (Math.sqrt((mouseX-absoluteLocation0Center.x)*(mouseX-absoluteLocation0Center.x) + (mouseY-absoluteLocation0Center.y)*(mouseY-absoluteLocation0Center.y)) < insertRadius) {
		absoluteLocation0Clicked();
	} else if (Math.sqrt((mouseX-absoluteLocation1Center.x)*(mouseX-absoluteLocation1Center.x) + (mouseY-absoluteLocation1Center.y)*(mouseY-absoluteLocation1Center.y)) < insertRadius) {
		absoluteLocation1Clicked();
	} else if (Math.sqrt((mouseX-absoluteLocation2Center.x)*(mouseX-absoluteLocation2Center.x) + (mouseY-absoluteLocation2Center.y)*(mouseY-absoluteLocation2Center.y)) < insertRadius) {
		absoluteLocation2Clicked();
	} else if (Math.sqrt((mouseX-absoluteLocation3Center.x)*(mouseX-absoluteLocation3Center.x) + (mouseY-absoluteLocation3Center.y)*(mouseY-absoluteLocation3Center.y)) < insertRadius) {
		absoluteLocation3Clicked();
	} else if (Math.sqrt((mouseX-location4Center.x)*(mouseX-location4Center.x) + (mouseY-location4Center.y)*(mouseY-location4Center.y)) < insertRadius) {
		location4Clicked();
	} else if (mouseX >= rotateIconX && mouseX <= rotateIconX + rotateIconWidth && mouseY >= rotateIconY && mouseY <= rotateIconY + rotateIconHeight) {
		rotateIconClicked();
	} else if (mouseX >= swapIconX && mouseX <= swapIconX + swapIconWidth && mouseY >= swapIconY && mouseY <= swapIconY + swapIconHeight) {
		swapIconClicked();
	} else if (Math.sqrt((mouseX-baseCanvasCenter)*(mouseX-baseCanvasCenter) + (mouseY-baseCanvasCenter)*(mouseY-baseCanvasCenter)) < baseRadius) {
		baseClicked();
	}
}

function swapSpheres (sphere0,sphere1) {
	var firstLocation = eval(sphere0 + ".location");
	eval(sphere0 + ".location = " + sphere1 + ".location");
	eval(sphere1 + ".location = firstLocation");
	swapSphere0Selected = 0;
	updateSphereCoordinates();
	drawCanvases();
}

function absoluteLocation0Clicked () {
	if (rotateIconAlreadyClicked == 1) {
		if (base.rotation == 0) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 0) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		} else if (base.rotation == 1) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 3) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		} else if (base.rotation == 2) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 2) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		} else if (base.rotation == 3) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 1) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		}
	}
	
	if (swapIconAlreadyClicked == 1) {
		if (base.rotation == 0) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 0) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		} else if (base.rotation == 1) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 3) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		} else if (base.rotation == 2) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 2) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		} else if (base.rotation == 3) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 1) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		}
	}
	updateSphereCoordinates();
	drawCanvases();
}

function absoluteLocation1Clicked () {
	if (rotateIconAlreadyClicked == 1) {
		if (base.rotation == 0) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 1) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		} else if (base.rotation == 1) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 0) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		} else if (base.rotation == 2) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 3) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		} else if (base.rotation == 3) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 2) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		}
	}
	
	if (swapIconAlreadyClicked == 1) {
		if (base.rotation == 0) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 1) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		} else if (base.rotation == 1) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 0) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		} else if (base.rotation == 2) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 3) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		} else if (base.rotation == 3) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 2) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		}
	}
	updateSphereCoordinates();
	drawCanvases();
}

function absoluteLocation2Clicked () {
	if (rotateIconAlreadyClicked == 1) {
		if (base.rotation == 0) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 2) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		} else if (base.rotation == 1) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 1) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		} else if (base.rotation == 2) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 0) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		} else if (base.rotation == 3) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 3) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		}
	}
	
	if (swapIconAlreadyClicked == 1) {
		if (base.rotation == 0) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 2) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		} else if (base.rotation == 1) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 1) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		} else if (base.rotation == 2) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 0) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		} else if (base.rotation == 3) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 3) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		}
	}
	updateSphereCoordinates();
	drawCanvases();
}

function absoluteLocation3Clicked () {
	if (rotateIconAlreadyClicked == 1) {
		if (base.rotation == 0) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 3) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		} else if (base.rotation == 1) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 2) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		} else if (base.rotation == 2) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 1) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		} else if (base.rotation == 3) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 0) {
					eval("insert" + i + ".rotation++");
					eval("correctRotation(insert" + i + ")");
				}
			}
		}
	}
	
	if (swapIconAlreadyClicked == 1) {
		if (base.rotation == 0) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 3) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		} else if (base.rotation == 1) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 2) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		} else if (base.rotation == 2) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 1) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		} else if (base.rotation == 3) {
			for (i = 0; i < 5; i++) {
				if (eval("insert" + i + ".location") == 0) {
					if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
				}
			}
		}
	}
	updateSphereCoordinates();
	drawCanvases();
}

function location4Clicked () {
	if (rotateIconAlreadyClicked == 1) {
		for (i = 0; i < 5; i++) {
			if (eval("insert" + i + ".location") == 4) {
				eval("insert" + i + ".rotation++");
				eval("correctRotation(insert" + i + ")");
			}
		}
	}
	
	if (swapIconAlreadyClicked == 1) {
		for (i = 0; i < 5; i++) {
			if (eval("insert" + i + ".location") == 4) {
				if (swapSphere0Selected == 0) {
						eval("swapSphere0 = \"insert" + i + "\"");
						swapSphere0Selected = 1;
						return
					} else if (swapSphere0Selected == 1) {
						eval("swapSphere1 = \"insert" + i + "\"");
						swapSpheres(swapSphere0,swapSphere1);
						return
					}
			}
		}
	}
	updateSphereCoordinates();
	drawCanvases();
}

function baseClicked () {
	if (rotateIconAlreadyClicked == 1) {
		base.rotation++;
		correctRotation(base);
		for (i = 0; i < 5; i++) {
			if (eval("insert" + i + ".location") == 0) {
				eval("insert" + i + ".location = 3");
			} else if (eval("insert" + i + ".location") == 1) {
				eval("insert" + i + ".location = 0");
			} else if (eval("insert" + i + ".location") == 2) {
				eval("insert" + i + ".location = 1");
			} else if (eval("insert" + i + ".location") == 3) {
				eval("insert" + i + ".location = 2");
			}
		}
		drawCanvases();
	}
}

function rotateIconClicked () {
	if (rotateIconAlreadyClicked == 0) {
		swapSphere0Selected = 0;
		rotateIcon.src="graphics/rotateIconInv.svg"
		swapIcon.src="graphics/swapIcon.svg"
		rotateIconAlreadyClicked = 1;
		swapIconAlreadyClicked = 0;
		drawFinal();
	}
}

function swapIconClicked () {
	if (swapIconAlreadyClicked == 0) {
		rotateIcon.src="graphics/rotateIcon.svg"
		swapIcon.src="graphics/swapIconInv.svg"
		rotateIconAlreadyClicked = 0;
		swapIconAlreadyClicked = 1;
		drawFinal();
	}
}

function checkRotation (item) {
	for (i = 0; i < 4; i++) {
		if (item.rotation == i) {
			return "eval(\"ctx.rotate(Math.PI*(\" + i + \"/2))\")";
		}
	}
}

function uncheckRotation (item) {
	for (i = 0; i < 4; i++) {
		if (item.rotation == i) {
			return "eval(\"ctx.rotate(Math.PI*(-\" + i + \"/2))\")";
		}
	}
}

function drawBase () {
	baseCanvas.width = baseCanvas.width;
	document.getElementById("mainDiv").appendChild(baseCanvas);
	var ctx = baseCanvas.getContext("2d");
	ctx.translate(baseCanvasCenter,baseCanvasCenter);
	eval(checkRotation(base));
	ctx.lineWidth = lineWidthValue;
	
	// Draw right base piece.
	ctx.beginPath();
	ctx.arc(0,0,baseRadius,baseAngle-Math.PI/2,(Math.PI/2)-baseAngle);
	ctx.arc(0,insertDistance,insertRadius,(Math.PI/2)-insertAngle,insertAngle,true);
	ctx.lineTo(baseDiameter*(214.807/750),baseDiameter*(208.24/750));
	ctx.arcTo(baseDiameter*(247.323/750),baseDiameter*(208.24/750),baseDiameter*(273.899/750),baseDiameter*(181.664/750),baseDiameter*(78.5/750));
	ctx.lineTo(baseDiameter*(302.132/750),baseDiameter*(150.261/750));
	ctx.arcTo(baseDiameter*(332.234/750),baseDiameter*(116.778/750),baseDiameter*(300.348/750),baseDiameter*(84.99/750),baseDiameter*(47.51/750));
	ctx.arc(insertDistance,0,insertRadius,(Math.PI/4)-insertAngle,insertAngle-(Math.PI/2),true);
	ctx.lineTo(baseDiameter*(207.906/750),baseDiameter*(-145.164/750));
	ctx.arcTo(baseDiameter*(207.906/750),baseDiameter*(-208.235/750),baseDiameter*(144.87/750),baseDiameter*(-208.235/750),baseDiameter*(63.04/750));
	ctx.arc(0,-insertDistance,insertRadius,-insertAngle,insertAngle-(Math.PI/2),true);
	ctx.closePath();
	ctx.stroke();
	
	// Draw bottom-left base piece.
	ctx.beginPath();
	ctx.arc(0,0,baseRadius,Math.PI/2+baseAngle,Math.PI-baseAngle);
	ctx.arc(-insertDistance,0,insertRadius,Math.PI-insertAngle,insertAngle,true);
	ctx.arcTo(baseDiameter*(-18/750),baseDiameter*(18/750),baseDiameter*(-18/750),baseDiameter*(66.362/750),(baseDiameter*(66.362/750))-(baseDiameter*(18/750)));
	ctx.arc(0,insertDistance,insertRadius,(-Math.PI/2)-insertAngle,(Math.PI/2)+insertAngle,true);
	ctx.closePath();
	ctx.stroke();
	
	// Draw top-left base piece.
	ctx.beginPath();
	ctx.arc(0,0,baseRadius,Math.PI+baseAngle,(-Math.PI/2)-baseAngle);
	ctx.arc(0,-insertDistance,insertRadius,(-Math.PI/2)-insertAngle,Math.PI+insertAngle,true);
	ctx.lineTo(baseDiameter*(-215.095/750),baseDiameter*(-208.235/750));
	ctx.arcTo(baseDiameter*(-250.221/750),baseDiameter*(-208.235/750),baseDiameter*(-273.705/750),baseDiameter*(-181.879/750),baseDiameter*(79.1/750));
	ctx.lineTo(baseDiameter*(-302.26/750),baseDiameter*(-150.117/750));
	ctx.arcTo(baseDiameter*(-332.234/750),baseDiameter*(-116.778/750),baseDiameter*(-300.642/750),baseDiameter*(-84.968/750),baseDiameter*(47.42/750));
	ctx.arc(-insertDistance,0,insertRadius,(-Math.PI*(3/4))-insertAngle,Math.PI+insertAngle,true);
	ctx.closePath();
	ctx.stroke();
	
	// Draw middle base piece.
	ctx.beginPath();
	ctx.arc(0,-insertDistance,insertRadius,Math.PI-insertAngle,insertAngle,true);
	ctx.lineTo(baseDiameter*(144.87/705),baseDiameter*(-172.195/750));
	ctx.arcTo(baseDiameter*(171.885/750),baseDiameter*(-172.195/750),baseDiameter*(171.885/750),baseDiameter*(-145.164/750),baseDiameter*(25.29/750));
	ctx.arc(insertDistance,0,insertRadius,(-Math.PI/2)-insertAngle,(Math.PI/4)+insertAngle,true);
	ctx.lineTo(baseDiameter*(278.75/750),baseDiameter*(114.245/750));
	ctx.arcTo(baseDiameter*(282.64/750),baseDiameter*(118.096/750),baseDiameter*(278.981/750),baseDiameter*(122.165/750),baseDiameter*(5.71/750));
	ctx.lineTo(baseDiameter*(239.837/750),baseDiameter*(165.704/750));
	ctx.arcTo(baseDiameter*(234.177/750),baseDiameter*(172.195/750),baseDiameter*(225.711/750),baseDiameter*(172.195/750),baseDiameter*(19.41/750));
	ctx.arc(0,insertDistance,insertRadius,-insertAngle,insertAngle-(Math.PI/2),true);
	ctx.arcTo(baseDiameter*(18/750),baseDiameter*(-18/750),baseDiameter*(-66.362/750),baseDiameter*(-18/750),(baseDiameter*(66.362/750))+(baseDiameter*(18/750)));
	ctx.arc(-insertDistance,0,insertRadius,-insertAngle,insertAngle-(Math.PI*(3/4)),true);
	ctx.lineTo(baseDiameter*(-276.502/750),baseDiameter*(-111.871/750));
	ctx.arcTo(baseDiameter*(-282.639/750),baseDiameter*(-118.095/750),baseDiameter*(-276.795/750),baseDiameter*(-124.595/750),baseDiameter*(9.2/750));
	ctx.lineTo(baseDiameter*(-238.898/750),baseDiameter*(-166.748/750));
	ctx.arcTo(baseDiameter*(-234.176/750),baseDiameter*(-172.195/750),baseDiameter*(-227.115/750),baseDiameter*(-172.195/750),baseDiameter*(16.21/750));
	ctx.closePath();
	ctx.stroke();
	eval(uncheckRotation(base));
	ctx.translate(-baseCanvasCenter,-baseCanvasCenter);
}

function drawInsert0 () {
	insert0Canvas.width = insert0Canvas.width;
	document.getElementById("mainDiv").appendChild(insert0Canvas);
	var ctx = insert0Canvas.getContext("2d");
	ctx.translate(insert0CanvasCenter,insert0CanvasCenter);
	eval(checkRotation(insert0));
	ctx.lineWidth = lineWidthValue;
	
	ctx.beginPath();
	ctx.arc(0,0,insertRadius,insertAngle-(Math.PI/2),(Math.PI/2)-insertAngle);
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0,0,insertRadius,(-Math.PI/2)-insertAngle,(Math.PI/2)+insertAngle,true);
	ctx.closePath();
	ctx.stroke();
	eval(uncheckRotation(insert0));
	ctx.translate(-insert0CanvasCenter,-insert0CanvasCenter);
}

function drawInsert1 () {
	insert1Canvas.width = insert1Canvas.width;
	document.getElementById("mainDiv").appendChild(insert1Canvas);
	var ctx = insert1Canvas.getContext("2d");
	ctx.translate(insert1CanvasCenter,insert1CanvasCenter);
	eval(checkRotation(insert1));
	ctx.lineWidth = lineWidthValue;
	
	ctx.beginPath();
	ctx.arc(0,0,insertRadius,-insertAngle,insertAngle-(Math.PI/2),true);
	ctx.lineTo(insertDiameter*(18/250),insertDiameter*(-32.375/250));
	ctx.arcTo(insertDiameter*(18/250),insertDiameter*(-18/250),insertDiameter*(32.375/250),insertDiameter*(-18/250),(insertDiameter*(32.375/250))-(insertDiameter*(18/250)));
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0,0,insertRadius,insertAngle,-insertAngle-(Math.PI/2));
	ctx.lineTo(insertDiameter*(-18/250),insertDiameter*(-13.625/250));
	ctx.arcTo(insertDiameter*(-18/250),insertDiameter*(18/250),insertDiameter*(13.625/250),insertDiameter*(18/250),(insertDiameter*(18/250))+(insertDiameter*(13.625/250)));
	ctx.closePath();
	ctx.stroke();
	eval(uncheckRotation(insert1));
	ctx.translate(-insert1CanvasCenter,-insert1CanvasCenter);
}

function drawInsert2 () {
	insert2Canvas.width = insert2Canvas.width;
	document.getElementById("mainDiv").appendChild(insert2Canvas);
	var ctx = insert2Canvas.getContext("2d");
	ctx.translate(insert2CanvasCenter,insert2CanvasCenter);
	eval(checkRotation(insert2));
	ctx.lineWidth = lineWidthValue;
	
	ctx.beginPath();
	ctx.arc(0,0,insertRadius,-insertAngle,insertAngle-(Math.PI/2),true);
	ctx.lineTo(insertDiameter*(18/250),insertDiameter*(-32.375/250));
	ctx.arcTo(insertDiameter*(18/250),insertDiameter*(-18/250),insertDiameter*(32.375/250),insertDiameter*(-18/250),(insertDiameter*(32.375/250))-(insertDiameter*(18/250)));
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0,0,insertRadius,insertAngle,-insertAngle-(Math.PI/2));
	ctx.lineTo(insertDiameter*(-18/250),insertDiameter*(-13.625/250));
	ctx.arcTo(insertDiameter*(-18/250),insertDiameter*(18/250),insertDiameter*(13.625/250),insertDiameter*(18/250),(insertDiameter*(18/250))+(insertDiameter*(13.625/250)));
	ctx.closePath();
	ctx.stroke();
	eval(uncheckRotation(insert2));
	ctx.translate(-insert2CanvasCenter,-insert2CanvasCenter);
}

function drawInsert3 () {
	insert3Canvas.width = insert3Canvas.width;
	document.getElementById("mainDiv").appendChild(insert3Canvas);
	var ctx = insert3Canvas.getContext("2d");
	ctx.translate(insert3CanvasCenter,insert3CanvasCenter);
	ctx.rotate(Math.PI*(-3/4));
	eval(checkRotation(insert3));
	ctx.lineWidth = lineWidthValue;
	
	ctx.beginPath();
	ctx.arc(0,0,insertRadius,(Math.PI/4)-insertAngle,insertAngle-(Math.PI/2),true)
	ctx.lineTo(insertDiameter*(18/250),insertDiameter*(-29.819/250));
	ctx.arcTo(insertDiameter*(18/250),insertDiameter*(-7.456/250),insertDiameter*(33.813/250),insertDiameter*(8.358/250),insertDiameter*(54.25/250));
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0,0,insertRadius,(Math.PI/4)+insertAngle,-insertAngle - (Math.PI/2));
	ctx.arcTo(insertDiameter*(-18/250),insertDiameter*(7.456/250),insertDiameter*(-1.449/250),insertDiameter*(24.007/250),insertDiameter*(56.46/250));
	ctx.closePath();
	ctx.stroke();
	eval(uncheckRotation(insert3));
	ctx.rotate(Math.PI*(3/4));
	ctx.translate(-insert3CanvasCenter,-insert3CanvasCenter);
}

function drawInsert4 () {
	insert4Canvas.width = insert4Canvas.width;
	document.getElementById("mainDiv").appendChild(insert4Canvas);
	var ctx = insert4Canvas.getContext("2d");
	ctx.translate(insert4CanvasCenter,insert4CanvasCenter);
	eval(checkRotation(insert4));
	ctx.lineWidth = lineWidthValue;
	
	ctx.beginPath();
	ctx.arc(0,0,insertRadius,(Math.PI/4)-insertAngle,insertAngle-(Math.PI/2),true)
	ctx.lineTo(insertDiameter*(18/250),insertDiameter*(-29.819/250));
	ctx.arcTo(insertDiameter*(18/250),insertDiameter*(-7.456/250),insertDiameter*(33.813/250),insertDiameter*(8.358/250),insertDiameter*(54.25/250));
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0,0,insertRadius,(Math.PI/4)+insertAngle,-insertAngle - (Math.PI/2));
	ctx.arcTo(insertDiameter*(-18/250),insertDiameter*(7.456/250),insertDiameter*(-1.449/250),insertDiameter*(24.007/250),insertDiameter*(56.46/250));
	ctx.closePath();
	ctx.stroke();
	eval(uncheckRotation(insert4));
	ctx.translate(-insert4CanvasCenter,-insert4CanvasCenter);
}

function drawFinal () {
	
	document.getElementById("mainDiv").appendChild(finalCanvas);
	ctx = finalCanvas.getContext("2d");
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(0,0,finalCanvas.width,finalCanvas.height);
	ctx.strokeRect(0,0,finalCanvas.width,finalCanvas.height);
	ctx.drawImage(baseCanvas,0,0,baseCanvas.width,baseCanvas.width);
	ctx.drawImage(insert0Canvas,insert0.x,insert0.y,insert0Canvas.width,insert0Canvas.width);
	ctx.drawImage(insert1Canvas,insert1.x,insert1.y,insert1Canvas.width,insert1Canvas.width);
	ctx.drawImage(insert2Canvas,insert2.x,insert2.y,insert2Canvas.width,insert2Canvas.width);
	ctx.drawImage(insert3Canvas,insert3.x,insert3.y,insert3Canvas.width,insert3Canvas.width);
	ctx.drawImage(insert4Canvas,insert4.x,insert4.y,insert4Canvas.width,insert4Canvas.width);
	rotateIcon.addEventListener("load",function(){ctx.drawImage(rotateIcon,rotateIconX,rotateIconY,rotateIconWidth,rotateIconHeight)});
	swapIcon.addEventListener("load",function(){ctx.drawImage(swapIcon,swapIconX,swapIconY,rotateIconWidth,rotateIconHeight)});
}

/*==============================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
==============================================================================*/

function initialize () {
	
	// Clears instruction area.
	document.getElementById("solutionarea").value = "";
	
	//Declare useful strings.
	pathError = "Path Error!\nPath value is not between 0 and 2";
	baseRotationError = "Base Rotation Error!\nBase Rotation value is not between 0 and 3";
	insertRotationError = "Insert Rotation Error!\nInsert Rotation value is not between 0 and 3";
	rotateBaseError = "Error in function \"rotateBase\"";
	correctSolveRotationError = "Error in function \"correctSolveRotation\"";
	rotateInsertToError = "Error in function \"rotateInsertTo\"";
	rotateBaseToError = "Error in function \"rotateBaseTo\"";

	// Assign value for path.
	for (i = 0; i < 3; i++) {
		if (eval("document.getElementById(\"radioPath" + i + "\")").checked) {
			path = i;
		}
	}
	
	// Assign other values.
	base.solveRotation = base.rotation;
	insert0.solveLocation = insert0.location;
	insert0.solveRotation = insert0.rotation;
	insert1.solveLocation = insert1.location;
	insert1.solveRotation = insert1.rotation;
	insert2.solveLocation = insert2.location;
	insert2.solveRotation = insert2.rotation;
	insert3.solveLocation = insert3.location;
	insert3.solveRotation = insert3.rotation;
	insert4.solveLocation = insert4.location;
	insert4.solveRotation = insert4.rotation;
	
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
	originalInstructions = resFinal;
	startPlace = 2;
	fullInstructions = resFinal;
	restOfInstructions = resFinal;
	
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
	if (item.solveLocation == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,2);
		swapToMaray(item);
	} else if (item.solveLocation == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,2);
		hunrathGauntletMaray(item);
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,2);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,2);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 4) {
		rotateBaseTo(2);
		marayGauntletHunrath();
		rotateInsertTo(item,2);
		swapToMaray(item);
	}
}

function solvePath0Insert4 (item) {
	if (item.solveLocation == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		swapToMaray(item);
	} else if (item.solveLocation == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray(item);
		rotateBaseTo(1);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(1);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(1);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 4) {
		rotateBaseTo(1);
		marayGauntletHunrath();
		rotateInsertTo(item,1);
		swapToMaray(item);
	}
}

function solvePath0Insert2 (item) {
	if (item.solveLocation == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		swapToMaray(item);
	} else if (item.solveLocation == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray(item);
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 4) {
		rotateBaseTo(0);
		marayGauntletHunrath();
		rotateInsertTo(item,0);
		swapToMaray(item);
	}
}

function solvePath0Insert0 (item) {
	if (item.solveLocation == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		swapToMaray(item);
	} else if (item.solveLocation == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray(item);
		rotateBaseTo(3);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(3);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(3);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 4) {
		rotateBaseTo(3);
		marayGauntletHunrath();
		rotateInsertTo(item,0);
		swapToMaray(item);
	}
}

function solvePath1Insert1 (item) {
	if (item.solveLocation == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,2);
		swapToMaray(item);
	} else if (item.solveLocation == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,2);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,2);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,2);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 4) {
		rotateBaseTo(2);
		marayGauntletHunrath();
		rotateInsertTo(item,2);
		swapToMaray(item);
	}
}

function solvePath1Insert4 (item) {
	if (item.solveLocation == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		swapToMaray(item);
	} else if (item.solveLocation == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(1);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(1);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(1);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 4) {
		rotateBaseTo(1);
		marayGauntletHunrath();
		rotateInsertTo(item,1);
		swapToMaray(item);
	}
}

function solvePath1Insert2 (item) {
	if (item.solveLocation == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		swapToMaray(item);
	} else if (item.solveLocation == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 4) {
		rotateBaseTo(0);
		marayGauntletHunrath();
		rotateInsertTo(item,1);
		swapToMaray(item);
	}
}

function solvePath2Insert1 (item) {
	if (item.solveLocation == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		swapToMaray(item);
	} else if (item.solveLocation == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,1);
		hunrathGauntletMaray();
		rotateBaseTo(2);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 4) {
		rotateBaseTo(2);
		marayGauntletHunrath();
		rotateInsertTo(item,1);
		swapToMaray(item);
	}
}

function solvePath2Insert3 (item) {
	if (item.solveLocation == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		swapToMaray(item);
	} else if (item.solveLocation == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(3);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(3);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(3);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 4) {
		rotateBaseTo(3);
		marayGauntletHunrath();
		rotateInsertTo(item,0);
		swapToMaray(item);
	}
}

function solvePath2Insert0 (item) {
	if (item.solveLocation == 2) {
		rotateBaseTo(0);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		swapToMaray(item);
	} else if (item.solveLocation == 0) {
		rotateBaseTo(2);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 1) {
		rotateBaseTo(1);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 3) {
		rotateBaseTo(3);
		swapToHunrath(item);
		rotateInsertTo(item,0);
		hunrathGauntletMaray();
		rotateBaseTo(0);
		swapToHunrath(item);
		hunrathGauntletMaray();
	} else if (item.solveLocation == 4) {
		rotateBaseTo(0);
		marayGauntletHunrath();
		rotateInsertTo(item,0);
		swapToMaray(item);
	}
}

// End of functions that solve for a specific path and insert.

function rotateBase (rotationvalue) {
	
	// Rotate base and, consequently, each insert, except for the one in Hunrath. Does not rotate the insert in Hunrath.
	base.solveRotation = Number(base.solveRotation) + Number(rotationvalue);
	if (insert0.solveLocation >=0 && insert0.solveLocation <=3) {
		insert0.solveRotation = Number(insert0.solveRotation) + Number(rotationvalue);
	}
	if (insert1.solveLocation >=0 && insert1.solveLocation <=3) {
		insert1.solveRotation = Number(insert1.solveRotation) + Number(rotationvalue);
	}
	if (insert2.solveLocation >=0 && insert2.solveLocation <=3) {
		insert2.solveRotation = Number(insert2.solveRotation) + Number(rotationvalue);
	}
	if (insert3.solveLocation >=0 && insert3.solveLocation <=3) {
		insert3.solveRotation = Number(insert3.solveRotation) + Number(rotationvalue);
	}
	if (insert4.solveLocation >=0 && insert4.solveLocation <=3) {
		insert4.solveRotation = Number(insert4.solveRotation) + Number(rotationvalue);
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
	correctSolveRotation(base);
	correctSolveRotation(insert0);
	correctSolveRotation(insert1);
	correctSolveRotation(insert2);
	correctSolveRotation(insert3);
	correctSolveRotation(insert4);
}

function correctRotation (item) {
	// Keep rotation values between 0 and 3, inclusive.
	if (item.rotation >= 4) {
		item.rotation = Number(item.rotation) - 4;
	} else if (item.rotation <= -1) {
		item.rotation = Number(item.rotation) + 4;
	}
}


function correctSolveRotation (item) {
	// Keep rotation values between 0 and 3, inclusive.
	if (item.solveRotation >= 4) {
		item.solveRotation = Number(item.solveRotation) - 4;
	} else if (item.solveRotation <= -1) {
		item.solveRotation = Number(item.solveRotation) + 4;
	}
	if (item == insert0) {
		if (item.solveRotation >= 2) {
		item.solveRotation = Number(item.solveRotation) - 2;
		}
	}
}

function swapToHunrath (item) {
	
	// Swaps an insert from Maray to Hunrath. Also swaps the insert already in Hunrath to Maray.
	
	document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat("- Go to basement and swap to Hunrath.\n");
	
	if (item.solveLocation == 4) {
		if (base.solveRotation == 0) {
			if (insert0.solveLocation == 2) {
				insert0.solveLocation = 4;
				item.solveLocation = 2;
			} else if (insert1.solveLocation == 2) {
				insert1.solveLocation = 4;
				item.solveLocation = 2;
			} else if (insert2.solveLocation == 2) {
				insert2.solveLocation = 4;
				item.solveLocation = 2;
			} else if (insert3.solveLocation == 2) {
				insert3.solveLocation = 4;
				item.solveLocation = 2;
				} else if (insert4.solveLocation == 2) {
					insert4.solveLocation = 4;
					item.solveLocation = 2;
				}
		} else if (base.solveRotation == 1) {
			if (insert0.solveLocation == 1) {
				insert0.solveLocation = 4;
				item.solveLocation = 1;
			} else if (insert1.solveLocation == 1) {
				insert1.solveLocation = 4;
				item.solveLocation = 1;
			} else if (insert2.solveLocation == 1) {
				insert2.solveLocation = 4;
				item.solveLocation = 1;
			} else if (insert3.solveLocation == 1) {
				insert3.solveLocation = 4;
				item.solveLocation = 1;
			} else if (insert4.solveLocation == 1) {
				insert4.solveLocation = 4;
				item.solveLocation = 1;
			}
		} else if (base.solveRotation == 2) {
			if (insert0.solveLocation == 0) {
				insert0.solveLocation = 4;
				item.solveLocation = 0;
			} else if (insert1.solveLocation == 0) {
				insert1.solveLocation = 4;
				item.solveLocation = 0;
			} else if (insert2.solveLocation == 0) {
				insert2.solveLocation = 4;
				item.solveLocation = 0;
			} else if (insert3.solveLocation == 0) {
				insert3.solveLocation = 4;
				item.solveLocation = 0;
			} else if (insert4.solveLocation == 0) {
				insert4.solveLocation = 4;
				item.solveLocation = 0;
			}
		} else if (base.solveRotation == 3) {
			if (insert0.solveLocation == 3) {
				insert0.solveLocation = 4;
				item.solveLocation = 3;
			} else if (insert1.solveLocation == 3) {
				insert1.solveLocation = 4;
				item.solveLocation = 3;
			} else if (insert2.solveLocation == 3) {
				insert2.solveLocation = 4;
				item.solveLocation = 3;
			} else if (insert3.solveLocation == 3) {
				insert3.solveLocation = 4;
				item.solveLocation = 3;
			} else if (insert4.solveLocation == 3) {
				insert4.solveLocation = 4;
				item.solveLocation = 3;
			}
		}
		return
	}
	
	if (insert0.solveLocation == 4) {
		insert0.solveLocation = Number(item.solveLocation);
	} else if (insert1.solveLocation == 4) {
		insert1.solveLocation = Number(item.solveLocation);
	} else if (insert2.solveLocation == 4) {
		insert2.solveLocation = Number(item.solveLocation);
	} else if (insert3.solveLocation == 4) {
		insert3.solveLocation = Number(item.solveLocation);
	} else if (insert4.solveLocation == 4) {
		insert4.solveLocation = Number(item.solveLocation);
	}
	
	item.solveLocation = 4;
}

function swapToMaray (item) {
	
	// Swaps an insert from Hunrath to Maray. Also swaps the insert already in Maray to Hunrath.
	
	document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat("- Go to basement and swap to Maray.\n");
	
	if (base.solveRotation == 0) {
		if (insert0.solveLocation == 2) {
			insert0.solveLocation = 4;
			item.solveLocation = 2;
		} else if (insert1.solveLocation == 2) {
			insert1.solveLocation = 4;
			item.solveLocation = 2;
		} else if (insert2.solveLocation == 2) {
			insert2.solveLocation = 4;
			item.solveLocation = 2;
		} else if (insert3.solveLocation == 2) {
			insert3.solveLocation = 4;
			item.solveLocation = 2;
		} else if (insert4.solveLocation == 2) {
			insert4.solveLocation = 4;
			item.solveLocation = 2;
		}
	} else if (base.solveRotation == 1) {
		if (insert0.solveLocation == 1) {
			insert0.solveLocation = 4;
			item.solveLocation = 1;
		} else if (insert1.solveLocation == 1) {
			insert1.solveLocation = 4;
			item.solveLocation = 1;
		} else if (insert2.solveLocation == 1) {
			insert2.solveLocation = 4;
			item.solveLocation = 1;
		} else if (insert3.solveLocation == 1) {
			insert3.solveLocation = 4;
			item.solveLocation = 1;
		} else if (insert4.solveLocation == 1) {
			insert4.solveLocation = 4;
			item.solveLocation = 1;
		}
	} else if (base.solveRotation == 2) {
		if (insert0.solveLocation == 0) {
			insert0.solveLocation = 4;
			item.solveLocation = 0;
		} else if (insert1.solveLocation == 0) {
			insert1.solveLocation = 4;
			item.solveLocation = 0;
		} else if (insert2.solveLocation == 0) {
			insert2.solveLocation = 4;
			item.solveLocation = 0;
		} else if (insert3.solveLocation == 0) {
			insert3.solveLocation = 4;
			item.solveLocation = 0;
		} else if (insert4.solveLocation == 0) {
			insert4.solveLocation = 4;
			item.solveLocation = 0;
		}
	} else if (base.solveRotation == 3) {
		if (insert0.solveLocation == 3) {
			insert0.solveLocation = 4;
			item.solveLocation = 3;
		} else if (insert1.solveLocation == 3) {
			insert1.solveLocation = 4;
			item.solveLocation = 3;
		} else if (insert2.solveLocation == 3) {
			insert2.solveLocation = 4;
			item.solveLocation = 3;
		} else if (insert3.solveLocation == 3) {
			insert3.solveLocation = 4;
			item.solveLocation = 3;
		} else if (insert4.solveLocation == 3) {
			insert4.solveLocation = 4;
			item.solveLocation = 3;
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
	
	item.solveRotation = Number(item.solveRotation) + Number(rotationvalue);
	
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
	correctSolveRotation(base);
	correctSolveRotation(insert0);
	correctSolveRotation(insert1);
	correctSolveRotation(insert2);
	correctSolveRotation(insert3);
	correctSolveRotation(insert4);
}

function rotateInsertTo (item,rotationvalue) {
	
	//Determines how many times to rotate an insert to have it reach a specific rotation.
	
	if (item.solveRotation == 0) {
		if (rotationvalue == 1) {
			rotateInsert(item,1);
		} else if (rotationvalue == 2) {
			rotateInsert(item,2);
		} else if (rotationvalue == 3) {
			rotateInsert(item,-1);
		}
	} else if (item.solveRotation == 1) {
		if (rotationvalue == 0) {
			rotateInsert(item,-1);
		} else if (rotationvalue == 2) {
			rotateInsert(item,1);
		} else if (rotationvalue == 3) {
			rotateInsert(item,2);
		}
	} else if (item.solveRotation == 2) {
		if (rotationvalue == 0) {
			rotateInsert(item,2);
		} else if (rotationvalue == 1) {
			rotateInsert(item,-1);
		} else if (rotationvalue == 3) {
			rotateInsert(item,1);
		}
	} else if (item.solveRotation == 3) {
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
	
	if (base.solveRotation == 0) {
		if (rotationvalue == 1) {
			rotateBase(1);
		} else if (rotationvalue == 2) {
			rotateBase(2);
		} else if (rotationvalue == 3) {
			rotateBase(-1);
		}
	} else if (base.solveRotation == 1) {
		if (rotationvalue == 0) {
			rotateBase(-1);
		} else if (rotationvalue == 2) {
			rotateBase(1);
		} else if (rotationvalue == 3) {
			rotateBase(2);
		}
	} else if (base.solveRotation == 2) {
		if (rotationvalue == 0) {
			rotateBase(2);
		} else if (rotationvalue == 1) {
			rotateBase(-1);
		} else if (rotationvalue == 3) {
			rotateBase(1);
		}
	} else if (base.solveRotation == 3) {
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
	var res1 = str.replace("- Rotate insert twice either clockwise or counterclockwise.\n- Rotate insert once counterclockwise.","- Rotate insert once clockwise.");
	var res2 = res1.replace("- Rotate insert twice either clockwise or counterclockwise.\n- Rotate insert once clockwise.","- Rotate insert once counterclockwise.");
	var res3 = res2.replace("- Rotate insert once counterclockwise.\n- Rotate insert twice either clockwise or counterclockwise.","- Rotate insert once clockwise.");
	var res4 = res3.replace("- Rotate insert once clockwise.\n- Rotate insert twice either clockwise or counterclockwise.","- Rotate insert once counterclockwise.");
	var res5 = res4.replace("- Rotate insert once clockwise.\n- Rotate insert once counterclockwise.","");
	var res6 = res5.replace("- Rotate insert once counterclockwise.\n- Rotate insert once clockwise.","");
	var res7 = res6.replace("- Rotate base twice either clockwise or counterclockwise.\n- Rotate base once counterclockwise.","- Rotate base once clockwise.");
	var res8 = res7.replace("- Rotate base twice either clockwise or counterclockwise.\n- Rotate base once clockwise.","- Rotate base once counterclockwise.");
	var res9 = res8.replace("- Rotate base once counterclockwise.\n- Rotate base twice either clockwise or counterclockwise.","- Rotate base once clockwise.");
	var res10 = res9.replace("- Rotate base once clockwise.\n- Rotate base twice either clockwise or counterclockwise.","- Rotate base once counterclockwise.");
	var res11 = res10.replace("- Rotate base once clockwise.\n- Rotate base once counterclockwise.","");
	var res12 = res11.replace("- Rotate base once counterclockwise.\n- Rotate base once clockwise.","");
	var res13 = res12.replace("- Go to basement and swap to Maray.\n- Go to basement and swap to Hunrath.","");
	var res14 = res13.replace("- Go to basement and swap to Hunrath.\n- Go to basement and swap to Maray.","");
	var res15 = res14.replace("- Rotate base once clockwise.\n- Rotate base once clockwise.","- Rotate base twice either clockwise or counterclockwise.");
	var res16 = res15.replace("- Rotate base once counterclockwise.\n- Rotate base once counterclockwise.","- Rotate base twice either clockwise or counterclockwise.");
	var res17 = res16.replace("- Rotate insert twice either clockwise or counterclockwise.\n- Rotate insert twice either clockwise or counterclockwise.","");
	resFinal = res17.replace("\n\n","\n");
	document.getElementById("solutionarea").value = resFinal;
	
	// Remove extra line breaks at beginnning.
	var str2 = document.getElementById("solutionarea").value;
	var strLength = document.getElementById("solutionarea").value.length;
	if (str2.indexOf("\n") == 0) {
		var str3 = str2.slice(1);
		document.getElementById("solutionarea").value = str3;
	}
	
	removeSingleRotations("- Rotate insert twice either clockwise or counterclockwise.");
	removeSingleRotations("- Rotate insert once counterclockwise.");
	removeSingleRotations("- Rotate insert once clockwise.");
	removeSingleRotations("- Rotate base twice either clockwise or counterclockwise.");
	removeSingleRotations("- Rotate base once counterclockwise.");
	removeSingleRotations("- Rotate base once clockwise.");
	removeSingleRotations("- Go to basement and swap to Maray.");
	removeSingleRotations("- Go to basement and swap to Hunrath.");
}

function removeSingleRotations (item) {
	if (document.getElementById("solutionarea").value == item + "\n") {
		document.getElementById("solutionarea").value = "";
	} else if (document.getElementById("solutionarea").value == item + "\n\n") {
		document.getElementById("solutionarea").value = "";
	} else if (document.getElementById("solutionarea").value == item + "\n\n\n") {
		document.getElementById("solutionarea").value = "";
	}
}
