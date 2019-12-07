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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  
  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // const newDocRef = collectionRef.doc(obj.title);
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
    // console.log(newDocRef);
  });

  return await batch.commit();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;