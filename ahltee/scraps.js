async function onLoad() {
    const headerSource = await fetch("./header.html");
    const html = await headerSource.text();
    const betterHtml = html.replace("./login.html?origin=&#46;&#47;index.html", "./login.html?origin=&#46;&#47;scraps.html");
    const wrapper = document.getElementById("main-wrapper");
    wrapper.insertAdjacentHTML("afterbegin", betterHtml);

    const firebase = await getFirebase();
    if (firebase) {
        let query = firebase.collection("scraps");
        const urlParams = new URLSearchParams(window.location.search);
        let urlTags = urlParams.get("tags");
        if (urlTags && urlTags.trim().endsWith(",")) urlTags = urlTags.trim().substring(0, urlTags.length - 1);
        let urlNovels = urlParams.get("novels");
        if (urlNovels && urlNovels.trim().endsWith(",")) urlNovels = urlNovels.trim().substring(0, urlNovels.length - 1);
        let filterArray = [];
        if (urlTags) {
            const arrayTags = urlTags.split(",")
            for (let i = 0; i < arrayTags.length; i++) {
                arrayTags[i] = firebase.where(`tags.${arrayTags[i]}`, "==", true);
            }
            filterArray = filterArray.concat(arrayTags);
        }
        if (urlNovels) {
            const arrayNovels = urlNovels.split(",")
            for (let i = 0; i < arrayNovels.length; i++) {
                arrayNovels[i] = firebase.doc("novels", arrayNovels[i]);
            }
            filterArray = filterArray.concat(firebase.where("novel", "in", arrayNovels));
        }
        if (filterArray.length > 0) {
            query = firebase.query(query, ...filterArray);
        }
        const allScraps = await firebase.getDocs(query);
        if (urlTags) document.getElementById("filter-tags-input").value = urlTags.replace(",", ", ");

        const scrapsWrapper = document.getElementById("scraps-wrapper");
        const imported = await fetch("./templates/scrap-potential.html");
        const html = await imported.text();
        const uncreatedScrapWrapper = createElementWithClass("div", "uncreated-scrap-wrapper", html);
        const uncreatedScrapStatic = uncreatedScrapWrapper.querySelector(".uncreated-scrap-static");
        const uncreatedScrapEditor = uncreatedScrapWrapper.querySelector(".uncreated-scrap-editor");
        const scrapNovelEditor = uncreatedScrapEditor.querySelector(".scrap-novel-editor");
        const novelDocs = await firebase.getDocs(firebase.collection("novels"));
        let novelNumber = 0;
        novelDocs.forEach(async novelDoc => {
            const novelData = novelDoc.data();
            const option = createElementWithClass("option", "", novelData.title);
            option.value = novelDoc.id;
            scrapNovelEditor.append(option);

            const input = createElementWithClass("input", "novel-input");
            input.id = `novel-input-${novelNumber}`;
            input.type = "checkbox";
            input.setAttribute("novel", novelDoc.id);
            input.checked = false;
            if (urlNovels) {
                if (urlNovels.includes(novelDoc.id)) input.checked = true;
            }
            const label = createElementWithClass("label", "novel-input-label", novelData.title);
            label.setAttribute("for", input.id);
            const novelInputWrapper = createElementWithClass("div", "filter-novels-input-wrapper");
            novelInputWrapper.append(input, label);
            const novelFilterWrapper = document.getElementById("filter-novels-wrapper");
            novelFilterWrapper.append(novelInputWrapper);
            novelNumber++;
        });
        uncreatedScrapStatic.addEventListener("click", () => {
            toggleVisibilityFlex(uncreatedScrapEditor, uncreatedScrapStatic);
        });
        const buttonsDiv = uncreatedScrapWrapper.querySelector(".scrap-create-buttons");
        const discardButton = buttonsDiv.querySelector(".scrap-create-discard");
        discardButton.addEventListener("click", () => {
            toggleVisibilityBlock(uncreatedScrapStatic, uncreatedScrapEditor);
        });
        const scrapTagsInput = uncreatedScrapWrapper.querySelector(".scrap-tags-editor");
        const saveButton = buttonsDiv.querySelector(".scrap-create-submit");
        const novelRef = firebase.doc("novels", scrapNovelEditor.value);
        updateEditions(firebase, novelRef);
        scrapNovelEditor.addEventListener("input", () => {
            updateEditions(firebase, firebase.doc("novels", scrapNovelEditor.value));
        });
        saveButton.addEventListener("click", async () => {
            const messageDiv = uncreatedScrapEditor.querySelector(".message-wrapper");
            messageDiv.style.display = "none";
            messageDiv.innerHTML = "";
            const scrapDetailsEditor = uncreatedScrapEditor.querySelector(".scrap-details-wrapper").querySelector(".scrap-details-editor");

            const textToSubmit = scrapDetailsEditor.innerHTML.trim();
            let errored = false;
            if (textToSubmit.length < 8) {
                messageDiv.append(createElementWithClass("div", "message-bad", "<b>Error:</b> Please fill out a concise but complete scrap description."));
                errored = true;
            }

            let tagsCleanedUp = scrapTagsInput.value.replace(/\s+/g, "").toLowerCase();
            if (tagsCleanedUp.endsWith(",")) tagsCleanedUp = tagsCleanedUp.substring(0, tagsCleanedUp.length - 1);

            function htmlToSnippet(wrapperClass) {
                const snippetWrapper = uncreatedScrapWrapper.querySelector(`.${wrapperClass}`);
                let strippedText = snippetWrapper.querySelector(".snippet-text-editor").innerHTML.replaceAll("<br>", "\\n").replaceAll("&lt;&lt;", "“").replaceAll("&gt;&gt;", "”").replaceAll("&lt;", "‘").replaceAll("&gt;", "’").replaceAll("'", "’").replace(/(<([^>]+)>)/gi, "");
                if (strippedText.endsWith("\\n")) {
                    strippedText = strippedText.substring(0, strippedText.length - 2);
                }
                const snippet = {
                    edition: firebase.doc("editions", snippetWrapper.querySelector(".scrap-snippet-edition").value),
                    text: strippedText,
                    part: snippetWrapper.querySelector(".snippet-location-editor-part").value,
                    section: snippetWrapper.querySelector(".snippet-location-editor-section").value,
                    paragraph: snippetWrapper.querySelector(".snippet-location-editor-paragraph").value,
                    sentence: snippetWrapper.querySelector(".snippet-location-editor-sentence").value
                };
                return snippet;
            }

            const snippetOne = htmlToSnippet("scrap-snippet-one-wrapper");
            const snippetTwo = htmlToSnippet("scrap-snippet-two-wrapper");

            const snippetOneText = snippetOne.text.trim();
            if (snippetOneText.length < 1) {
                messageDiv.append(createElementWithClass("div", "message-bad", "<b>Error:</b> First snippet missing text."));
                errored = true;
            }

            const snippetTwoText = snippetTwo.text.trim();
            if (snippetTwoText.length < 1) {
                messageDiv.append(createElementWithClass("div", "message-bad", "<b>Error:</b> Second snippet missing text."));
                errored = true;
            }

            const snippetOnePart = snippetOne.part.trim();
            if (snippetOnePart.length < 1) {
                messageDiv.append(createElementWithClass("div", "message-bad", "<b>Error:</b> First snippet needs at least part entered for location."));
                errored = true;
            }

            const snippetTwoPart = snippetTwo.part.trim();
            if (snippetTwoPart.length < 1) {
                messageDiv.append(createElementWithClass("div", "message-bad", "<b>Error:</b> Second snippet needs at least part entered for location."));
                errored = true;
            }

            if (errored) {
                messageDiv.style.display = "block";
                return;
            }

            const submitted = await snippetSubmit(firebase, {
                description: textToSubmit,
                novel: novelRef,
                snippets: [snippetOne, snippetTwo],
                tags: [...new Set(tagsCleanedUp.split(","))]
            });
            if (submitted) {
                messageDiv.append(createElementWithClass("div", "message-good", "<b>Success:</b> Your scrap has been submitted for review."));
                messageDiv.style.display = "block";
            }
        });
        scrapsWrapper.append(uncreatedScrapWrapper);

        let posted = 0;
        allScraps.forEach(async scrap => {
            const novel = await firebase.getDoc(scrap.get("novel"));
            const novelDiv = createElementWithClass("div", "scrap-general-novel", novel.get("title"));
            const descDiv = createElementWithClass("div", "scrap-general-description", scrap.get("description"));
            let tagsString = "<i>no tags</i>";
            const tags = Object.keys(scrap.get("tags"));
            if (tags) {
                tags.sort();
                tagsString = tags.join(", ");
            }
            const tagsDiv = createElementWithClass("div", "scrap-general-tags", tagsString);

            const attributionCreatedLabel = createElementWithClass("span", "attribution-label", "Created by ");
            const attributionCreatedUser = createElementWithClass("span", "attribution-created-user", "Anonymous");
            const createdUserDoc = await firebase.getDoc(scrap.get("createdUser"));
            if (createdUserDoc.get("displayName")) attributionCreatedUser.innerText = createdUserDoc.get("displayName");
            const attributionsCreatedWrapper = createElementWithClass("div", "attribution-created-wrapper");
            attributionsCreatedWrapper.append(attributionCreatedLabel, attributionCreatedUser);

            const attributionUpdatedLabel = createElementWithClass("span", "attribution-label", "Updated by ");
            const attributionUpdatedUser = createElementWithClass("span", "attribution-updated-user", "Anonymous");
            const updatedUserDoc = await firebase.getDoc(scrap.get("updatedUser"));
            if (updatedUserDoc.get("displayName")) attributionUpdatedUser.innerText = updatedUserDoc.get("displayName");
            const attributionsUpdatedWrapper = createElementWithClass("div", "attribution-updated-wrapper");
            attributionsUpdatedWrapper.append(attributionUpdatedLabel, attributionUpdatedUser);

            const attributionsWrapper = createElementWithClass("div", "scrap-attribution-wrapper");
            attributionsWrapper.append(attributionsCreatedWrapper, attributionsUpdatedWrapper);

            const surroundingA = createElementWithClass("a", "scrap-general-a");
            surroundingA.href = `./scrap.html?id=${scrap.id}`;
            surroundingA.append(descDiv, novelDiv, tagsDiv, attributionsWrapper);
            scrapsWrapper.append(surroundingA);
            posted++;
            if (posted == allScraps.size) {
                document.getElementById("loader-wrapper").style.display = "none";
            }
        });
        if (allScraps.size == 0) {
            document.getElementById("loader-wrapper").style.display = "none";
        }

        /* Awesomplete, we love you! https://projects.verou.me/awesomplete/ */
        const tags = [];
        const TagsSnapshot = await firebase.getDocs(firebase.query(firebase.collection("tags"), firebase.orderBy("name")));
        TagsSnapshot.forEach(tagRef => {
            tags.push(tagRef.get("name"));
        });
        const awesome = new Awesomplete('.scrap-tags-editor', {
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
            list: tags
        });
        Awesomplete.$('.scrap-tags-editor').addEventListener("focus", () => {
            awesome.evaluate();
        });
        Awesomplete.$('.scrap-tags-editor').addEventListener("click", () => {
            awesome.evaluate();
        });
    }
}

async function snippetSubmit(firebase, scrap) {
    try {
        const user = await getUser();
        await firebase.addDoc(firebase.collection("edits"), {
            collection: "scraps",
            user: user.uid,
            request: {
                type: "create",
                contents: scrap
            },
            status: "pending"
        });
        return true;
    } catch (error) {
        alert(error);
        return false;
    }
}

async function updateEditions(firebase, novelRef) {
    const validEditions = await firebase.getDocs(firebase.query(firebase.collection("editions"), firebase.where("novel", "==", novelRef), firebase.orderBy("published", "desc")));
    const editionInputs = document.getElementsByClassName("scrap-snippet-edition");
    for (const select of editionInputs) {
        select.innerHTML = "";
        validEditions.forEach(edition => {
            const option = document.createElement("option");
            option.value = edition.id;
            option.innerText = `${edition.get("name")} (${dateNumToWords(edition.get("published"))})`;
            select.append(option)
        });
    }
}

function onUserLoaded() { }

async function filter() {
    const novelsWrapper = document.getElementById("filter-novels-wrapper");
    const checkboxElements = novelsWrapper.getElementsByClassName("novel-input");
    const checkedNovels = [];
    for (let i = 0; i < checkboxElements.length; i++) {
        let checkbox = checkboxElements.item(i);
        if (checkbox.checked) checkedNovels.push(checkbox.getAttribute("novel"));
    }
    let filterTags = document.getElementById("filter-tags-input").value.replace(/\s+/g, "").toLowerCase();
    const data = {};
    const firebase = await getFirebase();
    const snapshot = await firebase.getCountFromServer(firebase.query(firebase.collection("novels")));
    const numberOfNovels = snapshot.data().count;
    if (checkedNovels.length > 0 && checkedNovels.length < numberOfNovels) data.novels = checkedNovels.join(",");
    if (filterTags.length > 0) data.tags = filterTags;
    console.log(data.tags);
    const urlParams = new URLSearchParams(data);
    const paramString = urlParams.toString().length > 0 ? "?" + urlParams.toString() : "";
    location.href = "./scraps.html" + paramString;
}