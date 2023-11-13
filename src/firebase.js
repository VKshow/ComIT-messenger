// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJHFe3W4GDg7znji2_R8qTpPe3czInVTg",
    authDomain: "krndsh-aa3d1.firebaseapp.com",
    databaseURL: "https://krndsh-aa3d1.firebaseio.com",
    projectId: "krndsh-aa3d1",
    storageBucket: "krndsh-aa3d1.appspot.com",
    messagingSenderId: "1030557893855",
    appId: "1:1030557893855:web:68a0e5064b75d71075d56a",
    measurementId: "G-NE8J34LMJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const analytics = getAnalytics(app);

export const db = getFirestore(app);