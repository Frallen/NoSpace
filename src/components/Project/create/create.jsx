import React from "react";
import classes from "./create.module.scss";
import { Field, reduxForm, FieldArray,reset } from "redux-form";
import {
  ProjectInput,
  ProjectTextArea,
  ProjectDate
} from "../../commons/formsControls/formsControls";
import { required } from "../../../untils/validators/validators";
import { useSnackbar } from "notistack";


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

const CreateBox = props => {
  return (
    <form onSubmit={props.handleSubmit}>
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
        Создать проект
      </button>
    </form>
  );
};

const CreateForm = reduxForm({
  form: "createForm"
})(CreateBox);

const Create = props => {
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
   // dispatch(reset('createForm'))
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
