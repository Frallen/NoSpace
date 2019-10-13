import { combineReducers,createStore } from "redux"
import NavigationReducer from "./navigationReducer"
import usersReducer from "./usersReducer"
import authReducer from "./authReducer"
import projectReducer from "./projectReducer"
import {reducer as formReducer} from "redux-form"

let reducers=combineReducers({
    Navigation:NavigationReducer,
    Users:usersReducer,
    Auth:authReducer,
    form:formReducer,
    project:projectReducer,
})

let store=createStore(reducers)

export default store