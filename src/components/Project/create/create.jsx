import React from "react";
import classes from "./create.module.scss";
import { Field, reduxForm, FieldArray } from "redux-form";
import {
  AllInput,
  ProjectTextArea,
  ProjectDate,
  SelectUser,
  Upload,
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

    <Button
      type="button"
      onClick={() => fields.push()}
      className={classes.addbtn}
    >
      Добавить цель
    </Button>

    {error && <li className="error">{error}</li>}
  </ul>
);

const CreateBox = (props) => {
  let data = [];
  props.initialValues.users.map((p) =>
    data.push({
      label: `${p.FIO + " " + p.Otdel + " " + p.Email}`,
      value: p.ID,
    })
  );

  return (
    <Form onSubmit={props.handleSubmit} fluid className={classes.formGrid}>
      <div className={classes.a}>
        <Field
          component={AllInput}
          text="Название поручения :"
          name="NameMission"
          validate={[required]}
        />

        <Field
          component={ProjectDate}
          text="Начать с :"
          name="startdate"
          validate={[required]}
        />

        <Field
          component={ProjectDate}
          text="Сдать до :"
          name="enddate"
          validate={[required]}
        />
      </div>
      <div className={classes.b}>
        <Field
          text="Кому отправить :"
          component={SelectUser}
          name="SendTo"
          validate={[required]}
          data={data}
        ></Field>
        <FieldArray name="SubTargets" component={AddSubTargets} />
        <Field
          type="file"
          component={Upload}
          name="document"
          validate={[required]}
        ></Field>
      </div>
      <div className={classes.c}>
        <Field
          component={ProjectTextArea}
          text="Описание :"
          name="Text"
          validate={[required]}
        />

        <Button
          type="submit"
          appearance="primary"
          block
          disabled={props.loading}
        >
          Создать поручение
        </Button>
      </div>
    </Form>
  );
};

const CreateForm = reduxForm({
  form: "createForm",
})(CreateBox);

const Create = (props) => {
  if (props.error) {
    Alert.error(props.error);
  }
  let onSubmit = (formData) => {
    /* if(props.ID===formData.SendTo){
       Alert.success("Вы не можете отправить поручение самому себе",5000)
  
    }else{*/
    let snap = props.initialValues.users.find(p => (p.ID === formData.SendTo));

    formData.startdate = moment(formData.startdate).format();
    formData.enddate = moment(formData.enddate).format();
    formData.SendName = snap.FIO;
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
            исполнения.
          </p>
        </div>
        <CreateForm onSubmit={onSubmit} {...props}></CreateForm>
      </div>
    </Fade>
  );
};

export default Create;
