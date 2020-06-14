import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCsnRt6B0mAjB_p6UzIQl160PS5Vz00UyQ",
  authDomain: "messaging-app-ecfd8.firebaseapp.com",
  databaseURL: "https://messaging-app-ecfd8.firebaseio.com",
  projectId: "messaging-app-ecfd8",
  storageBucket: "messaging-app-ecfd8.appspot.com",
  messagingSenderId: "647450255812",
  appId: "1:647450255812:web:e72c2d45aedef834800491",
  measurementId: "G-ZBMC39V251",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
