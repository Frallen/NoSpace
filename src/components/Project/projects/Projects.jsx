import React from "react";
import classes from "./Projects.module.scss";
import { NavLink } from "react-router-dom";
import projectsimg from "./../../../media/Projects.jpg"
const Projects = props => {
  let content;
  if (props.projects) {
    content = props.projects.map(p => (
      <div className={classes.projectsBox} key={p.idProject}>
        <div className={classes.boximg}>
      <img src={projectsimg} className={classes.img} alt=""/>
        </div>
        <h3 className={classes.title}>{p.NameProj}</h3>
        <div className={classes.datebox}>
          <p className={classes.date}>Начинается с {p.startdate}</p>
          <p className={classes.date}>Закачивается {p.enddate}</p>
        </div>
        <NavLink to={"/project/" + p.idProject} className={classes.openbutton}>
          Открыть
        </NavLink>
      </div>
    ));
  }

  return (
    <div className={classes.Panel}>
      <div className={classes.projects}>{content}</div>
    </div>
  );
};

export default Projects;
