const StartNewProject = "StartNewProject";
const NewProjectSucc = "NewProjectSucc";
const NewProjectErr = "NewProjectErr";
const CleanUp = "CleanUp";
const Getall = "Getall";
const getOne="getOne";

let initialState = {
  error: null,
  loading: false,
  //Контейнер для все проектов
  DataProjects: [],
  //Контейнер для одного проекта
  OneProject:[]
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
        OneProject:[]
      };
    case Getall:
      return {
        ...state,
        DataProjects: action.data
      };
      case getOne:
        return{
          ...state,
          OneProject:action.project
        }
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
  const { uid: userId } = getState().firebase.auth;

  dispatch({ type: StartNewProject });
  try {
    //вариан создания своего айди let id = new Date().valueOf();

    //получаю данные из коллекций
   await firestore.collection("Projects").where("idOwner", "==",userId).get();

    //создается новый проект,от проекта берется айди
    //и записывается в коллекцию
    const comm = firestore.collection("Projects").doc();

    //добавляю в пришедшие данные айди
    data.idProject = comm.id;
    data.idOwner = userId;

    ///////////////
    comm.set({
      ...data
    });
  //тестовый вывод всей пользовательской коллекции
    //console.log(res.docs.map(doc => doc.data()));
    //получение айди коммита
    // -->    console.log(comm.id)

    dispatch({ type: NewProjectSucc });
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
      .collection("Projects")
      .where("idOwner", "==", userId)
      .get().then(snap=>{
      let  data=snap.docs.map(doc=>doc.data())
        console.log(data)
        dispatch({ type: Getall, data });
      })
  } catch (err) {}
};

export const GetProjData = data => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore=getFirestore()
  try {
    await firestore
    .collection("Projects")
    .where("idProject", "==", data)
    .get().then(snap => {
      snap.forEach(doc => {
       let project=doc.data()
        console.log(doc.data());
        dispatch({type:getOne,project})
      });
    })

 
  } catch (err) {}
};

export default dashboardReducer;
