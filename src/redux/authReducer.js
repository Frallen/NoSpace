const NewUserEror = "NewUserEror";
const RegSucces = "RegSucces";
const RegStart = "RegStart";
const RegEnd = "RegEnd";
let initialState = {
  error: null,
  loading: false
};

const authReducer = (state = initialState, action) => {
   switch (action.type) {
    case RegSucces:
      return {
        ...state,
        error: false
      };
    case NewUserEror:
      return {
        ...state,
        error: action.payload
      };
   
    case RegStart:
      return {
        ...state,
        loading: true
      };
    case RegEnd:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default authReducer;


export const LogInUser = data => async (dispatch,getState,{ getFirebase }) => {
  const firebase = getFirebase();
  dispatch({ type: RegStart });
  try {
    await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    dispatch({ type: RegSucces });
  } catch (err) {
    dispatch({ type: NewUserEror, payload: err.message });
  }
  dispatch({ type: RegEnd });
};
