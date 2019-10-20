import { firebaseApp } from "../config/firebase";

const Newproject = "Newproject";
const NewProjectErr = "NewProjectErr";
let initialState = {
  Newproject: [],
  Propjects: []
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case Newproject: {
      return {
        ...state,
        Newproject: action.project
      };
    }
    case NewProjectErr: {
      return {};
    }
    default:
      return state;
  }
};

//export const NewProject = data => ({ type: Newproject, data });

export const CreateNewproject = project => {
  return (dispatch, { getFirestore, getFirebase }) => {
   //вызван экпортом
    firebaseApp
      .collection("Projects")
      .add({
        ...project,
        Title: "Stratigic",
        Text: "ha ha ha no plan",
        Target: "Make Money"
      })
      .then(() => {
        dispatch({ type: Newproject, project });
      })
      .catch(err => {
        dispatch({ type: NewProjectErr, err });
      });
  };
};

export default dashboardReducer;
