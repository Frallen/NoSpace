import React from "react";
import classes from "./create.module.scss";
import { Field, reduxForm, FieldArray } from "redux-form";
import {
  ProjectInput,
  ProjectTextArea,
  ProjectDate,
  SelectUser,
  Upload
} from "../../commons/formsControls/formsControls";
import { required } from "../../../untils/validators/validators";
import { useSnackbar } from "notistack";
import { Fade } from "react-reveal";

const AddSubTargets = ({ fields, meta: { error } }) => (
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
        <Field component={SelectUser} name="SendTo" validate={[required]}>
          <option value="" />
          {//расчехляю массив юзеров в опции выбора (типо комбобокса)
          props.initialValues.users.map((p, index) => (
            //Когда нет заданных ID для списка можно использовать индекс элемента как ключ
            <option key={index}>{p.Email}</option>
          ))}
        </Field>
      </div>
      <div className={classes.flexspace}>
        <Field
          type="file"
          component={Upload}
          name="document"
          validate={[required]}
        ></Field>
      </div>
      <div className={classes.datebox}>
        <div>
          <Field
            component={ProjectDate}
            label="Начать с"
            name="startdate"
            validate={[required]}
          />
        </div>
        <div>
          <Field
            component={ProjectDate}
            label="Сдать до"
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
   let message = "Поручение успешно созданно";
    enqueueSnackbar(message, {
      variant: "success",
      preventDuplicate: true,
      autoHideDuration: 4000
    });
  };
  return (
    <Fade>
      <div className={classes.create}>
        <div className={classes.createbox}>
          <h3>Создание поручения</h3>
          <p>
            Здесь вы можете создать поручение введя название,текст и сроки
            исполнения
          </p>
          <CreateForm
            onSubmit={onSubmit}
            {...props.loading}
            {...props}
          ></CreateForm>
        </div>
      </div>
    </Fade>
  );
};

export default Create;
