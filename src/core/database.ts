import * as firebase from "firebase/app";
import "firebase/database";


var config = {
    apiKey: "AIzaSyB8A0AUkFGdojOsckgi4URP0pGDAL64zOU",
    authDomain: "medical-ref-app.firebaseapp.com",
    databaseURL: "https://medical-ref-app.firebaseio.com",
    projectId: "medical-ref-app",
    storageBucket: "medical-ref-app.appspot.com",
    messagingSenderId: "1031848480203"
  };

  
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  export const db = firebase.database().ref();
