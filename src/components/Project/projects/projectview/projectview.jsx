import React, { useState } from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import { required } from "../../../../untils/validators/validators";
import {
  ProjectDate,
  ProjectTextArea,
  ProjectInput,
  Upload
} from "../../../commons/formsControls/formsControls";
import classes from "./projectView.module.scss";
import { useSnackbar } from "notistack";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";

//для вставки массива целей
const AddSubTargets = ({ fields, meta: { error } }) => (
  <ul>
    {fields.map((hobby, index) => (
      <li key={index} className={classes.targetSpace}>
        <Field
          name={hobby}
          type="text"
          component={ProjectTextArea}
          label={`Цель #${index + 1}`}
          validate={[required]}
        />
        <button
          type="button"
          title="Удалить цель"
          className={classes.deletetarget}
          onClick={() => fields.remove(index)}
        >
          Удалить цель
        </button>
      </li>
    ))}
    <li className={classes.boxbutton}>
      <button
        type="button"
        className={classes.addtarget}
        onClick={() => fields.push()}
      >
        Добавить цель
      </button>
    </li>
    {error && <li className="error">{error}</li>}
  </ul>
);

const ProjBox = props => {
  return (
    <form
      onSubmit={props.handleSubmit}
      initialvalues={{
        NameMission: props.initialValues.NameMission,
        Text: props.initialValues.Text,
        SubTargets: props.initialValues.SubTargets,
        startdate: props.initialValues.startdate,
        enddate: props.initialValues.enddate
      }}
    >
      <div>
        <Field
          component={ProjectInput}
          label="Название поручения"
          type="text"
          name="NameMission"
          validate={[required]}
        />
      </div>
      <div className={classes.flexspace}>
        <Field
          component={ProjectTextArea}
          label="Описание"
          name="Text"
          validate={[required]}
        />
      </div>
      <FieldArray name="SubTargets" component={AddSubTargets} />
      <div className={classes.flexspace}>
        <Field
          type="file"
          component={Upload}
          name="document"
        ></Field>
      </div>
      <div className={classes.datebox}>
        <div className={classes.datespace}>
          <Field
            component={ProjectDate}
            label="Начать с"
            name="startdate"
            validate={[required]}
          />
        </div>
        <div className={classes.datespace}>
          <Field
            component={ProjectDate}
            label="Сдать до"
            name="enddate"
            validate={[required]}
          />
        </div>
      </div>
      <button className={classes.creabtn} disabled={props.loading}>
        Сохранить данные
      </button>
    </form>
  );
};

const ChangeForm = reduxForm({
  form: "ChangeForm"
})(ProjBox);

const ProjView = props => {
  /// Dialog material ui
  //удаление проекта
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //чекбокс
  //Состояние чекбоскса чекед/нечекед
  const [state, setState] = React.useState({
    checkedA: false
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  ////////////////

  //удаление поручения
  let tryDelete = () => {
    props.Delete(props.initialValues.idMission);
  };
// успешно выполненное задание

let SuccDone=()=>{
  props.Delete(props.initialValues.idMission);
}

  // let message = "Для выполнения этой операции нужно выполнить повторный вход в систему";
  const { enqueueSnackbar } = useSnackbar();
  if (props.error) {
    enqueueSnackbar(props.error, {
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 3000
    });
  }
  let onSubmitMain = FormData => {
    //добавляю айди проекта и айди создателя
    FormData.idMission = props.initialValues.idMission;
    FormData.idOwner = props.initialValues.idOwner;
    //при обновлении изменять статус задачи
    FormData.isDone=false;
    //удаляю мусор undefined тк выдает ошибку,поле с undefined не может быть обновленно
    delete FormData.LinkBoss
    delete FormData.LinkWorker
    delete FormData.TextDone
    delete FormData.MissionDoneTitle

    if (!FormData.SubTargets) {
      delete FormData.SubTargets;
    }
    ///
    props.Update(FormData);
  };


  return (
    <div>
     {props.initialValues.isDone===true && <div className={classes.done}>
     <div className={classes.createbox}>
            <div className={classes.boxcenter}>
              <h2>Задание выполненно, проверьте отчет !</h2>
  <h3 className={classes.NameMission}>{props.initialValues.MissionDoneTitle}</h3> 
<p className={classes.Text}>{props.initialValues.TextDone}</p>
<div className={classes.donwloadbox}>
<Button href={props.initialValues.LinkWorker} className={classes.donwload}>Скачать отчет</Button>
</div>
<button className={classes.succbutton} onClick={handleClickOpen}>
              Подтвердить выполнение
            </button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Удаление поручения"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Вы уверенны в правильности выполненного задания?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                  Отмена
                </Button>
                <Button onClick={SuccDone} color="primary" autoFocus>
                  Подтвердить
                </Button>
              </DialogActions>
            </Dialog>
</div>
</div>
       </div>}
      <div className={classes.create}>
        <FormControlLabel
          className={classes.Regactive}
          control={
            <Checkbox
            className={classes.adaptRegactive}
              checked={state.checkedA}
              onChange={handleChange("checkedA")}
              value="checkedA"
            />
          }
          label="Режим редактирования"
        />
        {state.checkedA ? (
          <div className={classes.createbox}>
            <ChangeForm onSubmit={onSubmitMain} {...props}></ChangeForm>
            <button className={classes.dangerbutton} onClick={handleClickOpen}>
              Удалить поручение
            </button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Завершить выполнение"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Ваш проект будет удален, вы действительно хотите удалить
                  поручение?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                  Отмена
                </Button>
                <Button onClick={tryDelete} color="primary" autoFocus>
                  Подтвердить
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          <div className={classes.createbox}>
            <div className={classes.boxcenter}>
            <h3 className={classes.NameMission}>{props.initialValues.NameMission}</h3>
            <p className={classes.Text}>{props.initialValues.Text}</p>
            <div className={classes.targetsbox}>
           {props.initialValues.SubTargets&&<h4 className={classes.targetstitle}>Цели:</h4>}
        {props.initialValues.SubTargets&&props.initialValues.SubTargets.map((p,index)=><div key={index} className={classes.targets}>{p}</div>)}
           </div> 
           </div>
           <div className={classes.donwloadbox}>
           <Button
        variant="contained"
        color="default" href={props.initialValues.LinkBoss} className={classes.donwload}>Скачать</Button>
           </div>
            <div className={classes.datebox}>
              <p className={classes.datespace}> Начать c {moment(props.initialValues.startdate).format("MM-DD-YYYY")}
              </p>
              <p className={classes.datespace}>Закончить {moment(props.initialValues.enddate).format("MM-DD-YYYY")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjView;
