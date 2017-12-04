function fillPage () {
	// Create radio buttons for boolean properties.
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
		
		var newP = document.createElement('p');
		newP.id = 'booleanP' + String(i);
		
		newP.appendChild(textNodeIdentifier);
		newP.appendChild(newInput1);
		newP.appendChild(textNodeTrue);
		newP.appendChild(newInput2);
		newP.appendChild(textNodeFalse);
		document.getElementById('booleanSection').appendChild(newP);
	}
}

function loadButtonPressed() {
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
			document.getElementById(stringProperties[i].name).value = loadStringVariable(stringProperties[i].name,stringProperties[i].after);
		}
		// Load boolean variables.
		for (var i = 0; i < booleanProperties.length; i++) {
			if (loadBooleanVariable(booleanProperties[i].name) == 0) {
				document.getElementById(booleanProperties[i].falseId).checked = true;
			} else if (loadBooleanVariable(booleanProperties[i].name) == 1) {
				document.getElementById(booleanProperties[i].trueId).checked = true;
			} else {
				console.log('Boolean is not 0 or 1.');
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

function loadStringVariable (varName,varAfter) {
	var varLoc = varName.length + 30;
	var stringArray = convertStringToDecArray(varName);
	var decArray = varAfter;
	var varIndex = searchArray(stringArray,fileView);
	var afterIndex = searchArray(decArray,fileView,varIndex + varLoc);
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

/*function convertArrayFromDecToHex (decName) {
	var hexName = [];
	for (var i = 0; i < decName.length; i++) {
		hexName[i] = decName[i].toString(16);
	}
	return hexName;
}*/

/*function convertArrayFromHexToDec (hexName) {
	for (var i = 0; i < hexName.length; i++) {
		hexName[i] = parseInt(hexName[i], 16);
	}
	return hexName;
}*/

/*function convertStringToHexArray (plainString) {
	var convertedArray = [];
	for (var i = 0; i < plainString.length; i++) {
			convertedArray[i] = plainString.charCodeAt(i).toString(16);
	}
	return convertedArray;
}*/