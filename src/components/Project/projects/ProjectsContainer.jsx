import React, { useEffect } from "react";
import Projects from "./Projects";
import { connect } from "react-redux";
import { compose } from "redux";
import { GetAllProjects, Clean } from "./../../../redux/projectReducer";
import classes from "./../../ProjectsStyle/Projects.module.scss";
import face from "./../../../media/sadface.svg";
import { Fade } from "react-reveal";

const DashBox = props => {
  useEffect(() => {
    //чистка всего
    props.Clean();
    //беру все проекты
    props.GetAllProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (props.projects.length !== 0) {
    return <Projects {...props}></Projects>;
  } else {
    return (
      <div className={classes.NoProj}>
        <Fade>
          <div className={classes.NoProjBox}>
            <img src={face} alt="Sad face" />
            <p className={classes.alert}>
              У вас нет активных поручений сотрудникам!
            </p>
          </div>
        </Fade>
      </div>
    );
  }
};

let mapStateToProps = state => {
  return {
    projects: state.project.DataProjects
  };
};

export default compose(connect(mapStateToProps, { GetAllProjects, Clean }))(
  DashBox
);
