async function onLoad() {
    const headerSource = await fetch("./header.html");
    const html = await headerSource.text();
    const wrapper = document.getElementById("main-wrapper");
    wrapper.insertAdjacentHTML("afterbegin", html);
}

function onUserLoaded() { }