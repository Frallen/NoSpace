import React from "react";
import classes from "./TaskPage.module.scss";
import { NavLink } from "react-router-dom";
import { Fade } from "react-reveal";
import moment from "moment";
import { Whisper, Tooltip } from "rsuite";
import HourglassEmptyOutlinedIcon from "@material-ui/icons/HourglassEmptyOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

const TaskPage = props => {
  const tooltip1 = <Tooltip>Задание на проверке.</Tooltip>;
  const tooltip2 = <Tooltip>Вы отметили его как ошибочное.</Tooltip>;
  let content;
  content = props.Tasks.map(p => (
    <div className={classes.projectsBox} key={p.idMission}>
      <h3 className={classes.title}>{p.NameMission}</h3>
      <div className={classes.datebox}>
        <p className={classes.date}>
          Старт {moment(p.startdate).format("DD-MM-YYYY")}
        </p>
        <p className={classes.date}>
          Завершение {moment(p.enddate).format("DD-MM-YYYY")}
        </p>
      </div>
      {p.NotMy && (
        <div className={classes.DeleteOutlineOutlinedIcon}>
          <Whisper placement="bottom" trigger="hover" speaker={tooltip2}>
            <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
          </Whisper>
        </div>
      )}
      {p.isDone && (
        <div className={classes.HourglassEmptyOutlinedIcon}>
          <Whisper placement="bottom" trigger="hover" speaker={tooltip1}>
            <HourglassEmptyOutlinedIcon></HourglassEmptyOutlinedIcon>
          </Whisper>
        </div>
      )}
      <NavLink to={"/Task/" + p.idMission} className={classes.openbutton}>
        Открыть
      </NavLink>
    </div>
  ));
  return (
    <Fade>
      <div>
        <div className={classes.Headhelp}>
          <h2 className={classes.HeadhelpTitle}>Задачи к выполнению</h2>
        </div>
        <div className={classes.Panel}>
          <div className={classes.projects}>{content}</div>
        </div>
      </div>
    </Fade>
  );
};

export default TaskPage;
