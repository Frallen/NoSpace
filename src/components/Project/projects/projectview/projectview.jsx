import React,{useEffect} from "react";
import { Preloader } from "../../../../untils/preloader/preloader";
import { Field, reduxForm } from "redux-form";
import { required } from "../../../../untils/validators/validators";
import {
  ProjectDate,
  ProjectTextArea,
  ProjectInput
} from "../../../commons/formsControls/formsControls";
import classes from "./projectView.module.scss";
import { useSnackbar } from "notistack";

const ProjBox = props => {
  return (
    <form onSubmit={props.handleSubmit} initialvalues={{
      NameProj: props.initialValues.NameProj,
      Text: props.initialValues.Text,
      target: props.initialValues.target,
      startdate: props.initialValues.startdate,
      enddate: props.initialValues.enddate
    }}>
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
          label="Название проекта"
          component={ProjectTextArea}
          name="target"
          validate={[required]}
        />
      </div>
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
 
 // let message = "Для выполнения этой операции нужно выполнить повторный вход в систему";
  const { enqueueSnackbar } = useSnackbar(); 
  if (props.error) {
      enqueueSnackbar(props.error, {
        variant: "error",
        preventDuplicate: true,
        autoHideDuration: 3000
      });
    }

  let onSubmit = FormData => {};
  return (
    <div>
      {!props.initialValues ? (
        <Preloader></Preloader>
      ) : (
        <div className={classes.create}>
          <div className={classes.createbox}>
            <ChangeForm onSubmit={onSubmit} {...props}></ChangeForm>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjView;
