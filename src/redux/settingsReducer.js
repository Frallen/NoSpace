import { Alert } from "rsuite";

const ChangeStart = "ChangeStart";
const ChangeSucc = "ChangeSucc";
const ChangeFail = "ChangeFail";
const CleanUp = "CleanUp";
let initialState = {
  error: null,
  loading: false,
  suc: null,
};

let settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ChangeStart:
      return {
        ...state,
        loading: true,
      };
    case ChangeSucc:
      return {
        ...state,
        loading: false,
        error: null,
        suc: true,
      };
    case ChangeFail:
      return {
        ...state,
        error: action.payload,
      };
    case CleanUp:
      return {
        ...state,
        error: null,
        loading: false,
        suc: null,
      };
    default:
      return state;
  }
};

export default settingsReducer;

//чистка ошибок
export const Clean = () => ({ type: CleanUp });

//изменение профиля
export const ChangeProfile = (data) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  //Получение доступа залогиненным данным (простой рефакторинг,тупое присвоение)
  //uid текущий айди пользователя и email текущий емейл пользователя
  const { uid: userId, email: userEmail } = getState().firebase.auth;
  const profile = getState().firebase.profile;
  dispatch({ type: ChangeStart });
  try {
    //если новый введенный емейл не равен старому то изменяем
    if (data.email !== userEmail && data.email) {
      await user.updateEmail(data.email);
      await firestore.collection("users").doc(userId).update({
        Email: data.email,
      });
      await user.sendEmailVerification();
      await firebase.auth().signOut();
      await firebase.logout();
    }
    if (data.FIO !== profile.FIO && data.FIO) {
      await firestore.collection("users").doc(userId).update({
        FIO: data.FIO,
      });
    }

    if (data.password) {
      await user.updatePassword(data.password);
      await firebase.auth().signOut();
      await firebase.logout();
    }
    Alert.success("Операция выполнена успешно", 5000);
    dispatch({ type: ChangeSucc });
  } catch (err) {
    dispatch({ type: ChangeFail, payload: err.message });
    if (
      err ===
      "This operation is sensitive and requires recent authentication. Log in again before retrying this request."
    ) {
      let message =
        "Для выполнения этой операции нужно выполнить повторный вход в систему";
      Alert.warning(message, 5000);
    }
  }
};

export const Delete = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch({ type: ChangeStart });
  //s const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  //Получение доступа залогиненным данным (простой рефакторинг,тупое присвоение)
  //const userId = getState().firebase.auth.uid;
  // try {

  await user
    .delete()
    .then(() => {
      /*
         firebase
          .storage()
          .refFromURL(`gs://nospace-92826.appspot.com/Mission/${id}/${NameDoc}`)
          .delete();

    
   
       firebase
          .storage()
          .refFromURL(
            `gs://nospace-92826.appspot.com/Mission/${id}/otvet/${NameDocDone}`
          )
          .delete();*/
      firebase.logout();
      dispatch({ type: ChangeSucc });
    })
    .catch((error) => {
      dispatch({ type: ChangeFail, payload: error.message });
    });
};
