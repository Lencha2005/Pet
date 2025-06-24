// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCCYZKwYEe4jQ3NeJfgihPinFc_cmGYDss',
  authDomain: 'pet-project-4e5f7.firebaseapp.com',
  projectId: 'pet-project-4e5f7',
  storageBucket: 'pet-project-4e5f7.firebasestorage.app',
  messagingSenderId: '216355408180',
  appId: '1:216355408180:web:946c11ca04185d0595bd61',
  measurementId: 'G-S8FSWTMP61',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
