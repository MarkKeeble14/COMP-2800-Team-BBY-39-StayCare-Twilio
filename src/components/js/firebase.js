import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
import "firebase/auth";

const config = {
    apiKey: "AIzaSyDLkAOfVmsw8ZEEhK8tro4OaptcGlmY3VA",
    authDomain: "dayca-9d9f3.firebaseapp.com",
    databaseURL: "https://dayca-9d9f3.firebaseio.com",
    projectId: "dayca-9d9f3",
    storageBucket: "dayca-9d9f3.appspot.com",
    messagingSenderId: "330554646489",
    appId: "1:330554646489:web:3ea2d0bbe8029d3a63c3c8",
    measurementId: "G-2BRF7LMKN9"
};

// Initialize Firebase
firebase.initializeApp(config);

var db = firebase.firestore();
var ref = firebase.storage().ref();
var auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await db.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};




export { db };
export { ref };
export { auth };