// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getStorage, ref } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOtae0JA6qfzQtbY7lnI6pb4pSfN46llY",
  authDomain: "instagram-clone-react-57394.firebaseapp.com",
  projectId: "instagram-clone-react-57394",
  storageBucket: "instagram-clone-react-57394.appspot.com",
  messagingSenderId: "21500772451",
  appId: "1:21500772451:web:df1c56429308bfeef53856",
  measurementId: "G-Z8D3LNB08E"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = getStorage(firebaseApp);
const storageRef = ref(storage);

export{ auth, db, storage, storageRef};
