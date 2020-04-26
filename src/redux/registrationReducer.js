const RegStart = "RegStart";
const RegEnd = "RegEnd";
const FoundError = "FoundError";
const CleanUp = "CleanUp";
const SuccMess = "SuccMess";

let initialState = {
  error: null,
  loading: false,
  succ: false,
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case RegStart:
      return {
        ...state,
        loading: true,
      };
    case RegEnd:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case FoundError:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CleanUp:
      return {
        ...state,
        error: null,
        loading: false,
        succ: false,
      };
    case SuccMess:
      return {
        ...state,
        succ: action.succ,
      };

    default:
      return state;
  }
};

export default registrationReducer;

//регистрация
export const SignUpUsers = (data) => async (
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
        Email: data.email,
        ID: res.user.uid,
        Otdel: data.Otdel,
      });
    dispatch({ type: RegEnd });
  } catch (err) {
    dispatch({ type: FoundError, payload: err.message });
  }
  dispatch({ type: RegEnd });
};
//выход
export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  try {
    await firebase.auth().signOut();
    await firebase.logout();
  } catch (err) {}
};

//логин
export const LogInUser = (data) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  dispatch({ type: RegStart });
  try {
    await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    dispatch({ type: RegEnd });
  } catch (err) {
    dispatch({ type: FoundError, payload: err.message });
  }
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
    dispatch({ type: RegStart });
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();
    dispatch({ type: RegEnd });
  } catch (err) {
    dispatch({ type: FoundError, payload: err.message });
  }
};

export const RecoverPass = (data) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  dispatch({ type: RegStart });

  let sn = await firebase.auth().fetchSignInMethodsForEmail(data.email);
  if (sn.length === 0) {
    dispatch({ type: FoundError, payload: true });
  } else {
    await firebase.auth().sendPasswordResetEmail(data.email);
    dispatch({ type: SuccMess, succ: true });
  }
  //
  dispatch({ type: RegEnd });
};
