import React, { useState } from "react";
import { Field, reduxForm,FieldArray } from "redux-form";
import { required } from "../../../../untils/validators/validators";
import {
  ProjectDate,
  ProjectTextArea,
  ProjectInput
} from "../../../commons/formsControls/formsControls";
import classes from "./projectView.module.scss";
import { useSnackbar } from "notistack";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";


const renderHobbies = ({ fields, meta: { error } }) => (
  <ul>
    {fields.map((hobby, index) => (
      <li key={index}>
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
        NameProj: props.initialValues.NameProj,
        Text: props.initialValues.Text,
        MainTarget: props.initialValues.MainTarget,
        SubTargets:props.initialValues.SubTargets,
        startdate: props.initialValues.startdate,
        enddate: props.initialValues.enddate
      }}
    >
      <div>
        <Field
          component={ProjectInput}
          label="Название проекта"
          type="text"
          name="NameProj"
          validate={[required]}
        />
      </div>
      <div className={classes.flexspace}>
        <Field
          component={ProjectTextArea}
          label="Описание проекта"
          name="Text"
          validate={[required]}
        />
      </div>
      <div className={classes.flexspace}>
        <Field
          label="Главная цель"
          component={ProjectTextArea}
          name="MainTarget"
          validate={[required]}
        />
      </div>
      <FieldArray name="SubTargets" component={renderHobbies} />
      <div className={classes.datebox}>
        <div>
          <Field
            component={ProjectDate}
            label="Начало проекта"
            name="startdate"
            validate={[required]}
          />
        </div>
        <div>
          <Field
            component={ProjectDate}
            label="Окнончание проекта"
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
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  ////////////////
  let tryDelete=()=>{
   
      props.Delete(props.initialValues.idProject)
      
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

  let onSubmit = FormData => {
    FormData.idProject=props.initialValues.idProject
    FormData.idOwner=props.initialValues.idOwner
    props.Update(FormData)
  };
  return (
    <div>
      <div className={classes.create}>
        <div className={classes.createbox}>
          <ChangeForm onSubmit={onSubmit} {...props}></ChangeForm>
          <button className={classes.dangerbutton} onClick={handleClickOpen}>
            Удалить проект
          </button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Удаление аккаута"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Ваш проект будет удален, вы действительно хотите удалить проект?
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
      </div>
    </div>
  );
};

export default ProjView;
