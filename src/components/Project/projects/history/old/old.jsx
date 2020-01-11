import React from "react";
import classes from "./../../projectview/projectView.module.scss";
import {Button} from "@material-ui/core";
import moment from "moment";
import { Fade } from "react-reveal";

const OneOld = props => {

  return (
    <Fade>
    <div>
 <div className={classes.done}>
     <div className={classes.createbox}>
            <div className={classes.boxcenter}>
            <h2>Отчет сотрудника</h2>
  <h3 className={classes.NameMission}>{props.HistoryItem.MissionDoneTitle}</h3> 
<p className={classes.Text}>{props.HistoryItem.TextDone}</p>
<div className={classes.donwloadbox}>
<Button variant="contained" href={props.LinkWorker} className={classes.donwload}>Скачать отчет</Button>
</div>

        
</div>
</div>
       </div>
      <div className={classes.create}>
      
     
          <div className={classes.createbox}>
            <div className={classes.boxcenter}>
            <h3 className={classes.NameMission}>{props.HistoryItem.NameMission}</h3>
            <p className={classes.Text}>{props.HistoryItem.Text}</p>
            <div className={classes.targetsbox}>
           {props.HistoryItem.SubTargets&&<h4 className={classes.targetstitle}>Цели:</h4>}
        {props.HistoryItem.SubTargets&&props.HistoryItem.SubTargets.map((p,index)=><div key={index} className={classes.targets}>{p}</div>)}
           </div> 
           </div>
           <div className={classes.donwloadbox}>
           <Button
        variant="contained"
        color="default" href={props.LinkBoss} className={classes.donwload}>Скачать</Button>
           </div>
            <div className={classes.datebox}>
              <p className={classes.datespace}> Начать c {moment(props.HistoryItem.startdate).format("DD-MM-YYYY")}
              </p>
              <p className={classes.datespace}>Закончить {moment(props.HistoryItem.enddate).format("DD-MM-YYYY")}</p>
            </div>
          </div>
      
      </div>
    </div></Fade>
  );
};

export default OneOld;
