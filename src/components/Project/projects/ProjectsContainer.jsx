import React from "react";
import Projects from "./Projects";
import { connect } from "react-redux";
import { compose } from "redux";
import { GetAllProjects } from "./../../../redux/projectReducer";
class dashBox extends React.Component {
  componentDidMount() {
    this.props.GetAllProjects();
  }

  render() {
    return <Projects {...this.props}></Projects>;
  }
}

let mapStateToProps = state => {
  return {
    projects: state.project.DataProjects
  };
};

export default compose(
  connect(mapStateToProps, { GetAllProjects })
  //получение данных юзера
)(dashBox);
