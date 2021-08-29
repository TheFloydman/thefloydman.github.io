var fileName = 'Slot1GameState.sav';
var offsetPlayerLocation = 150; // Number of bytes from end of variable name that value is located.
var offsetBoolean = 80; // Number of bytes from end of variable ID that value is located.
var offsetBasicInteger = 26; // Number of bytes from end of variable name that value is located.
var offsetInteger = 82; // Number of bytes from end of variable ID that value is located.

function fillPage() {
    // Clear any existing variables.
    document.getElementById('booleanSection').innerHTML = '';
    document.getElementById('integerSection').innerHTML = '';
    document.getElementById('positionSection').innerHTML = '';
    document.getElementById('floatSection').innerHTML = '';
    document.getElementById('positionSection').style.borderBottom = '1px black solid';
    document.getElementById('booleanSection').style.borderBottom = '1px black solid';
    document.getElementById('integerSection').style.borderBottom = '1px black solid';
    document.getElementById('floatSection').style.borderBottom = '1px black solid';

    // Add 'Save' button.
    var getSaveP = document.getElementById('saveP');
    getSaveP.innerHTML = '';
    var newSaveButton = document.createElement('button');
    newSaveButton.setAttribute('onmouseup', 'saveButtonPressed();');
    newSaveButton.innerHTML = 'Save';
    getSaveP.appendChild(newSaveButton);

    // Create inputs for player position.
    var positionTitleDiv = document.createElement('div');
    positionTitleDiv.className = 'sectionTitle';
    positionTitleDiv.appendChild(document.createTextNode('Player Position'));
    document.getElementById('positionSection').appendChild(positionTitleDiv);

    for (var i = 0; i < 3; i++) {

        if (i == 0) {
            var positionLetter = 'X';
        } else if (i == 1) {
            var positionLetter = 'Y';
        } else if (i == 2) {
            var positionLetter = 'Z';
        }

        var newInput = document.createElement('input');
        newInput.id = 'playerPosition' + positionLetter;
        newInput.type = 'text';
        newInput.setAttribute('onchange', 'editPlayerPosition(this.id,\'' + positionLetter + '\');');

        var textNodeIdentifier = document.createTextNode(positionLetter + ' Axis:');

        var positionDivMain = document.createElement('div');
        positionDivMain.id = 'positionDivMain' + String(i);
        positionDivMain.className = 'main';
        var positionDivIdentifier = document.createElement('div');
        positionDivIdentifier.id = 'positionDivIdentifier' + String(i);
        positionDivIdentifier.className = 'identifier';
        var positionSpanIdentifier = document.createElement('span');
        positionSpanIdentifier.id = 'positionSpanIdentifier' + String(i);
        positionSpanIdentifier.className = 'identifier';
        var positionDivInput = document.createElement('div');
        positionDivInput.id = 'positionDivInput' + String(i);
        positionDivInput.className = 'choices';
        positionSpanIdentifier.appendChild(textNodeIdentifier);
        positionDivIdentifier.appendChild(positionSpanIdentifier);
        positionDivInput.appendChild(newInput);
        positionDivMain.appendChild(positionDivIdentifier);
        positionDivMain.appendChild(positionDivInput);
        document.getElementById('positionSection').appendChild(positionDivMain);
    }

    // Create dropdown lists for float properties.
    var floatTitleDiv = document.createElement('div');
    floatTitleDiv.className = 'sectionTitle';
    floatTitleDiv.appendChild(document.createTextNode('Float Properties'));
    document.getElementById('floatSection').appendChild(floatTitleDiv);

    for (var i = 0; i < floatProperties.length; i++) {
        var newSelect = document.createElement('select');
        newSelect.id = floatProperties[i].id;
        newSelect.setAttribute('onchange', 'editFloatVariable(this.id,this.value)');

        for (var j = 0; j < floatProperties[i].options.length; j++) {
            var newOption = document.createElement('option');
            newOption.value = floatProperties[i].options[j];
            newOption.innerHTML = floatProperties[i].altOptions[j];
            newSelect.appendChild(newOption);
        }

        var textNodeIdentifier = document.createTextNode(floatProperties[i].identifier + ': ');

        var floatDivMain = document.createElement('div');
        floatDivMain.id = 'floatDivMain' + String(i);
        floatDivMain.className = 'main';
        var floatDivIdentifier = document.createElement('div');
        floatDivIdentifier.id = 'floatDivIdentifier' + String(i);
        floatDivIdentifier.className = 'identifier';
        var floatSpanIdentifier = document.createElement('span');
        floatSpanIdentifier.id = 'floatSpanIdentifier' + String(i);
        floatSpanIdentifier.className = 'identifier';
        var floatDivChoices = document.createElement('div');
        floatDivChoices.id = 'floatDivChoices' + String(i);
        floatDivChoices.className = 'choices';
        floatSpanIdentifier.appendChild(textNodeIdentifier);
        floatDivIdentifier.appendChild(floatSpanIdentifier);
        floatDivChoices.appendChild(newSelect);
        floatDivMain.appendChild(floatDivIdentifier);
        floatDivMain.appendChild(floatDivChoices);
        document.getElementById('floatSection').appendChild(floatDivMain);
    }

    // Create radio buttons for boolean properties.
    var booleanTitleDiv = document.createElement('div');
    booleanTitleDiv.className = 'sectionTitle';
    booleanTitleDiv.appendChild(document.createTextNode('Boolean Properties'));
    document.getElementById('booleanSection').appendChild(booleanTitleDiv);

    for (var i = 0; i < booleanProperties.length; i++) {
        var newInput1 = document.createElement('input');
        var newInput2 = document.createElement('input');
        newInput1.type = 'radio';
        newInput2.type = 'radio';
        newInput1.id = booleanProperties[i].trueId;
        newInput2.id = booleanProperties[i].falseId;
        newInput1.name = booleanProperties[i].name;
        newInput2.name = booleanProperties[i].name;
        newInput1.value = '1';
        newInput2.value = '0';
        newInput1.setAttribute('onchange', 'editBooleanVariable(this.name,this.value)');
        newInput2.setAttribute('onchange', 'editBooleanVariable(this.name,this.value)');

        var textNodeIdentifier = document.createTextNode(booleanProperties[i].identifier + ': ');
        var textNodeTrue = document.createTextNode(' ' + booleanProperties[i].trueText + ' ');
        var textNodeFalse = document.createTextNode(' ' + booleanProperties[i].falseText + ' ');

        var booleanDivMain = document.createElement('div');
        booleanDivMain.id = 'booleanDivMain' + String(i);
        booleanDivMain.className = 'main';
        var booleanDivIdentifier = document.createElement('div');
        booleanDivIdentifier.id = 'booleanDivIdentifier' + String(i);
        booleanDivIdentifier.className = 'identifier';
        var booleanSpanIdentifier = document.createElement('span');
        booleanSpanIdentifier.id = 'booleanSpanIdentifier' + String(i);
        booleanSpanIdentifier.className = 'identifier';
        var booleanDivChoices = document.createElement('div');
        booleanDivChoices.id = 'booleanDivChoices' + String(i);
        booleanDivChoices.className = 'choices';
        var booleanDivFirstChoice = document.createElement('div');
        booleanDivFirstChoice.id = 'booleanFirstChoice' + String(i);
        booleanDivFirstChoice.className = 'firstChoice'
        var booleanDivSecondChoice = document.createElement('div');
        booleanDivSecondChoice.id = 'booleanSecondChoice' + String(i);
        booleanDivSecondChoice.className = 'secondChoice'
        booleanSpanIdentifier.appendChild(textNodeIdentifier);
        booleanDivIdentifier.appendChild(booleanSpanIdentifier);
        booleanDivFirstChoice.appendChild(newInput1);
        booleanDivFirstChoice.appendChild(textNodeTrue);
        booleanDivSecondChoice.appendChild(newInput2);
        booleanDivSecondChoice.appendChild(textNodeFalse);
        booleanDivChoices.appendChild(booleanDivFirstChoice);
        booleanDivChoices.appendChild(booleanDivSecondChoice);
        booleanDivMain.appendChild(booleanDivIdentifier);
        booleanDivMain.appendChild(booleanDivChoices);
        document.getElementById('booleanSection').appendChild(booleanDivMain);
    }

    // Create dropdown lists for integer properties.
    var integerTitleDiv = document.createElement('div');
    integerTitleDiv.className = 'sectionTitle';
    integerTitleDiv.appendChild(document.createTextNode('Integer Properties'));
    document.getElementById('integerSection').appendChild(integerTitleDiv);

    for (var i = 0; i < integerProperties.length; i++) {
        var newSelect = document.createElement('select');
        newSelect.id = integerProperties[i].id;
        newSelect.setAttribute('onchange', 'editIntegerVariable(this.id,this.value)');

        for (var j = 0; j < integerProperties[i].options.length; j++) {
            var newOption = document.createElement('option');
            newOption.value = integerProperties[i].options[j];
            newOption.innerHTML = integerProperties[i].altOptions[j];
            newSelect.appendChild(newOption);
        }

        var textNodeIdentifier = document.createTextNode(integerProperties[i].identifier + ': ');

        var integerDivMain = document.createElement('div');
        integerDivMain.id = 'integerDivMain' + String(i);
        integerDivMain.className = 'main';
        var integerDivIdentifier = document.createElement('div');
        integerDivIdentifier.id = 'integerDivIdentifier' + String(i);
        integerDivIdentifier.className = 'identifier';
        var integerSpanIdentifier = document.createElement('span');
        integerSpanIdentifier.id = 'integerSpanIdentifier' + String(i);
        integerSpanIdentifier.className = 'identifier';
        var integerDivChoices = document.createElement('div');
        integerDivChoices.id = 'integerDivChoices' + String(i);
        integerDivChoices.className = 'choices';
        integerSpanIdentifier.appendChild(textNodeIdentifier);
        integerDivIdentifier.appendChild(integerSpanIdentifier);
        integerDivChoices.appendChild(newSelect);
        integerDivMain.appendChild(integerDivIdentifier);
        integerDivMain.appendChild(integerDivChoices);
        document.getElementById('integerSection').appendChild(integerDivMain);
    }

    for (var i = 0; i < basicIntegerProperties.length; i++) {
        var newSelect = document.createElement('select');
        newSelect.id = basicIntegerProperties[i].id;
        newSelect.setAttribute('onchange', 'editIntegerVariable(this.id,this.value)');

        for (var j = 0; j < basicIntegerProperties[i].options.length; j++) {
            var newOption = document.createElement('option');
            newOption.value = basicIntegerProperties[i].options[j];
            newOption.innerHTML = basicIntegerProperties[i].altOptions[j];
            newSelect.appendChild(newOption);
        }

        var textNodeIdentifier = document.createTextNode(basicIntegerProperties[i].identifier + ': ');

        var integerDivMain = document.createElement('div');
        integerDivMain.id = 'integerDivMain' + String(i);
        integerDivMain.className = 'main';
        var integerDivIdentifier = document.createElement('div');
        integerDivIdentifier.id = 'integerDivIdentifier' + String(i);
        integerDivIdentifier.className = 'identifier';
        var integerSpanIdentifier = document.createElement('span');
        integerSpanIdentifier.id = 'integerSpanIdentifier' + String(i);
        integerSpanIdentifier.className = 'identifier';
        var integerDivChoices = document.createElement('div');
        integerDivChoices.id = 'integerDivChoices' + String(i);
        integerDivChoices.className = 'choices';
        integerSpanIdentifier.appendChild(textNodeIdentifier);
        integerDivIdentifier.appendChild(integerSpanIdentifier);
        integerDivChoices.appendChild(newSelect);
        integerDivMain.appendChild(integerDivIdentifier);
        integerDivMain.appendChild(integerDivChoices);
        document.getElementById('integerSection').appendChild(integerDivMain);
    }
}

function loadButtonPressed() {
    // Do nothing if no file was selected.
    if (document.getElementById('loadFile').value == '') {
        return;
    } else {
        fileName = document.getElementById('loadFile').value.replace(/^.*?([^\\\/]*)$/, '$1');
    }

    fillPage();

    // Load a file the user chooses from the computer.
    var chosenFile = document.getElementById('loadFile').files;
    var loadedFile = chosenFile[0];
    var saveReader = new FileReader();
    saveReader.readAsArrayBuffer(loadedFile);
    saveReader.onloadend = function() {
        var uInt8DataView = new Uint8Array(this.result);
        fileView = Array.from(uInt8DataView);

        // Load player position.
        document.getElementById('playerPositionX').value = loadPlayerPosition('X', offsetPlayerLocation);
        document.getElementById('playerPositionY').value = loadPlayerPosition('Y', offsetPlayerLocation + 4);
        document.getElementById('playerPositionZ').value = loadPlayerPosition('Z', offsetPlayerLocation + 8);

        // Load boolean variables.
        for (var i = 0; i < booleanProperties.length; i++) {
            if (loadBooleanVariable(booleanProperties[i].name) == 0) {
                document.getElementById(booleanProperties[i].falseId).checked = true;
            } else if (loadBooleanVariable(booleanProperties[i].name) == 1) {
                document.getElementById(booleanProperties[i].trueId).checked = true;
            } else {
                console.log('Error: Boolean \'' + booleanProperties[i].name + '\' is not 0 or 1.');
            }
        }

        // Load integer variables.
        for (var i = 0; i < integerProperties.length; i++) {
            document.getElementById(integerProperties[i].id).value = loadIntegerVariable(integerProperties[i].id);
        }
        for (var i = 0; i < basicIntegerProperties.length; i++) {
            document.getElementById(basicIntegerProperties[i].id).value = loadBasicIntegerVariable(basicIntegerProperties[i].id);
        }

        // Load float variables.
        for (var i = 0; i < floatProperties.length; i++) {
            var floatArray = loadFloatVariable(floatProperties[i].id);
            var floatString = '';
            for (var k = 0; k < 4; k++) {
                floatString += String(floatArray[k]);
            }
            var floatStringReverse = '';
            for (var k = 3; k > -1; k--) {
                floatStringReverse += String(floatArray[k]);
            }
            var actualValue = hex2Float('0x' + floatStringReverse);
            for (var j = 0; j < floatProperties[i].options.length; j++) {
                let storedValue = hex2Float('0x' + floatProperties[i].options[j].substring(6) + floatProperties[i].options[j].substring(4, 6) + floatProperties[i].options[j].substring(2, 4) + floatProperties[i].options[j].substring(0, 2));
                if (Math.abs(actualValue - storedValue) < 0.5) {
                    document.getElementById(floatProperties[i].id).value = floatProperties[i].options[j];
                    break;
                }
            }
        }
    };
}

function hex2Float(hex) {
    let bin = (parseInt(hex, 16).toString(2)).padStart(32, '0');
    let sign = bin.substring(0, 1) === '0' ? 1 : -1;
    let exp = parseInt(bin.substring(1, 9), 2) - 127;
    let arr = bin.substring(9).split('').reverse();
    let mantissa = 1;
    for (var i = 1; i < 24; i++) {
        mantissa += arr[23 - i] * (2 ** -i);
    }
    return sign * (2 ** exp) * mantissa;
}

function saveButtonPressed() {
    var hexArray = new Uint8Array(fileView);
    var saveBlob = new Blob([hexArray], { type: 'application/octet-stream' });
    saveAs(saveBlob, fileName);
}

function loadPlayerPosition(axis, relLoc) {
    var varName = 'PlayerLocation';
    var varLoc = varName.length + relLoc;
    var stringArray = convertStringToDecArray(varName);
    var varIndex = searchArray(stringArray, fileView);
    var currentArray = [];
    for (var i = varIndex + varLoc, j = 0; j < 4; i++, j++) {
        currentArray[j] = fileView[i];
    }
    if (currentArray[0] == 0 && currentArray[1] == 0 && currentArray[2] == 0 && currentArray[3] == 0) {
        return 0;
    }
    var flippedArray = currentArray.reverse();
    var binaryFlippedArray = convertDecArrayToFilledBinArray(flippedArray);
    var currentFloat = '';
    for (var i = 0; i < 4; i++) {
        currentFloat += binaryFlippedArray[i];
    }
    return Number(float32Convert(currentFloat, false, 2));
}

function convertNumberToDec(inputNumber, inputBase) {
    var decimalNumber = 0;
    var minusAmount = 0;
    var decimalPlace = String(inputNumber).indexOf('.');
    for (var i = 0; i < String(inputNumber).length; i++) {
        // Skip the decimal.
        if (i == decimalPlace) {
            i = i + 1;
        }
        if (decimalPlace != -1) {
            minusAmount = String(inputNumber).length - i - Math.abs(decimalPlace - String(inputNumber).length) - 1;
            if (i > decimalPlace) {
                minusAmount = String(inputNumber).length - i - Math.abs(decimalPlace - String(inputNumber).length);
            }
            if (minusAmount >= 0 && inputNumber[i] != 0) {
                decimalNumber = decimalNumber + (inputNumber[i] * Math.pow(inputBase, minusAmount));
            } else if (minusAmount < 0 && inputNumber[i] != 0) {
                decimalNumber = decimalNumber + (1 / (inputNumber[i] * Math.pow(inputBase, Math.abs(minusAmount))));
            }
        } else {
            minusAmount = String(inputNumber).length - i - 1;
            decimalNumber = decimalNumber + (inputNumber[i] * Math.pow(inputBase, minusAmount));
        }
    }
    return decimalNumber;
}

function convertDecArrayToFilledBinArray(startingArray) {
    var endingArray = [];
    for (var i = 0; i < startingArray.length; i++) {
        endingArray[i] = startingArray[i].toString(2);
        if (String(endingArray[i]).length < 8) {
            for (var j = String(endingArray[i]).length; j < 8; j++) {
                endingArray[i] = '0' + endingArray[i];
            }
        }
    }
    return endingArray;
}

function editPlayerPosition(varName, positionLetter) {
    var hexName = 'PlayerLocation';
    if (positionLetter == 'X') {
        var varLoc = varName.length + offsetPlayerLocation - 1;
    } else if (positionLetter == 'Y') {
        var varLoc = varName.length + offsetPlayerLocation + 3;
    } else if (positionLetter == 'Z') {
        var varLoc = varName.length + offsetPlayerLocation + 7;
    }

    var inputValue = document.getElementById(varName).value;
    var stringArray = convertStringToDecArray(hexName);
    var varIndex = searchArray(stringArray, fileView);

    /* A zero position is a special exception. If a position is 0, the 32-bit
    float should be 00000000000000000000000000000000 or 0x00000000. */
    if (inputValue == 0) {
        for (var i = 0; i < 4; i++) {
            fileView[varIndex + varLoc + i] = 0;
        }
        return;
    }

    var finalBinary = float32Convert(inputValue, true, 2);
    var finalArray = [];
    for (var i = 0; i < 4; i++) {
        finalArray[i] = parseInt(finalBinary.slice(i * 8, (i * 8) + 8), 2);
    }

    var flippedFinalArray = finalArray.reverse();

    for (var i = 0; i < 4; i++) {
        fileView[varIndex + varLoc + i] = flippedFinalArray[i];
    }
}

function loadBooleanVariable(varName) {
    var varLoc = varName.length + offsetBoolean;
    var stringArray = convertStringToDecArray(varName);
    var varIndex = searchArray(stringArray, fileView);
    var answerArray = [];
    answerArray[0] = fileView[varIndex + varLoc]
    return answerArray[0];
}

function loadFloatVariable(varName) {
    var varLoc = varName.length + 28;
    var stringArray = convertStringToDecArray(varName);
    var varIndex = searchArray(stringArray, fileView);
    var answerArray = [];
    for (var i = 0; i < 4; i++) {
        answerArray[i] = fileView[varIndex + varLoc + i].toString(16);
        if (answerArray[i].length == 1) {
            answerArray[i] = '0' + answerArray[i];
        }
    }
    return answerArray;
}

function loadIntegerVariable(varName) {
    var varLoc = varName.length + offsetInteger;
    var stringArray = convertStringToDecArray(varName);
    var varIndex = searchArray(stringArray, fileView);
    var answer = fileView[varIndex + varLoc]
    return answer;
}

function loadBasicIntegerVariable(varName) {
    var varLoc = varName.length + offsetBasicInteger;
    var stringArray = convertStringToDecArray(varName);
    var varIndex = searchArray(stringArray, fileView);
    var answer = fileView[varIndex + varLoc]
    return answer;
}

function editBooleanVariable(varName, varValue) {
    var varLoc = varName.length + offsetBoolean;
    var stringArray = convertStringToDecArray(varName);
    var varIndex = searchArray(stringArray, fileView);
    fileView[varIndex + varLoc] = varValue;
}

function editFloatVariable(varName, varValue) {
    var varLoc = varName.length + 28;
    var stringArray = convertStringToDecArray(varName);
    var varIndex = searchArray(stringArray, fileView);
    var varArray = [];
    for (var i = 0, j = 0, k = 2; i < 4; i++, j += 2, k += 2) {
        varArray[i] = Number('0x' + varValue.slice(j, k));
    }
    for (var i = 0; i < 4; i++) {
        fileView[varIndex + varLoc + i] = varArray[i];
    }
}

function editIntegerVariable(varName, varValue) {
    var varLoc = varName.length + offsetInteger;
    var stringArray = convertStringToDecArray(varName);
    var varIndex = searchArray(stringArray, fileView);
    fileView[varIndex + varLoc] = varValue;
}

function editBasicIntegerVariable(varName, varValue) {
    var varLoc = varName.length + offsetBasicInteger;
    var stringArray = convertStringToDecArray(varName);
    var varIndex = searchArray(stringArray, fileView);
    fileView[varIndex + varLoc] = varValue;
}

function convertStringToDecArray(plainString) {
    var convertedArray = [];
    for (var i = 0; i < plainString.length; i++) {
        convertedArray[i] = plainString.charCodeAt(i);
    }
    return convertedArray;
}

function convertDecArrayToString(plainArray) {
    var convertedString = '';
    for (var i = 0; i < plainArray.length; i++) {
        convertedString = convertedString + String.fromCharCode(plainArray[i]);
    }
    return convertedString;
}

function searchArray(varString, varArray, startNumber) {
    // Find the first instance of the first letter.
    var startIndex = varArray.indexOf(varString[0], startNumber);
    // If any letter doesn't match, search for the next instance of the first letter.
    for (var i = 0; i < varString.length; i++) {
        if (varString[i] != varArray[startIndex + i]) {
            startIndex = varArray.indexOf(varString[0], startIndex + 1);
            i = -1;
        }
    }
    return startIndex;
}