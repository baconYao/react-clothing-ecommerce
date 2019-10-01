import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB-DGJ2YI_bKUqVF9ANvEof3VUSuQv_QWk",
  authDomain: "react-clothing-ecommerce-db.firebaseapp.com",
  databaseURL: "https://react-clothing-ecommerce-db.firebaseio.com",
  projectId: "react-clothing-ecommerce-db",
  storageBucket: "",
  messagingSenderId: "259459560705",
  appId: "1:259459560705:web:caa65a12e5183002701700"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;