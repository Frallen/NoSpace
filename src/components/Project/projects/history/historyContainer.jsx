import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { GetHistory, Clean } from "./../../../../redux/projectReducer";
import classes from "./../../../ProjectsStyle/Projects.module.scss";
import face from "./../../../../media/sadface.svg";
import { Fade } from "react-reveal";
import HistoryPanel from "./history";

const DashBox = (props) => {
  useEffect(() => {
    //Чистка контейнеа для проектов
    props.Clean();

    props.GetHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (props.history.length !== 0) {
    return <HistoryPanel {...props}></HistoryPanel>;
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
};

let mapStateToProps = (state) => {
  return {
    history: state.project.DataProjects,
  };
};

export default compose(connect(mapStateToProps, { GetHistory, Clean }))(
  DashBox
);
