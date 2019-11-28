import { reset } from "redux-form";

const StartNewProject = "StartNewProject";
const NewProjectSucc = "NewProjectSucc";
const NewProjectErr = "NewProjectErr";
const CleanUp = "CleanUp";
//взять все проекты
const GetallProj = "GetallProj";
//взять один проект
const getOne = "getOne";
const GetallUsers = "GetallUsers";

let initialState = {
  error: null,
  loading: false,
  //Контейнер для всех проектов
  DataProjects: [],
  //Контейнер для одного проекта
  OneProject: [],
  //Контейнер для всех юзеров(для их выбора)
  DataUsers: []
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
    case CleanUp:
      return {
        ...state,
        error: null,
        loading: false,
        OneProject: []
      };
    case GetallProj:
      return {
        ...state,
        DataProjects: action.data
      };
    case getOne:
      return {
        ...state,
        OneProject: action.project
      };
    case GetallUsers:
      return {
        ...state,
        DataUsers: action.users
      };
    default:
      return state;
  }
};

export const Clean = () => ({ type: CleanUp });

export const CreateNewproject = data => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  //получение айди в firebase
  const { uid: userId } = getState().firebase.auth;

  dispatch({ type: StartNewProject });
  try {
    //вариан создания своего айди let id = new Date().valueOf();

    //получаю данные из коллекций
    await firestore
      .collection("Mission")
      .where("idOwner", "==", userId)
      .get();

    //создается новый проект,от проекта берется айди
    //и записывается в коллекцию
    const comm = firestore.collection("Mission").doc();

    //добавляю в пришедшие данные айди
    data.idMission = comm.id;
    data.idOwner = userId;
    //не знаю почему в массиве юзеры,удаляю вручную
    delete data.users;
    ///////////////
    comm.set({
      ...data
    });
    //тестовый вывод всей пользовательской коллекции
    //console.log(res.docs.map(doc => doc.data()));
    //получение айди коммита
    // -->    console.log(comm.id)

    dispatch({ type: NewProjectSucc });
    //затираю поля формы
    dispatch(reset("createForm"));
  } catch (err) {
    dispatch({ type: NewProjectErr, payload: err.message });
  }
};
//Отрисовываю все проекты
export const GetAllProjects = datas => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const { uid: userId } = getState().firebase.auth;
  try {
    await firestore
      .collection("Mission")
      .where("idOwner", "==", userId)
      .get()
      .then(snap => {
        //беру все докуметы с совпадающим айди и расчехляю их
        let data = snap.docs.map(doc => doc.data());
        //console.log(data)
        dispatch({ type: GetallProj, data });
      });
  } catch (err) {}
};
//получаю выбранный проект(начальник)
export const GetProjData = data => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  try {
    await firestore
      .collection("Mission")
      .where("idMission", "==", data)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          let project = doc.data();
          //console.log(doc.data());
          dispatch({ type: getOne, project });
        });
      });
  } catch (err) {}
};
// Получение всех юзеров
export const AllUsers = data => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  try {
    await firestore
      .collection("users")
      .get()
      .then(snap => {
        //беру всех юзеров
        let users = snap.docs.map(doc => doc.data().username);
        // и отправляю их
        dispatch({ type: GetallUsers, users });
      });
  } catch (err) {}
};

//обновление проекта
export const UpdateProject = data => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();

  try {
    //сначала получить коллекцию
    firestore
      .collection("Mission")
      .doc(data.idMission)
      .get();
    //потом обновить
    await firestore
      .collection("Mission")
      .doc(data.idMission)
      .update({ ...data });
      
      await firestore
      .collection("Mission")
      .where("idMission", "==", data)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          let project = doc.data();
          //console.log(doc.data());
          dispatch({ type: getOne, project });
        });
      });
  } catch (ex) {}
};
//удаления проекта
export const DeleteProject = data => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  try {
    //сначала получить коллекцию
    await firestore
      .collection("Mission")
      .doc(data)
      .get();
    //потом обновить
    await firestore
      .collection("Mission")
      .doc(data)
      .delete();
  } catch (ex) {}
};

export default dashboardReducer;
