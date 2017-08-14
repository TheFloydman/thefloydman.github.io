declareGlobalVariables();
getNames();
makeNameDropdown();
//makeNumberInput();
makeSizeDropdown();
refreshAll();

function refreshAll () {
	determineSelectedRecipe();
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
/*
function makeNumberInput () {
	var numberInput = document.createElement('input');
	numberInput.id = 'numberInput';
	numberInput.type = 'number';
	numberInput.min = 0;
	numberInput.value = 24;
	numberInput.onchange = refreshAll;
	document.getElementById('mainDiv').appendChild(numberInput);
}
*/
function makeSizeDropdown () {
	var sizeList = document.createElement('select');
	sizeList.id = 'sizeList';
	sizeList.onchange = refreshAll;
	
	var miniOption = document.createElement('option');
	miniOption.value = 'Mini (1/2 oz)';
	miniOption.id = 'miniOption';
	miniOption.innerHTML = 'Mini (1/2 oz)';
	sizeList.appendChild(miniOption);
	
	var regularOption = document.createElement('option');
	regularOption.value = 'Regular (1 1/2 oz)';
	regularOption.id = 'regularOption';
	regularOption.innerHTML = 'Regular (1 1/2 oz)';
	sizeList.appendChild(regularOption);
	
	var cafeOption = document.createElement('option');
	cafeOption.value = 'Cafe (2 oz)';
	cafeOption.id = 'cafeOption';
	cafeOption.innerHTML = 'Cafe (2 oz)';
	sizeList.appendChild(cafeOption);
	
	var largeOption = document.createElement('option');
	largeOption.value = 'Large (4 oz)';
	largeOption.id = 'largeOption';
	largeOption.innerHTML = 'Large (4 oz)';
	sizeList.appendChild(largeOption);
	
	document.getElementById('sizeDiv').appendChild(sizeList);
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
	var selectedUnits = recipes[selectedRecipe].units.split(',');
		
	recipeTable = document.createElement('table');
	recipeTable.border = 1;
	recipeTable.width = 300;
	
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
	}
	return fullQuantity;
}

function makeFraction (numerator,denominator) {
	return '<sup>' + String(numerator) + '</sup>/<sub>' + String(denominator) + '</sub>';
}