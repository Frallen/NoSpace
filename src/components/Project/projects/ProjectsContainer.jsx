import React from "react";
import Projects from "./Projects";
import { connect } from "react-redux";
import { compose } from "redux";
import {GetAllProjects} from "./../../../redux/projectReducer"
import { firestoreConnect } from "react-redux-firebase";
class dashBox extends React.Component {
componentDidMount(){
  this.props.GetAllProjects()
}
/*
getData(){
  this.props.GetAllProjects().then(
    snap=>{
      snap.forEach(
        doc=>{
     let items= doc.data()
      this.setState({items:items})
        }
      )
    }
  )

}*/

  render() {
    return <Projects {...this.props} ></Projects>;
  }
}

let mapStateToProps = (state) => {
 
  return {
  projects:state.project.DataProjects
  };
};

export default compose(
  connect(mapStateToProps,{GetAllProjects}),
  //получение данных юзера
 
)(dashBox);
