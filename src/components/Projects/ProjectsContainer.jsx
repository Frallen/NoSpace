import { connect } from "react-redux"
import React from "react"
import Projects from "./Projects"

class dashBox extends React.Component{

    componentDidMount(){
      
    }

    render(){
        return <Projects {...this.props}></Projects>
    }
}

let mapStateToProps=(state)=>{
    return{
      
       Projects:state.propject.Propjects
    }
}

 const ProjectsContainer=connect(mapStateToProps,{})(dashBox)

 export default ProjectsContainer