async function onLoad() {
    const headerSource = await fetch("./header.html");
    const html = await headerSource.text();
    const betterHtml = html.replace("./login.html?origin=&#46;&#47;index.html", "./login.html?origin=&#46;&#47;login.html");
    const wrapper = document.getElementById("main-wrapper");
    wrapper.insertAdjacentHTML("afterbegin", betterHtml);
    const user = await getUser();
    if (user) { onUserLoaded(); } else { onUserNotLoaded() }
}

async function signInPressed() {
    const urlParams = new URLSearchParams(window.location.search);
    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: `https://thefloydman.github.io/ahltee/finish.html?origin=${urlParams.get("origin")}`,
        // This must be true.
        handleCodeInApp: true
    };
    const email = document.getElementById("email-input").value;
    const firebase = await getFirebase();
    firebase.sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem('ahlteeEmail', email);

            toggleVisibilityBlock("message", "login-container", true)
        })
        .catch((error) => {
            console.error(error);
        });
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