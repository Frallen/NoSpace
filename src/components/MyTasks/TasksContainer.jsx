import React from "react";
import { connect } from "react-redux";
import Task from "./Tasks";
import { GetTask } from "./../../redux/projectReducer";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import {Preloader} from "./../../untils/preloader/preloader"
class TaksBox extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.match.params.id;
    this.props.GetTask(id);
  }
  render() {
    if(this.props.Task.length!==0){
    return <Task {...this.props}></Task>;}
    else{
      return<Preloader></Preloader>
    }
  }
}

let mapStateToProps = state => {
  return {
    Task: state.project.MyTask
  };
};

export default compose(
  connect(mapStateToProps, { GetTask }),
  withRouter
)(TaksBox);
