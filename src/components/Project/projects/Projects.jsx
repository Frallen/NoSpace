import React from "react";
import classes from "./Projects.module.scss";
import { NavLink } from "react-router-dom";
import {Preloader} from "./../../../untils/preloader/preloader"
const Projects = props => {


  let content;
  if (!props.projects) {
    content = (
   <Preloader></Preloader>
    );
  } else if (!props.projects[props.userId] || !props.projects[props.userId].project) {
  
    content = (
      <div>
          You have no projects!</div>
    
    );
  } else if (props.projects[props.userId].project.length === 0) {
    content = (
     
      
         <div>You have no projects!</div>
    
    );
  } else {
    content = (
     
        props.projects[props.userId].project
          .slice(0)
          .reverse()
          .map(p => (
            
            <div  className={classes.projectsBox} key={p.id}>
            <h2 className={classes.title}>{p.project.NameProj}</h2>
            <p className={classes.text}>{p.project.Text}</p>
            <div className={classes.bottom}>
              <p className={classes.date}>{p.project.startdate}</p>
              <p className={classes.date}>{p.project.enddate}</p>
            </div>
          </div>
          ))
     
    );
  }




  return (
    <div className={classes.Panel}>
      <div className={classes.projects}>
        {content}
      </div>
    </div>
  );
};

export default Projects;
