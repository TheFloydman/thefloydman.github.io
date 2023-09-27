async function onLoad() {
    const headerSource = await fetch("./header.html");
    const html = await headerSource.text();
    const wrapper = document.getElementById("main-wrapper");
    wrapper.insertAdjacentHTML("afterbegin", html);

    const firebase = await getFirebase();
    if (firebase.isSignInWithEmailLink(window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem("ahlteeEmail");
        if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            email = window.prompt("Please provide your email for confirmation");
        }
        // The client SDK will parse the code from the link for you.
        firebase.signInWithEmailLink(email, window.location.href)
            .then((result) => {
                console.log(result);
                // Clear email from storage.
                window.localStorage.removeItem('ahlteeEmail');
                // You can access the new user via result.user
                // Additional user info profile not available via:
                // result.additionalUserInfo.profile == null
                // You can check if the user is new or existing:
                // result.additionalUserInfo.isNewUser

                const urlParams = new URLSearchParams(window.location.search);
                location.href = urlParams.get("origin");
            })
            .catch((error) => {
                console.error(error);
                // Some error occurred, you can inspect the code: error.code
                // Common errors could be invalid email and invalid or expired OTPs.
            });
    }
}

function onUserLoaded() { }