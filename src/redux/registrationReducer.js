const NewUserEror = "NewUserEror";
const AuthStart = "AuthStart";
const AuthEnd = "AuthEnd";
let initialState = {
  error: null,
  loading: false
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthStart:
      return {
        ...state,
        loading: true
      };
    case AuthEnd:
      return {
        ...state,
        loading: false
      };
      case NewUserEror:
        return{
          ...state,
          error:action.payload
        }
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
  dispatch({ type: AuthStart });
  const firebase = getFirebase();
  const firestore = getFirestore();
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
    console.log(res);
  } catch (err) {
    dispatch({ type: NewUserEror, payload:err.message });
     console.log(err.message)
  }
  dispatch({ type: AuthEnd });

};
