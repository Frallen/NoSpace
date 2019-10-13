import { connect } from "react-redux"
import React from "react"
import Create from "./create"
import {projName,NewProject} from "../../../redux/projectReducer"

class dashBox extends React.Component{

    componentDidMount(){
      
    }

    render(){
        return <Create {...this.props}></Create>
    }
}

let mapStateToProps=(state)=>{
    return{
        createprojectname:state.project.createprojectname,
       
    }
}

 const CreateContainer=connect(mapStateToProps,{projName,NewProject})(dashBox)

 export default CreateContainer