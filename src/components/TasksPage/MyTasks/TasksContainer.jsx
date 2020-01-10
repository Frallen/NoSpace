import React from "react";
import { connect } from "react-redux";
import Task from "./Tasks";
import { GetProjData } from "../../../redux/projectReducer";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Preloader } from "../../../untils/preloader/preloader";
import { SendBackTask } from "./../../../redux/projectReducer";
class TaksBox extends React.Component {
  componentDidMount() {
    this.ReqData();
  }

  ReqData = () => {
    let id = this.props.match.params.id;
    this.props.GetProjData(id);
  };

  SendTask = data => {
    this.props.SendBackTask(data);
    this.ReqData();
  };

  render() {
    if (this.props.Task.length !== 0) {
      return <Task {...this.props} SendTask={this.SendTask}></Task>;
    } else {
      return <Preloader></Preloader>;
    }
  }
}

let mapStateToProps = state => {
  return {
    Task: state.project.OneProject,
    LinkBoss: state.project.LinkBoss,
    error: state.project.error,
    loading: state.project.loading
  };
};

export default compose(
  connect(mapStateToProps, { GetProjData, SendBackTask }),
  withRouter
)(TaksBox);
