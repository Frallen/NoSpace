import React from "react";
import classes from "./create.module.scss";
import { Field, reduxForm, FieldArray } from "redux-form";
import {
  AllInput,
  ProjectTextArea,
  ProjectDate,
  SelectUser,
  Upload
} from "../../commons/formsControls/formsControls";
import { required } from "../../../untils/validators/validators";
import { Fade } from "react-reveal";
import { Button, Form, Alert } from "rsuite";
import moment from "moment";

const AddSubTargets = ({ fields, meta: { error } }) => (
  <ul>
    {fields.map((hobby, index) => (
      <li key={index}>
        <Field
          name={hobby}
          type="text"
          component={AllInput}
          text={`Цель #${index + 1}`}
          validate={[required]}
        />
        <Button
          type="button"
          text="Удалить цель"
          onClick={() => fields.remove(index)}
          className={classes.delbtn}
        >
          Удалить цель
        </Button>
      </li>
    ))}

    <Button type="button" onClick={() => fields.push()}>
      Добавить цель
    </Button>

    {error && <li className="error">{error}</li>}
  </ul>
);

const CreateBox = props => {
  let data = [];
  props.initialValues.users.map(p =>
    data.push({
      label: `${p.FIO + " " + p.Otdel + " " + p.Email}`,
      value: p.ID
    })
  );

  return (
    <Form onSubmit={props.handleSubmit} fluid>
      <Field
        component={AllInput}
        text="Название поручения"
  
        name="NameMission"
        validate={[required]}
      />
      <Field
        component={ProjectTextArea}
        text="Описание"
        name="Text"
        validate={[required]}
      />
      <FieldArray name="SubTargets" component={AddSubTargets} />
<div className={classes.boxSpace}>
      <Field
      text="Кому отправить"
        component={SelectUser}
        name="SendTo"
        validate={[required]}
        data={data}
      ></Field>
      <div className={classes.datebox}>
        <Field
          component={ProjectDate}
          text="Начать с"
          name="startdate"
          validate={[required]}
        />

        <Field
          component={ProjectDate}
          text="Сдать до"
          name="enddate"
          validate={[required]}
        />
      </div>
      </div>
      <Field
        type="file"
        component={Upload}
        name="document"
        validate={[required]}
      ></Field>

      <Button type="submit" appearance="primary"  disabled={props.loading}>
        Создать поручение
      </Button>
    </Form>
  );
};

const CreateForm = reduxForm({
  form: "createForm"
})(CreateBox);

const Create = props => {
  if (props.error) {
    Alert.error(props.error);
  }
  let onSubmit = formData => {
    /*  if(props.email===formData.SendTo){
      let message = "Вы не можете отправить поручение самому себе";
    enqueueSnackbar(message, {
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 4000
    });
    }else{*/

    formData.startdate = moment(formData.startdate).format();
    formData.enddate = moment(formData.enddate).format();

    props.NewProject(formData);
    Alert.success("Поручение успешно созданно");

    //}
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
          <CreateForm onSubmit={onSubmit} {...props}></CreateForm>
        </div>
      </div>
    </Fade>
  );
};

export default Create;
