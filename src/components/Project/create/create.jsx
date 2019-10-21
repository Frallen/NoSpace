import React from "react";
import classes from "./create.module.scss";
import { Field, reduxForm } from "redux-form";
import {
  ProjectInput,
  ProjectTextArea
} from "../../commons/formsControls/formsControls";
import {
  required,
  ProjectNameCheck
} from "../../../untils/validators/validators";

const CreateBox = props => {
  const minValue = ProjectNameCheck(0);
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="ProjectName" className={classes.title}>
          Назавание проекта
        </label>
        <Field
          component={ProjectInput}
          type="text"
          name="Name"
          validate={[required, minValue]}
        />
      </div>
      <div>
        <label htmlFor="ProjectText" className={classes.title}>
          Текст проекта
        </label>
        <Field component={ProjectTextArea} name="Text" validate={[required]} />
      </div>
      <div>
        <label htmlFor="ProjectTarget" className={classes.title}>
          Цель проекта
        </label>
        <Field
          component={ProjectTextArea}
          name="target"
          validate={[required]}
        />
      </div>
      <button className={classes.creabtn}>Создать проект</button>
    </form>
  );
};

const CreateForm = reduxForm({
  form: "createForm"
})(CreateBox);

const Create = props => {
  let onSubmit = formData => {
    props.NewProject(formData);
  };
  return (
    <div className={classes.create}>
      <div className={classes.createbox}>
        <CreateForm onSubmit={onSubmit}></CreateForm>
      </div>
    </div>
  );
};

export default Create;
