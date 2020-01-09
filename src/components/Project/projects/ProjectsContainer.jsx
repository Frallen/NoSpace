import React from "react";
import Projects from "./Projects";
import { connect } from "react-redux";
import { compose } from "redux";
import { GetAllProjects, Clean } from "./../../../redux/projectReducer";
import classes from "./Projects.module.scss";
import face from "./../../../media/sadface.svg";
import { Fade } from "react-reveal";
class dashBox extends React.Component {
  //Когда компонента будет готова в нее вмонитруются проекты
  componentDidMount() {
    this.props.GetAllProjects();
  }
  //нужен для обновления списка проектов, тк я делаю редирект на эту страницу после удаления проекта
  componentDidUpdate() {
    this.props.GetAllProjects();
  }
  //Чистка контейнеа для проектов
  componentWillUnmount() {
    this.props.Clean();
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

export default compose(connect(mapStateToProps, { GetAllProjects, Clean }))(
  dashBox
);
