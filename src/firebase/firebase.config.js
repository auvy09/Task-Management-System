// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7j1SVE39Qr59UvMr9F6Nyuj3qG0mQfJw",
    authDomain: "task-manager-cc3b1.firebaseapp.com",
    projectId: "task-manager-cc3b1",
    storageBucket: "task-manager-cc3b1.appspot.com",
    messagingSenderId: "408592571879",
    appId: "1:408592571879:web:fc47d0c422065603d17142"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export default app;