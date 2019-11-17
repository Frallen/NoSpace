import React from "react";
import classes from "./Projects.module.scss";
import { NavLink } from "react-router-dom";
import { Preloader } from "./../../../untils/preloader/preloader";
const Projects = props => {

  let content;
  if (!props.projects) {
    content = <Preloader></Preloader>;
  } else {
    content = props.projects.map(p => (
      <div className={classes.projectsBox} key={p.idProject}>
        <NavLink to={"/project/" + p.idProject} className={classes.title}>
          {p.NameProj}
        </NavLink>
        <div className={classes.bottom}>
          <p className={classes.date}>С {p.startdate}</p>
          <p className={classes.date}>ПО {p.enddate}</p>
        </div>
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
