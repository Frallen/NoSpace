import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  ProjectTextArea,
  ProjectInput
} from "../commons/formsControls/formsControls";
import classes from "./Tasks.module.scss";
import { required } from "../../untils/validators/validators";
import moment from "moment";
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
        <div>
        <h3>{props.Task.NameMission}</h3>
          <p>{props.Task.Text}</p>
        {props.Task.SubTargets&&props.Task.SubTargets.map(p=><div key={p}>{p}</div>)}
            <div className={classes.datebox}>
              <p className={classes.datespace}> Начать  
                 {moment(props.Task.startdate).format("MM-DD-YYYY")}
              </p>
              <p className={classes.datespace}>Закончить {moment(props.Task.enddate).format("MM-DD-YYYY")}</p>
            </div>
        </div>
        <TaskForm {...props} onSubmit={Submit}></TaskForm>
      </div>
    </div>
  );
};

export default Task;
