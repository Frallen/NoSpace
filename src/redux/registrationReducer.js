const NewUserEror = "NewUserEror";
const RegSucces = "RegSucces";
const RegStart = "RegStart";
const RegEnd = "RegEnd";
const CleanUp = "CleanUp";
const VeryfiStart = "VeryfiStart";
const VeryfiSucsess = "VeryfiStart";
const VeryfiFail = "VeryfiStart";
const RecoverStart = "RecoverStart";
const RecoverSucsess = "RecoverSucsess";
const RecvoerFail = "RecvoerFail";

let initialState = {
  error: null,
  loading: false,
  verifyemail: {
    error: null,
    loading: false
  },
  recoverpass: {
    error: null,
    loading: false
  }
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
        loading: false,
        error:null,
      };
    case CleanUp:
      return {
        ...state,
        error: null,
        verifyemail: { ...state.verifyemail, loading: false, error: null }
      };
    case VeryfiStart:
      return {
        ...state,
        verifyemail: { ...state.verifyemail, loading: true }
      };
    case VeryfiSucsess: {
      return {
        ...state,
        verifyemail: { ...state.verifyemail, loading: false, error: false }
      };
    }
    case VeryfiFail:
      return {
        ...state,
        verifyemail: { ...state.verifyemail, error: action.payload }
      };

    case RecoverStart:
      return {
        ...state,
        loading: true
      };
    case RecoverSucsess:
      return {
        ...state,
        loading: false,
        error: null
      };

    case RecvoerFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export default registrationReducer;

//регистрация
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
    //верфикация емейла
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();

    await firestore
      //в коллекцию юзерс передаются юзер айди и ставятся дополнительные данные
      .collection("users")
      .doc(res.user.uid)
      .set({
        FIO: data.FIO,
        Email:data.email,
        Otdel:data.Otdel,
      });
    dispatch({ type: RegSucces });
  } catch (err) {
    dispatch({ type: NewUserEror, payload: err.message });
  }
  dispatch({ type: RegEnd });
};
//выход
export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  try {
    await firebase.auth().signOut();
  } catch (err) {}
};

//логин
export const LogInUser = data => async (
  dispatch,
  getState,
  { getFirebase }
) => {
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

//чистка ошибок
export const Clean = () => ({ type: CleanUp });

// верификация емейла
export const verifyEmail = () => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    dispatch({ type: VeryfiStart });
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();
    dispatch({ type: VeryfiSucsess });
  } catch (err) {
    dispatch({ type: VeryfiFail, payload: err.message });
  }
};

export const RecoverPass = data => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  dispatch({ type: RecoverStart });
  try {
    await firebase.auth().sendPasswordResetEmail(data.email);
    dispatch({ type: RecoverSucsess });
  } catch (err) {
    dispatch({ type: RecvoerFail, payload: err.message });
  }
};
