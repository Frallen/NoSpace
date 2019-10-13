import React from "react";
import classes from "./Projects.module.scss";
const Projects = props => {

  return (
    <div className={classes.dashcontaier}>
     
      <div className={classes.projects}>
        {props.projectList.map(p => (
          <div className={classes.projectsBox} key={p.id}>
            <p>{p.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
