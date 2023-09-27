async function onLoad() {
    const headerSource = await fetch("./header.html");
    const html = await headerSource.text();
    const betterHtml = html.replace("./login.html?origin=&#46;&#47;index.html", "./login.html?origin=&#46;&#47;guidelines.html");
    const wrapper = document.getElementById("main-wrapper");
    wrapper.insertAdjacentHTML("afterbegin", betterHtml);
    const user = await getUser();
    if (user) { onUserLoaded(); } else { onUserNotLoaded() }

    const guidelineHeaders = document.getElementsByClassName("guideline-header");
    for (let i = 1; i <= guidelineHeaders.length; i++) {
        const header = guidelineHeaders[i - 1];
        header.insertAdjacentHTML("afterbegin", i + ". ");
    }
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