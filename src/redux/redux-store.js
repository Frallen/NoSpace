import { combineReducers,createStore } from "redux"
import NavigationReducer from "./navigationReducer"
import usersReducer from "./usersReducer"
import authReducer from "./authReducer"
import dashboardReducer from "./dashboardReducer"

let reducers=combineReducers({
    Navigation:NavigationReducer,
    Users:usersReducer,
    Auth:authReducer,
    Dashboard:dashboardReducer,
})

let store=createStore(reducers)

export default store