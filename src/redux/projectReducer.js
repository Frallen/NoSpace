const StartNewProject = "StartNewProject";
const NewProjectSucc = "NewProjectSucc";
const NewProjectErr = "NewProjectErr";
const Clean = "Clean";
let initialState = {
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
