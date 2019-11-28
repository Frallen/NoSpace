import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  ProjectTextArea,
  ProjectInput
} from "../commons/formsControls/formsControls";
import classes from "./Tasks.module.scss";
import { required } from "../../untils/validators/validators";
const TaskBox = props => {
  return (
    <form onSubmit={props.handleSumbit}>
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
      <button className={classes.creabtn} disabled={props.loading}>
        Отправить
      </button>
    </form>
  );
};

const TaskForm = reduxForm({
  form: "MyTasks"
})(TaskBox);

const Task = props => {
  let Submit = formData => {};
  return (
    <div className={classes.create}>
      <div className={classes.createbox}>
        <TaskForm {...props} onSubmit={Submit}></TaskForm>
      </div>
    </div>
  );
};

export default Task;
