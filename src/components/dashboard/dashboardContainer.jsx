import { connect } from "react-redux"
import React from "react"
import Dashboard from "./dashboard"
import {projName,NewProject} from "./../../redux/dashboardReducer"
class dashBox extends React.Component{

    componentDidMount(){
      
    }

    render(){
        return <Dashboard {...this.props}></Dashboard>
    }
}

let mapStateToProps=(state)=>{
    return{
        createprojectname:state.Dashboard.createprojectname,
        projectList:state.Dashboard.projectList,
    }
}

 const DashboadrdContainer=connect(mapStateToProps,{projName,NewProject})(dashBox)

 export default DashboadrdContainer