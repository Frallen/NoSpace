import { reset } from "redux-form";

const StartNewProject = "StartNewProject";
const NewProjectSucc = "NewProjectSucc";
const NewProjectErr = "NewProjectErr";
const CleanUp = "CleanUp";
//взять все проекты
const GetallProj = "GetallProj";
//взять один проект
const getOne = "getOne";
//взять всех узеров
const GetallUsers = "GetallUsers";
//взять все задачи
const GetAllTask = "GetAllTask";
//взять одну задачу
const GetMyTask = "GetMyTask";
//взять ссылку для скачивания документа начальника
const DownLinkBoss = "DownLinkBoss";
//взять ссылку для скачивания отчета сотрудника
const DownLinkWorker = "DownLinkWorker";

let initialState = {
  error: null,
  loading: false,
  //Контейнер для всех проектов
  DataProjects: [],
  //Контейнер для одного проекта
  OneProject: [],
  //Контейнер для всех юзеров(для их выбора)
  DataUsers: [],
  Tasks: [],
  //задача сотрудника
  MyTask: [],
  //ссылка на скачивание документа начальника
  LinkBoss: null,
  //ссылка на скачивание документа сотрудника
  LinkWorker: null
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
    case GetAllTask:
      return {
        ...state,
        Tasks: action.tasks
      };
    case GetMyTask:
      return {
        ...state,
        MyTask: action.task
      };
    case DownLinkBoss:
      return {
        ...state,
        LinkBoss: action.url
      };
    case DownLinkWorker:
      return {
        ...state,
        LinkWorker: action.url
      };

    default:
      return state;
  }
};

export const Clean = () => ({ type: CleanUp });

export const CreateNewproject = data => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
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
    //загружаю документ в storage
    firebase
      .storage()
      .ref(`Missions/${comm.id}/` + data.document.name)
      .put(data.document);
    //добавляю в firestore имя добавляемого документа чтобы потом получить его
    data.NameDoc = data.document.name;
    //удаляю массив документа тк он не поддерживается firestore
    delete data.document;

    //добавляю в пришедшие данные айди
    data.idMission = comm.id; //уникальный айди проекта
    data.idOwner = userId;
    data.isDone = false;
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
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  try {
    await firestore
      .collection("Mission")
      .where("idMission", "==", data)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          let project = doc.data();
          //console.log(doc.data());

          //взятие ссылки босса
          firebase
            .storage()
            .ref(`Missions/${project.idMission}/${project.NameDoc}`)
            .getDownloadURL()
            .then(url => {
              let xhr = new XMLHttpRequest();
              xhr.responseType = "blob";
              /*  xhr.onload = function(event) {
                let blob = xhr.response;
              };*/
              xhr.open("GET", url);
              xhr.send();
              dispatch({ type: DownLinkBoss, url });
            })
            .catch(function(error) {
              // Handle any errors
            });

          //взятие ссылки сотрудника
          if (project.NameDocDone) {
            firebase
              .storage()
              .ref(`Missions/${project.idMission}/otvet/${project.NameDocDone}`)
              .getDownloadURL()
              .then(url => {
                let xhr = new XMLHttpRequest();
                xhr.responseType = "blob";
                /*xhr.onload = function(event) {
                  let blob = xhr.response;
                };*/
                xhr.open("GET", url);
                xhr.send();
                dispatch({ type: DownLinkWorker, url });
              })
              .catch(function(error) {});
          }
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
        let users = snap.docs.map(doc => doc.data());
        // и отправляю их
        dispatch({ type: GetallUsers, users });
      });
  } catch (err) {}
};

//обновление проекта
export const UpdateProject = data => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  try {
    if (data.document) {
      //сначала получить коллекцию чтобы вставить в url
      await firestore
        .collection("Mission")
        .where("idMission", "==", data.idMission)
        .get()
        .then(snap => {
          snap.forEach(doc => {
            let project = doc.data();
            //удаляю файл босса
            firebase
              .storage()
              .refFromURL(
                `gs://nospace-92826.appspot.com/Missions/${project.idMission}/${project.NameDoc}`
              )
              .delete();
          });
        });

      //загружаю документ в storage
      await firebase
        .storage()
        .ref(`Missions/${data.idMission}/` + data.document.name)
        .put(data.document);
      //добавляю в firestore имя добавляемого документа чтобы потом получить его
      data.NameDoc = data.document.name;
    }
    //удаляю массив документа тк он не поддерживается firestore
    delete data.document;
    //потом обновить
    await firestore
      .collection("Mission")
      .doc(data.idMission)
      .update({ ...data });
  } catch (err) {
    console.log(err.message);
  }
};
//удаления проекта
export const DeleteProject = data => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  try {
    //сначала получить коллекцию чтобы вставить в url
    await firestore
      .collection("Mission")
      .where("idMission", "==", data)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          let project = doc.data();
          //удаляю файл босса
          firebase
            .storage()
            .refFromURL(
              `gs://nospace-92826.appspot.com/Missions/${project.idMission}/${project.NameDoc}`
            )
            .delete();
          //удаляю файл сотрудника
          if (project.NameDocDone) {
            firebase
              .storage()
              .refFromURL(
                `gs://nospace-92826.appspot.com/Missions/${project.idMission}/otvet/${project.NameDocDone}`
              )
              .delete();
          }
        });
      });

    //потом обновить
    await firestore
      .collection("Mission")
      .doc(data)
      .delete();
  } catch (err) {}
};
export const GetAllTasks = data => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const { email: Email } = getState().firebase.auth;
  try {
    await firestore
      .collection("Mission")
      .where("SendTo", "==", Email)
      .get()
      .then(snap => {
        //беру все докуметы с совпадающим айди и расчехляю их
        let tasks = snap.docs.map(doc => doc.data());
        // console.log(tasks);
        dispatch({ type: GetAllTask, tasks });
      });
  } catch (err) {}
};

export const GetTask = data => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  try {
    await firestore
      .collection("Mission")
      .where("idMission", "==", data)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          let task = doc.data();
          //console.log(task);
          firebase
            .storage()
            .ref(`Missions/${task.idMission}/${task.NameDoc}`)
            .getDownloadURL()
            .then(url => {
              let xhr = new XMLHttpRequest();
              xhr.responseType = "blob";
              /* xhr.onload = function(event) {
                let blob = xhr.response;
              };*/
              xhr.open("GET", url);
              xhr.send();
              dispatch({ type: DownLinkBoss, url });
            })
            .catch(function(error) {
              // Handle any errors
            });
          dispatch({ type: GetMyTask, task });
        });
      });
  } catch (err) {}
};
//отправка отчета сотрудника
export const SendBackTask = data => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  try {
    await firestore
      .collection("Mission")
      .doc(data.idMission)
      .get();

    await firebase
      .storage()
      .ref(`Missions/${data.idMission}/otvet/` + data.document.name)
      .put(data.document);
    //добавляю в firestore имя добавляемого документа чтобы потом получить его
    data.NameDocDone = data.document.name;
    //удаляю массив документа тк он не поддерживается firestore
    delete data.document;

    //потом обновить

    await firestore
      .collection("Mission")
      .doc(data.idMission)
      .update({ ...data });
  } catch (err) {}
};

export default dashboardReducer;
