import { firestoreReducer, getFirebase, reactReduxFirebase } from "react-redux-firebase";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { getFirestore, reduxFirestore,createFirestoreInstance } from "redux-firestore";
import { reducer as formReducer } from "redux-form";
import firebase from "./../config/firebase"

import thunk from "redux-thunk";
import authReducer from "./authReducer";
import NavigationReducer from "./navigationReducer";
import projectReducer from "./projectReducer";
import registrationReducer from "./registrationReducer";
import usersReducer from "./usersReducer";

let reducers = combineReducers({
  Navigation: NavigationReducer,
  Users: usersReducer,
  Auth: authReducer,
  Regis: registrationReducer,
  form: formReducer,
  project: projectReducer,
  firestore:firestoreReducer,
});

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}
/*
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
  }*/
let store = createStore(
  reducers,
  compose(
    reactReduxFirebase(firebase,rrfConfig),
    reduxFirestore(firebase),
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    
  )
);



export default store;
