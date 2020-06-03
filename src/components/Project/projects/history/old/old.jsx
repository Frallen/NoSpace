import React from "react";
import classes from "./../../projectview/projectView.module.scss";
import moment from "moment";
import { Fade } from "react-reveal";
import { Button } from "rsuite";

const OneOld = (props) => {
  return (
    <Fade>
      <div>
        <div className={classes.done}>
          <div className={classes.createbox}>
            <div className={classes.boxcenter}>
              <h2>Отчет сотрудника</h2>
              <h3 className={classes.NameMission}>
                Заголовок отчета: {props.HistoryItem.MissionDoneTitle}
              </h3>
              <p className={classes.Text}>
                Текст отчета: {props.HistoryItem.TextDone}
              </p>
              <div className={classes.donwloadbox}>
                <Button
                  type="button"
                  variant="contained"
                  href={props.LinkWorker}
                  className={classes.donwload}
                >
                  Скачать отчет
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.create}>
          <div className={classes.createbox}>
            <div className={classes.boxcenter}>
              <h3 className={classes.NameMission}>
                {props.HistoryItem.NameMission}
              </h3>
              <ul className={classes.roles}>
                <li className={classes.rolesItem}>
                  <span className={classes.textStart}> От кого </span> -
                  {props.HistoryItem.OwnName}
                </li>
                <li className={classes.rolesItem}>
                  <span className={classes.textStart}> Кому </span> -
                  {props.HistoryItem.SendName}
                </li>
              </ul>
              <p className={classes.Text}>
                <span className={classes.textStart}> Текст поручения </span> -
                {props.HistoryItem.Text}
              </p>
              {props.HistoryItem.SubTargets && (
                <div className={classes.targetsbox}>
                  <h4 className={classes.targetstitle}>Цели:</h4>

                  {props.HistoryItem.SubTargets.map((p, index) => (
                    <div key={index} className={classes.targets}>
                      {p}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={classes.donwloadbox}>
              <Button type="button" href={props.LinkBoss}>
                Скачать задание
              </Button>
            </div>
            <div className={classes.datebox}>
              <p className={classes.datespace}>
                <span className={classes.textStart}> Старт </span> -
                {moment(props.HistoryItem.startdate).format("DD-MM-YYYY")}
              </p>
              <p className={classes.datespace}>
                <span className={classes.textStart}> Завершение </span> -
                {moment(props.HistoryItem.enddate).format("DD-MM-YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default OneOld;
