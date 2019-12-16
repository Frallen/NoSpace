const GetAllHisory = "GetAllHisory";
//взять один проект
const getOne = "getOne";
//взять ссылку для скачивания документа начальника
const DownLinkBoss = "DownLinkBoss";
//взять ссылку для скачивания отчета сотрудника
const DownLinkWorker = "DownLinkWorker";

let initialState = {
  history: [],
  OneProject:[],
    //ссылка на скачивание документа начальника
    LinkBoss: null,
    //ссылка на скачивание документа сотрудника
    LinkWorker: null
};

const HistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GetAllHisory:
      return {
        ...state,
        history:action.data
      };
      case getOne:
        return {
          ...state,
          OneProject: action.project
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

export const GetHistory = data => async (dispatch, getState, { getFirestore }) => {
    const {uid:userId}=getState().firebase.auth
    const firestore = getFirestore();
  try {
    await firestore
    .collection("History")
    .where("idOwner", "==", userId)
    .get()
    .then(snap => {
      //беру все докуметы с совпадающим айди и расчехляю их
      let data = snap.docs.map(doc => doc.data());
      //console.log(data)
      dispatch({ type: GetAllHisory, data });
    });
  } catch (err) {}
};
export const HistoryOne=data=>async(dispatch,getState,{getFirestore,getFirebase})=>{
    const firestore=getFirestore()
    const firebase=getFirebase()
    try{
        await firestore
        .collection("History")
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
                  dispatch({ type: DownLinkWorker, url });
                })
                .catch(function(error) {});
            }
            dispatch({ type: getOne, project });
          });
        });
    }
    catch(err){

    }
}

export default HistoryReducer;
