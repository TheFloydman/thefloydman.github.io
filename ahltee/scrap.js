let snippets = [];
let scrap;
let editionReferences;
let usedEditions = [];

async function onLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    const scrapId = urlParams.get("id");
    const headerSource = await fetch("./header.html");
    const html = await headerSource.text();
    const betterHtml = html.replace("./login.html?origin=&#46;&#47;index.html", `./login.html?origin=&#46;&#47;scrap.html?id=${scrapId}`);
    const wrapper = document.getElementById("main-wrapper");
    wrapper.insertAdjacentHTML("afterbegin", betterHtml);

    const firebase = await getFirebase();
    if (firebase) {
        const scrapReference = firebase.doc("scraps", scrapId);
        scrap = await firebase.getDoc(scrapReference);
        const novel = await firebase.getDoc(scrap.get("novel"));
        editionReferences = await firebase.getDocs(firebase.query(firebase.collection("editions"), firebase.where("novel", "==", scrap.get("novel")), firebase.orderBy("published", "desc")));

        getAndFillElement("scrap-dedicated-description-static", scrap.get("description"));
        const scrapDescriptionInput = document.getElementById("scrap-dedicated-description-editor-input");
        const desc = scrap.get("description");
        scrapDescriptionInput.value = desc;
        document.title = `Ahltee | ${desc}`;
        const novelDivs = document.getElementsByClassName("scrap-dedicated-novel");
        for (let i = 0; i < novelDivs.length; i++) {
            novelDivs.item(i).innerText = novel.get("title");
        }
        const scrapTagsExisting = document.getElementById("scrap-tags-existing-contents");
        const scrapTagsEditor = document.getElementById("scrap-tags-editor");

        const tags = Object.keys(scrap.get("tags"));
        if (tags) {
            tags.sort();
            scrapTagsExisting.innerText = scrapTagsEditor.value = tags.join(", ");
        }

        const scrapHeaderStaticWrapper = document.getElementById("scrap-dedicated-static-wrapper");
        const user = await getUser();
        if (user) {
            if (scrap.get("createdUser")) {
                const createdSpan = scrapHeaderStaticWrapper.querySelector(".attribution-user-created");
                const userDoc = await firebase.getDoc(scrap.get("createdUser"));
                if (userDoc.get("displayName")) createdSpan.innerText = userDoc.get("displayName");
            }
            if (scrap.get("updatedUser")) {
                const updatedSpan = scrapHeaderStaticWrapper.querySelector(".attribution-user-updated");
                const userDoc = await firebase.getDoc(scrap.get("updatedUser"));
                if (userDoc.get("displayName")) updatedSpan.innerText = userDoc.get("displayName");
            }
        }

        const messageDiv = document.getElementById("scrap-message");

        const scrapHeaderEditorWrapper = document.getElementById("scrap-dedicated-editor-wrapper");
        scrapHeaderStaticWrapper.addEventListener("click", () => {
            toggleVisibilityFlex(scrapHeaderEditorWrapper, scrapHeaderStaticWrapper);
        })

        const scrapSubmitButton = document.getElementById("scrap-submit");
        scrapSubmitButton.addEventListener("click", async () => {
            messageDiv.display = "none";
            messageDiv.innerHTML = "";
            const submitted = await scrapSubmit(firebase);
            if (submitted) {
                messageDiv.append(createElementWithClass("div", "message-good", "<b>Success:</b> Your scrap has been submitted for review."));
                messageDiv.style.display = "block";
            }
        })

        const allSnippetsReferences = scrap.get("snippets");
        let badSnippets = 0;
        allSnippetsReferences.forEach(async snippetReference => {
            const snippet = await firebase.getDoc(snippetReference);
            if (!snippet.data()) {
                console.error(`Cannot find snippet ${snippet.id}. Skipping.`);
                badSnippets++;
                return;
            }
            const edition = await firebase.getDoc(snippet.get("edition"));
            json = {
                id: snippet.id,
                scrap: scrap,
                edition: {
                    id: edition.id,
                    name: edition.get("name"),
                    novel: edition.get("novel"),
                    published: edition.get("published")
                },
                text: snippet.get("text"),
                part: snippet.get("part"),
                createdUser: snippet.get("createdUser"),
                updatedUser: snippet.get("updatedUser")
            }
            if (snippet.get("section")) json.section = snippet.get("section");
            if (snippet.get("paragraph")) json.paragraph = snippet.get("paragraph");
            if (snippet.get("sentence")) json.sentence = snippet.get("sentence");
            snippets.push(json);
            if (snippets.length == allSnippetsReferences.length - badSnippets) {
                snippets.sort((a, b) => {
                    return new Date(b.edition.published).getTime() - new Date(a.edition.published).getTime();
                });
                fillPage(firebase, scrapReference);
            }
        });

        if (allSnippetsReferences.length == 0) {
            const snippetsToPost = await createPotentialSnippets(firebase, scrapReference);
            const snippetsWrapper = document.getElementById("snippets-wrapper");
            for (const one of snippetsToPost) {
                snippetsWrapper.append(one);
            }
            document.getElementById("loader-wrapper").style.display = "none";
        }

        /* Awesomplete, we love you! https://projects.verou.me/awesomplete/ */
        const tagsArray = [];
        const tagsSnapshot = await firebase.getDocs(firebase.query(firebase.collection("tags"), firebase.orderBy("name")));
        tagsSnapshot.forEach(tagRef => {
            tagsArray.push(tagRef.get("name"));
        });
        const awesome = new Awesomplete('#scrap-tags-editor', {
            minChars: 0,
            autofirst: true,
            filter: function (text, input) {
                return Awesomplete.FILTER_CONTAINS(text, input.match(/[^,]*$/)[0]);
            },
            item: function (text, input) {
                return Awesomplete.ITEM(text, input.match(/[^,]*$/)[0]);
            },
            replace: function (text) {
                var before = this.input.value.match(/^.+,\s*|/)[0];
                this.input.value = before + text + ", ";
            },
            list: tagsArray
        });
        Awesomplete.$('#scrap-tags-editor').addEventListener("focus", () => {
            awesome.evaluate();
        });
        Awesomplete.$('#scrap-tags-editor').addEventListener("click", () => {
            awesome.evaluate();
        });

    }
}

async function fillPage(firebase, scrapRef) {
    const snippetsWrapper = document.getElementById("snippets-wrapper");
    for (const snippet of snippets) {

        const template = await fetch("./templates/snippet-existing.html");
        const html = await template.text();
        const snippetExisting = createElementWithClass("div", "snippet-existing-wrapper", html);

        const editionNameSpan = snippetExisting.querySelector(".snippet-edition-name");
        const editionPublishedSpan = snippetExisting.querySelector(".snippet-edition-published");
        editionNameSpan.innerText = snippet.edition.name;
        editionPublishedSpan.innerText = dateNumToWords(snippet.edition.published);
        usedEditions.push(snippet.edition.id);

        function fillExistingLocation(type) {
            const span = snippetExisting.querySelector(`.snippet-location-${type}`);
            span.innerText = `${type == "part" ? "" : type + " "}${snippet[type]}`;
        }
        fillExistingLocation("part");
        if (snippet.section) fillExistingLocation("section");
        if (snippet.paragraph) fillExistingLocation("paragraph");
        if (snippet.sentence) fillExistingLocation("sentence");

        const textSpan = snippetExisting.querySelector(".snippet-text-existing");
        textSpan.innerHTML = snippet.text.replace(/\*(.*)\*/g, "<i>$1</i>").replaceAll("\\n", "<br>");

        const user = await getUser();
        if (user) {
            if (snippet.createdUser) {
                const createdSpan = snippetExisting.querySelector(".attribution-user-created");
                const userDoc = await firebase.getDoc(snippet.createdUser);
                if (userDoc.get("displayName")) createdSpan.innerText = userDoc.get("displayName");
            }
            if (snippet.updatedUser) {
                const updatedSpan = snippetExisting.querySelector(".attribution-user-updated");
                const userDoc = await firebase.getDoc(snippet.updatedUser);
                if (userDoc.get("displayName")) updatedSpan.innerText = userDoc.get("displayName");
            }
        }

        const editionRef = firebase.doc("editions", snippet.edition.id);
        const editionDoc = await firebase.getDoc(editionRef);
        const snippetEditor = await createSnippetEditor(firebase, editionDoc, snippetExisting, "update", scrapRef, snippet.id);

        function fillEditorLocation(type) {
            const input = snippetEditor.querySelector(`.snippet-location-editor-${type}`);
            input.value = snippet[type];
        }
        fillEditorLocation("part");
        if (snippet.section) fillEditorLocation("section");
        if (snippet.paragraph) fillEditorLocation("paragraph");
        if (snippet.sentence) fillEditorLocation("sentence");

        const textEditor = snippetEditor.querySelector(".snippet-text-editor");
        textEditor.innerHTML = snippet.text;

        snippetExisting.addEventListener("click", () => {
            toggleVisibilityFlex(snippetEditor, snippetExisting);
        });
        const snippetOuterWrapper = createElementWithClass("div", "snippet-wrapper-outer");
        snippetOuterWrapper.append(snippetExisting, snippetEditor);
        snippetsWrapper.append(snippetOuterWrapper);
    }

    await createPotentialSnippets(firebase, scrapRef, snippetsWrapper);

    document.getElementById("loader-wrapper").style.display = "none";
}

async function createSnippetEditor(firebase, editionDoc, staticCounterpart, submissionType, scrapRef, snippetId) {
    const snippetEditorTemplate = await fetch("./templates/snippet-editor.html");
    const snippetEditorHTML = await snippetEditorTemplate.text();
    const snippetEditor = createElementWithClass("div", `snippet-editor-${submissionType}`, snippetEditorHTML);

    const editionData = editionDoc.data();
    snippetEditor.querySelector(".snippet-edition-name").innerText = editionData.name;
    snippetEditor.querySelector(".snippet-edition-published").innerText = dateNumToWords(editionData.published);
    const partInput = snippetEditor.querySelector('.snippet-location-editor-part');
    const textInput = snippetEditor.querySelector('.snippet-text-editor');

    const saveButton = snippetEditor.querySelector(".snippet-submit");
    saveButton.addEventListener("click", async () => {
        const messageDiv = snippetEditor.querySelector(".message-wrapper");
        messageDiv.style.display = "none";
        messageDiv.innerHTML = "";
        let errored = false;
        if (partInput.value.trim() == "") {
            messageDiv.append(createElementWithClass("div", "message-bad", "<b>Error:</b> Please fill in at least part (ie. chapter, prologue, etc.) before submitting."));
            messageDiv.style.display = "block";
            errored = true;
        }
        if (textInput.innerHTML.trim() == "") {
            messageDiv.append(createElementWithClass("div", "message-bad", "<b>Error:</b> Please fill in the text as it appears in-book."));
            messageDiv.style.display = "block";
            errored = true;
        }
        if (errored) {
            return;
        }
        let strippedText = textInput.innerHTML.replaceAll("<br>", "\\n").replaceAll("&lt;&lt;", "“").replaceAll("&gt;&gt;", "”").replaceAll("&lt;", "‘").replaceAll("&gt;", "’").replaceAll("'", "’").replace(/(<([^>]+)>)/gi, "");
        if (strippedText.endsWith("\\n")) {
            strippedText = strippedText.substring(0, strippedText.length - 2);
        }
        const snippet = {
            scrap: scrapRef,
            edition: firebase.doc("editions", editionDoc.id),
            text: strippedText,
            part: partInput.value,
            section: snippetEditor.querySelector('.snippet-location-editor-section').value.trim(),
            paragraph: snippetEditor.querySelector('.snippet-location-editor-paragraph').value.trim(),
            sentence: snippetEditor.querySelector('.snippet-location-editor-sentence').value.trim()
        };
        if (snippetId) snippet.id = snippetId;
        const submitted = await snippetSubmit(firebase, snippet, submissionType);
        if (submitted) {
            messageDiv.append(createElementWithClass("div", "message-good", "<b>Success:</b> Your snippet has been submitted for review."));
            messageDiv.style.display = "block";
        }
    });
    const discardButton = snippetEditor.querySelector(".snippet-discard");
    discardButton.addEventListener("click", async () => {
        toggleVisibilityFlex(staticCounterpart, snippetEditor);
    });

    return snippetEditor;
}

async function createPotentialSnippets(firebase, scrapRef, snippetsWrapper) {
    /* For creating new snippets. */

    let snippetsUncreated = [];
    editionReferences.forEach(editionRef => {
        if (!usedEditions.includes(editionRef.id)) {
            snippetsUncreated.push(editionRef);
        }
    });

    for (const editionRef of snippetsUncreated) {
        const editionData = editionRef.data();

        const potentialSnippetTemplate = await fetch("./templates/snippet-potential.html");
        const potentialSnippetHTML = await potentialSnippetTemplate.text();
        const uncreatedSnippetStatic = createElementWithClass("div", "snippet-wrapper", potentialSnippetHTML);
        uncreatedSnippetStatic.querySelector(".edition-name").innerText = editionData.name;
        uncreatedSnippetStatic.querySelector(".edition-date").innerText = dateNumToWords(editionData.published);

        const uncreatedSnippetEditor = await createSnippetEditor(firebase, editionRef, uncreatedSnippetStatic, "create", scrapRef);

        uncreatedSnippetStatic.addEventListener("click", () => {
            toggleVisibilityFlex(uncreatedSnippetEditor, uncreatedSnippetStatic);
        });

        const uncreatedSnippetWrapper = createElementWithClass("div", "potential-snippet-wrapper");
        uncreatedSnippetWrapper.append(uncreatedSnippetStatic, uncreatedSnippetEditor);
        snippetsWrapper.append(uncreatedSnippetWrapper);
    }
}

async function snippetSubmit(firebase, snippet, type) {
    const request = {
        type: type,
        contents: snippet
    };
    if (snippet.id) request.id = snippet.id;
    try {
        const user = await getUser();
        await firebase.addDoc(firebase.collection("edits"), {
            collection: "snippets",
            user: user.uid,
            request: request,
            status: "pending"
        });
        return true;
    } catch (error) {
        alert(error);
        return false;
    }
}

function scrapDiscard() {
    toggleVisibilityFlex("scrap-dedicated-static-wrapper", "scrap-dedicated-editor-wrapper", true);
}

async function scrapSubmit(firebase) {
    const scrapDescriptionInput = document.getElementById("scrap-dedicated-description-editor-input");
    const scrapTagsInput = document.getElementById("scrap-tags-editor");
    let cleanedUp = scrapTagsInput.value.replace(/\s+/g, "").toLowerCase();
    if (cleanedUp.endsWith(",")) cleanedUp = cleanedUp.substring(0, cleanedUp.length - 1);
    try {
        await firebase.addDoc(firebase.collection("edits"), {
            collection: "scraps",
            user: firebase.auth.currentUser.uid,
            request: {
                type: "update",
                contents: {
                    description: scrapDescriptionInput.value,
                    tags: cleanedUp.split(",")
                },
                id: scrap.id
            },
            status: "pending"
        });
        return true;
    } catch (error) {
        alert(error);
        return false;
    }
}

function onUserLoaded() { }