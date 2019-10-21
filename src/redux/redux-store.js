import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import NavigationReducer from "./navigationReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import registrationReducer from "./registrationReducer";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase, firestoreReducer } from "react-redux-firebase";
import Config from "./../config/firebase";

let reducers = combineReducers({
  Navigation: NavigationReducer,
  Users: usersReducer,
  Auth: authReducer,
  Regis: registrationReducer,
  form: formReducer,
  project: projectReducer,
  firestore:firestoreReducer,
});

let store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(Config),
    reactReduxFirebase(Config)
  )
);

export default store;
