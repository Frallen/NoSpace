import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  ProjectTextArea,
  ProjectInput,
  Upload
} from "../../commons/formsControls/formsControls";
import classes from "./Tasks.module.scss";
import { required } from "../../../untils/validators/validators";
import moment from "moment";
import { Button } from "@material-ui/core";
import { Fade } from "react-reveal";
import { useSnackbar } from "notistack";
import CheckIcon from '@material-ui/icons/Check';

const TaskBox = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={ProjectInput}
          label="Заголовок ответа"
          type="text"
          name="MissionDoneTitle"
          validate={[required]}
        />
      </div>
      <div className={classes.flexspace}>
        <Field
          component={ProjectTextArea}
          label="Дополнение"
          name="TextDone"
          validate={[required]}
        />
      </div>
      <div className={classes.flexspace}>
        <Field
          type="file"
          component={Upload}
          name="document"
          validate={[required]}
        ></Field>
      </div>
      <button
        className={classes.creabtn}
        disabled={props.loading || props.Task.isDone === true}
      >
        Отправить на проверку
      </button>
    </form>
  );
};

const TaskForm = reduxForm({
  form: "MyTasks"
})(TaskBox);

const Task = props => {
  let onSubmit = FormData => {
    FormData.isDone = true;
    FormData.idMission = props.Task.idMission;
    props.SendTask(FormData);
    let message = "Отчет отправлен";
    enqueueSnackbar(message, {
      variant: "success",
      preventDuplicate: true,
      autoHideDuration: 4000
    });
  };
  const { enqueueSnackbar } = useSnackbar();
 
  return (
    <Fade>
      <div>
      {props.Task.isDone&&<div className={classes.BoxIsDone}><CheckIcon /><p className={classes.BoxIsDoneText}> Задание на проверке</p></div>}
      <div className={classes.create}>
        <div className={classes.createbox}>
          <div className={classes.boxcenter}>
            <h3>{props.Task.NameMission}</h3>
            <p>{props.Task.Text}</p>
            <div className={classes.targetsbox}>
              {props.Task.SubTargets && (
                <h4 className={classes.targetstitle}>Цели:</h4>
              )}
              {props.Task.SubTargets &&
                props.Task.SubTargets.map((p, index) => (
                  <div key={index} className={classes.targets}>
                    {p}
                  </div>
                ))}
            </div>
            <div className={classes.donwloadbox}>
              <Button
                variant="contained"
                color="default"
                href={props.LinkBoss}
                className={classes.donwload}
              >
                Скачать
              </Button>
            </div>
            <div className={classes.datebox}>
              <p className={classes.datespace}>
                Начать с {moment(props.Task.startdate).format("MM-DD-YYYY")}
              </p>
              <p className={classes.datespace}>
                Закончить {moment(props.Task.enddate).format("MM-DD-YYYY")}
              </p>
            </div>
          </div>
          <TaskForm {...props} onSubmit={onSubmit}></TaskForm>
        </div>
      </div>
      </div>
    </Fade>
  );
};

export default Task;
