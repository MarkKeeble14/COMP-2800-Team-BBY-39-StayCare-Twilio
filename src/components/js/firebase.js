import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

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

export { db };
export { ref };