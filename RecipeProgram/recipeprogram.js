declareGlobalVariables();
getNames();
makeNameDropdown();
makeBatchInput();
refreshAll();

function refreshAll () {
	determineSelectedRecipe();
	fillSizeCells();
	makeTable();
}

function declareGlobalVariables () {
	recipeNames = [""];
}

function getNames () {
	for (i = 0; i < recipes.length-1; i++) {
		var newName = recipes[i].properName;
		recipeNames[i] = newName;
	}
}

function makeNameDropdown () {
	var nameList = document.createElement('select');
	nameList.id = 'nameList';
	nameList.onchange = refreshAll;
	for (i = 0; i < recipes.length-1; i++) {;
		var nameOption = document.createElement('option');
		nameOption.value = recipeNames[i];
		nameOption.id = 'recipeOption' + String[i];
		nameOption.innerHTML = recipeNames[i];
		nameList.appendChild(nameOption);
	}
	document.getElementById('nameDiv').appendChild(nameList);
}

function makeBatchInput () {
	var numberInput = document.createElement('input');
	numberInput.id = 'numberInput';
	numberInput.type = 'number';
	numberInput.min = 0;
	numberInput.value = 1;
	numberInput.onchange = refreshAll;
	document.getElementById('sizeDiv').appendChild(numberInput);
}

function fillSizeCells () {
	document.getElementById('miniCell').innerHTML = "<b>Mini: </b>";
	var miniNumber = document.createTextNode(Math.floor(recipes[selectedRecipe].minicookies * numberInput.value));
	document.getElementById('miniCell').appendChild(miniNumber);
	
	document.getElementById('regularCell').innerHTML = "<b>Reg: </b>";
	var regularNumber = document.createTextNode(Math.floor(recipes[selectedRecipe].regularcookies * numberInput.value));
	document.getElementById('regularCell').appendChild(regularNumber);
	
	document.getElementById('cafeCell').innerHTML = "<b>Cafe: </b>";
	var cafeNumber = document.createTextNode(Math.floor(recipes[selectedRecipe].cafecookies * numberInput.value));
	document.getElementById('cafeCell').appendChild(cafeNumber);
	
	document.getElementById('largeCell').innerHTML = "<b>Large: </b>";
	var largeNumber = document.createTextNode(Math.floor(recipes[selectedRecipe].largecookies * numberInput.value));
	document.getElementById('largeCell').appendChild(largeNumber);
}

function determineSelectedRecipe () {
	for (i = 0; i < recipes.length-1; i++) {
		if (recipes[i].properName == document.getElementById('nameList').value) {
			selectedRecipe = i;
		}
	}
}

function makeTable () {
	
	if (typeof recipeTable != 'undefined') {
		document.getElementById('tableDiv').removeChild(recipeTable);
	}
	
	var recipeRow = [];
	var ingredientCell = [];
	var quantityCell = [];
	var selectedIngredients = recipes[selectedRecipe].ingredients.split(',');
	var selectedQuantities = recipes[selectedRecipe].quantities.split(',');
	for (i = 0; i < selectedQuantities.length; i++) {
		selectedQuantities[i] = selectedQuantities[i] * numberInput.value;
	}
	var selectedUnits = recipes[selectedRecipe].units.split(',');
		
	recipeTable = document.createElement('table');
	recipeTable.border = 1;
	recipeTable.width = 400;
	
	// Ingredients and quantities columns.
	for (i = 0; i < selectedIngredients.length; i++) {
		recipeRow[i] = document.createElement('tr');
		ingredientCell[i] = document.createElement('td');
		ingredientCell[i].innerHTML = selectedIngredients[i];
		ingredientCell[i].width = '60%';
		quantityCell[i] = document.createElement('td');
		quantityCell[i].innerHTML = fillQuantityCell(i,selectedUnits,selectedQuantities);
		recipeRow[i].appendChild(ingredientCell[i]);
		recipeRow[i].appendChild(quantityCell[i]);
		recipeTable.appendChild(recipeRow[i]);
	}
	
	document.getElementById('tableDiv').appendChild(recipeTable);
}

function fillQuantityCell (itemNumber,selectedUnits,selectedQuantities) {
	if (selectedUnits[itemNumber] == "oz") {
		var fullQuantity = convertOunces(selectedQuantities[itemNumber]);
	} else if (selectedUnits[itemNumber] == "egg") {
		var fullQuantity = String("(" + parseFloat(selectedQuantities[itemNumber].toFixed(2))) + ") or " + convertEggs(selectedQuantities[itemNumber]);
	} else if (selectedUnits[itemNumber] == "yolk") {
		var fullQuantity = String("(" + parseFloat(selectedQuantities[itemNumber].toFixed(2))) + ") or " + convertYolks(selectedQuantities[itemNumber]);
	} else if (selectedUnits[itemNumber] == "tsp") {
		var fullQuantity = convertTsp(selectedQuantities[itemNumber]);
	} else {
		alert('Error in function fillQuantityCell.');
	}
	return fullQuantity;
}

function convertOunces (ounces) {
	// For these 2 variables, toFixed rounds to 2 decimal places, and parseFloat removes any trailing 0s.
	var wholePounds = parseFloat((Math.floor(ounces/16)).toFixed(2));
	var remainingOunces = parseFloat((ounces % 16).toFixed(2));
	return String(wholePounds) + '-' + String(remainingOunces);
}

function convertEggs (eggs) {
	return convertOunces(eggs*(5/3));
}

function convertYolks (yolks) {
	return convertOunces(yolks*(2/3));
}

function makeFraction (numerator,denominator) {
	return '<sup>' + String(numerator) + '</sup>/<sub>' + String(denominator) + '</sub>';
}

function convertTsp (tsp) {
	var wholeCups = parseFloat((Math.floor(tsp/48)).toFixed(2));
	var wholeTbsp = parseFloat((Math.floor((tsp-(wholeCups*48))/3)).toFixed(2));
	var remainingTsp = parseFloat(((tsp-(wholeCups*48)) % 3).toFixed(2));
	if (wholeCups != 0) {
		wholeCupsString = String(wholeCups) + " Cups + ";
	} else {
		wholeCupsString = "";
	}
	if (wholeTbsp != 0) {
		wholeTbspString = String(wholeTbsp) + " Tbsp + ";
	} else {
		wholeTbspString = "";
	}
	if (remainingTsp != 0) {
		remainingTspString = String(remainingTsp) + " tsp";
	} else {
		remainingTspString = "";
	}
	
	completeTspString =  wholeCupsString + wholeTbspString + remainingTspString;
	
	if (completeTspString.lastIndexOf(' +') == completeTspString.length-3) {
		completeTspString = completeTspString.slice(0,completeTspString.length-2);
	}
	
	return completeTspString;
}