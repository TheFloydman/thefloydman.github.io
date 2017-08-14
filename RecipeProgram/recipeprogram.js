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
	var miniNumber = document.createTextNode(recipes[selectedRecipe].minicookies * numberInput.value);
	document.getElementById('miniCell').appendChild(miniNumber);
	
	document.getElementById('regularCell').innerHTML = "<b>Reg: </b>";
	var regularNumber = document.createTextNode(recipes[selectedRecipe].regularcookies * numberInput.value);
	document.getElementById('regularCell').appendChild(regularNumber);
	
	document.getElementById('cafeCell').innerHTML = "<b>Cafe: </b>";
	var cafeNumber = document.createTextNode(recipes[selectedRecipe].cafecookies * numberInput.value);
	document.getElementById('cafeCell').appendChild(cafeNumber);
	
	document.getElementById('largeCell').innerHTML = "<b>Large: </b>";
	var largeNumber = document.createTextNode(recipes[selectedRecipe].largecookies * numberInput.value);
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
		ingredientCell[i].width = 200;
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
		var fullQuantity = String(selectedQuantities[itemNumber]) + " oz";
	} else if (selectedUnits[itemNumber] == "one") {
		var fullQuantity = String("(" + selectedQuantities[itemNumber]) + ")";
	} else if (selectedUnits[itemNumber] == "tsp") {
		var fullQuantity = String(selectedQuantities[itemNumber]) + " tsp";
	} else {
		alert('Error in function fillQuantityCell.');
	}
	return fullQuantity;
}

function makeFraction (numerator,denominator) {
	return '<sup>' + String(numerator) + '</sup>/<sub>' + String(denominator) + '</sub>';
}