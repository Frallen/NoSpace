import React from "react";
import { connect } from "react-redux";
import TaskPage from "./TaskPage";
import { GetAllTasks } from "./../../redux/projectReducer";
import classes from "./TaskPage.module.scss";
import face from "./../../media/sadface.svg";
class TaskBox extends React.Component {
  componentDidMount() {
    this.props.GetAllTasks();
  }
  

  render() {
    if (this.props.Tasks.length !== 0) {
      return <TaskPage {...this.props}></TaskPage>;
    } else {
      return (
        <div className={classes.NoProj}>
          <div className={classes.NoProjBox}>
            <img src={face} alt="Sad face" />
            <p className={classes.alert}>
              Для вас нет заданий !
            </p>
          </div>
        </div>
      );
    }
  }
}

let mapStateToProps = state => {
  return {
    Tasks: state.project.Tasks
  };
};

export default connect(mapStateToProps, { GetAllTasks })(TaskBox);
