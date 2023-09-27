async function onLoad() {
    const headerSource = await fetch("./header.html");
    const html = await headerSource.text();
    const betterHtml = html.replace("./login.html?origin=&#46;&#47;index.html", "./login.html?origin=&#46;&#47;guidelines.html");
    const wrapper = document.getElementById("main-wrapper");
    wrapper.insertAdjacentHTML("afterbegin", betterHtml);

    const guidelineHeaders = document.getElementsByClassName("guideline-header");
    for (let i = 1; i <= guidelineHeaders.length; i++) {
        const header = guidelineHeaders[i - 1];
        header.insertAdjacentHTML("afterbegin", i + ". ");
    }
}

function onUserLoaded() { }