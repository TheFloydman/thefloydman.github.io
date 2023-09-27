async function onLoad() {
    const headerSource = await fetch("./header.html");
    const html = await headerSource.text();
    const wrapper = document.getElementById("main-wrapper");
    wrapper.insertAdjacentHTML("afterbegin", html);
    const user = await getUser();
    if (user) { onUserLoaded(); } else { onUserNotLoaded() }
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