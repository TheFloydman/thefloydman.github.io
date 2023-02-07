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
    let rawButton = document.getElementById('button-raw');
    rawButton.disabled = true;
    document.getElementById('button-raw').innerText = 'Switch to raw editor';
    document.getElementById('ue4-version').innerText = 'Unknown';
    document.getElementById('save-type').innerText = 'Unknown';
    for (const wrapper of document.getElementsByClassName('game-wrapper')) {
        wrapper.style.display = 'none';
        wrapper.replaceChildren();
    }
    console.clear();
}

function fileChosen() {
    let uploadButton = document.getElementById('button-open');
    let file = uploadButton.files[0];
    if (!file) {
        return;
    }
    refresh();
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        saveFile = fromGvas(reader.result);
        document.getElementById('ue4-version').innerText = saveFile.ue4Version;
        document.getElementById('save-type').innerText = saveFile.saveType;
        console.log(saveFile);
        let saveButton = document.getElementById('button-save');
        let rawButton = document.getElementById('button-raw');
        saveButton.disabled = true;
        rawButton.disabled = true;
        if (saveFile.saveType == '/Script/Obduction.ObductionSaveGame' || saveFile.saveType == 'ObductionSaveGame') {
            let obductionDiv = document.getElementById('obduction');
            obductionDiv.style.display = 'block';
            toCurated(obductionProperties, saveFile.properties, obductionDiv, 'obduction', true);
            saveButton.disabled = false;
            rawButton.disabled = false;
        } else if (saveFile.saveType == '/Script/CyanGameplayContent.CyanSaveGame') {
            let mystDiv = document.getElementById('myst');
            mystDiv.style.display = 'block';
            toCurated(mystProperties, saveFile.properties, mystDiv, 'myst', true);
            saveButton.disabled = false;
            rawButton.disabled = false;
        } else {
            console.error(`Unrecognized save file type: ${saveFile.saveType}`);
        }
        toRaw(saveFile.properties, document.getElementById('raw'));
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

function toCurated(json, gvasArray, parentElement, prefix, isMain = true) {
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
            toCurated(propertyInfo.children, gvasArray, propertyWrapper, prefix, false);
            parentElement.append(propertyWrapper);
            continue;
        }

        let gvas = Array.isArray(propertyInfo.gvas) ? propertyInfo.gvas[0] : propertyInfo.gvas;
        let property = fetchNamedPropertyFromArray(gvas, gvasArray);
        if (property instanceof GvasMap) {
            if (prefix == 'myst') {
                let key = new GvasString();
                key.value = propertyInfo.gvas[1];
                let property2 = fetchPropertyFromMap(key, property.value.entries);
                let newJson = structuredClone(propertyInfo);
                newJson.gvas = propertyInfo.gvas[2];
                toCurated(newJson, property2, parentElement, prefix, isMain);
                continue;
            }
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
                    let div = document.createElement('DIV');
                    div.className = 'property-value-wrapper';
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
                    div.append(select);
                    if (propertyInfo.label) {
                        let label = document.createElement('LABEL');
                        label.className = 'right';
                        label.setAttribute('for', propertyInfo.html);
                        label.innerText = propertyInfo.label;
                        div.append(label);
                    }
                    propertyBody.append(div);
                } else if (propertyInfo.type == 'selects-comma') {
                    let value = property.value.split(',');
                    value = value.slice(0, value.length - 1);
                    for (let i = 0; i < propertyInfo.quantity; i++) {
                        let div = document.createElement('DIV');
                        div.className = 'property-value-wrapper';
                        let label = document.createElement('LABEL');
                        label.className = 'right';
                        label.setAttribute('for', `${propertyInfo.html}-${i}`);
                        label.innerText = propertyInfo.labels[i];
                        let select = document.createElement('SELECT');
                        select.className = `${propertyInfo.html}-select`;
                        select.setAttribute('index', i);
                        select.setAttribute('name', `${propertyInfo.html}-${i}`);
                        for (const optionInfo of propertyInfo.values) {
                            let option = document.createElement('OPTION');
                            option.value = optionInfo.actual;
                            option.innerText = optionInfo.display;
                            select.append(option);
                        }
                        select.value = value[i];
                        select.addEventListener('change', function() {
                            let value = property.value.split(',');
                            value = value.slice(0, value.length - 1);
                            value[parseInt(this.getAttribute('index'))] = this.value;
                            property.value = value.join(',') + ',';
                        })
                        div.append(select, label);
                        propertyBody.append(div);
                    }
                }
            }
        } else if (property instanceof GvasBoolean) {
            let value = property.value;
            let div = document.createElement('DIV');
            div.className = 'property-value-wrapper';
            let input = document.createElement('INPUT');
            input.id = `checkbox-${propertyInfo.html}`;
            input.setAttribute('type', 'checkbox');
            input.checked = value;
            input.addEventListener('input', function() {
                property.value = this.checked;
            });
            let label = document.createElement('LABEL');
            label.className = 'right';
            label.setAttribute('type', 'checkbox');
            label.setAttribute('for', propertyInfo.html);
            label.innerText = propertyInfo.label;
            label.addEventListener('click', function() {
                input.dispatchEvent(new MouseEvent('click'));
            });
            div.append(input, label);
            propertyBody.append(div);
        } else if (property instanceof GvasInteger) {
            if (propertyInfo.type) {
                if (propertyInfo.type == 'dropdown') {
                    let value = parseInt(property.value.int);
                    let div = document.createElement('DIV');
                    div.className = 'property-value-wrapper';
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
                    select.addEventListener('change', function() {
                        property.value.int = parseInt(this.value);
                    })
                    select.value = value;

                    div.append(select);
                    if (!isMain) {
                        let label = document.createElement('LABEL');
                        label.className = 'right';
                        label.setAttribute('for', `${propertyInfo.html}-select`);
                        label.innerText = propertyInfo.title;
                        div.append(label);
                    }
                    propertyBody.append(div);
                } else if (propertyInfo.type == 'checkbox') {
                    let value = property.value.int;
                    let div = document.createElement('DIV');
                    div.className = 'property-value-wrapper';
                    let input = document.createElement('INPUT');
                    input.id = `checkbox-${propertyInfo.html}`;
                    input.setAttribute('type', 'checkbox');
                    input.checked = parseInt(propertyInfo.value.checked) == value;
                    input.addEventListener('input', function() {
                        property.value.int = this.checked ? parseInt(propertyInfo.value.checked) : parseInt(propertyInfo.value.unchecked);
                    });
                    let label = document.createElement('LABEL');
                    label.className = 'right';
                    label.setAttribute('type', 'checkbox');
                    label.setAttribute('for', propertyInfo.html);
                    label.innerText = propertyInfo.label;
                    label.addEventListener('click', function() {
                        input.dispatchEvent(new MouseEvent('click'));
                    });
                    div.append(input, label);
                    propertyBody.append(div);

                }
            } else {
                let value = parseInt(property.value.int);
                let div = document.createElement('DIV');
                div.className = 'property-value-wrapper';
                let input = document.createElement('INPUT');
                input.name = `${propertyInfo.html}-input`;
                input.setAttribute('type', 'number');
                input.value = value;
                input.addEventListener('input', function() {
                    this.value = parseInt(this.value);
                    if (this.value == NaN || this.value == null || this.value == undefined) {
                        this.value = 0;
                    }
                    property.value.int = parseInt(this.value);
                })
                div.append(input);
                if (!isMain) {
                    let label = document.createElement('LABEL');
                    label.className = 'right';
                    label.setAttribute('for', `${propertyInfo.html}-select`);
                    label.innerText = propertyInfo.title;
                    div.append(label);
                }
                propertyBody.append(div);
            }
        } else if (property instanceof GvasFloat) {
            if (propertyInfo.type) {
                if (propertyInfo.type == 'dropdown') {
                    let value = parseFloat(property.value.float);
                    let div = document.createElement('DIV');
                    div.className = 'property-value-wrapper';
                    let select = document.createElement('SELECT');
                    select.name = `${propertyInfo.html}-select`;
                    for (const validFloat of propertyInfo.values) {
                        let option = document.createElement('OPTION');
                        if (validFloat.actual != undefined && validFloat.display != undefined) {
                            option.value = parseFloat(validFloat.actual);
                            option.innerText = validFloat.display;
                        } else {
                            option.value = parseFloat(validFloat);
                            option.innerText = parseFloat(validFloat);
                        }
                        select.append(option);
                    }
                    select.value = value;
                    select.addEventListener('change', function() {
                        property.value.float = parseFloat(this.value);
                    })
                    div.append(select);
                    if (!isMain) {
                        let label = document.createElement('LABEL');
                        label.className = 'right';
                        label.setAttribute('for', `${propertyInfo.html}-select`);
                        label.innerText = propertyInfo.title;
                        div.append(label);
                    }
                    propertyBody.append(div);
                }
            } else {
                let value = parseFloat(property.value.float);
                let div = document.createElement('DIV');
                div.className = 'property-value-wrapper';
                let input = document.createElement('INPUT');
                input.name = `${propertyInfo.html}-input`;
                input.setAttribute('type', 'number');
                input.setAttribute('step', '0.01');
                input.value = value;
                input.addEventListener('input', function() {
                    this.value = parseFloat(this.value);
                    if (this.value == NaN || this.value == null || this.value == undefined) {
                        this.value = 0.0;
                    }
                    property.value.float = parseFloat(this.value);
                })
                div.append(input);
                if (!isMain) {
                    let label = document.createElement('LABEL');
                    label.className = 'right';
                    label.setAttribute('for', `${propertyInfo.html}-select`);
                    label.innerText = propertyInfo.title;
                    div.append(label);
                }
                propertyBody.append(div);
            }
        }

        propertyWrapper.append(propertyHeader, propertyDesc, propertyBody);
        parentElement.append(propertyWrapper);
    }
}

function toggleRaw() {
    let div = document.getElementById('raw');
    let button = document.getElementById('button-raw');
    if (div.style.display == 'none') {
        div.style.display = 'block';
        button.innerText = 'Switch to curated editor';
        for (const wrapper of document.getElementsByClassName('game-wrapper')) {
            if (wrapper.id != 'raw') {
                wrapper.style.display = 'none';
            }
        }
    } else {
        div.style.display = 'none';
        button.innerText = 'Switch to raw editor';
        for (const wrapper of document.getElementsByClassName('game-wrapper')) {
            if (wrapper.id != 'raw') {
                wrapper.style.display = 'block';
            }
        }
    }
}

function toRaw(gvasArray, parentElement, level = 0) {
    if (!Array.isArray(gvasArray)) {
        gvasArray = [gvasArray];
    }
    for (const property of gvasArray) {
        let wrapperDiv = document.createElement('DIV');
        wrapperDiv.classList.add('raw-property-wrapper', `level-${level}`);
        if (property instanceof LongNone ||
            property instanceof ShortNone ||
            property instanceof GvasByte ||
            property instanceof GvasUnknown) {
            continue;
        } else if (property instanceof GvasString) {
            let headerDiv = document.createElement('DIV');
            headerDiv.className = 'raw-property-header';
            if (property.name) {
                let nameSPan = document.createElement('SPAN');
                nameSPan.className = 'raw-property-name';
                nameSPan.innerText = property.name;
                headerDiv.append(nameSPan);
            }
            if (property.type) {
                let typeSpan = document.createElement('SPAN');
                typeSpan.className = 'raw-property-type';
                typeSpan.innerText = `(${property.type})`;
                headerDiv.append(typeSpan);
            }
            let bodyDiv = document.createElement('DIV');
            bodyDiv.className = 'raw-property-body';
            let input = document.createElement('INPUT');
            input.setAttribute('type', 'text');
            input.value = property.value.toString();
            input.addEventListener('input', function(event) {
                property.value = this.value.toString();
            })
            bodyDiv.append(input);
            wrapperDiv.append(headerDiv, bodyDiv);
        } else if (property instanceof GvasInteger) {
            let headerDiv = document.createElement('DIV');
            headerDiv.className = 'raw-property-header';
            if (property.name) {
                let nameSpan = document.createElement('SPAN');
                nameSpan.className = 'raw-property-name';
                nameSpan.innerText = property.name;
                headerDiv.append(nameSpan);
            }
            if (property.type) {
                let typeSpan = document.createElement('SPAN');
                typeSpan.className = 'raw-property-type';
                typeSpan.innerText = `(${property.type})`;
                headerDiv.append(typeSpan);
            }
            let bodyDiv = document.createElement('DIV');
            bodyDiv.className = 'raw-property-body';
            let input = document.createElement('INPUT');
            input.setAttribute('type', 'number');
            input.value = parseInt(property.value.int);
            input.addEventListener('input', function(event) {
                this.value = parseInt(this.value);
                if (this.value == NaN || this.value == null || this.value == undefined) {
                    this.value = 0;
                }
                property.value.int = this.value;
            })
            bodyDiv.append(input);
            wrapperDiv.append(headerDiv, bodyDiv);
        } else if (property instanceof GvasFloat) {
            let headerDiv = document.createElement('DIV');
            headerDiv.className = 'raw-property-header';
            if (property.name) {
                let nameSpan = document.createElement('SPAN');
                nameSpan.className = 'raw-property-name';
                nameSpan.innerText = property.name;
                headerDiv.append(nameSpan);
            }
            if (property.type) {
                let typeSpan = document.createElement('SPAN');
                typeSpan.className = 'raw-property-type';
                typeSpan.innerText = `(${property.type})`;
                headerDiv.append(typeSpan);
            }
            let bodyDiv = document.createElement('DIV');
            bodyDiv.className = 'raw-property-body';
            let input = document.createElement('INPUT');
            input.setAttribute('type', 'number');
            input.value = parseFloat(property.value.float);
            input.addEventListener('input', function(event) {
                this.value = parseFloat(this.value);
                if (this.value == NaN || this.value == null || this.value == undefined) {
                    this.value = 0.0;
                }
                property.value.float = this.value;
            })
            bodyDiv.append(input);
            wrapperDiv.append(headerDiv, bodyDiv);
        } else if (property instanceof GvasBoolean) {
            let headerDiv = document.createElement('DIV');
            headerDiv.className = 'raw-property-header';
            if (property.name) {
                let nameSpan = document.createElement('SPAN');
                nameSpan.className = 'raw-property-name';
                nameSpan.innerText = property.name;
                headerDiv.append(nameSpan);
            }
            if (property.type) {
                let typeSpan = document.createElement('SPAN');
                typeSpan.className = 'raw-property-type';
                typeSpan.innerText = `(${property.type})`;
                headerDiv.append(typeSpan);
            }
            let bodyDiv = document.createElement('DIV');
            bodyDiv.className = 'raw-property-body';
            let input = document.createElement('INPUT');
            input.setAttribute('type', 'checkbox');
            input.checked = property.value;
            input.addEventListener('change', function(event) {
                property.value = this.checked;
            })
            bodyDiv.append(input);
            wrapperDiv.append(headerDiv, bodyDiv);
        } else if (property instanceof GvasStruct) {
            if (property.value.length == 1) {
                let subProperty = property.value[0];
                if (subProperty instanceof Vector || subProperty instanceof Rotator) {
                    let headerDiv = document.createElement('DIV');
                    headerDiv.className = 'raw-property-header';
                    if (property.name) {
                        let nameSpan = document.createElement('SPAN');
                        nameSpan.className = 'raw-property-name';
                        nameSpan.innerText = property.name;
                        headerDiv.append(nameSpan);
                    }
                    if (property.type) {
                        let typeSpan = document.createElement('SPAN');
                        typeSpan.className = 'raw-property-type';
                        typeSpan.innerText = `(${subProperty.type})`;
                        headerDiv.append(typeSpan);
                    }
                    let bodyDiv = document.createElement('DIV');
                    bodyDiv.className = 'raw-property-body';
                    let vector = subProperty.value;
                    let letters = ['x', 'y', 'z'];
                    for (const letter of letters) {
                        let div = document.createElement('DIV');
                        div.className = 'raw-property-value-wrapper';
                        let label = document.createElement('LABEL');
                        label.className = 'caps';
                        let random = Math.random();
                        label.setAttribute('for', `${random}-${letter}`);
                        label.innerText = `${letter}:`;
                        let input = document.createElement('INPUT');
                        input.setAttribute('type', 'number');
                        input.setAttribute('name', `${random}-${letter}`);
                        input.value = vector[letter];
                        input.addEventListener('input', function() {
                            this.value = parseFloat(this.value);
                            if (this.value == NaN || this.value == null || this.value == undefined) {
                                this.value = 0.0;
                            }
                            vector[letter] = this.value;
                        })
                        div.append(label, input);
                        bodyDiv.append(div);
                    }
                    wrapperDiv.append(headerDiv, bodyDiv);
                } else if (subProperty instanceof Vector2D) {
                    let headerDiv = document.createElement('DIV');
                    headerDiv.className = 'raw-property-header';
                    if (property.name) {
                        let nameSpan = document.createElement('SPAN');
                        nameSpan.className = 'raw-property-name';
                        nameSpan.innerText = property.name;
                        headerDiv.append(nameSpan);
                    }
                    if (property.type) {
                        let typeSpan = document.createElement('SPAN');
                        typeSpan.className = 'raw-property-type';
                        typeSpan.innerText = `(${subProperty.type})`;
                        headerDiv.append(typeSpan);
                    }
                    let bodyDiv = document.createElement('DIV');
                    bodyDiv.className = 'raw-property-body';
                    let vector = subProperty.value;
                    let letters = ['x', 'y'];
                    for (const letter of letters) {
                        let div = document.createElement('DIV');
                        div.className = 'raw-property-value-wrapper';
                        let label = document.createElement('LABEL');
                        label.className = 'caps';
                        let random = Math.random();
                        label.setAttribute('for', `${random}-${letter}`);
                        label.innerText = `${letter}:`;
                        let input = document.createElement('INPUT');
                        input.setAttribute('type', 'number');
                        input.setAttribute('name', `${random}-${letter}`);
                        input.value = vector[letter];
                        input.addEventListener('input', function() {
                            this.value = parseFloat(this.value);
                            if (this.value == NaN || this.value == null || this.value == undefined) {
                                this.value = 0.0;
                            }
                            vector[letter] = this.value;
                        })
                        div.append(label, input);
                        bodyDiv.append(div);
                    }
                    wrapperDiv.append(headerDiv, bodyDiv);
                } else if (subProperty instanceof Quat) {
                    let headerDiv = document.createElement('DIV');
                    headerDiv.className = 'raw-property-header';
                    if (property.name) {
                        let nameSpan = document.createElement('SPAN');
                        nameSpan.className = 'raw-property-name';
                        nameSpan.innerText = property.name;
                        headerDiv.append(nameSpan);
                    }
                    if (property.type) {
                        let typeSpan = document.createElement('SPAN');
                        typeSpan.className = 'raw-property-type';
                        typeSpan.innerText = `(${subProperty.type})`;
                        headerDiv.append(typeSpan);
                    }
                    let bodyDiv = document.createElement('DIV');
                    bodyDiv.className = 'raw-property-body';
                    let vector = subProperty.value;
                    let letters = ['a', 'b', 'c', 'd'];
                    for (const letter of letters) {
                        let div = document.createElement('DIV');
                        div.className = 'raw-property-value-wrapper';
                        let label = document.createElement('LABEL');
                        label.className = 'caps';
                        let random = Math.random();
                        label.setAttribute('for', `${random}-${letter}`);
                        label.innerText = `${letter}:`;
                        let input = document.createElement('INPUT');
                        input.setAttribute('type', 'number');
                        input.setAttribute('name', `${random}-${letter}`);
                        input.value = vector[letter];
                        input.addEventListener('input', function() {
                            this.value = parseFloat(this.value);
                            if (this.value == NaN || this.value == null || this.value == undefined) {
                                this.value = 0.0;
                            }
                            vector[letter] = this.value;
                        })
                        div.append(label, input);
                        bodyDiv.append(div);
                    }
                    wrapperDiv.append(headerDiv, bodyDiv);
                } else if (subProperty instanceof Transform) {
                    let headerDiv = document.createElement('DIV');
                    headerDiv.className = 'raw-property-header';
                    if (property.name) {
                        let nameSpan = document.createElement('SPAN');
                        nameSpan.className = 'raw-property-name';
                        nameSpan.innerText = property.name;
                        headerDiv.append(nameSpan);
                    }
                    if (property.type) {
                        let typeSpan = document.createElement('SPAN');
                        typeSpan.className = 'raw-property-type';
                        typeSpan.innerText = `(${subProperty.type})`;
                        headerDiv.append(typeSpan);
                    }
                    let bodyDiv = document.createElement('DIV');
                    bodyDiv.className = 'raw-property-body';
                    let rotationDiv = document.createElement('DIV');
                    toRaw(subProperty.value.rotation, rotationDiv, level + 1);
                    let translationDiv = document.createElement('DIV');
                    toRaw(subProperty.value.translation, translationDiv, level + 1);
                    let scaleDiv = document.createElement('DIV');
                    toRaw(subProperty.value.scale, scaleDiv, level + 1);
                    bodyDiv.append(rotationDiv, translationDiv, scaleDiv);
                    wrapperDiv.append(headerDiv, bodyDiv);
                } else if (subProperty instanceof Guid || subProperty instanceof DateTime) {
                    continue;
                }
            } else if (property.value.length > 1) {
                let headerDiv = document.createElement('DIV');
                headerDiv.className = 'raw-property-header';
                if (property.name) {
                    let nameSpan = document.createElement('SPAN');
                    nameSpan.className = 'raw-property-name';
                    nameSpan.innerText = property.name;
                    headerDiv.append(nameSpan);
                }
                if (property.type) {
                    let typeSpan = document.createElement('SPAN');
                    typeSpan.className = 'raw-property-type';
                    typeSpan.innerText = `(${subProperty.type})`;
                    headerDiv.append(typeSpan);
                }
                let bodyDiv = document.createElement('DIV');
                bodyDiv.className = 'raw-property-body';
                toRaw(property.value, bodyDiv, level + 1);
                wrapperDiv.append(headerDiv, bodyDiv);
            }
        } else if (property instanceof GvasArray) {
            let headerDiv = document.createElement('DIV');
            headerDiv.className = 'raw-property-header';
            if (property.name) {
                let nameSpan = document.createElement('SPAN');
                nameSpan.className = 'raw-property-name';
                nameSpan.innerText = property.name;
                headerDiv.append(nameSpan);
            }
            if (property.type) {
                let typeSpan = document.createElement('SPAN');
                typeSpan.className = 'raw-property-type';
                typeSpan.innerText = `(${property.type})`;
                headerDiv.append(typeSpan);
            }
            if (property.name || property.type) {
                let arrowSpan = document.createElement('SPAN');
                arrowSpan.className = 'raw-property-arrow';
                arrowSpan.innerText = '⏵';
                headerDiv.prepend(arrowSpan);
                headerDiv.style.cursor = 'pointer';
                headerDiv.addEventListener('click', function(event) {
                    if (bodyDiv.style.display == 'none') {
                        bodyDiv.style.display = 'block';
                        arrowSpan.innerText = '⏷';
                    } else {
                        bodyDiv.style.display = 'none';
                        arrowSpan.innerText = '⏵';
                    }
                });
            }
            let bodyDiv = document.createElement('DIV');
            bodyDiv.className = 'raw-property-body';
            bodyDiv.style.display = 'none';
            toRaw(property.value.properties, bodyDiv, level + 1);
            wrapperDiv.append(headerDiv, bodyDiv);
        } else if (property instanceof GvasMap) {
            let headerDiv = document.createElement('DIV');
            headerDiv.className = 'raw-property-header';
            if (property.name) {
                let nameSpan = document.createElement('SPAN');
                nameSpan.className = 'raw-property-name';
                nameSpan.innerText = property.name;
                headerDiv.append(nameSpan);
            }
            if (property.type) {
                let typeSpan = document.createElement('SPAN');
                typeSpan.className = 'raw-property-type';
                typeSpan.innerText = `(${property.type})`;
                headerDiv.append(typeSpan);
            }
            if (property.name || property.type) {
                let arrowSpan = document.createElement('SPAN');
                arrowSpan.className = 'raw-property-arrow';
                arrowSpan.innerText = '⏵';
                headerDiv.prepend(arrowSpan);
                headerDiv.style.cursor = 'pointer';
                headerDiv.addEventListener('click', function(event) {
                    if (bodyDiv.style.display == 'none') {
                        bodyDiv.style.display = 'block';
                        arrowSpan.innerText = '⏷';
                    } else {
                        bodyDiv.style.display = 'none';
                        arrowSpan.innerText = '⏵';
                    }
                });
            }
            let bodyDiv = document.createElement('DIV');
            bodyDiv.className = 'raw-property-body';
            bodyDiv.style.display = 'none';
            for (const [entryKey, entryValue] of property.value.entries) {
                let subWrapper = document.createElement('div');
                subWrapper.classList.add('raw-property-wrapper', `level-${level+1}`);
                let keyDiv = document.createElement('DIV');
                toRaw(entryKey, keyDiv, level + 2);
                let entryDiv = document.createElement('DIV');
                toRaw(entryValue, entryDiv, level + 2);
                subWrapper.append(keyDiv, entryDiv);
                bodyDiv.append(subWrapper);
            }
            wrapperDiv.append(headerDiv, bodyDiv);
        } else {
            console.log(property);
            continue;
        }
        parentElement.append(wrapperDiv);
    }
}