const StartNewProject = "StartNewProject";
const NewProjectSucc = "NewProjectSucc";
const NewProjectErr = "NewProjectErr";
const Clean = "Clean";
let initialState = {
  Propjects: [
    { id: 1, text: "bla bla", Title: "pamagite" },
    { id: 2, text: "hehe", Title: "pamagite" },
    { id: 3, text: "tutu", Title: "pamagite" },
    { id: 4, text: "tutu", Title: "pamagite" },
    { id: 5, text: "tutu", Title: "pamagite" },
    { id: 6, text: "tutu", Title: "pamagite" }
  ],
  error: null,
  loading: false
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case StartNewProject:
      return {
        ...state,
        loading: true
      };

    case NewProjectSucc:
      return {
        ...state,
        loading: false,
        error: null
      };
    case NewProjectErr:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case Clean:
      return {
        ...state,
        error: null,
        loading: false
      };
    default:
      return state;
  }
};

export const CleanUp = () => ({ type: Clean });

export const CreateNewproject = data => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const { uid: userId } = getState().firebase.auth;

  dispatch({ type: StartNewProject });
  try {
    const res = await firestore
      .collection("Projects")
      .doc(userId)
      .get();
    const newProject = {
      id: new Date().valueOf(),
      project: data
    };
    if (!res.data()) {
      firestore
        .collection("Projects")
        .doc(userId)
        .set({
          project: [newProject]
        });
    } else {
      firestore
        .collection("Projects")
        .doc(userId)
        .update({
          project: [...res.data().project, newProject]
        });
    }
    dispatch({ type: NewProjectSucc });
  } catch (err) {
    dispatch({ type: NewProjectErr, payload: err.message });
  }
};

export default dashboardReducer;
