async function onLoad() {
    const headerSource = await fetch("./header.html");
    const html = await headerSource.text();
    const betterHtml = html.replace("./login.html?origin=&#46;&#47;index.html", "./login.html?origin=&#46;&#47;user.html");
    const wrapper = document.getElementById("main-wrapper");
    wrapper.insertAdjacentHTML("afterbegin", betterHtml);
    const user = await getUser();
    if (user) { onUserLoaded(); } else { onUserNotLoaded() }
}

async function saveChanges() {
    const displayName = document.getElementById("user-username-input").value.trim();
    const messageDiv = document.getElementById("message");
    messageDiv.innerHTML = "";
    if (displayName.length < 3) {
        const error = createElementWithClass("div", "message-error", "<b>Error:<b> Your display name should be <i>at least</i> 3 characters long.");
        messageDiv.append(error);
        return;
    } else if (displayName.length > 24) {
        const error = createElementWithClass("div", "message-error", "<b>Error:<b> Your display name should be no longer than 24 characters.");
        messageDiv.append(error);
        return;
    }
    const firebase = await getFirebase();
    if (firebase) {
        try {
            const fooRef = firebase.doc("usernames", displayName);
            const fooDoc = await firebase.getDoc(fooRef);
            if (fooDoc && fooDoc.data() && fooDoc.data().inUse) {
                alert("Username is already in use.");
                return;
            } else {
                const user = await getUser();
                await firebase.updateProfile(user, { displayName: displayName });
                const userReference = firebase.doc("users", user.uid);
                const userDoc = await firebase.getDoc(userReference);
                const oldUserName = userDoc.data().displayName ? userDoc.data().displayName : "";
                try {
                    if (oldUserName.trim().length > 0) {
                        const oldUsernameRef = firebase.doc("usernames", oldUserName);
                        const oldUsernameDoc = await firebase.getDoc(oldUsernameRef);
                        const oldUsernameExists = oldUsernameDoc.data() != undefined;
                        if (oldUsernameExists) {
                            await firebase.updateDoc(oldUsernameRef, { inUse: false });
                        }
                    }
                    const newUsernameRef = firebase.doc("usernames", displayName);
                    const newUsernameDoc = await firebase.getDoc(newUsernameRef);
                    const newUsernameExists = newUsernameDoc.data() != undefined;
                    if (newUsernameExists) {
                        await firebase.updateDoc(newUsernameRef, { inUse: true });
                    } else {
                        await firebase.setDoc(firebase.doc("usernames", displayName), { inUse: true });
                    }
                    await firebase.updateDoc(userReference, { displayName: displayName });
                    const success = createElementWithClass("div", "message-success", "<b>Success:<b> Your display name has been updated.");
                    messageDiv.append(success);
                } catch (error) {
                    await firebase.updateProfile(user, { displayName: "" });
                    alert(error);
                    return;
                }
            }
        } catch (error) {
            alert(error);
            return;
        }
    }
}

async function onUserLoaded() {
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
    const user = await getUser();
    if (user) {
        const displayName = document.getElementById("user-username-input");
        if (user.displayName) {
            displayName.value = user.displayName;
        }
    }

    document.getElementById("login-entry").style.display = "none";
}

function onUserNotLoaded() {
}