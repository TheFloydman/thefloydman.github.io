var userGlobal;
const firebaseGlobal = import("./firebase.js");
firebaseGlobal.then(firebase => {
    firebase.onAuthStateChanged(firebase.auth, (user) => {
        userGlobal = user;
    });
})
    .catch(error => { console.error(error); });

async function getUser() {
    const firebase = await getFirebase();
    return new Promise(resolve => {
        let tries = 0;
        const interval = setInterval(() => {
            if (userGlobal) {
                clearInterval(interval);
                resolve(userGlobal);
            }
            tries++
            if (tries > 10) {
                resolve(false);
            }
        }, 500);
    });
}

function getFirebase() {
    return new Promise(resolve => {
        let tries = 0;
        const interval = setInterval(() => {
            if (firebaseGlobal) {
                clearInterval(interval);
                resolve(firebaseGlobal);
            }
            tries++
            if (tries > 10) {
                resolve(false);
            }
        }, 500);
    });
}

function goToUser() {
    window.location.href = "./user.html";
}

async function logOut() {
    const firebase = await getFirebase();
    if (firebase) {
        firebase.auth.signOut()
            .then(() => {
                // Sign-out successful.
                location.reload();
            })
            .catch(error => {
                alert("Could not sign out!");
                console.error("Could not sign out: " + error);
            });
    }
}

function createElementWithClass(type, className, inner = "", plainText = false) {
    const element = document.createElement(type);
    element.className = className;
    if (plainText) {
        element.innerText = inner;
    } else {
        element.innerHTML = inner;
    }
    return element;
}

function getAndFillElement(id, html) {
    const element = document.getElementById(id);
    element.innerHTML = html;
    return element;
}

async function addModMenuItems() {
    const firebase = await getFirebase();
    const user = await getUser();
    const userReference = firebase.doc("users", user.uid);
    if (userReference) {
        const userDoc = await firebase.getDoc(userReference);
        const user = userDoc.data();
        if ((user.mod && user.mod == true) || (user.admin && user.admin == true)) {
            const linksMenu = document.getElementById("edits-link");
            linksMenu.style.display = "block";
        }
    }
}

function dateNumToWords(date) {
    const array = date.split("-");
    const days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let translatedDate = parseInt(array[0]);
    if (array.length > 1) {
        translatedDate = `${months[parseInt(array[1] - 1)]} ${translatedDate}`;
        if (array.length > 2) {
            translatedDate = `${days[parseInt(array[2] - 1)]} ${translatedDate}`;
        }
    }
    return translatedDate;
}

function toggleVisibilityBlock(makeVisible, makeInvisible, strings = false) {
    if (strings) {
        makeVisible = document.getElementById(makeVisible);
        makeInvisible = document.getElementById(makeInvisible);
    }
    makeVisible.style.display = "block";
    makeInvisible.style.display = "none";
}

function toggleVisibilityFlex(makeVisible, makeInvisible, strings = false) {
    if (strings) {
        makeVisible = document.getElementById(makeVisible);
        makeInvisible = document.getElementById(makeInvisible);
    }
    makeVisible.style.display = "flex";
    makeInvisible.style.display = "none";
}

function formatISBN(unformatted) {
    return unformatted.substring(0, 3) + "-" + unformatted.substring(3, 4) + "-" + unformatted.substring(4, 11) + "-" + unformatted.substring(11, 12) + "-" + unformatted.substring(12);
}

/** From https://stackoverflow.com/a/3866442 */
function cursorToEndOfContentEditable(contentEditableElement) {
    var range, selection;
    if (document.createRange) { // Firefox, Chrome, Opera, Safari, IE 9+
        range = document.createRange(); // Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement); // Select the entire contents of the element with the range
        range.collapse(false); // Collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection(); // Get the selection object (allows you to change selection)
        selection.removeAllRanges(); // Remove any selections already made
        selection.addRange(range); // Make the range you have just created the visible selection
    } else if (document.selection) { // IE 8 and lower
        range = document.body.createTextRange(); // Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement); // Select the entire contents of the element with the range
        range.collapse(false); // Collapse the range to the end point. false means collapse to end rather than the start
        range.select(); // Select the range (make it the visible selection
    }
}