const StartNewProject = "StartNewProject";
const NewProjectSucc = "NewProjectSucc";
const NewProjectErr = "NewProjectErr";
const Clean = "Clean";
const SuccData = "SuccData";
let initialState = {
  error: null,
  loading: false,
  DataProjects: []
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
    case Clean:
      return {
        ...state,
        error: null,
        loading: false
      };
    case SuccData:
      return {
        ...state,
        DataProjects: action.data
      };
    default:
      return state;
  }
};

export const CleanUp = () => ({ type: Clean });

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
     const res = await firestore.collection("Projects").where("idOwner", "==",userId).get();

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
    /* есдиничный вывод проекта
    firestore
      .collection("Projects")
      .where("idOwner", "==", userId)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          console.log(doc.data());
        });
      });
      */

    //тестовый вывод всей пользовательской коллекции
    //console.log(res.docs.map(doc => doc.data()));
    //получение айди коммита
    // -->    console.log(comm.id)

    dispatch({ type: NewProjectSucc });
  } catch (err) {
    dispatch({ type: NewProjectErr, payload: err.message });
  }
};

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
        dispatch({ type: SuccData, data });
      })
 
   // 
    /*
    await firestore.collection("Projects").where("idOwner", "==",userId).get().then(
      snap=>{
        snap.map(doc=>
         data=doc.data()
         
        )
        dispatch({type:SuccData,data})
      }
    )*/
  } catch (err) {}
};

export const GetProjData = data => async (
  dispatch,
  getState,
  { firebase, firestore }
) => {
  const { uid: userId } = getState().firebase.auth;
  try {
    const res = await firestore
      .collection("Projects")
      .doc(userId)
      .collection("project")
      .where("id", "==", data)
      .get();

    console.log(res);
  } catch (err) {}
};

export default dashboardReducer;
