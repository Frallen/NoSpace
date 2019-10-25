import firebase from "../config/firebase";

const Newproject = "Newproject";
const NewProjectErr = "NewProjectErr";
let initialState = {
  Newproject: [],
  Propjects: [
    { id: 1, text: "bla bla", Title: "pamagite" },
    { id: 2, text: "hehe", Title: "pamagite" },
    { id: 3, text: "tutu", Title: "pamagite" },
    { id: 4, text: "tutu", Title: "pamagite" },
    { id: 5, text: "tutu", Title: "pamagite" },
    { id: 6, text: "tutu", Title: "pamagite" }
  ]
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

export const CreateNewproject = project => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    const res = await firebase
      .collection("Projects")
      .add({
        ...project
        /*   Title: "Stratigic",
        Text: "ha ha ha no plan",
        Target: "Make Money"*/
      })
      .then(() => {
        dispatch({ project});
      });
  } catch (err) {}
};

export default dashboardReducer;
