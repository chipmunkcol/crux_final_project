import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4E1xTZMfV8ZU7U7-MV1TXd_hu0uAdY5U",
    authDomain: "fir-ec6e2.firebaseapp.com",
    projectId: "fir-ec6e2",
    storageBucket: "fir-ec6e2.appspot.com",
    messagingSenderId: "194035575697",
    appId: "1:194035575697:web:90d60885a5624e27ccc830",
    measurementId: "G-RSKH6LCSJC"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);