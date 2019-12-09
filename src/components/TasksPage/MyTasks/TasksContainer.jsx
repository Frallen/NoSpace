import React from "react";
import { connect } from "react-redux";
import Task from "./Tasks";
import { GetTask } from "../../../redux/projectReducer";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import {Preloader} from "../../../untils/preloader/preloader"
import {SendBackTask} from "./../../../redux/projectReducer"
class TaksBox extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.match.params.id;
    this.props.GetTask(id);
  }
  SendTask=data=>{
    this.props.SendBackTask(data)
  }
  render() {
    if(this.props.Task.length!==0){
    return <Task {...this.props} SendTask={this.SendTask}></Task>;}
    else{
      return<Preloader></Preloader>
    }
  }
}

let mapStateToProps = state => {
  return {
    Task: state.project.MyTask,
    LinkBoss: state.project.LinkBoss,
  };
};

export default compose(
  connect(mapStateToProps, { GetTask,SendBackTask }),
  withRouter
)(TaksBox);
