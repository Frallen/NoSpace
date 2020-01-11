import React from "react";
import classes from "./Projects.module.scss";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Fade } from "react-reveal";
const Projects = props => {
  //беру текущюю полную дату
  let date = moment()

  let content;
  if (props.projects) {
    content = props.projects.map(p => (
      <div className={classes.projectsBox} key={p.idMission}>
        <h3 className={classes.title}>{p.NameMission}</h3>

        <div className={classes.datebox}>
          <p className={classes.date}>
            Начинается с {moment(p.startdate).format("DD-MM-YYYY")}
          </p>
          <p className={classes.date}>
            Закачивается {moment(p.enddate).format("DD-MM-YYYY")}
          </p>

          {p.isDone && (
            <div className={classes.personeDone}>Сотрудник прислал отчет</div>
          )
          }
          {moment(date).isAfter(p.enddate) && <p>С опозданием</p>}
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
