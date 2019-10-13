import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDmtvr_14sNyH7_2U3iStE_60lDTmRfSfU",
  authDomain: "nospace-92826.firebaseapp.com",
  databaseURL: "https://nospace-92826.firebaseio.com",
  projectId: "nospace-92826",
  storageBucket: "nospace-92826.appspot.com",
  messagingSenderId: "72903438209",
  appId: "1:72903438209:web:54d0fe5e69cacb1b578280",
  measurementId: "G-7PCV4SN3TE"
};

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({timestampsInSnapshots:true})

export default firebase