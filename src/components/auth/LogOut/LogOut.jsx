import {useEffect} from "react"
import {connect} from "react-redux"
import { signOut } from "../../../redux/registrationReducer"

const Logout=({logout})=>{

    useEffect(()=>{
        logout()
    },[logout])
    return null
}

let mapDispatchToProps={ 
    logout:signOut
}



export default connect(null,mapDispatchToProps)(Logout)