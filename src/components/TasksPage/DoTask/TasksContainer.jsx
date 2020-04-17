import React, { useEffect } from "react";
import { connect } from "react-redux";
import Task from "./Tasks";
import { GetProjData } from "../../../redux/projectReducer";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Preloader } from "../../../untils/preloader/preloader";
import { SendBackTask } from "./../../../redux/projectReducer";
let TaksBox = (props) => {
  useEffect(() => {
    let id = props.match.params.id;
    props.GetProjData(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let SendTask = (data) => {
    props.SendBackTask(data);
  };

  if (props.Task.length !== 0) {
    return <Task {...props} SendTask={SendTask}></Task>;
  } else {
    return <Preloader></Preloader>;
  }
};

let mapStateToProps = (state) => {
  return {
    Task: state.project.OneProject,
    LinkBoss: state.project.LinkBoss,
    error: state.project.error,
    loading: state.project.loading,
  };
};

export default compose(
  connect(mapStateToProps, { GetProjData, SendBackTask }),
  withRouter
)(TaksBox);
