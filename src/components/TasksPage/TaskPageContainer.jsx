import React, { useEffect } from "react";
import { connect } from "react-redux";
import TaskPage from "./TaskPage";
import { GetAllTasks, Clean } from "./../../redux/projectReducer";
import classes from "./../ProjectsStyle/Projects.module.scss";
import face from "./../../media/sadface.svg";
import { Fade } from "react-reveal";

const TaskBox = props => {
  useEffect(() => {
    props.Clean();
    props.GetAllTasks();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if (props.projects.length !== 0) {
    return <TaskPage {...props}></TaskPage>;
  } else {
    return (
      <div className={classes.NoProj}>
        <Fade>
          <div className={classes.NoProjBox}>
            <img src={face} alt="Sad face" />
            <p className={classes.alert}>Для вас нет заданий !</p>
          </div>
        </Fade>
      </div>
    );
  }
};

let mapStateToProps = state => {
  return {
    projects: state.project.DataProjects,
    users:state.project.DataUsers
  };
};

export default connect(mapStateToProps, { GetAllTasks, Clean })(TaskBox);
