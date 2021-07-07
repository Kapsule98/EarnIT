import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDzgdO1FfWbsO-uH5KU_0DD40aOXC-mtkI",
    authDomain: "earnit-66ce6.firebaseapp.com",
    projectId: "earnit-66ce6",
    storageBucket: "earnit-66ce6.appspot.com",
    messagingSenderId: "921814056747",
    appId: "1:921814056747:web:a447dec83df414d2150f6e",
    measurementId: "G-KVWYT4X4KP"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); 
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;