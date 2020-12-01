import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase using my config object
const firebaseConfig = {
  apiKey: "AIzaSyBVMrJvVcsL53ZQWXfxOgpH82sVanE0suc",
  authDomain: "bug-tracker-database.firebaseapp.com",
  databaseURL: "https://bug-tracker-database.firebaseio.com",
  projectId: "bug-tracker-database",
  storageBucket: "bug-tracker-database.appspot.com",
  messagingSenderId: "220017707963",
  appId: "1:220017707963:web:d6fdc487aa305648d4d29e",
};
firebase.initializeApp(firebaseConfig);

export default firebase;