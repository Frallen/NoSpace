import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { GetHistory, Clean } from "./../../../../redux/projectReducer";
import classes from "./../Projects.module.scss";
import face from "./../../../../media/sadface.svg";
import { Fade } from "react-reveal";
import HistoryPanel from "./history";

class dashBox extends React.PureComponent {
  componentDidMount() {
    this.props.GetHistory();
  }
  //Чистка контейнеа для проектов
  componentWillUnmount() {
    this.props.Clean();
  }

  render() {
    if (this.props.history.length !== 0) {
      return <HistoryPanel {...this.props}></HistoryPanel>;
    } else {
      return (
        <div className={classes.NoProj}>
          <Fade>
            <div className={classes.NoProjBox}>
              <img src={face} alt="Sad face" />
              <p className={classes.alert}>История пуста</p>
            </div>
          </Fade>
        </div>
      );
    }
  }
}

let mapStateToProps = state => {
  return {
    history: state.project.DataProjects
  };
};

export default compose(connect(mapStateToProps, { GetHistory, Clean }))(
  dashBox
);
