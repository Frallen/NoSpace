import React from "react";
import classes from "./../../../ProjectsStyle/Projects.module.scss";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Fade } from "react-reveal";
const HistoryPanel = props => {
  let hist;

  if (props.history) {
    hist = props.history.map(p => (
      <div
        className={classes.projectsBox + " " + classes.projectsBoxOld}
        key={p.idMission}
      >
        <h3 className={classes.title}>{p.NameMission}</h3>
        <div className={classes.datebox}>
          <p className={classes.date}>
            Старт {moment(p.startdate).format("DD-MM-YYYY")}
          </p>
          <p className={classes.date}>
            Завершение {moment(p.enddate).format("DD-MM-YYYY")}
          </p>
        </div>

        <NavLink to={"/old/" + p.idMission} className={classes.openbutton}>
          Открыть
        </NavLink>
      </div>
    ));
  }

  return (
    <Fade>
      <div className={classes.HistBlock}>
        <div className={classes.Headhelp + " " + classes.HeadhelpHist}>
          <h2 className={classes.HeadhelpTitle}>История поручений</h2>
        </div>
        <div className={classes.Panel}>
          <div className={classes.projects}>{hist}</div>
        </div>
      </div>
    </Fade>
  );
};

export default HistoryPanel;
