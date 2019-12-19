import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import {
  ProjectTextArea,
  ProjectInput,
  Upload
} from "../../commons/formsControls/formsControls";
import classes from "./Tasks.module.scss";
import { required } from "../../../untils/validators/validators";
import moment from "moment";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { Fade } from "react-reveal";
import { useSnackbar } from "notistack";
import CheckIcon from "@material-ui/icons/Check";

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
        disabled={props.loading || props.Task.isDone === true||props.Task.NotMy===true}
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
  //dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //
  //если начальник послал задание не тому сотруднику
  let NotMY = () => {
    let data = {
      //обязательный айди задания для where
      idMission: props.Task.idMission,
      //для определния не выполненности
      NotMy: true
    };
    props.SendTask(data);
  };
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
        {props.Task.isDone && (
          <div className={classes.BoxIsDone}>
            <CheckIcon />
            <p className={classes.BoxIsDoneText}> Задание на проверке</p>
          </div>
        )}
          {props.Task.NotMy && (
          <div className={classes.BoxWrongCheck}>
            <h3 className={classes.BoxWrongCheckText}> Вы уведомили начальнство, о ошибочной отправке</h3>
          </div>
        )}
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
            <div className={classes.wrongblock}>
              <button className={classes.wrong} onClick={handleClickOpen}>
                Это не ваше задание?
              </button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Ошибка начальства"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Вы уверенны что это задание предназначено не вам?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose} color="primary">
                    Отмена
                  </Button>
                  <Button onClick={NotMY} color="primary" autoFocus disabled={props.Task.isDone===true}>
                    Подтвердить
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Task;
