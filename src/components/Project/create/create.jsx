import React,{useEffect} from "react";
import classes from "./create.module.scss";
import { Field, reduxForm } from "redux-form";
import {
  ProjectInput,
  ProjectTextArea,
  ProjectDate
} from "../../commons/formsControls/formsControls";
import {
  required,
  ProjectNameCheck
} from "../../../untils/validators/validators";
import { useSnackbar } from 'notistack';

const CreateBox = props => {
  const minValue = ProjectNameCheck(0);
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={ProjectInput}
          label="Название проекта"
          type="text"
          name="NameProj"
          validate={[required, minValue]}
        />
      </div>
      <div className={classes.flexspace}>
        <Field component={ProjectTextArea}   label="Описание проекта" name="Text" validate={[required]} />
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
          <Field component={ProjectDate}   label="Начало проекта" name="startdate"   validate={[required]}/>
        </div>
        <div>
          <Field component={ProjectDate}   label="Окнончание проекта" name="enddate"   validate={[required]}/>
        </div>
      </div>
      <button className={classes.creabtn} disabled={props.loading}>Создать проект</button>
    </form>
  );
};

const CreateForm = reduxForm({
  form: "createForm"
})(CreateBox);

const Create = props => {
useEffect(()=>{
  return()=>{
    props.Clean()
  }
})
let message = "";
const { enqueueSnackbar } = useSnackbar(); 
if (props.error) {
    enqueueSnackbar(props.error, {
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 3000
    });
  }
  let onSubmit = formData => {
    props.NewProject(formData);
  };
  return (
    <div className={classes.create}>
      <div className={classes.createbox}>
        <CreateForm onSubmit={onSubmit} {...props.loading}></CreateForm>
      </div>
    </div>
  );
};

export default Create;
