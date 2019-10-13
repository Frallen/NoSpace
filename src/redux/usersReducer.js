const NewUser="NewUser"

let initialState ={
 user:[]
}


const usersReducer=(state=initialState,action)=>{
    switch(action.type){
        case NewUser:
            return{
                ...state,
                user:action.user
            }
            default: return state
    }
}

export default usersReducer