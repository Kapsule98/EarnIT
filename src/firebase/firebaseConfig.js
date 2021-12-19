import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAozTBo0kO2DvIRPjeLUPXSlOhuggbkfDQ",
  authDomain: "lemmebuy-227a2.firebaseapp.com",
  projectId: "lemmebuy-227a2",
  storageBucket: "lemmebuy-227a2.appspot.com",
  messagingSenderId: "849014218668",
  appId: "1:849014218668:web:293cd5a180addca5842409",
  measurementId: "G-4Z41C5XDR7",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
