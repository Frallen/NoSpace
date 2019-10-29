const NewUserEror = "NewUserEror";
const RegSucces = "RegSucces";
const RegStart = "RegStart";
const RegEnd = "RegEnd";
let initialState = {
  error: null,
  loading: false
};

const registrationReducer = (state = initialState, action) => {
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

export default registrationReducer;

export const SignUpUsers = data => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  dispatch({ type: RegStart });
  try {
    const res = await firebase
      .auth()
      //специальная firestore функция в которую передаются данные
      .createUserWithEmailAndPassword(data.email, data.password);
    await firestore
      //в коллекцию юзерс передаются юзер айди и ставятся дополнительные данные
      .collection("users")
      .doc(res.user.uid)
      .set({
        FIO: data.FIO,
        username: data.username
      });
    dispatch({ type: RegSucces });
  } catch (err) {
    dispatch({ type: NewUserEror, payload: err.message });
    console.log(err.message);
  }
  dispatch({ type: RegEnd });
};

export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  try {
  await firebase.auth().signOut();
  } catch (err) {
    console.log(err.message);
  }
};

