var allInstructions = {
    rotateMazeClockwise: "Rotate whole maze once clockwise.",
    rotateMaze2Times: "Rotate whole maze twice either clockwise or counterclockwise.",
    rotateMazeCounterclockwise: "Rotate whole maze once counterclockwise.",
    rotateInsertClockwise: "Rotate insert once clockwise.",
    rotateInsert2Times: "Rotate insert twice either clockwise or counterclockwise.",
    rotateInsertCounterclockwise: "Rotate insert once counterclockwise.",
    swapToMaray: "Swap insert to Maray.",
    swapToHunrath: "Swap insert to Hunrath.",
    tripleSwapToMaray: "Go to triple-swap area and swap to Maray. Return to the Maze.",
    tripleSwapToHunrath: "Go to triple-swap area and swap to Hunrath. Return to insert rotator."
};

var insertCanvas = [];
var insert = [];
var locale = [];
var absoluteLocale = [];

pageLoad();

window.onfocus = drawCanvases();

function pageLoad() {

    rotateIconAlreadyClicked = 0;
    swapIconAlreadyClicked = 0;
    swapSphere0Selected = 0;

    // Start canvas info.
    finalCanvas = document.createElement("canvas");
    finalCanvas.addEventListener("click", canvasClicked);
    finalCanvas.width = 600;
    finalCanvas.height = finalCanvas.width * (2 / 3);
    finalCanvasCenter = finalCanvas.width / 2;
    finalCanvasThird = finalCanvas.width / 3;

    baseCanvas = document.createElement("canvas");
    baseCanvas.width = finalCanvas.height;
    baseCanvas.height = baseCanvas.width;
    baseCanvasCenter = baseCanvas.width / 2;

    for (i = 0; i < 5; i++) {
        insertCanvas[i] = document.createElement("canvas");
        insertCanvas[i].height = insertCanvas[i].width = baseCanvas.width / 3;

        insertCanvas[i].center = insertCanvas[i].width / 2;
    }
    // End canvas info.

    baseDiameter = baseCanvas.width * (9 / 10);
    baseRadius = baseDiameter / 2;
    baseX = finalCanvasThird;
    baseY = finalCanvasCenter;
    insertDiameter = baseDiameter / 3;
    insertRadius = insertDiameter / 2;
    insertDistance = baseDiameter * (19 / 75);
    baseAngle = Math.asin(18 / 375);
    insertAngle = Math.asin(18 / 125);
    squareLength = insertDiameter / Math.sqrt(2);
    squareStartPoint = (insertCanvas[0].width - squareLength) / 2;

    // Start input variable creation.
    base = { rotation: 0 };
    path = 0;
    absoluteLocale[0] = { x: finalCanvasThird - insertCanvas[0].width / 2, y: finalCanvas.height / 2 - insertDistance - insertCanvas[0].width / 2 };
    absoluteLocale[1] = { x: finalCanvas.height / 2 + insertDistance - insertCanvas[1].width / 2, y: finalCanvasThird - insertCanvas[1].width / 2 };
    absoluteLocale[2] = { x: finalCanvasThird - insertCanvas[2].width / 2, y: finalCanvas.height / 2 + insertDistance - insertCanvas[2].width / 2 };
    absoluteLocale[3] = { x: finalCanvas.height / 2 - insertDistance - insertCanvas[3].width / 2, y: finalCanvasThird - insertCanvas[3].width / 2 };
    absoluteLocale[0].end = { x: finalCanvasThird - insertCanvas[0].width / 2 + insertCanvas[0].width, y: finalCanvas.height / 2 - insertDistance - insertCanvas[0].width / 2 + insertCanvas[0].width };
    absoluteLocale[1].end = { x: finalCanvas.height / 2 + insertDistance - insertCanvas[1].width / 2 + insertCanvas[1].width, y: finalCanvasThird - insertCanvas[1].width / 2 + insertCanvas[1].width };
    absoluteLocale[2].end = { x: finalCanvasThird - insertCanvas[2].width / 2 + insertCanvas[2].width, y: finalCanvas.height / 2 + insertDistance - insertCanvas[2].width / 2 + insertCanvas[2].width };
    absoluteLocale[3].end = { x: finalCanvas.height / 2 - insertDistance - insertCanvas[3].width / 2 + insertCanvas[3].width, y: finalCanvasThird - insertCanvas[3].width / 2 + insertCanvas[3].width };
    absoluteLocale[0].center = { x: (absoluteLocale[0].end.x + absoluteLocale[0].x) / 2, y: (absoluteLocale[0].end.y + absoluteLocale[0].y) / 2 };
    absoluteLocale[1].center = { x: (absoluteLocale[1].end.x + absoluteLocale[1].x) / 2, y: (absoluteLocale[1].end.y + absoluteLocale[1].y) / 2 };
    absoluteLocale[2].center = { x: (absoluteLocale[2].end.x + absoluteLocale[2].x) / 2, y: (absoluteLocale[2].end.y + absoluteLocale[2].y) / 2 };
    absoluteLocale[3].center = { x: (absoluteLocale[3].end.x + absoluteLocale[3].x) / 2, y: (absoluteLocale[3].end.y + absoluteLocale[3].y) / 2 };
    calculateLocations();
    locale[4] = { x: finalCanvasThird * 2 + insertDistance - insertCanvas[0].width / 2, y: finalCanvas.height / 2 + insertDistance - insertCanvas[0].width / 2 };
    locale[4].end = { x: finalCanvasThird * 2 + insertDistance - insertCanvas[0].width / 2 + insertCanvas[0].width, y: finalCanvas.height / 2 + insertDistance - insertCanvas[0].width / 2 + insertCanvas[0].width };
    locale[4].center = { x: (locale[4].end.x + locale[4].x) / 2, y: (locale[4].end.y + locale[4].y) / 2 };
    insert[0] = { location: 4, rotation: 1, solveLocation: 4, solveRotation: 1, x: 0, y: 0 };
    insert[1] = { location: 0, rotation: 2, solveLocation: 0, solveRotation: 2, x: 0, y: 0 };
    insert[2] = { location: 2, rotation: 1, solveLocation: 2, solveRotation: 1, x: 0, y: 0 };
    insert[3] = { location: 1, rotation: 3, solveLocation: 1, solveRotation: 3, x: 0, y: 0 };
    insert[4] = { location: 3, rotation: 2, solveLocation: 3, solveRotation: 2, x: 0, y: 0 };

    updateSphereCoordinates();
    // End input variable creation.

    rotateIconX = locale[4].x;
    rotateIconY = finalCanvas.height / 10;
    rotateIconWidth = insertDiameter;
    rotateIconHeight = insertDiameter / 2.5;
    swapIconX = rotateIconX;
    swapIconY = rotateIconY + finalCanvas.height / 7.5;
    swapIconWidth = insertDiameter;
    swapIconHeight = insertDiameter / 2.5;

    lineWidthValue = 1;

    drawCanvases();

}

function calculateLocations() {
    if (base.rotation == 0) {
        locale[0] = absoluteLocale[0];
        locale[1] = absoluteLocale[1];
        locale[2] = absoluteLocale[2];
        locale[3] = absoluteLocale[3];
    } else if (base.rotation == 1) {
        locale[0] = absoluteLocale[1];
        locale[1] = absoluteLocale[2];
        locale[2] = absoluteLocale[3];
        locale[3] = absoluteLocale[0];
    } else if (base.rotation == 2) {
        locale[0] = absoluteLocale[2];
        locale[1] = absoluteLocale[3];
        locale[2] = absoluteLocale[0];
        locale[3] = absoluteLocale[1];
    } else if (base.rotation == 3) {
        locale[0] = absoluteLocale[3];
        locale[1] = absoluteLocale[0];
        locale[2] = absoluteLocale[1];
        locale[3] = absoluteLocale[2];
    }
}

function updateSphereCoordinates() {
    calculateLocations();
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            if (insert[i].location == j) {
                insert[i].x = locale[j].x;
                insert[i].y = locale[j].y;
            }
        }
    }
}

function drawCanvases() {

    rotateIcon = new Image();
    swapIcon = new Image();
    if (rotateIconAlreadyClicked == 0) {
        rotateIcon.src = "https://static.wikia.nocookie.net/obduction_gamepedia/images/a/ae/MarayMazeRotateIcon.png";
    } else {
        rotateIcon.src = "https://static.wikia.nocookie.net/obduction_gamepedia/images/4/4a/MarayMazeRotateIconInv.png";
    }
    if (swapIconAlreadyClicked == 0) {
        swapIcon.src = "https://static.wikia.nocookie.net/obduction_gamepedia/images/5/5f/MarayMazeSwapIcon.png";
    } else {
        swapIcon.src = "https://static.wikia.nocookie.net/obduction_gamepedia/images/1/1c/MarayMazeSwapIconInv.png";
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
    document.getElementById("mainDiv").removeChild(insertCanvas[0]);
    document.getElementById("mainDiv").removeChild(insertCanvas[1]);
    document.getElementById("mainDiv").removeChild(insertCanvas[2]);
    document.getElementById("mainDiv").removeChild(insertCanvas[3]);
    document.getElementById("mainDiv").removeChild(insertCanvas[4]);

    initialize();
}

function canvasClicked(evt) {
    mouseX = evt.clientX - finalCanvas.getBoundingClientRect().left;
    mouseY = evt.clientY - finalCanvas.getBoundingClientRect().top;

    clickedOnLocation(mouseX, mouseY);
}


function clickedOnLocation(mouseX, mouseY) {
    if (Math.sqrt((mouseX - absoluteLocale[0].center.x) * (mouseX - absoluteLocale[0].center.x) + (mouseY - absoluteLocale[0].center.y) * (mouseY - absoluteLocale[0].center.y)) < insertRadius) {
        absoluteLocation0Clicked();
    } else if (Math.sqrt((mouseX - absoluteLocale[1].center.x) * (mouseX - absoluteLocale[1].center.x) + (mouseY - absoluteLocale[1].center.y) * (mouseY - absoluteLocale[1].center.y)) < insertRadius) {
        absoluteLocation1Clicked();
    } else if (Math.sqrt((mouseX - absoluteLocale[2].center.x) * (mouseX - absoluteLocale[2].center.x) + (mouseY - absoluteLocale[2].center.y) * (mouseY - absoluteLocale[2].center.y)) < insertRadius) {
        absoluteLocation2Clicked();
    } else if (Math.sqrt((mouseX - absoluteLocale[3].center.x) * (mouseX - absoluteLocale[3].center.x) + (mouseY - absoluteLocale[3].center.y) * (mouseY - absoluteLocale[3].center.y)) < insertRadius) {
        absoluteLocation3Clicked();
    } else if (Math.sqrt((mouseX - locale[4].center.x) * (mouseX - locale[4].center.x) + (mouseY - locale[4].center.y) * (mouseY - locale[4].center.y)) < insertRadius) {
        location4Clicked();
    } else if (mouseX >= rotateIconX && mouseX <= rotateIconX + rotateIconWidth && mouseY >= rotateIconY && mouseY <= rotateIconY + rotateIconHeight) {
        rotateIconClicked();
    } else if (mouseX >= swapIconX && mouseX <= swapIconX + swapIconWidth && mouseY >= swapIconY && mouseY <= swapIconY + swapIconHeight) {
        swapIconClicked();
    } else if (Math.sqrt((mouseX - baseCanvasCenter) * (mouseX - baseCanvasCenter) + (mouseY - baseCanvasCenter) * (mouseY - baseCanvasCenter)) < baseRadius) {
        baseClicked();
    }
}

function swapSpheres(sphere0, sphere1) {
    var firstLocation = sphere0.location;
    sphere0.location = sphere1.location;
    sphere1.location = firstLocation;
    swapSphere0Selected = 0;
    updateSphereCoordinates();
    drawCanvases();
}

function absoluteLocation0Clicked() {
    if (rotateIconAlreadyClicked == 1) {
        if (base.rotation == 0) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 0) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        } else if (base.rotation == 1) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 3) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        } else if (base.rotation == 2) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 2) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        } else if (base.rotation == 3) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 1) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        }
    }

    if (swapIconAlreadyClicked == 1) {
        if (base.rotation == 0) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 0) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        } else if (base.rotation == 1) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 3) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        } else if (base.rotation == 2) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 2) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        } else if (base.rotation == 3) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 1) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        }
    }
    updateSphereCoordinates();
    drawCanvases();
}

function absoluteLocation1Clicked() {
    if (rotateIconAlreadyClicked == 1) {
        if (base.rotation == 0) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 1) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        } else if (base.rotation == 1) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 0) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        } else if (base.rotation == 2) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 3) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        } else if (base.rotation == 3) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 2) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        }
    }

    if (swapIconAlreadyClicked == 1) {
        if (base.rotation == 0) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 1) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        } else if (base.rotation == 1) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 0) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        } else if (base.rotation == 2) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 3) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        } else if (base.rotation == 3) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 2) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        }
    }
    updateSphereCoordinates();
    drawCanvases();
}

function absoluteLocation2Clicked() {
    if (rotateIconAlreadyClicked == 1) {
        if (base.rotation == 0) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 2) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        } else if (base.rotation == 1) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 1) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        } else if (base.rotation == 2) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 0) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        } else if (base.rotation == 3) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 3) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        }
    }

    if (swapIconAlreadyClicked == 1) {
        if (base.rotation == 0) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 2) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        } else if (base.rotation == 1) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 1) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        } else if (base.rotation == 2) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 0) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        } else if (base.rotation == 3) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 3) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        }
    }
    updateSphereCoordinates();
    drawCanvases();
}

function absoluteLocation3Clicked() {
    if (rotateIconAlreadyClicked == 1) {
        if (base.rotation == 0) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 3) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        } else if (base.rotation == 1) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 2) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        } else if (base.rotation == 2) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 1) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        } else if (base.rotation == 3) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 0) {
                    insert[i].rotation++;
                    correctRotation(insert[i]);
                }
            }
        }
    }

    if (swapIconAlreadyClicked == 1) {
        if (base.rotation == 0) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 3) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        } else if (base.rotation == 1) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 2) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        } else if (base.rotation == 2) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 1) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        } else if (base.rotation == 3) {
            for (i = 0; i < 5; i++) {
                if (insert[i].location == 0) {
                    if (swapSphere0Selected == 0) {
                        swapSphere0 = insert[i];
                        swapSphere0Selected = 1;
                        return
                    } else if (swapSphere0Selected == 1) {
                        swapSphere1 = insert[i];
                        swapSpheres(swapSphere0, swapSphere1);
                        return
                    }
                }
            }
        }
    }
    updateSphereCoordinates();
    drawCanvases();
}

function location4Clicked() {
    if (rotateIconAlreadyClicked == 1) {
        for (i = 0; i < 5; i++) {
            if (insert[i].location == 4) {
                insert[i].rotation++;
                correctRotation(insert[i]);
            }
        }
    }

    if (swapIconAlreadyClicked == 1) {
        for (i = 0; i < 5; i++) {
            if (insert[i].location == 4) {
                if (swapSphere0Selected == 0) {
                    swapSphere0 = insert[i];
                    swapSphere0Selected = 1;
                    return
                } else if (swapSphere0Selected == 1) {
                    swapSphere1 = insert[i];
                    swapSpheres(swapSphere0, swapSphere1);
                    return
                }
            }
        }
    }
    updateSphereCoordinates();
    drawCanvases();
}

function baseClicked() {
    if (rotateIconAlreadyClicked == 1) {
        base.rotation++;
        correctRotation(base);
        for (i = 0; i < 5; i++) {
            if (insert[i].location == 0) {
                insert[i].location = 3;
            } else if (insert[i].location == 1) {
                insert[i].location = 0;
            } else if (insert[i].location == 2) {
                insert[i].location = 1;
            } else if (insert[i].location == 3) {
                insert[i].location = 2;
            }
        }
        drawCanvases();
    }
}

function rotateIconClicked() {
    if (rotateIconAlreadyClicked == 0) {
        swapSphere0Selected = 0;
        rotateIcon.src = "https://static.wikia.nocookie.net/obduction_gamepedia/images/4/4a/MarayMazeRotateIconInv.png"
        swapIcon.src = "https://static.wikia.nocookie.net/obduction_gamepedia/images/5/5f/MarayMazeSwapIcon.png"
        rotateIconAlreadyClicked = 1;
        swapIconAlreadyClicked = 0;
        drawFinal();
    }
}

function swapIconClicked() {
    if (swapIconAlreadyClicked == 0) {
        rotateIcon.src = "https://static.wikia.nocookie.net/obduction_gamepedia/images/a/ae/MarayMazeRotateIcon.png"
        swapIcon.src = "https://static.wikia.nocookie.net/obduction_gamepedia/images/1/1c/MarayMazeSwapIconInv.png"
        rotateIconAlreadyClicked = 0;
        swapIconAlreadyClicked = 1;
        drawFinal();
    }
}

function checkRotation(item, ctx) {
    for (i = 0; i < 4; i++) {
        if (item.rotation == i) {
            return ctx.rotate(Math.PI * (i / 2));
        }
    }
}

function uncheckRotation(item, ctx) {
    for (i = 0; i < 4; i++) {
        if (item.rotation == i) {
            return ctx.rotate(Math.PI * (-i / 2));
        }
    }
}

function drawBase() {
    baseCanvas.width = baseCanvas.width;
    document.getElementById("mainDiv").appendChild(baseCanvas);
    var ctx = baseCanvas.getContext("2d");
    ctx.translate(baseCanvasCenter, baseCanvasCenter);
    checkRotation(base, ctx);
    ctx.lineWidth = lineWidthValue;

    // Draw right base piece.
    ctx.beginPath();
    ctx.arc(0, 0, baseRadius, baseAngle - Math.PI / 2, (Math.PI / 2) - baseAngle);
    ctx.arc(0, insertDistance, insertRadius, (Math.PI / 2) - insertAngle, insertAngle, true);
    ctx.lineTo(baseDiameter * (214.807 / 750), baseDiameter * (208.24 / 750));
    ctx.arcTo(baseDiameter * (247.323 / 750), baseDiameter * (208.24 / 750), baseDiameter * (273.899 / 750), baseDiameter * (181.664 / 750), baseDiameter * (78.5 / 750));
    ctx.lineTo(baseDiameter * (302.132 / 750), baseDiameter * (150.261 / 750));
    ctx.arcTo(baseDiameter * (332.234 / 750), baseDiameter * (116.778 / 750), baseDiameter * (300.348 / 750), baseDiameter * (84.99 / 750), baseDiameter * (47.51 / 750));
    ctx.arc(insertDistance, 0, insertRadius, (Math.PI / 4) - insertAngle, insertAngle - (Math.PI / 2), true);
    ctx.lineTo(baseDiameter * (207.906 / 750), baseDiameter * (-145.164 / 750));
    ctx.arcTo(baseDiameter * (207.906 / 750), baseDiameter * (-208.235 / 750), baseDiameter * (144.87 / 750), baseDiameter * (-208.235 / 750), baseDiameter * (63.04 / 750));
    ctx.arc(0, -insertDistance, insertRadius, -insertAngle, insertAngle - (Math.PI / 2), true);
    ctx.closePath();
    ctx.stroke();

    // Draw bottom-left base piece.
    ctx.beginPath();
    ctx.arc(0, 0, baseRadius, Math.PI / 2 + baseAngle, Math.PI - baseAngle);
    ctx.arc(-insertDistance, 0, insertRadius, Math.PI - insertAngle, insertAngle, true);
    ctx.arcTo(baseDiameter * (-18 / 750), baseDiameter * (18 / 750), baseDiameter * (-18 / 750), baseDiameter * (66.362 / 750), (baseDiameter * (66.362 / 750)) - (baseDiameter * (18 / 750)));
    ctx.arc(0, insertDistance, insertRadius, (-Math.PI / 2) - insertAngle, (Math.PI / 2) + insertAngle, true);
    ctx.closePath();
    ctx.stroke();

    // Draw top-left base piece.
    ctx.beginPath();
    ctx.arc(0, 0, baseRadius, Math.PI + baseAngle, (-Math.PI / 2) - baseAngle);
    ctx.arc(0, -insertDistance, insertRadius, (-Math.PI / 2) - insertAngle, Math.PI + insertAngle, true);
    ctx.lineTo(baseDiameter * (-215.095 / 750), baseDiameter * (-208.235 / 750));
    ctx.arcTo(baseDiameter * (-250.221 / 750), baseDiameter * (-208.235 / 750), baseDiameter * (-273.705 / 750), baseDiameter * (-181.879 / 750), baseDiameter * (79.1 / 750));
    ctx.lineTo(baseDiameter * (-302.26 / 750), baseDiameter * (-150.117 / 750));
    ctx.arcTo(baseDiameter * (-332.234 / 750), baseDiameter * (-116.778 / 750), baseDiameter * (-300.642 / 750), baseDiameter * (-84.968 / 750), baseDiameter * (47.42 / 750));
    ctx.arc(-insertDistance, 0, insertRadius, (-Math.PI * (3 / 4)) - insertAngle, Math.PI + insertAngle, true);
    ctx.closePath();
    ctx.stroke();

    // Draw middle base piece.
    ctx.beginPath();
    ctx.arc(0, -insertDistance, insertRadius, Math.PI - insertAngle, insertAngle, true);
    ctx.lineTo(baseDiameter * (144.87 / 705), baseDiameter * (-172.195 / 750));
    ctx.arcTo(baseDiameter * (171.885 / 750), baseDiameter * (-172.195 / 750), baseDiameter * (171.885 / 750), baseDiameter * (-145.164 / 750), baseDiameter * (25.29 / 750));
    ctx.arc(insertDistance, 0, insertRadius, (-Math.PI / 2) - insertAngle, (Math.PI / 4) + insertAngle, true);
    ctx.lineTo(baseDiameter * (278.75 / 750), baseDiameter * (114.245 / 750));
    ctx.arcTo(baseDiameter * (282.64 / 750), baseDiameter * (118.096 / 750), baseDiameter * (278.981 / 750), baseDiameter * (122.165 / 750), baseDiameter * (5.71 / 750));
    ctx.lineTo(baseDiameter * (239.837 / 750), baseDiameter * (165.704 / 750));
    ctx.arcTo(baseDiameter * (234.177 / 750), baseDiameter * (172.195 / 750), baseDiameter * (225.711 / 750), baseDiameter * (172.195 / 750), baseDiameter * (19.41 / 750));
    ctx.arc(0, insertDistance, insertRadius, -insertAngle, insertAngle - (Math.PI / 2), true);
    ctx.arcTo(baseDiameter * (18 / 750), baseDiameter * (-18 / 750), baseDiameter * (-66.362 / 750), baseDiameter * (-18 / 750), (baseDiameter * (66.362 / 750)) + (baseDiameter * (18 / 750)));
    ctx.arc(-insertDistance, 0, insertRadius, -insertAngle, insertAngle - (Math.PI * (3 / 4)), true);
    ctx.lineTo(baseDiameter * (-276.502 / 750), baseDiameter * (-111.871 / 750));
    ctx.arcTo(baseDiameter * (-282.639 / 750), baseDiameter * (-118.095 / 750), baseDiameter * (-276.795 / 750), baseDiameter * (-124.595 / 750), baseDiameter * (9.2 / 750));
    ctx.lineTo(baseDiameter * (-238.898 / 750), baseDiameter * (-166.748 / 750));
    ctx.arcTo(baseDiameter * (-234.176 / 750), baseDiameter * (-172.195 / 750), baseDiameter * (-227.115 / 750), baseDiameter * (-172.195 / 750), baseDiameter * (16.21 / 750));
    ctx.closePath();
    ctx.stroke();
    uncheckRotation(base, ctx);
    ctx.translate(-baseCanvasCenter, -baseCanvasCenter);
}

function drawInsert0() {
    insertCanvas[0].width = insertCanvas[0].width; // Cleans canvas.
    document.getElementById("mainDiv").appendChild(insertCanvas[0]);
    var ctx = insertCanvas[0].getContext("2d");
    ctx.translate(insertCanvas[0].center, insertCanvas[0].center);
    checkRotation(insert[0], ctx);
    ctx.lineWidth = lineWidthValue;

    ctx.beginPath();
    ctx.arc(0, 0, insertRadius, insertAngle - (Math.PI / 2), (Math.PI / 2) - insertAngle);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, insertRadius, (-Math.PI / 2) - insertAngle, (Math.PI / 2) + insertAngle, true);
    ctx.closePath();
    ctx.stroke();
    uncheckRotation(insert[0], ctx);
    ctx.translate(-insertCanvas[0].center, -insertCanvas[0].center);
}

function drawInsert1() {
    insertCanvas[1].width = insertCanvas[1].width; // Cleans canvas.
    document.getElementById("mainDiv").appendChild(insertCanvas[1]);
    var ctx = insertCanvas[1].getContext("2d");
    ctx.translate(insertCanvas[0].center, insertCanvas[0].center);
    checkRotation(insert[1], ctx);
    ctx.lineWidth = lineWidthValue;

    ctx.beginPath();
    ctx.arc(0, 0, insertRadius, -insertAngle, insertAngle - (Math.PI / 2), true);
    ctx.lineTo(insertDiameter * (18 / 250), insertDiameter * (-32.375 / 250));
    ctx.arcTo(insertDiameter * (18 / 250), insertDiameter * (-18 / 250), insertDiameter * (32.375 / 250), insertDiameter * (-18 / 250), (insertDiameter * (32.375 / 250)) - (insertDiameter * (18 / 250)));
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, insertRadius, insertAngle, -insertAngle - (Math.PI / 2));
    ctx.lineTo(insertDiameter * (-18 / 250), insertDiameter * (-13.625 / 250));
    ctx.arcTo(insertDiameter * (-18 / 250), insertDiameter * (18 / 250), insertDiameter * (13.625 / 250), insertDiameter * (18 / 250), (insertDiameter * (18 / 250)) + (insertDiameter * (13.625 / 250)));
    ctx.closePath();
    ctx.stroke();
    uncheckRotation(insert[1], ctx);
    ctx.translate(-insertCanvas[0].center, -insertCanvas[0].center);
}

function drawInsert2() {
    insertCanvas[2].width = insertCanvas[2].width; // Cleans canvas.
    document.getElementById("mainDiv").appendChild(insertCanvas[2]);
    var ctx = insertCanvas[2].getContext("2d");
    ctx.translate(insertCanvas[0].center, insertCanvas[0].center);
    checkRotation(insert[2], ctx);
    ctx.lineWidth = lineWidthValue;

    ctx.beginPath();
    ctx.arc(0, 0, insertRadius, -insertAngle, insertAngle - (Math.PI / 2), true);
    ctx.lineTo(insertDiameter * (18 / 250), insertDiameter * (-32.375 / 250));
    ctx.arcTo(insertDiameter * (18 / 250), insertDiameter * (-18 / 250), insertDiameter * (32.375 / 250), insertDiameter * (-18 / 250), (insertDiameter * (32.375 / 250)) - (insertDiameter * (18 / 250)));
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, insertRadius, insertAngle, -insertAngle - (Math.PI / 2));
    ctx.lineTo(insertDiameter * (-18 / 250), insertDiameter * (-13.625 / 250));
    ctx.arcTo(insertDiameter * (-18 / 250), insertDiameter * (18 / 250), insertDiameter * (13.625 / 250), insertDiameter * (18 / 250), (insertDiameter * (18 / 250)) + (insertDiameter * (13.625 / 250)));
    ctx.closePath();
    ctx.stroke();
    uncheckRotation(insert[2], ctx);
    ctx.translate(-insertCanvas[0].center, -insertCanvas[0].center);
}

function drawInsert3() {
    insertCanvas[3].width = insertCanvas[3].width; // Cleans canvas.
    document.getElementById("mainDiv").appendChild(insertCanvas[3]);
    var ctx = insertCanvas[3].getContext("2d");
    ctx.translate(insertCanvas[0].center, insertCanvas[0].center);
    ctx.rotate(Math.PI * (-3 / 4));
    checkRotation(insert[3], ctx);
    ctx.lineWidth = lineWidthValue;

    ctx.beginPath();
    ctx.arc(0, 0, insertRadius, (Math.PI / 4) - insertAngle, insertAngle - (Math.PI / 2), true)
    ctx.lineTo(insertDiameter * (18 / 250), insertDiameter * (-29.819 / 250));
    ctx.arcTo(insertDiameter * (18 / 250), insertDiameter * (-7.456 / 250), insertDiameter * (33.813 / 250), insertDiameter * (8.358 / 250), insertDiameter * (54.25 / 250));
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, insertRadius, (Math.PI / 4) + insertAngle, -insertAngle - (Math.PI / 2));
    ctx.arcTo(insertDiameter * (-18 / 250), insertDiameter * (7.456 / 250), insertDiameter * (-1.449 / 250), insertDiameter * (24.007 / 250), insertDiameter * (56.46 / 250));
    ctx.closePath();
    ctx.stroke();
    uncheckRotation(insert[3], ctx);
    ctx.rotate(Math.PI * (3 / 4));
    ctx.translate(-insertCanvas[0].center, -insertCanvas[0].center);
}

function drawInsert4() {
    insertCanvas[4].width = insertCanvas[4].width; // Cleans canvas.
    document.getElementById("mainDiv").appendChild(insertCanvas[4]);
    var ctx = insertCanvas[4].getContext("2d");
    ctx.translate(insertCanvas[0].center, insertCanvas[0].center);
    checkRotation(insert[4], ctx);
    ctx.lineWidth = lineWidthValue;

    ctx.beginPath();
    ctx.arc(0, 0, insertRadius, (Math.PI / 4) - insertAngle, insertAngle - (Math.PI / 2), true)
    ctx.lineTo(insertDiameter * (18 / 250), insertDiameter * (-29.819 / 250));
    ctx.arcTo(insertDiameter * (18 / 250), insertDiameter * (-7.456 / 250), insertDiameter * (33.813 / 250), insertDiameter * (8.358 / 250), insertDiameter * (54.25 / 250));
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, insertRadius, (Math.PI / 4) + insertAngle, -insertAngle - (Math.PI / 2));
    ctx.arcTo(insertDiameter * (-18 / 250), insertDiameter * (7.456 / 250), insertDiameter * (-1.449 / 250), insertDiameter * (24.007 / 250), insertDiameter * (56.46 / 250));
    ctx.closePath();
    ctx.stroke();
    uncheckRotation(insert[4], ctx);
    ctx.translate(-insertCanvas[0].center, -insertCanvas[0].center);
}

function drawFinal() {

    document.getElementById("mainDiv").appendChild(finalCanvas);
    ctx = finalCanvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
    ctx.strokeRect(0, 0, finalCanvas.width, finalCanvas.height);
    ctx.drawImage(baseCanvas, 0, 0, baseCanvas.width, baseCanvas.width);
    ctx.drawImage(insertCanvas[0], insert[0].x, insert[0].y, insertCanvas[0].width, insertCanvas[0].width);
    ctx.drawImage(insertCanvas[1], insert[1].x, insert[1].y, insertCanvas[1].width, insertCanvas[1].width);
    ctx.drawImage(insertCanvas[2], insert[2].x, insert[2].y, insertCanvas[2].width, insertCanvas[2].width);
    ctx.drawImage(insertCanvas[3], insert[3].x, insert[3].y, insertCanvas[3].width, insertCanvas[3].width);
    ctx.drawImage(insertCanvas[4], insert[4].x, insert[4].y, insertCanvas[4].width, insertCanvas[4].width);
    rotateIcon.addEventListener("load", function() { ctx.drawImage(rotateIcon, rotateIconX, rotateIconY, rotateIconWidth, rotateIconHeight) });
    swapIcon.addEventListener("load", function() { ctx.drawImage(swapIcon, swapIconX, swapIconY, rotateIconWidth, rotateIconHeight) });
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

function initialize() {

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
        if (document.getElementById(`${"radioPath" + i}`).checked) {
            path = i;
        }
    }

    // Assign other values.
    base.solveRotation = base.rotation;
    insert[0].solveLocation = insert[0].location;
    insert[0].solveRotation = insert[0].rotation;
    insert[1].solveLocation = insert[1].location;
    insert[1].solveRotation = insert[1].rotation;
    insert[2].solveLocation = insert[2].location;
    insert[2].solveRotation = insert[2].rotation;
    insert[3].solveLocation = insert[3].location;
    insert[3].solveRotation = insert[3].rotation;
    insert[4].solveLocation = insert[4].location;
    insert[4].solveRotation = insert[4].rotation;

    // Solve for the chosen path.
    solvePuzzlelisimo();

    // Cleanup instructions. (Remove groups of instructions that essentially do nothing.)
    for (i = 0; i < 20; i++) {
        cleanupTextArea();
    }

    // Draw graphics.
    drawGraphics();
}

function drawGraphics() {

    document.getElementById("solutionTD").innerHTML = "";

    stepNumber = 1;
    originalInstructions = resFinal;
    startPlace = 2;
    fullInstructions = resFinal;
    restOfInstructions = resFinal;

    for (i = 0; i < 50; i++) {

        breakPlace = fullInstructions.indexOf("\n");
        currentInstruction = fullInstructions.slice(startPlace, breakPlace);

        if (currentInstruction == allInstructions.rotateMazeClockwise) {
            stepImage = document.createElement("img");
            stepImage.src = "https://obduction.gamepedia.com/media/obduction.gamepedia.com/0/0e/MarayMazeBaseC.png";
            stepImage.width = 100;
            stepImage.height = 100;
            buildDiv();
        } else if (currentInstruction == allInstructions.rotateMazeCounterclockwise) {
            stepImage = document.createElement("img");
            stepImage.src = "https://obduction.gamepedia.com/media/obduction.gamepedia.com/7/7b/MarayMazeBaseCC.png";
            stepImage.width = 100;
            stepImage.height = 100;
            buildDiv();
        } else if (currentInstruction == allInstructions.rotateMaze2Times) {
            stepImage = document.createElement("img");
            stepImage.src = "https://obduction.gamepedia.com/media/obduction.gamepedia.com/1/12/MarayMazeBase2.png";
            stepImage.width = 100;
            stepImage.height = 100;
            buildDiv();
        } else if (currentInstruction == allInstructions.swapToHunrath) {
            stepImage = document.createElement("img");
            stepImage.src = "https://obduction.gamepedia.com/media/obduction.gamepedia.com/c/c9/MarayMazeInsertH.png";
            stepImage.width = 100;
            stepImage.height = 100;
            buildDiv();
        } else if (currentInstruction == allInstructions.swapToMaray) {
            stepImage = document.createElement("img");
            stepImage.src = "https://obduction.gamepedia.com/media/obduction.gamepedia.com/e/ee/MarayMazeInsertM.png";
            stepImage.width = 100;
            stepImage.height = 100;
            buildDiv();
        } else if (currentInstruction == allInstructions.rotateInsertClockwise) {
            stepImage = document.createElement("img");
            stepImage.src = "https://obduction.gamepedia.com/media/obduction.gamepedia.com/9/99/MarayMazeInsertC.png";
            stepImage.width = 100;
            stepImage.height = 100;
            buildDiv();
        } else if (currentInstruction == allInstructions.rotateInsertCounterclockwise) {
            stepImage = document.createElement("img");
            stepImage.src = "https://obduction.gamepedia.com/media/obduction.gamepedia.com/1/19/MarayMazeInsertCC.png";
            stepImage.width = 100;
            stepImage.height = 100;
            buildDiv();
        } else if (currentInstruction == allInstructions.rotateInsert2Times) {
            stepImage = document.createElement("img");
            stepImage.src = "https://obduction.gamepedia.com/media/obduction.gamepedia.com/5/59/MarayMazeInsert2.png";
            stepImage.width = 100;
            stepImage.height = 100;
            buildDiv();
        } else if (currentInstruction == allInstructions.tripleSwapToMaray) {
            stepImage = document.createElement("img");
            stepImage.src = "https://obduction.gamepedia.com/media/obduction.gamepedia.com/9/9e/MarayMazeTripleM.png";
            stepImage.width = 100;
            stepImage.height = 100;
            buildDiv();
        } else if (currentInstruction == allInstructions.tripleSwapToHunrath) {
            stepImage = document.createElement("img");
            stepImage.src = "https://obduction.gamepedia.com/media/obduction.gamepedia.com/4/4c/MarayMazeTripleH.png";
            stepImage.width = 100;
            stepImage.height = 100;
            buildDiv();
        }

        restOfInstructions = fullInstructions.slice(breakPlace + 1);
        fullInstructions = restOfInstructions;

    }


}

function buildDiv() {
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

function solvePuzzlelisimo() {
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

function solvePath0() {
    // Solve Path 0.
    solvePath0Insert1(insert[1]);
    solvePath0Insert4(insert[4]);
    solvePath0Insert2(insert[2]);
    solvePath0Insert0(insert[0]);
}

function solvePath1() {
    // Solve Path 1.
    solvePath1Insert1(insert[1]);
    solvePath1Insert4(insert[4]);
    solvePath1Insert2(insert[2]);
}

function solvePath2() {
    // Solve Path 2.
    solvePath2Insert1(insert[1]);
    solvePath2Insert3(insert[3]);
    solvePath2Insert0(insert[0]);
}

// Start of functions that solve for a specific path and insert.

function solvePath0Insert1(item) {
    if (item.solveLocation == 0) {
        rotateBaseTo(2);
        swapToHunrath(item);
        rotateInsertTo(item, 2);
        swapToMaray(item);
    } else if (item.solveLocation == 1) {
        rotateBaseTo(1);
        swapToHunrath(item);
        rotateInsertTo(item, 2);
        hunrathGauntletMaray(item);
        rotateBaseTo(2);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 2) {
        rotateBaseTo(0);
        swapToHunrath(item);
        rotateInsertTo(item, 2);
        hunrathGauntletMaray();
        rotateBaseTo(2);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 3) {
        rotateBaseTo(3);
        swapToHunrath(item);
        rotateInsertTo(item, 2);
        hunrathGauntletMaray();
        rotateBaseTo(2);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 4) {
        rotateBaseTo(2);
        marayGauntletHunrath();
        rotateInsertTo(item, 2);
        swapToMaray(item);
    }
}

function solvePath0Insert4(item) {
    if (item.solveLocation == 1) {
        rotateBaseTo(1);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        swapToMaray(item);
    } else if (item.solveLocation == 0) {
        rotateBaseTo(2);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        hunrathGauntletMaray(item);
        rotateBaseTo(1);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 2) {
        rotateBaseTo(0);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        hunrathGauntletMaray();
        rotateBaseTo(1);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 3) {
        rotateBaseTo(3);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        hunrathGauntletMaray();
        rotateBaseTo(1);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 4) {
        rotateBaseTo(1);
        marayGauntletHunrath();
        rotateInsertTo(item, 1);
        swapToMaray(item);
    }
}

function solvePath0Insert2(item) {
    if (item.solveLocation == 2) {
        rotateBaseTo(0);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        swapToMaray(item);
    } else if (item.solveLocation == 0) {
        rotateBaseTo(2);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        hunrathGauntletMaray(item);
        rotateBaseTo(0);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 1) {
        rotateBaseTo(1);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        hunrathGauntletMaray();
        rotateBaseTo(0);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 3) {
        rotateBaseTo(3);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        hunrathGauntletMaray();
        rotateBaseTo(0);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 4) {
        rotateBaseTo(0);
        marayGauntletHunrath();
        rotateInsertTo(item, 0);
        swapToMaray(item);
    }
}

function solvePath0Insert0(item) {
    if (item.solveLocation == 3) {
        rotateBaseTo(3);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        swapToMaray(item);
    } else if (item.solveLocation == 0) {
        rotateBaseTo(2);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        hunrathGauntletMaray(item);
        rotateBaseTo(3);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 2) {
        rotateBaseTo(0);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        hunrathGauntletMaray();
        rotateBaseTo(3);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 1) {
        rotateBaseTo(1);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        hunrathGauntletMaray();
        rotateBaseTo(3);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 4) {
        rotateBaseTo(3);
        marayGauntletHunrath();
        rotateInsertTo(item, 0);
        swapToMaray(item);
    }
}

function solvePath1Insert1(item) {
    if (item.solveLocation == 0) {
        rotateBaseTo(2);
        swapToHunrath(item);
        rotateInsertTo(item, 2);
        swapToMaray(item);
    } else if (item.solveLocation == 3) {
        rotateBaseTo(3);
        swapToHunrath(item);
        rotateInsertTo(item, 2);
        hunrathGauntletMaray();
        rotateBaseTo(2);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 2) {
        rotateBaseTo(0);
        swapToHunrath(item);
        rotateInsertTo(item, 2);
        hunrathGauntletMaray();
        rotateBaseTo(2);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 1) {
        rotateBaseTo(1);
        swapToHunrath(item);
        rotateInsertTo(item, 2);
        hunrathGauntletMaray();
        rotateBaseTo(2);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 4) {
        rotateBaseTo(2);
        marayGauntletHunrath();
        rotateInsertTo(item, 2);
        swapToMaray(item);
    }
}

function solvePath1Insert4(item) {
    if (item.solveLocation == 1) {
        rotateBaseTo(1);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        swapToMaray(item);
    } else if (item.solveLocation == 3) {
        rotateBaseTo(3);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        hunrathGauntletMaray();
        rotateBaseTo(1);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 2) {
        rotateBaseTo(0);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        hunrathGauntletMaray();
        rotateBaseTo(1);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 0) {
        rotateBaseTo(2);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        hunrathGauntletMaray();
        rotateBaseTo(1);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 4) {
        rotateBaseTo(1);
        marayGauntletHunrath();
        rotateInsertTo(item, 1);
        swapToMaray(item);
    }
}

function solvePath1Insert2(item) {
    if (item.solveLocation == 2) {
        rotateBaseTo(0);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        swapToMaray(item);
    } else if (item.solveLocation == 3) {
        rotateBaseTo(3);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        hunrathGauntletMaray();
        rotateBaseTo(0);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 1) {
        rotateBaseTo(1);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        hunrathGauntletMaray();
        rotateBaseTo(0);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 0) {
        rotateBaseTo(2);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        hunrathGauntletMaray();
        rotateBaseTo(0);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 4) {
        rotateBaseTo(0);
        marayGauntletHunrath();
        rotateInsertTo(item, 1);
        swapToMaray(item);
    }
}

function solvePath2Insert1(item) {
    if (item.solveLocation == 0) {
        rotateBaseTo(2);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        swapToMaray(item);
    } else if (item.solveLocation == 3) {
        rotateBaseTo(3);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        hunrathGauntletMaray();
        rotateBaseTo(2);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 1) {
        rotateBaseTo(1);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        hunrathGauntletMaray();
        rotateBaseTo(2);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 2) {
        rotateBaseTo(0);
        swapToHunrath(item);
        rotateInsertTo(item, 1);
        hunrathGauntletMaray();
        rotateBaseTo(2);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 4) {
        rotateBaseTo(2);
        marayGauntletHunrath();
        rotateInsertTo(item, 1);
        swapToMaray(item);
    }
}

function solvePath2Insert3(item) {
    if (item.solveLocation == 3) {
        rotateBaseTo(3);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        swapToMaray(item);
    } else if (item.solveLocation == 0) {
        rotateBaseTo(2);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        hunrathGauntletMaray();
        rotateBaseTo(3);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 1) {
        rotateBaseTo(1);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        hunrathGauntletMaray();
        rotateBaseTo(3);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 2) {
        rotateBaseTo(0);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        hunrathGauntletMaray();
        rotateBaseTo(3);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 4) {
        rotateBaseTo(3);
        marayGauntletHunrath();
        rotateInsertTo(item, 0);
        swapToMaray(item);
    }
}

function solvePath2Insert0(item) {
    if (item.solveLocation == 2) {
        rotateBaseTo(0);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        swapToMaray(item);
    } else if (item.solveLocation == 0) {
        rotateBaseTo(2);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        hunrathGauntletMaray();
        rotateBaseTo(0);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 1) {
        rotateBaseTo(1);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        hunrathGauntletMaray();
        rotateBaseTo(0);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 3) {
        rotateBaseTo(3);
        swapToHunrath(item);
        rotateInsertTo(item, 0);
        hunrathGauntletMaray();
        rotateBaseTo(0);
        swapToHunrath(item);
        hunrathGauntletMaray();
    } else if (item.solveLocation == 4) {
        rotateBaseTo(0);
        marayGauntletHunrath();
        rotateInsertTo(item, 0);
        swapToMaray(item);
    }
}

// End of functions that solve for a specific path and insert.

function rotateBase(rotationvalue) {

    // Rotate base and, consequently, each insert, except for the one in Hunrath. Does not rotate the insert in Hunrath.
    base.solveRotation = Number(base.solveRotation) + Number(rotationvalue);
    if (insert[0].solveLocation >= 0 && insert[0].solveLocation <= 3) {
        insert[0].solveRotation = Number(insert[0].solveRotation) + Number(rotationvalue);
    }
    if (insert[1].solveLocation >= 0 && insert[1].solveLocation <= 3) {
        insert[1].solveRotation = Number(insert[1].solveRotation) + Number(rotationvalue);
    }
    if (insert[2].solveLocation >= 0 && insert[2].solveLocation <= 3) {
        insert[2].solveRotation = Number(insert[2].solveRotation) + Number(rotationvalue);
    }
    if (insert[3].solveLocation >= 0 && insert[3].solveLocation <= 3) {
        insert[3].solveRotation = Number(insert[3].solveRotation) + Number(rotationvalue);
    }
    if (insert[4].solveLocation >= 0 && insert[4].solveLocation <= 3) {
        insert[4].solveRotation = Number(insert[4].solveRotation) + Number(rotationvalue);
    }

    // Add readable instructions.
    if (rotationvalue == 1) {
        document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat(`- ${allInstructions.rotateMazeClockwise}\n`);
    } else if (rotationvalue == -1) {
        document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat(`- ${allInstructions.rotateMazeCounterclockwise}\n`);
    } else if (rotationvalue == 2) {
        document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat(`- ${allInstructions.rotateMaze2Times}\n`);
    } else {
        alert(rotateBaseError);
    }

    // Correct rotation values if they are too high or too low.
    correctSolveRotation(base);
    correctSolveRotation(insert[0]);
    correctSolveRotation(insert[1]);
    correctSolveRotation(insert[2]);
    correctSolveRotation(insert[3]);
    correctSolveRotation(insert[4]);
}

function correctRotation(item) {
    // Keep rotation values between 0 and 3, inclusive.
    if (item.rotation >= 4) {
        item.rotation = Number(item.rotation) - 4;
    } else if (item.rotation <= -1) {
        item.rotation = Number(item.rotation) + 4;
    }
}


function correctSolveRotation(item) {
    // Keep rotation values between 0 and 3, inclusive.
    if (item.solveRotation >= 4) {
        item.solveRotation = Number(item.solveRotation) - 4;
    } else if (item.solveRotation <= -1) {
        item.solveRotation = Number(item.solveRotation) + 4;
    }
    if (item == insert[0]) {
        if (item.solveRotation >= 2) {
            item.solveRotation = Number(item.solveRotation) - 2;
        }
    }
}

function swapToHunrath(item) {

    // Swaps an insert from Maray to Hunrath. Also swaps the insert already in Hunrath to Maray.

    document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat(`- ${allInstructions.swapToHunrath}\n`);

    if (item.solveLocation == 4) {
        if (base.solveRotation == 0) {
            if (insert[0].solveLocation == 2) {
                insert[0].solveLocation = 4;
                item.solveLocation = 2;
            } else if (insert[1].solveLocation == 2) {
                insert[1].solveLocation = 4;
                item.solveLocation = 2;
            } else if (insert[2].solveLocation == 2) {
                insert[2].solveLocation = 4;
                item.solveLocation = 2;
            } else if (insert[3].solveLocation == 2) {
                insert[3].solveLocation = 4;
                item.solveLocation = 2;
            } else if (insert[4].solveLocation == 2) {
                insert[4].solveLocation = 4;
                item.solveLocation = 2;
            }
        } else if (base.solveRotation == 1) {
            if (insert[0].solveLocation == 1) {
                insert[0].solveLocation = 4;
                item.solveLocation = 1;
            } else if (insert[1].solveLocation == 1) {
                insert[1].solveLocation = 4;
                item.solveLocation = 1;
            } else if (insert[2].solveLocation == 1) {
                insert[2].solveLocation = 4;
                item.solveLocation = 1;
            } else if (insert[3].solveLocation == 1) {
                insert[3].solveLocation = 4;
                item.solveLocation = 1;
            } else if (insert[4].solveLocation == 1) {
                insert[4].solveLocation = 4;
                item.solveLocation = 1;
            }
        } else if (base.solveRotation == 2) {
            if (insert[0].solveLocation == 0) {
                insert[0].solveLocation = 4;
                item.solveLocation = 0;
            } else if (insert[1].solveLocation == 0) {
                insert[1].solveLocation = 4;
                item.solveLocation = 0;
            } else if (insert[2].solveLocation == 0) {
                insert[2].solveLocation = 4;
                item.solveLocation = 0;
            } else if (insert[3].solveLocation == 0) {
                insert[3].solveLocation = 4;
                item.solveLocation = 0;
            } else if (insert[4].solveLocation == 0) {
                insert[4].solveLocation = 4;
                item.solveLocation = 0;
            }
        } else if (base.solveRotation == 3) {
            if (insert[0].solveLocation == 3) {
                insert[0].solveLocation = 4;
                item.solveLocation = 3;
            } else if (insert[1].solveLocation == 3) {
                insert[1].solveLocation = 4;
                item.solveLocation = 3;
            } else if (insert[2].solveLocation == 3) {
                insert[2].solveLocation = 4;
                item.solveLocation = 3;
            } else if (insert[3].solveLocation == 3) {
                insert[3].solveLocation = 4;
                item.solveLocation = 3;
            } else if (insert[4].solveLocation == 3) {
                insert[4].solveLocation = 4;
                item.solveLocation = 3;
            }
        }
        return
    }

    if (insert[0].solveLocation == 4) {
        insert[0].solveLocation = Number(item.solveLocation);
    } else if (insert[1].solveLocation == 4) {
        insert[1].solveLocation = Number(item.solveLocation);
    } else if (insert[2].solveLocation == 4) {
        insert[2].solveLocation = Number(item.solveLocation);
    } else if (insert[3].solveLocation == 4) {
        insert[3].solveLocation = Number(item.solveLocation);
    } else if (insert[4].solveLocation == 4) {
        insert[4].solveLocation = Number(item.solveLocation);
    }

    item.solveLocation = 4;
}

function swapToMaray(item) {

    // Swaps an insert from Hunrath to Maray. Also swaps the insert already in Maray to Hunrath.

    document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat(`- ${allInstructions.swapToMaray}\n`);

    if (base.solveRotation == 0) {
        if (insert[0].solveLocation == 2) {
            insert[0].solveLocation = 4;
            item.solveLocation = 2;
        } else if (insert[1].solveLocation == 2) {
            insert[1].solveLocation = 4;
            item.solveLocation = 2;
        } else if (insert[2].solveLocation == 2) {
            insert[2].solveLocation = 4;
            item.solveLocation = 2;
        } else if (insert[3].solveLocation == 2) {
            insert[3].solveLocation = 4;
            item.solveLocation = 2;
        } else if (insert[4].solveLocation == 2) {
            insert[4].solveLocation = 4;
            item.solveLocation = 2;
        }
    } else if (base.solveRotation == 1) {
        if (insert[0].solveLocation == 1) {
            insert[0].solveLocation = 4;
            item.solveLocation = 1;
        } else if (insert[1].solveLocation == 1) {
            insert[1].solveLocation = 4;
            item.solveLocation = 1;
        } else if (insert[2].solveLocation == 1) {
            insert[2].solveLocation = 4;
            item.solveLocation = 1;
        } else if (insert[3].solveLocation == 1) {
            insert[3].solveLocation = 4;
            item.solveLocation = 1;
        } else if (insert[4].solveLocation == 1) {
            insert[4].solveLocation = 4;
            item.solveLocation = 1;
        }
    } else if (base.solveRotation == 2) {
        if (insert[0].solveLocation == 0) {
            insert[0].solveLocation = 4;
            item.solveLocation = 0;
        } else if (insert[1].solveLocation == 0) {
            insert[1].solveLocation = 4;
            item.solveLocation = 0;
        } else if (insert[2].solveLocation == 0) {
            insert[2].solveLocation = 4;
            item.solveLocation = 0;
        } else if (insert[3].solveLocation == 0) {
            insert[3].solveLocation = 4;
            item.solveLocation = 0;
        } else if (insert[4].solveLocation == 0) {
            insert[4].solveLocation = 4;
            item.solveLocation = 0;
        }
    } else if (base.solveRotation == 3) {
        if (insert[0].solveLocation == 3) {
            insert[0].solveLocation = 4;
            item.solveLocation = 3;
        } else if (insert[1].solveLocation == 3) {
            insert[1].solveLocation = 4;
            item.solveLocation = 3;
        } else if (insert[2].solveLocation == 3) {
            insert[2].solveLocation = 4;
            item.solveLocation = 3;
        } else if (insert[3].solveLocation == 3) {
            insert[3].solveLocation = 4;
            item.solveLocation = 3;
        } else if (insert[4].solveLocation == 3) {
            insert[4].solveLocation = 4;
            item.solveLocation = 3;
        }
    }
}

function hunrathGauntletMaray() {

    // Prints instructions on how to return to Maray without swapping an insert.
    document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat(`- ${allInstructions.tripleSwapToMaray}\n`);
}

function marayGauntletHunrath() {

    // Prints instructions on how to return to Hunrath without swapping an insert.
    document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat(`- ${allInstructions.tripleSwapToHunrath}\n`);
}

function rotateInsert(item, rotationvalue) {

    // Rotates an insert in Hunrath.

    item.solveRotation = Number(item.solveRotation) + Number(rotationvalue);

    if (rotationvalue == 1) {
        document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat(`- ${allInstructions.rotateInsertClockwise}\n`);
    } else if (rotationvalue == -1) {
        document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat(`- ${allInstructions.rotateInsertCounterclockwise}\n`);
    } else if (rotationvalue == 2) {
        document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat(`- ${allInstructions.rotateInsert2Times}\n`);
    } else {
        alert(rotateBaseError);
    }

    // Correct rotation values if they are too high or too low.
    correctSolveRotation(base);
    correctSolveRotation(insert[0]);
    correctSolveRotation(insert[1]);
    correctSolveRotation(insert[2]);
    correctSolveRotation(insert[3]);
    correctSolveRotation(insert[4]);
}

function rotateInsertTo(item, rotationvalue) {

    //Determines how many times to rotate an insert to have it reach a specific rotation.

    if (item.solveRotation == 0) {
        if (rotationvalue == 1) {
            rotateInsert(item, 1);
        } else if (rotationvalue == 2) {
            rotateInsert(item, 2);
        } else if (rotationvalue == 3) {
            rotateInsert(item, -1);
        }
    } else if (item.solveRotation == 1) {
        if (rotationvalue == 0) {
            rotateInsert(item, -1);
        } else if (rotationvalue == 2) {
            rotateInsert(item, 1);
        } else if (rotationvalue == 3) {
            rotateInsert(item, 2);
        }
    } else if (item.solveRotation == 2) {
        if (rotationvalue == 0) {
            rotateInsert(item, 2);
        } else if (rotationvalue == 1) {
            rotateInsert(item, -1);
        } else if (rotationvalue == 3) {
            rotateInsert(item, 1);
        }
    } else if (item.solveRotation == 3) {
        if (rotationvalue == 0) {
            rotateInsert(item, 1);
        } else if (rotationvalue == 1) {
            rotateInsert(item, 2);
        } else if (rotationvalue == 2) {
            rotateInsert(item, -1);
        }
    } else {
        alert(rotateInsertToError);
    }
}

function addLineBreak() {

    // Used to add space between groups of instructions.

    document.getElementById("solutionarea").value = document.getElementById("solutionarea").value.concat("\n");
}

function rotateBaseTo(rotationvalue) {

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

function cleanupTextArea() {

    // Remove groups of instructions that essentially do nothing.

    var str = document.getElementById("solutionarea").value;
    var res1 = str.replace(`- ${allInstructions.rotateInsert2Times}\n- ${allInstructions.rotateInsertCounterclockwise}`, `- ${allInstructions.rotateInsertClockwise}`);
    var res2 = res1.replace(`- ${allInstructions.rotateInsert2Times}\n- ${allInstructions.rotateInsertClockwise}`, `- ${allInstructions.rotateInsertCounterclockwise}`);
    var res3 = res2.replace(`- ${allInstructions.rotateInsertCounterclockwise}\n- ${allInstructions.rotateInsert2Times}`, `- ${allInstructions.rotateInsertClockwise}`);
    var res4 = res3.replace(`- ${allInstructions.rotateInsertClockwise}\n- ${allInstructions.rotateInsert2Times}`, `- ${allInstructions.rotateInsertCounterclockwise}`);
    var res5 = res4.replace(`- ${allInstructions.rotateInsertClockwise}\n- ${allInstructions.rotateInsertCounterclockwise}`, "");
    var res6 = res5.replace(`- ${allInstructions.rotateInsertCounterclockwise}\n- ${allInstructions.rotateInsertClockwise}`, "");
    var res7 = res6.replace(`- ${allInstructions.rotateMaze2Times}\n- ${allInstructions.rotateMazeCounterclockwise}`, `- ${allInstructions.rotateMazeClockwise}`);
    var res8 = res7.replace(`- ${allInstructions.rotateMaze2Times}\n- ${allInstructions.rotateMazeClockwise}`, `- ${allInstructions.rotateMazeCounterclockwise}`);
    var res9 = res8.replace(`- ${allInstructions.rotateMazeCounterclockwise}\n- ${allInstructions.rotateMaze2Times}`, `- ${allInstructions.rotateMazeClockwise}`);
    var res10 = res9.replace(`- ${allInstructions.rotateMazeClockwise}\n- ${allInstructions.rotateMaze2Times}`, `- ${allInstructions.rotateMazeCounterclockwise}`);
    var res11 = res10.replace(`- ${allInstructions.rotateMazeClockwise}\n- ${allInstructions.rotateMazeCounterclockwise}`, "");
    var res12 = res11.replace(`- ${allInstructions.rotateMazeCounterclockwise}\n- ${allInstructions.rotateMazeClockwise}`, "");
    var res13 = res12.replace(`- ${allInstructions.swapToMaray}\n- ${allInstructions.swapToHunrath}`, "");
    var res14 = res13.replace(`- ${allInstructions.swapToHunrath}\n- ${allInstructions.swapToMaray}`, "");
    var res15 = res14.replace(`- ${allInstructions.rotateMazeClockwise}\n- ${allInstructions.rotateMazeClockwise}`, `- ${allInstructions.rotateMaze2Times}`);
    var res16 = res15.replace(`- ${allInstructions.rotateMazeCounterclockwise}\n- ${allInstructions.rotateMazeCounterclockwise}`, `- ${allInstructions.rotateMaze2Times}`);
    var res17 = res16.replace(`- ${allInstructions.rotateInsert2Times}\n- ${allInstructions.rotateInsert2Times}`, "");
    resFinal = res17.replace("\n\n", "\n");
    document.getElementById("solutionarea").value = resFinal;

    // Remove extra line breaks at beginnning.
    var str2 = document.getElementById("solutionarea").value;
    var strLength = document.getElementById("solutionarea").value.length;
    if (str2.indexOf("\n") == 0) {
        var str3 = str2.slice(1);
        document.getElementById("solutionarea").value = str3;
    }

    removeSingleRotations(`- ${allInstructions.rotateInsert2Times}`);
    removeSingleRotations(`- ${allInstructions.rotateInsertCounterclockwise}`);
    removeSingleRotations(`- ${allInstructions.rotateInsertClockwise}`);
    removeSingleRotations(`- ${allInstructions.rotateMaze2Times}`);
    removeSingleRotations(`- ${allInstructions.rotateMazeCounterclockwise}`);
    removeSingleRotations(`- ${allInstructions.rotateMazeClockwise}`);
    removeSingleRotations(`- ${allInstructions.swapToMaray}`);
    removeSingleRotations(`- ${allInstructions.swapToHunrath}`);
}

function removeSingleRotations(item) {
    if (document.getElementById("solutionarea").value == item + "\n") {
        document.getElementById("solutionarea").value = "";
    } else if (document.getElementById("solutionarea").value == item + "\n\n") {
        document.getElementById("solutionarea").value = "";
    } else if (document.getElementById("solutionarea").value == item + "\n\n\n") {
        document.getElementById("solutionarea").value = "";
    }
}