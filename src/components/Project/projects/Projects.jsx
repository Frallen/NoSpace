import React from "react";
import classes from "./Projects.module.scss";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Fade } from "react-reveal";
import TimerOffIcon from "@material-ui/icons/TimerOff";
import CheckIcon from "@material-ui/icons/Check";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Whisper, Tooltip } from "rsuite";

const Projects = props => {
  //беру текущюю полную дату
  let date = moment();
  const tooltip1 = <Tooltip>Задание выполнено.</Tooltip>;
  const tooltip2 = <Tooltip>Выполено с опозданием.</Tooltip>;
  const tooltip3 = <Tooltip>Отправлено не тому сотруднику.</Tooltip>;
  let content;
  if (props.projects) {
    content = props.projects.map(p => (
      <div className={classes.projectsBox} key={p.idMission}>
        <h3 className={classes.title}>{p.NameMission}</h3>
        <div className={classes.done}>
          <div>
            {p.NotMy&&<div className={classes.DeleteOutlineOutlinedIcon}>
            <Whisper placement="bottom" trigger="hover" speaker={tooltip3}>
                <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
              </Whisper>
              </div>}
          </div>
          {moment(date).isAfter(p.enddate) && (
            <div className={classes.TimerOffIcon}>
              <Whisper placement="bottom" trigger="hover" speaker={tooltip2}>
                <TimerOffIcon></TimerOffIcon>
              </Whisper>
            </div>
          )}
          {p.isDone && (
            <div className={classes.CheckIcon}>
              <Whisper placement="bottom" trigger="hover" speaker={tooltip1}>
                <CheckIcon></CheckIcon>
              </Whisper>
            </div>
          )}
        </div>
        <div className={classes.datebox}>
          <p className={classes.date}>
            <span className={classes.textdate}> Старт:</span>{" "}
            {moment(p.startdate).format("DD-MM-YYYY")}
          </p>
          <p className={classes.date}>
            <span className={classes.textdate}> Завершение:</span>{" "}
            {moment(p.enddate).format("DD-MM-YYYY")}
          </p>
        </div>
        <NavLink to={"/mission/" + p.idMission} className={classes.openbutton}>
          Открыть
        </NavLink>
      </div>
    ));
  }

  return (
    <Fade>
      <div>
        <div className={classes.Headhelp}>
          <h2 className={classes.HeadhelpTitle}>Ваши выданные поручения</h2>
        </div>
        <div className={classes.Panel}>
          <div className={classes.projects}>{content}</div>
        </div>
      </div>
    </Fade>
  );
};

export default Projects;
