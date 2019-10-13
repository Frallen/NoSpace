const projectname ="projectname"
const newProject="newProject"
let initialState={
    createprojectname:"",
    projectList:[{id:1,title:"haha",text:"lorem"}]
}

const dashboardReducer=(state=initialState,action)=>{
    switch(action.type){
        case projectname:
            return{
            ...state,
            createprojectname:action.text
        }
        case newProject:{
            debugger
            return{
                ...state,
                projectList:[...state.projectList,{id:2,title:state.createprojectname,text:""}]
            }
        }
        default:return state
    }
}
export const projName=(text)=>({type:projectname,text})
export const NewProject=(text)=>({type:newProject,text})
export default dashboardReducer