import React from "react";
import classes from "./../Projects.module.scss";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Fade } from "react-reveal";
const HistoryPanel = props => {
  let hist;

  if (props.history) {
    hist = props.history.map(p => (
      <div className={classes.projectsBox+" "+classes.projectsBoxOld} key={p.idMission}>
        <h3 className={classes.title}>{p.NameMission}</h3>
        <div className={classes.datebox}>
          <p className={classes.date}>
            Начинается с {moment(p.startdate).format("MM-DD-YYYY")}
          </p>
          <p className={classes.date}>
            Закачивается {moment(p.enddate).format("MM-DD-YYYY")}
          </p>
          <p className={classes.SendToBox}>
            Задание выданно<span>{p.SendTo}</span>
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
        <div className={classes.Headhelp}>
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
