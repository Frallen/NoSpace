const NewUserInit="NewUser"

let initialState={
    FIO:null,
    username:null,
    email:null,
    password:null
}

const registrationReducer=(state=initialState,action)=>{
   
    switch (action.type){
        case NewUserInit:
            return{
                ...state,
                ...action.data
            }
          
        default: return state
    }
}
export const NewUser=(FIO,username,email,password)=>({type:NewUserInit,data:{FIO,username,email,password}})

export default registrationReducer