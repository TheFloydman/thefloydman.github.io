function fillPage () {
	// Clear any existing variables.
	document.getElementById('stringSection').innerHTML = '';
	document.getElementById('booleanSection').innerHTML = '';
	document.getElementById('integerSection').innerHTML = '';
	document.getElementById('positionSection').innerHTML = '';
	document.getElementById('floatSection').innerHTML = '';
	document.getElementById('positionSection').style.borderBottom = '1px black solid';
	document.getElementById('stringSection').style.borderBottom = '1px black solid';
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
	positionTitleDiv.appendChild(document.createTextNode('Player Position (This should not be used to move long distances, as the ground might not be loaded, and you will fall through. If you find yourself trapped somewhere, and you already have access to the Tree in your area, set the position to (0,0,0) to move to the Tree.)'));
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

	// Create dropdown lists for string properties.
	var stringTitleDiv = document.createElement('div');
	stringTitleDiv.className = 'sectionTitle';
	stringTitleDiv.appendChild(document.createTextNode('String Properties'));
	document.getElementById('stringSection').appendChild(stringTitleDiv);

	for (var i = 0; i < stringProperties.length; i++) {
		var newSelect = document.createElement('select');
		newSelect.id = stringProperties[i].id;
		newSelect.setAttribute('onchange', 'editStringVariable(this.id,[0])');

		for (var j = 0; j < stringProperties[i].options.length; j++) {
			var newOption = document.createElement('option');
			newOption.value = stringProperties[i].options[j];
			newOption.innerHTML = stringProperties[i].altOptions[j];
			newSelect.appendChild(newOption);
		}

		var textNodeIdentifier = document.createTextNode(stringProperties[i].identifier + ': ');

		var stringDivMain = document.createElement('div');
		stringDivMain.id = 'stringDivMain' + String(i);
		stringDivMain.className = 'main';
		var stringDivIdentifier = document.createElement('div');
		stringDivIdentifier.id = 'stringDivIdentifier' + String(i);
		stringDivIdentifier.className = 'identifier';
		var stringSpanIdentifier = document.createElement('span');
		stringSpanIdentifier.id = 'stringSpanIdentifier' + String(i);
		stringSpanIdentifier.className = 'identifier';
		var stringDivChoices = document.createElement('div');
		stringDivChoices.id = 'stringDivChoices' + String(i);
		stringDivChoices.className = 'choices';
		stringSpanIdentifier.appendChild(textNodeIdentifier);
		stringDivIdentifier.appendChild(stringSpanIdentifier);
		stringDivChoices.appendChild(newSelect);
		stringDivMain.appendChild(stringDivIdentifier);
		stringDivMain.appendChild(stringDivChoices);
		document.getElementById('stringSection').appendChild(stringDivMain);
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
}

function loadButtonPressed() {
	// Do nothing if no file was selected.
	if (document.getElementById('loadFile').value == '') {
		return;
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

		// Load game version.
		loadGameVersion();

		// Load player position.
		document.getElementById('playerPositionX').value = loadPlayerPosition('X', 56);
		document.getElementById('playerPositionY').value = loadPlayerPosition('Y', 60);
		document.getElementById('playerPositionZ').value = loadPlayerPosition('Z', 64);

		// Load string variables.
		for (var i = 0; i < stringProperties.length; i++) {
			document.getElementById(stringProperties[i].id).value = loadStringVariable(stringProperties[i].id);
		}

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

		// Load float variables.
		for (var i = 0; i < floatProperties.length; i++) {
			var floatArray = loadFloatVariable(floatProperties[i].id);
			var floatString = '';
			for (var k = 0; k < 4; k++) {
				floatString += String(floatArray[k]);
			}
			for (var j = 0; j < floatProperties[i].options.length; j++) {
				if (floatString == floatProperties[i].options[j]) {
					document.getElementById(floatProperties[i].id).value = floatProperties[i].options[j];
					break;
				}
			}
		}
	};
}

function saveButtonPressed () {
	var hexArray = new Uint8Array(fileView);
	var saveBlob = new Blob([hexArray], {type: 'application/octet-stream'});
	var fileName = 'GameState.sav';
	saveAs(saveBlob, fileName);
}

function loadGameVersion () {
	for (var i = 248; i < 255; i++) {
		if (fileView[8] == i) {
			var versionString = ('Game Version: 1.' + String(i - 248));
			document.getElementById('gameversion').innerHTML = versionString;
		}
	}
}

function loadPlayerPosition (axis,relLoc) {
	var varName = 'PlayerPosition';
	var varLoc = varName.length + relLoc;
	var stringArray = convertStringToDecArray(varName);
	var varIndex = searchArray(stringArray,fileView);
	var currentArray = [];
	for (var i = varIndex + varLoc, j = 0; j < 4; i++, j++) {
		currentArray[j] = fileView[i];
	}
	if (currentArray[0] == 0 && currentArray[1] == 0 && currentArray[2] == 0 && currentArray[3] == 0) {
		currentPosition = 0;
		return currentPosition;
	}
	var flippedArray = flipArray(currentArray);
	var binaryFlippedArray = convertDecArrayToFilledBinArray(flippedArray);
	var currentFloat = '';
	for (var i = 0; i < 4; i++) {
		currentFloat += binaryFlippedArray[i];
	}
	if (currentFloat[0] == 0) {
		var floatSign = 1;
	} else {
		var floatSign = -1;
	}
	var binaryExponent = '';
	for (var i = 1; i < 9; i++) {
		binaryExponent += String(currentFloat[i]);
	}
	var floatExponent = convertNumberToDec(binaryExponent, 2) - 127;
	var binaryMantissa = '';
	for (var i = 9; i < 32; i++) {
		binaryMantissa += String(currentFloat[i]);
	}
	binaryMantissa = '1.' + binaryMantissa;
	var floatMantissa = convertNumberToDec(binaryMantissa, 2);
	if (floatExponent >= 0) {
		var currentPosition = floatSign * Math.pow(2, floatExponent) * floatMantissa;
	} else {
		var currentPosition = floatSign * (1/Math.pow(2, Math.abs(floatExponent))) * floatMantissa;
	}
	return currentPosition;
}

function convertNumberToDec (inputNumber, inputBase) {
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
				decimalNumber = decimalNumber + (1/(inputNumber[i] * Math.pow(inputBase, Math.abs(minusAmount))));
			}
		} else {
			minusAmount = String(inputNumber).length - i - 1;
			decimalNumber = decimalNumber + (inputNumber[i] * Math.pow(inputBase, minusAmount));
		}
	}
	return decimalNumber;
}

function flipArray (startingArray) {
	var endingArray = [];
	for (var i = 0, j = startingArray.length - 1; i < startingArray.length; i++, j--) {
		endingArray[i] = startingArray[j];
	}
	return endingArray;
}

function convertDecArrayToFilledBinArray (startingArray) {
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

function editPlayerPosition (varName, positionLetter) {
	var hexName = 'PlayerPosition';
	if (positionLetter == 'X') {
		var varLoc = varName.length + 55;
	} else if (positionLetter == 'Y') {
		var varLoc = varName.length + 59;
	} else if (positionLetter == 'Z') {
		var varLoc = varName.length + 63;
	}

	var inputValue = document.getElementById(varName).value;
	var stringArray = convertStringToDecArray(hexName);
	var varIndex = searchArray(stringArray,fileView);

	// A zero position is a special exception. If a position is 0, the 32-bit float should be 00000000000000000000000000000000.
	if (inputValue == 0) {
		for (var i = 0; i < 4; i++) {
			fileView[varIndex + varLoc + i] = 0;
		}
		return;
	}

	// Determine if number is positive or negative. Removing the sign now avoids problems down the line.
	var adjustedSign = (inputValue >= 0) ? 0:1;
	inputValue = Math.abs(inputValue);

	// Determine binary integral.
	var integralValue = Math.floor(inputValue);
	var integralBits = [];
	for (var i = 0; integralValue != 0; i++) {
		integralBits[i] = (integralValue/2 == Math.floor(integralValue/2)) ? 0:1;
		integralValue = Math.floor(integralValue/2)
	}
	var integralBitsFlipped = flipArray(integralBits);
	var integralBitsString = '';
	for (var i = 0; i < integralBitsFlipped.length; i++) {
		integralBitsString += String(integralBitsFlipped[i]);
	}
	if (integralBitsString.charAt(0) == '') { integralBitsString = '0' }

	// Determine binary fraction.
	var fractionValue = inputValue - Math.floor(inputValue);
	var fractionBits = [];
	for (var i = 0; i < 24 - integralBits.length; i++) {
		if (fractionValue * 2 > 1) {
			fractionBits[i] = 1;
		} else if (fractionValue * 2 == 1) {
			fractionBits[i] = 1;
			break;
		} else {
			fractionBits[i] = 0;
		}
		fractionValue = fractionValue * 2 - Math.floor(fractionValue * 2);
	}
	var fractionBitsString = '';
	for (var i = 0; i < fractionBits.length; i++) {
		fractionBitsString += String(fractionBits[i]);
	}

	// Normalize the binary number.
	var wholeBitsString = integralBitsString + '.' + fractionBitsString;
	var wholeBitsNumber = Number(integralBitsString + '.' + fractionBitsString);
	var decimalIndex = wholeBitsString.indexOf('.');
	if (Number(wholeBitsString) == 0) {
		wholeBitsString = '0';
		var normalizedBitsString = wholeBitsString;
		var binaryExponent = 0;
	} else if (decimalIndex > 1) {
		var binaryExponent = decimalIndex - 1;
		var normalizedBitsString = wholeBitsString[0];
		normalizedBitsString += '.';
		for (var i = 1; i < wholeBitsString.length; i++) {
			if (i == decimalIndex) { continue; }
			normalizedBitsString += wholeBitsString[i];
		}
	} else if (decimalIndex == 1 && wholeBitsString.charAt(0) == '0') {
		var binaryExponent = wholeBitsString.indexOf('1') - 1;
		var normalizedBitsString = '1.';
		for (var i = wholeBitsString.indexOf('1') + 1; i < wholeBitsString.length; i++) {
			normalizedBitsString += wholeBitsString[i];
		}
	} else {
		var normalizedBitsString = wholeBitsString;
		var binaryExponent = 0;
	}
	if (normalizedBitsString.charAt(normalizedBitsString.length - 1) == '.') {
		normalizedBitsString = normalizedBitsString.slice(0, -1);
	}

	var adjustedExponent = (binaryExponent + 127).toString(2);
	for (var i = 0; adjustedExponent.length < 8; i++) {
		adjustedExponent = '0' + adjustedExponent;
	}
	var slicedString = normalizedBitsString.slice(2);
	for (var i = 0; slicedString.length < 23; i++) {
		slicedString = '0' + slicedString;
	}
	//adjustedSign = (Number(normalizedBitsString) >= 0) ? 0:1;

	var finalBinary = String(adjustedSign) + adjustedExponent + slicedString;

	var finalArray = [];
	finalArray[0] = parseInt(Number(finalBinary.slice(0,8)), 2).toString(10);
	finalArray[1] = parseInt(Number(finalBinary.slice(8,16)), 2).toString(10);
	finalArray[2] = parseInt(Number(finalBinary.slice(16,24)), 2).toString(10);
	finalArray[3] = parseInt(Number(finalBinary.slice(24)), 2).toString(10);

	var flippedFinalArray = flipArray(finalArray);


	for (var i = 0; i < 4; i++) {
		fileView[varIndex + varLoc + i] = flippedFinalArray[i];
	}
}

function loadStringVariable (varName) {
	var varLoc = varName.length + 30;
	var stringArray = convertStringToDecArray(varName);
	var varIndex = searchArray(stringArray,fileView);
	var afterIndex = searchArray([0],fileView,varIndex + varLoc);
	var answerArray = [];
	for (var i = varIndex + varLoc, j = 0; i < afterIndex; i++, j++) {
		answerArray[j] = fileView[i]
	}
	var valString = convertDecArrayToString(answerArray);
	return valString;
}

function loadBooleanVariable (varName) {
	var varLoc = varName.length + 26;
	var stringArray = convertStringToDecArray(varName);
	var varIndex = searchArray(stringArray,fileView);
	var answerArray = [];
	answerArray[0] = fileView[varIndex + varLoc]
	return answerArray[0];
}

function loadFloatVariable (varName) {
	var varLoc = varName.length + 28;
	var stringArray = convertStringToDecArray(varName);
	var varIndex = searchArray(stringArray,fileView);
	var answerArray = [];
	for (var i = 0; i < 4; i++) {
		answerArray[i] = fileView[varIndex + varLoc + i].toString(16);
		if (answerArray[i].length == 1) {
			answerArray[i] = '0' + answerArray[i];
		}
	}
	return answerArray;
}

function loadIntegerVariable (varName) {
	var varLoc = varName.length + 26;
	var stringArray = convertStringToDecArray(varName);
	var varIndex = searchArray(stringArray,fileView);
	var answer = fileView[varIndex + varLoc]
	return answer;
}

function editStringVariable (varName,varAfter) {
	var varLoc = varName.length + 30;
	var stringArray = convertStringToDecArray(varName);
	var decArray = varAfter;
	var varIndex = searchArray(stringArray,fileView);
	var afterIndex = searchArray(decArray,fileView,varIndex + varLoc);
	var answerArray = [];
	for (var i = varIndex + varLoc, j = 0; i < afterIndex; i++, j++) {
		answerArray[j] = fileView[i];
	}
	var valIndex = varIndex + varLoc;
	for (var i = 0; i < answerArray.length; i++) {
		fileView.splice(valIndex,1);
	}
	var editedValue = convertStringToDecArray(document.getElementById(varName).value);
	for (var i = 0; i < editedValue.length; i++) {
		fileView.splice(valIndex + i, 0, editedValue[i]);
	}
}

function editBooleanVariable (varName,varValue) {
	var varLoc = varName.length + 26;
	var stringArray = convertStringToDecArray(varName);
	var varIndex = searchArray(stringArray,fileView);
	fileView[varIndex + varLoc] = varValue;
}

function editFloatVariable (varName,varValue) {
	var varLoc = varName.length + 28;
	var stringArray = convertStringToDecArray(varName);
	var varIndex = searchArray(stringArray,fileView);
	var varArray = [];
	for (var i = 0, j = 0, k = 2; i < 4; i++, j += 2, k += 2) {
		varArray[i] = Number('0x' + varValue.slice(j,k));
	}
	for (var i = 0; i < 4; i++) {
		fileView[varIndex + varLoc + i] = varArray[i];
	}
}

function editIntegerVariable (varName,varValue) {
	var varLoc = varName.length + 26;
	var stringArray = convertStringToDecArray(varName);
	var varIndex = searchArray(stringArray,fileView);
	fileView[varIndex + varLoc] = varValue;
}

function convertStringToDecArray (plainString) {
	var convertedArray = [];
	for (var i = 0; i < plainString.length; i++) {
			convertedArray[i] = plainString.charCodeAt(i);
	}
	return convertedArray;
}

function convertDecArrayToString (plainArray) {
	var convertedString = '';
	for (var i = 0; i < plainArray.length; i++) {
			convertedString = convertedString + String.fromCharCode(plainArray[i]);
	}
	return convertedString;
}

function searchArray (varString,varArray,startNumber) {
	// Find the first instance of the first letter.
	var startIndex = varArray.indexOf(varString[0],startNumber);
	// If any letter doesn't match, search for the next instance of the first letter.
	for (var i = 0; i < varString.length; i++) {
		if (varString[i] != varArray[startIndex + i]) {
			startIndex = varArray.indexOf(varString[0], startIndex + 1);
			i = -1;
		}
	}
	return startIndex;
}
