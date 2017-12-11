function fillPage () {
	// Clear any existing variables.
	document.getElementById('stringSection').innerHTML = '';
	document.getElementById('booleanSection').innerHTML = '';
	document.getElementById('stringSection').style.borderBottom = '1px black solid';
	document.getElementById('booleanSection').style.borderBottom = '1px black solid';
	document.getElementById('integerSection').style.borderBottom = '1px black solid';

	// Add 'Save' button.
	var getSaveP = document.getElementById('saveP');
	getSaveP.innerHTML = '';
	var newSaveButton = document.createElement('button');
	newSaveButton.setAttribute('onmouseup', 'saveButtonPressed();');
	newSaveButton.innerHTML = 'Save';
	getSaveP.appendChild(newSaveButton);

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
	fillPage();

	// Load a file the user chooses from the computer.
	var chosenFile = document.getElementById('loadFile').files;
	var loadedFile = chosenFile[0];
	var saveReader = new FileReader();
	saveReader.readAsArrayBuffer(loadedFile);
	saveReader.onloadend = function() {
		var dataView = new Uint8Array(this.result);
		fileView = Array.from(dataView);
		// Load game version.
		loadGameVersion();
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
	for (i = varIndex + varLoc, j = 0; i < afterIndex; i++, j++) {
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
