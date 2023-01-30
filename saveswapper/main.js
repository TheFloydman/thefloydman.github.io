var saveFile;

function toggleInstructions() {
    let instructions = document.getElementById('instructions');
    let arrow = document.getElementById('instruction-arrow');
    let show = document.getElementById('show');
    if (arrow.innerText == '⏵') {
        instructions.style.display = 'block';
        arrow.innerText = '⏷';
        show.innerText = 'hide';
    } else {
        instructions.style.display = 'none';
        arrow.innerText = '⏵';
        show.innerText = 'show';
    }
}

function refresh() {
    let saveButton = document.getElementById('button-save');
    saveButton.disabled = true;
    document.getElementById('ue4-version').innerText = 'Unknown';
    document.getElementById('save-type').innerText = 'Unknown';
    for (const wrapper of document.getElementsByClassName('game-wrapper')) {
        wrapper.style.display = 'none';
        wrapper.replaceChildren();
    }
    console.clear();
}

function fileChosen() {
    refresh();
    let uploadButton = document.getElementById('button-open');
    let file = uploadButton.files[0];
    if (!file)
        return;
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        saveFile = fromGvas(reader.result);
        document.getElementById('ue4-version').innerText = saveFile.ue4Version;
        document.getElementById('save-type').innerText = saveFile.saveType;
        console.log(saveFile);
        if (saveFile.saveType == '/Script/Obduction.ObductionSaveGame' || saveFile.saveType == 'ObductionSaveGame') {
            let obductionDiv = document.getElementById('obduction');
            obductionDiv.style.display = 'block';
            toElement(obductionProperties, saveFile.properties, obductionDiv, 'obduction', true);
        } else if (saveFile.saveType == '/Script/CyanGameplayContent.CyanSaveGame') {
            let mystDiv = document.getElementById('myst');
            mystDiv.style.display = 'block';
            toElement(mystProperties, saveFile.properties, mystDiv, 'myst', true);
        } else {
            console.error(`Unrecognized save file type: ${saveFile.saveType}`);
        }
    });
    reader.addEventListener('error', () => {
        logErrors(`Error occured reading file: ${file.name}`);
    });
    reader.readAsArrayBuffer(file);
}

function savePressed() {
    let output = toGvas(saveFile);
    let file = new File([output], 'GameState.sav', { type: 'application/octet-stream' });
    saveAs(file);
}

function toElement(json, gvasPool, parentElement, prefix, isMain = true) {
    if (!Array.isArray(json)) {
        json = [json];
    }
    for (const propertyInfo of json) {

        let propertyWrapper = document.createElement('DIV');
        propertyWrapper.id = `${prefix}-${propertyInfo.html}`;
        propertyWrapper.className = 'property-wrapper';
        if (!isMain) {
            propertyWrapper.classList.add('sub');
        }

        let propertyHeader = document.createElement('DIV');
        if (isMain) {
            propertyHeader.className = 'property-header';
            propertyHeader.innerText = propertyInfo.title ? propertyInfo.title : '';
            if (propertyHeader.innerText) {
                propertyHeader.style.display = 'block';
            } else {
                propertyHeader.style.display = 'none';
            }
        }

        let propertyDesc = document.createElement('DIV');
        if (isMain) {
            propertyDesc.className = 'property-description';
            propertyDesc.innerHTML = propertyInfo.description ? propertyInfo.description : '';
            if (propertyDesc.innerText) {
                propertyDesc.style.display = 'block';
            } else {
                propertyDesc.style.display = 'none';
            }
        }

        let propertyBody = document.createElement('DIV');
        propertyBody.className = 'property-body';

        if (propertyInfo.children) {
            propertyWrapper.prepend(propertyHeader, propertyDesc);
            toElement(propertyInfo.children, gvasPool, propertyWrapper, prefix, false);
            parentElement.append(propertyWrapper);
            continue;
        }

        let gvas = Array.isArray(propertyInfo.gvas) ? propertyInfo.gvas[0] : propertyInfo.gvas;
        let property = fetchPropertyFromArray(gvas, gvasPool);
        if (property instanceof GvasMap) {
            let property2 = fetchPropertyFromMap(propertyInfo.gvas[1], property.value.entries);
            let newJson = structuredClone(propertyInfo);
            newJson.gvas = propertyInfo.gvas[2];
            toElement(newJson, property2, parentElement, prefix, isMain);
            continue;
        } else if (property instanceof GvasStruct) {
            if (property.value.length == 1) {
                let subProperty = property.value[0];
                if (subProperty instanceof Vector || subProperty instanceof Rotator) {
                    let vector = subProperty.value;
                    let letters = ['x', 'y', 'z'];
                    for (const letter of letters) {
                        let div = document.createElement('DIV');
                        div.className = 'property-value-wrapper';
                        let label = document.createElement('LABEL');
                        label.className = 'caps';
                        label.setAttribute('for', `${propertyInfo.html}-${letter}`);
                        label.innerText = `${letter}:`;
                        let input = document.createElement('INPUT');
                        input.setAttribute('type', 'number');
                        input.setAttribute('name', `${propertyInfo.html}-${letter}`);
                        input.value = vector[letter];
                        input.addEventListener('input', function() {
                            vector[letter] = this.value;
                        })
                        div.append(label, input);
                        propertyBody.append(div);
                    }
                }
            }
        } else if (property instanceof GvasString) {
            if (propertyInfo.values) {
                if (propertyInfo.type == 'select') {
                    let value = property.value;
                    let select = document.createElement('SELECT');
                    for (const optionInfo of propertyInfo.values) {
                        let option = document.createElement('OPTION');
                        option.value = optionInfo.actual;
                        option.innerText = optionInfo.display;
                        select.append(option);
                    }
                    select.name = propertyInfo.id;
                    select.value = value;
                    select.addEventListener('change', function() {
                        property.value = this.value;
                    })
                    if (propertyInfo.label) {
                        let label = document.createElement('LABEL');
                        label.setAttribute('for', propertyInfo.html);
                        label.innerText = `${propertyInfo.label}:`;
                        propertyBody.append(label);
                    }
                    propertyBody.append(select);
                } else if (propertyInfo.type == 'selects-comma') {
                    let value = property.value.split(',');
                    value = value.slice(0, value.length - 1);
                    for (let i = 0; i < propertyInfo.quantity; i++) {
                        let div = document.createElement('DIV');
                        div.className = 'property-value-wrapper';
                        let label = document.createElement('LABEL');
                        label.setAttribute('for', `${propertyInfo.html}-${i}`);
                        label.innerText = `${propertyInfo.labels[i]}:`;
                        let select = document.createElement('SELECT');
                        select.className = `${propertyInfo.html}-select`;
                        select.setAttribute('index', i);
                        select.setAttribute('name', `${propertyInfo.html}-${i}`);
                        for (const optionInfo of propertyInfo.values) {
                            let option = document.createElement('OPTION');
                            option.value = optionInfo.actual;
                            option.innerText = optionInfo.display;
                            option.disabled = value.includes(option.value);
                            select.append(option);
                        }
                        select.value = value[i];
                        for (const child of select.children) {
                            if (child.value == select.value) {
                                child.disabled = false;
                                break;
                            }
                        }
                        select.addEventListener('change', function() {
                            let value = property.value.split(',');
                            value = value.slice(0, value.length - 1);
                            value[parseInt(this.getAttribute('index'))] = this.value;
                            property.value = value.join(',') + ',';
                            let chosenValues = [];
                            let chosenSources = [];
                            const allSelects = document.getElementsByClassName(`${propertyInfo.html}-select`);
                            for (const select of allSelects) {
                                chosenValues.push(select.value);
                                chosenSources.push(select);
                            }
                            for (const select of allSelects) {
                                for (const child of select.children) {
                                    child.disabled = chosenValues.includes(child.value) && select.value != child.value;
                                }
                            }
                        })
                        div.append(label, select);
                        propertyBody.append(div);
                    }
                }
            }
        } else if (property instanceof GvasBoolean) {
            let value = property.value;
            let label = document.createElement('LABEL');
            label.className = 'right';
            label.setAttribute('type', 'checkbox');
            label.setAttribute('for', propertyInfo.html);
            label.innerText = propertyInfo.label;
            let input = document.createElement('INPUT');
            input.id = `checkbox-${propertyInfo.html}`;
            input.setAttribute('type', 'checkbox');
            input.checked = value;
            input.addEventListener('input', function() {
                property.value = this.checked;
            });
            propertyBody.append(input, label);
        } else if (property instanceof GvasInteger) {
            if (propertyInfo.type == 'dropdown') {
                let value = parseInt(property.value.int);
                let select = document.createElement('SELECT');
                select.name = `${propertyInfo.html}-select`;
                for (const validInt of propertyInfo.values) {
                    let option = document.createElement('OPTION');
                    if (validInt.actual != undefined && validInt.display != undefined) {
                        option.value = parseInt(validInt.actual);
                        option.innerText = validInt.display;
                    } else {
                        option.value = parseInt(validInt);
                        option.innerText = parseInt(validInt);
                    }
                    select.append(option);
                }
                select.value = value;
                select.addEventListener('change', function() {
                    property.value = this.value;
                })
                propertyBody.append(select);
                if (!isMain) {
                    let label = document.createElement('LABEL');
                    label.className = 'right';
                    label.setAttribute('for', `${propertyInfo.html}-select`);
                    label.innerText = propertyInfo.title;
                    propertyBody.append(label);
                }
            }
        }

        propertyWrapper.append(propertyHeader, propertyDesc, propertyBody);
        parentElement.append(propertyWrapper);
    }
}