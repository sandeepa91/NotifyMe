import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBPysi5WQUsm79OkcYhglS2_KRyOeXHRqE",
    authDomain: "notifyme-7cc45.firebaseapp.com",
    databaseURL: "https://notifyme-7cc45.firebaseio.com",
    projectId: "notifyme-7cc45",
    storageBucket: "",
    messagingSenderId: "267377698668"
    };

const Firebase = firebase.initializeApp(config);
export default Firebase;