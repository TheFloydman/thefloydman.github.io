async function onLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status") ? urlParams.get("status") : "all";
    document.title = `Ahltee | ${status.charAt(0).toLocaleUpperCase() + status.substring(1)} Edits`;
    const headerSource = await fetch("./header.html");
    const html = await headerSource.text();
    const betterHtml = html.replace("./login.html?origin=&#46;&#47;index.html", `./login.html?origin=&#46;&#47;edits.html?status=${status}`);
    const wrapper = document.getElementById("main-wrapper");
    wrapper.insertAdjacentHTML("afterbegin", betterHtml);
    const user = await getUser();
    if (user) { onUserLoaded(); } else { onUserNotLoaded() }

    const firebase = await getFirebase();
    if (firebase) {
        const editReferenceArray = status == "all" ? await firebase.getDocs(firebase.collection("edits")) : await firebase.getDocs(firebase.query(firebase.collection("edits"), firebase.where("status", "==", status)));
        createMainEditDiv(firebase, editReferenceArray, status);
    }
}

function createMainEditDiv(firebase, editReferenceArray, urlParam) {
    const editsWrapper = document.getElementById("edits-wrapper");
    editReferenceArray.forEach(async editReference => {
        const data = editReference.data();
        const userReference = firebase.doc("users", data.user);
        const type = data.request.type;
        data.request.contents.updatedUser = userReference;
        if (data.request.type == "create") data.request.contents.createdUser = userReference;
        const infoDiv = await createEditInfoDiv(firebase, userReference, data.collection, data.status, data.request.type);
        const comparisonDiv = await createDocumentComparisonDiv(firebase, data.collection, data.request);
        const editWrapper = createElementWithClass("div", "edit-wrapper");
        const buttonsDiv = await createButtonsDiv(firebase, data.collection, editReference.id, data, editWrapper, urlParam);
        editWrapper.classList.add(data.status);
        editWrapper.append(infoDiv, comparisonDiv, buttonsDiv);
        editsWrapper.append(editWrapper);
    });
}

async function createEditInfoDiv(firebase, userReference, collection, status, type) {
    const statusLabelSpan = createElementWithClass("span", "status-label", "Status:");
    const statusInfoSpan = createElementWithClass("span", "status-data");
    statusInfoSpan.innerText = `${status} ${type}`;
    const statusDiv = createElementWithClass("div", "edit-status");
    statusDiv.append(statusLabelSpan, statusInfoSpan);

    const userDocument = await firebase.getDoc(userReference);
    let user = "Anonymous";
    const displayName = userDocument.data().displayName;
    if (displayName && displayName.trim().length > 0) {
        user = displayName;
    }
    const userLabelSpan = createElementWithClass("span", "submitted-by-label", "Submitted by");
    const userInfoSpan = createElementWithClass("span", "submitted-by-user");
    userInfoSpan.innerText = user;
    const userDiv = createElementWithClass("div", "edit-user");
    userDiv.append(userLabelSpan, userInfoSpan);

    const typeLabelSpan = createElementWithClass("span", "type-label", "Collection:");
    const typeInfoSpan = createElementWithClass("span", "type-data");
    typeInfoSpan.innerText = collection;
    const typeDiv = createElementWithClass("div", "edit-type");
    typeDiv.append(typeLabelSpan, typeInfoSpan);

    const infoDiv = createElementWithClass("div", "edit-info");
    infoDiv.append(statusDiv, userDiv, typeDiv);
    return infoDiv;
}

async function createDocumentComparisonDiv(firebase, collection, request) {
    const comparisonDiv = createElementWithClass("div", "edit-comparison");

    if (request.id && request.type == "update") {
        const reference = firebase.doc(collection, request.id);
        const document = await firebase.getDoc(reference);
        const data = document.data();
        if (!data) return comparisonDiv;
        const existingSnippetDiv = await createExistingDocumentDiv(firebase, collection, data);
        comparisonDiv.append(existingSnippetDiv);
        const updatedSnippetDiv = await createUpdatedDocumentDiv(firebase, collection, request, data);
        comparisonDiv.append(updatedSnippetDiv);
    } else if (request.type == "create") {
        const data = request.contents;
        const updatedSnippetDiv = await createUpdatedDocumentDiv(firebase, collection, request, data);
        comparisonDiv.append(updatedSnippetDiv);
    }

    return comparisonDiv;
}

async function createExistingDocumentDiv(firebase, collection, data) {
    const existingDocumentDiv = createElementWithClass("div", "edit-existing-document");
    const existingDocumentTitleDiv = createElementWithClass("div", "edit-document-title", "Existing");
    existingDocumentDiv.append(existingDocumentTitleDiv);

    if (collection == "snippets") {
        const novelDiv = await createNovelDiv(firebase, data);
        const editionDiv = await createSnippetEditionDiv(firebase, data);
        const locationDiv = createSnippetLocationDiv(data);
        const textDiv = createSnippetTextDiv(data);
        existingDocumentDiv.append(novelDiv, editionDiv, locationDiv, textDiv);
    } else if (collection == "scraps") {
        const detailsDiv = createScrapDetailsDiv(data);
        const novelDiv = await createNovelDiv(firebase, data);
        const tagsDiv = createTagsDiv(data);
        existingDocumentDiv.append(detailsDiv, novelDiv, tagsDiv);
    }

    return existingDocumentDiv;
}

function createScrapDetailsDiv(data) {
    const descLabelSpan = createElementWithClass("span", "edit-scrap-description-label", "Desciption:");
    const descDataSpan = createElementWithClass("span", "edit-scrap-description-data", data.description, true);
    const descDiv = createElementWithClass("div", "edit-scrap-description-wrapper");
    descDiv.append(descLabelSpan, descDataSpan);
    return descDiv;
}

async function createNovelDiv(firebase, data) {
    let novelDocument;
    if (data.edition) {
        const editionDoc = await firebase.getDoc(data.edition);
        novelDocument = await firebase.getDoc(editionDoc.get("novel"));
    } else {
        novelDocument = await firebase.getDoc(data.novel);
    }
    const novelData = novelDocument.data();
    const novelLabelSpan = createElementWithClass("span", "edit-scrap-novel-label", "Novel:");
    const editionNamespan = createElementWithClass("span", "edit-scrap-novel-name", novelData.title);
    const novelDiv = createElementWithClass("div", "edit-scrap-novel-wrapper");
    novelDiv.append(novelLabelSpan, editionNamespan);
    return novelDiv;
}

function createTagsDiv(data) {
    if (!data.tags) data.tags = {};
    const tagsString = Array.isArray(data.tags) ? data.tags.join(", ") : Object.keys(data.tags).join(", ");
    const tagsLabelSpan = createElementWithClass("span", "edit-scrap-tags-label", "Tags:");
    const tagsContentSpan = createElementWithClass("span", "edit-scrap-tags-content", tagsString);
    const tagsWrapperDiv = createElementWithClass("div", "edit-scrap-tags-wrapper");
    tagsWrapperDiv.append(tagsLabelSpan, tagsContentSpan);
    return tagsWrapperDiv;
}

async function createSnippetEditionDiv(firebase, data) {
    const editionDocument = await firebase.getDoc(data.edition);
    const editionData = editionDocument.data();
    const editionLabelSpan = createElementWithClass("span", "edit-edition-label", "Edition:");
    const editionNamespan = createElementWithClass("span", "edit-edition-name", editionData.name);
    const editionPublishedspan = createElementWithClass("span", "edit-edition-published", `(${dateNumToWords(editionData.published)})`);
    const editionDiv = createElementWithClass("div", "edit-edition-wrapper");
    editionDiv.append(editionLabelSpan, editionNamespan, editionPublishedspan);
    return editionDiv;
}

function createSnippetLocationDiv(data) {
    const arrowSpan = createElementWithClass("span", "edit-location-arrow", "→");
    const locationPartSpan = createElementWithClass("span", "edit-location-part", data.part);
    const locationDiv = createElementWithClass("div", "edit-location-wrapper");
    locationDiv.append(locationPartSpan);
    if (data.section) {
        const locationSectionSpan = createElementWithClass("span", "edit-location-section", `section ${data.section}`);
        locationDiv.append(arrowSpan.cloneNode(true), locationSectionSpan);
    }
    if (data.paragraph) {
        const locationParagraphSpan = createElementWithClass("span", "edit-location-paragraph", `paragraph ${data.paragraph}`);
        locationDiv.append(arrowSpan.cloneNode(true), locationParagraphSpan);
    }
    if (data.sentence) {
        const locationSentenceSpan = createElementWithClass("span", "edit-location-part", `sentence ${data.sentence}`);
        locationDiv.append(arrowSpan.cloneNode(true), locationSentenceSpan);
    }
    return locationDiv;
}

function createSnippetTextDiv(data) {
    const textSpan = createElementWithClass("span", "edit-text", data.text.replace(/\*(.*)\*/g, "<i>$1</i>").replaceAll("\\n", "<br>"));
    const textDiv = createElementWithClass("div", "edit-text-wrapper");
    textDiv.append(textSpan);
    return textDiv;
}

async function createUpdatedDocumentDiv(firebase, collection, request, data) {
    for (const key in request.contents) {
        if (request.contents.hasOwnProperty(key)) {
            data[key] = request.contents[key];
        }
    }

    const updatedDocumentDiv = createElementWithClass("div", "edit-updated-document");
    const updatedDocumentTitleDiv = createElementWithClass("div", "edit-document-title", "Submitted");
    updatedDocumentDiv.append(updatedDocumentTitleDiv);

    if (collection == "snippets") {
        const novelDiv = await createNovelDiv(firebase, data);
        const editionDiv = await createSnippetEditionDiv(firebase, data);
        const locationDiv = createSnippetLocationDiv(data);
        const textDiv = createSnippetTextDiv(data);
        updatedDocumentDiv.append(novelDiv, editionDiv, locationDiv, textDiv);
    } else if (collection == "scraps") {
        const descriptionDiv = createScrapDetailsDiv(data);
        const novelDiv = await createNovelDiv(firebase, data);
        const tagsDiv = createTagsDiv(data);
        const createdScrapGeneral = createElementWithClass("div", "edit-created-scrap-general");
        createdScrapGeneral.append(descriptionDiv, novelDiv, tagsDiv);
        updatedDocumentDiv.append(createdScrapGeneral);

        if (request.type == "create") {
            const editionDivOne = await createSnippetEditionDiv(firebase, data.snippets[0]);
            const locationDivOne = createSnippetLocationDiv(data.snippets[0]);
            const textDivOne = createSnippetTextDiv(data.snippets[0]);
            const createdScrapSnippetOne = createElementWithClass("div", "edit-created-scrap-snippet");
            createdScrapSnippetOne.append(editionDivOne, locationDivOne, textDivOne);

            const editionDivTwo = await createSnippetEditionDiv(firebase, data.snippets[1]);
            const locationDivTwo = createSnippetLocationDiv(data.snippets[1]);
            const textDivTwo = createSnippetTextDiv(data.snippets[1]);
            const createdScrapSnippetTwo = createElementWithClass("div", "edit-created-scrap-snippet");
            createdScrapSnippetTwo.append(editionDivTwo, locationDivTwo, textDivTwo);

            updatedDocumentDiv.append(createdScrapSnippetOne, createdScrapSnippetTwo);
        }
    }

    return updatedDocumentDiv;
}

async function createButtonsDiv(firebase, collection, editId, data, wrapperDiv, urlParam) {
    const approveButton = createElementWithClass("button", "edit-approve", "Approve");
    approveButton.addEventListener("click", async () => {
        console.log(data);
        if (data.request.contents.tags) {
            data.request.contents.tags.forEach(async tag => {
                const snapshot = await firebase.getCountFromServer(firebase.query(firebase.collection("tags"), firebase.where("name", "==", tag)));
                if (snapshot.data().count < 1) {
                    await firebase.addDoc(firebase.collection("tags"), { name: tag });
                }
            });
        }
        data.request.contents.tags = data.request.contents.tags.reduce((a, v) => ({ ...a, [v]: true }), {})
        const user = await getUser();
        if (data.request.type == "update") {
            data.request.contents.updatedTime = firebase.serverTimestamp();
            data.request.contents.updatedMod = await firebase.doc("users", user.uid);
            const documentReference = firebase.doc(collection, data.request.id);
            await firebase.updateDoc(documentReference, data.request.contents);
            const editReference = firebase.doc("edits", editId);
            await firebase.updateDoc(editReference, { status: "approved" });
            if (urlParam == "all" || urlParam == "approved") {
                wrapperDiv.classList.add("approved");
                wrapperDiv.querySelector(".status-data").innerHTML = "approved update";
            } else {
                wrapperDiv.remove();
            }
        } else if (data.request.type == "create") {
            data.request.contents.createdTime = data.request.contents.updatedTime = firebase.serverTimestamp();
            data.request.contents.createdMod = data.request.contents.updatedMod = await firebase.doc("users", user.uid);
            try {
                if (collection == "snippets") {
                    const snippetReference = await firebase.addDoc(firebase.collection(collection), data.request.contents);
                    await firebase.updateDoc(data.request.contents.scrap, { snippets: firebase.arrayUnion(snippetReference) });
                } else if (collection == "scraps") {
                    const snippetOne = data.request.contents.snippets[0];
                    const snippetTwo = data.request.contents.snippets[1];
                    snippetOne.createdUser = snippetTwo.createdUser = snippetOne.updatedUser = snippetTwo.updatedUser = firebase.doc("users", data.user);
                    snippetOne.createdTime = snippetTwo.createdTime = snippetOne.updatedTime = snippetTwo.updatedTime = firebase.serverTimestamp();
                    snippetOne.createdMod = snippetTwo.createdMod = snippetOne.updatedMod = snippetTwo.updatedMod = firebase.doc("users", user.uid);
                    const snippetOneRef = await firebase.addDoc(firebase.collection("snippets"), data.request.contents.snippets[0]);
                    const snippetTwoRef = await firebase.addDoc(firebase.collection("snippets"), data.request.contents.snippets[1]);
                    data.request.contents.snippets = [snippetOneRef, snippetTwoRef];
                    await firebase.addDoc(firebase.collection("scraps"), data.request.contents);
                }
                const editReference = firebase.doc("edits", editId);
                await firebase.updateDoc(editReference, { status: "approved" });
                if (urlParam == "all" || urlParam == "approved") {
                    wrapperDiv.classList.add("approved");
                    wrapperDiv.querySelector(".status-data").innerHTML = "approved create";
                } else {
                    wrapperDiv.remove();
                }
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
    });
    const rejectButton = createElementWithClass("button", "edit-approve", "Reject");
    rejectButton.addEventListener("click", async () => {
        const editReference = firebase.doc("edits", editId);
        await firebase.updateDoc(editReference, { status: "rejected" });
        if (urlParam == "all" || urlParam == "rejected") {
            wrapperDiv.classList.add("rejected");
            wrapperDiv.querySelector(".status-data").innerHTML = `rejected ${data.request.type}`;
        } else {
            wrapperDiv.remove();
        }
    });
    const buttonDiv = createElementWithClass("div", "edit-buttons");
    buttonDiv.append(approveButton, rejectButton);
    return buttonDiv;
}

function onUserLoaded() {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const loginExit = document.getElementById("login-exit");
    if (loginExit) {
        loginExit.style.display = "block";
    }
    const loginUsername = document.getElementById("login-username");
    if (loginUsername) {
        loginUsername.style.display = "block";
    }
    addModMenuItems();
    document.getElementById("login-entry").style.display = "none";
}

function onUserNotLoaded() {
}