import { connect } from "react-redux"
import React from "react"
import Projects from "./Projects"
import {projName,NewProject} from "../../redux/projectReducer"
class dashBox extends React.Component{

    componentDidMount(){
      
    }

    render(){
        return <Projects {...this.props}></Projects>
    }
}

let mapStateToProps=(state)=>{
    return{
      
        projectList:state.project.projectList,
    }
}

 const ProjectsContainer=connect(mapStateToProps,{projName,NewProject})(dashBox)

 export default ProjectsContainer