import React from "react";
import classes from "./Projects.module.scss";
import { NavLink } from "react-router-dom";
const Projects = props => {
  return (
    <div className={classes.Panel}>
      <div className={classes.projects}>
        {props.Projects.map(p => (
          <NavLink to="/" className={classes.projectsBox} key={p.id}>
            <h2 className={classes.title}>{p.title}</h2>
            <p className={classes.text}>{p.text}</p>
            <div className={classes.bottom}>
              <p className={classes.count}>count of sotrudnikov</p>
              <p className={classes.date}>Project end date</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Projects;
