// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    updateProfile,
    sendSignInLinkToEmail as _sendSignInLinkToEmail,
    isSignInWithEmailLink as _isSignInWithEmailLink,
    signInWithEmailLink as _signInWithEmailLink
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

import {
    getFirestore,
    collection as _collection,
    getDocs,
    getDoc,
    doc as _doc,
    setDoc,
    updateDoc,
    addDoc,
    query,
    orderBy,
    where,
    arrayUnion,
    getCountFromServer,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCpbL7Cm9p_yaNwBeCT2VfpSOemSpz6gbs",
    authDomain: "book-of-atrus-tracker.firebaseapp.com",
    projectId: "book-of-atrus-tracker",
    storageBucket: "book-of-atrus-tracker.appspot.com",
    messagingSenderId: "494525503092",
    appId: "1:494525503092:web:da91fed1bcd361992e2321"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

function collection(target) {
    return _collection(db, target);
}

function doc(collection, target) {
    return _doc(db, collection, target);
}

async function sendSignInLinkToEmail(email, actionCodeSettings) {
    return _sendSignInLinkToEmail(auth, email, actionCodeSettings);
}

function isSignInWithEmailLink(href) {
    return _isSignInWithEmailLink(auth, href);
}

async function signInWithEmailLink(email, href) {
    return _signInWithEmailLink(auth, email, href);
}

export { auth, onAuthStateChanged, updateProfile, collection, getDocs, getDoc, doc, setDoc, updateDoc, query, orderBy, addDoc, where, arrayUnion, getCountFromServer, serverTimestamp, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink }