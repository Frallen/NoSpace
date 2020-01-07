import React from "react";
import Projects from "./Projects";
import { connect } from "react-redux";
import { compose } from "redux";
import { GetAllProjects } from "./../../../redux/projectReducer";
import classes from "./Projects.module.scss";
import face from "./../../../media/sadface.svg";
import { Fade } from "react-reveal";
class dashBox extends React.Component {
  componentDidMount() {
    this.props.GetAllProjects();
  }

  render() {
    if (this.props.projects.length !== 0) {
      return <Projects {...this.props}></Projects>;
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
  }
}

let mapStateToProps = state => {
  return {
    projects: state.project.DataProjects
  };
};

export default compose(connect(mapStateToProps, { GetAllProjects }))(dashBox);
