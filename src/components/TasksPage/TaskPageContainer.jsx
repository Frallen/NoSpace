import React from "react";
import { connect } from "react-redux";
import TaskPage from "./TaskPage";
import { GetAllTasks, Clean } from "./../../redux/projectReducer";
import classes from "./TaskPage.module.scss";
import face from "./../../media/sadface.svg";
import { Fade } from "react-reveal";
class TaskBox extends React.Component {
  componentDidMount() {
    this.props.GetAllTasks();
  }
  //Чистка контейнеа для проектов
  componentWillUnmount() {
    this.props.Clean();
  }
  render() {
    if (this.props.Tasks.length !== 0) {
      return <TaskPage {...this.props}></TaskPage>;
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
  }
}

let mapStateToProps = state => {
  return {
    Tasks: state.project.DataProjects
  };
};

export default connect(mapStateToProps, { GetAllTasks, Clean })(TaskBox);
