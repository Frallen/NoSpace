import { reset } from "redux-form";

const Start = "Start";
const End = "End";
const ErrorProc = "ErrorProc";
const CleanUp = "CleanUp";

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
  //Контейнер для ошбики
  error: null,

  //неактивная кнопка при запросе
  loading: false,

  //Контейнер для всех проектов
  DataProjects: [],

  //Контейнер для одного проекта
  OneProject: [],

  //Контейнер для всех юзеров(для их выбора)
  DataUsers: [],

  //ссылка на скачивание документа начальника
  LinkBoss: null,

  //ссылка на скачивание документа сотрудника
  LinkWorker: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case Start:
      return {
        ...state,
        loading: true,
      };

    case End:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ErrorProc:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CleanUp:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case getOne:
      return {
        ...state,
        OneProject: action.project,
      };
    case GetallUsers:
      return {
        ...state,
        DataUsers: action.users,
      };
    case GetAllTask:
      return {
        ...state,
        DataProjects: action.data,
      };
    case DownLinkBoss:
      return {
        ...state,
        LinkBoss: action.url,
      };
    case DownLinkWorker:
      return {
        ...state,
        LinkWorker: action.url,
      };

    default:
      return state;
  }
};
//очистка
export const Clean = () => ({ type: CleanUp });
//создание проекта
export const CreateNewproject = (data) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  //получение айди в firebase
  const { uid: userId } = getState().firebase.auth;

  dispatch({ type: Start });
  try {
    //вариан создания своего айди let id = new Date().valueOf();

    //создается новый проект,от проекта берется айди
    //и записывается в коллекцию
    const comm = firestore.collection("Mission").doc();

    //загружаю документ в storage с таким же айди как у коллекции
    let idMission = comm.id;
    putFile(firebase, idMission, data.document, null);

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
      ...data,
    });

    //тестовый вывод всей пользовательской коллекции
    //console.log(res.docs.map(doc => doc.data()));
    //получение айди коммита
    // -->    console.log(comm.id)

    dispatch({ type: End });
    //затираю поля формы
    dispatch(reset("createForm"));
  } catch (err) {
    dispatch({ type: ErrorProc, payload: err.message });
  }
};

const GetProjects = async (toCollec, dispatch, firestore, to, userId) => {
  try {
    await firestore
      .collection(toCollec)
      .where(to, "==", userId)
      .onSnapshot(function (snap) {
        let arr = [];

        snap.forEach(function (doc) {
          arr.push(doc.data());
        });
        dispatch({ type: GetAllTask, data: arr });
      });
    // snap.docs.map(d => d.data());
  } catch (err) {}
};

//Отрисовка выданных заданий(как начальник)
export const GetAllProjects = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let toCollec = "Mission";
  let to = "idOwner";
  const firestore = getFirestore();
  const { uid: userId } = getState().firebase.auth;
  GetProjects(toCollec, dispatch, firestore, to, userId);
};
//Отрисовка заданий для личного выполнения(как подчиненный)
export const GetAllTasks = (data) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let toCollec = "Mission";
  let to = "SendTo";
  const firestore = getFirestore();
  const { uid: userId } = getState().firebase.auth;
  GetProjects(toCollec, dispatch, firestore, to, userId);
};
//взятие истории
export const GetHistory = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const { uid: userId } = getState().firebase.auth;
  const firestore = getFirestore();
  let toCollec = "History";
  let to = "idOwner";
  GetProjects(toCollec, dispatch, firestore, to, userId);
};

//Взятие ссылки для скачивания
const GetUrl = async (
  dispatch,
  firebase,
  idMission,
  NameDoc,
  NameDocDone,
  otvet
) => {
  let url = await firebase
    .storage()
    .ref("Mission/" + idMission + "/" + NameDoc)
    .getDownloadURL();
  dispatch({ type: DownLinkBoss, url });
  //если задание выполненно,то можно скачать отчет сотрудника
  if (otvet === true) {
    let url = await firebase
      .storage()
      .ref("Mission/" + idMission + "/otvet/" + NameDocDone)
      .getDownloadURL();
    dispatch({ type: DownLinkWorker, url });
  }
};
//загрузка файлов
const putFile = async (firebase, idMission, document, otvet) => {
  await firebase
    .storage()
    .ref(`Mission/${idMission}/` + document.name)
    .put(document);
  if (otvet === true) {
    await firebase
      .storage()
      .ref(`Mission/${idMission}/otvet/` + document.name)
      .put(document);
  }
};

//получаю выбранный проект
export const GetProjData = (data, to) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  try {
    let snap = await firestore
      .collection(to ? to : "Mission")
      .where("idMission", "==", data)
      .get();

    snap.forEach((doc) => {
      let project = doc.data();

      //взятие ссылки босса
      //переадю небходимые данные
      GetUrl(
        dispatch,
        firebase,
        project.idMission,
        project.NameDoc,
        project.NameDocDone
      );
      //взятие ссылки сотрудника
      if (project.NameDocDone) {
        let otvet = true;
        GetUrl(
          dispatch,
          firebase,
          project.idMission,
          project.NameDoc,
          project.NameDocDone,
          otvet
        );
      }
      dispatch({ type: getOne, project });
    });
  } catch (err) {}
};

// Получение всех юзеров
export const AllUsers = (data) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  try {
    let snap = await firestore.collection("users").get();

    //беру всех юзеров
    let users = snap.docs.map((doc) => doc.data());
    // и отправляю их
    dispatch({ type: GetallUsers, users });
  } catch (err) {}
};
//удаление файлов
const DeleteFile = async (NameDoc, firebase, id, NameDocDone) => {
  if (NameDoc) {
    await firebase
      .storage()
      .refFromURL(`gs://nospace-92826.appspot.com/Mission/${id}/${NameDoc}`)
      .delete();
  }

  if (NameDocDone) {
    await firebase
      .storage()
      .refFromURL(
        `gs://nospace-92826.appspot.com/Mission/${id}/otvet/${NameDocDone}`
      )
      .delete();
  }
};
//обновление данных
const Update = async (firestore, id, data) => {
  await firestore
    .collection("Mission")
    .doc(id)
    .update({ ...data });
};

//обновление проекта
export const UpdateProject = (data) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  dispatch({ type: Start });
  try {
    if (data.document) {
      //сначала получить коллекцию чтобы вставить в url

      let snap = await firestore
        .collection("Mission")
        .where("idMission", "==", data.id)
        .get();

      snap.forEach((doc) => {
        let project = doc.data();
        //удаляю файл босса

        DeleteFile(project.NameDoc, firebase, data.id, null);
      });

      //загружаю документ в storage
      putFile(firebase, data.idMission, data.document, null);

      //добавляю в firestore имя добавляемого документа чтобы потом получить его
      data.NameDoc = data.document.name;
    }
    //
    delete data.id;
    //удаляю массив документа тк он не поддерживается firestore
    delete data.document;
    //потом обновить

    Update(firestore, data.idMission, data);
  } catch (err) {
    dispatch({ type: ErrorProc, payload: err.message });
  }
  dispatch({ type: End });
};
//удаления проекта
export const DeleteProject = (data) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  dispatch({ type: Start });
  try {
    let snap = await firestore
      .collection("Mission")
      .where("idMission", "==", data.id)
      .get();

    snap.forEach((doc) => {
      let project = doc.data();
      //если проект сдан то создать копию в историю поручений
      if (data.tohistory) {
        firestore
          .collection("History")
          .doc(data.id)
          .set({
            //изначально получается вложенный массив project(в нем все данные)
            //деструктуризацией я выношу все вложенные объекты наверх и забавляюсь от propject
            ...project,
          });
      } else {
        DeleteFile(project.NameDoc, firebase, data.id, project.NameDocDone);
      }
      //Если начальник ошибся с отправкой то удаляются файлы
      if (project.NotMy === true) {
        //удаляю файл начальника и сотрудника
        DeleteFile(project.NameDoc, firebase, data.id, project.NameDocDone);
      }
    });

    //потом удалить
    await firestore.collection("Mission").doc(data.id).delete();
  } catch (err) {
    dispatch({ type: ErrorProc, payload: err.message });
  }
  dispatch({ type: End });
};

//отправка отчета сотрудника
export const SendBackTask = (data) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  dispatch({ type: Start });
  try {
    if (data.NotMy === true) {
      Update(firestore, data.idMission, data);
    } else {
      let otvet = true;
      putFile(firebase, data.idMission, data.document, otvet);

      //добавляю в firestore имя добавляемого документа чтобы потом получить его
      data.NameDocDone = data.document.name;
      //удаляю массив документа тк он не поддерживается firestore
      delete data.document;

      //потом обновить

      Update(firestore, data.idMission, data);

      let snap = await firestore
        .collection("Mission")
        .where("idMission", "==", data)
        .get();

      snap.forEach((doc) => {
        let task = doc.data();

        GetUrl(dispatch, firebase, task.idMission, task.NameDoc);

        dispatch({ type: GetMyTask, task });
      });
    }
  } catch (err) {
    dispatch({ type: ErrorProc, payload: err.message });
  }
  dispatch({ type: End });
};

export default dashboardReducer;
