const firebase = require('firebase');

var config = {
  apiKey: "AIzaSyBb1BsyWdbqQdgpj05fBD8ljp1m1-OvRLM",
    authDomain: "social-feed-16716.firebaseapp.com",
    databaseURL: "https://social-feed-16716.firebaseio.com",
    storageBucket: "social-feed-16716.appspot.com",
    messagingSenderId: "181316338593"
};

firebase.initializeApp(config);

export default firebase;
export const provider = new firebase.auth.TwitterAuthProvider();
