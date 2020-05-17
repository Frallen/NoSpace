import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import classes from "./settings.module.scss";
import { OnlyLetters } from "../../untils/validators/validators";
import { AllInput } from "../commons/formsControls/formsControls";
import { Fade } from "react-reveal";
import { Form, Button, Modal } from "rsuite";
import Password from "./password";

let Sett = (props) => {
  return (
    <Form
      fluid
      onSubmit={props.handleSubmit}
      initialvalues={{
        FIO: props.initialValues.FIO,
        email: props.initialValues.email,
      }}
    >
      <Field
        component={AllInput}
        type="text"
        text="ФИО"
        name="FIO"
        validate={[OnlyLetters]}
      />

      <Field
        component={AllInput}
        type="email"
        text="Почта"
        name="email"
      ></Field>

      <Button type="submit" block appearance="primary" disabled={props.loading}>
        Изменить
      </Button>
    </Form>
  );
};

//форма смены емейла
const SettForm = reduxForm({
  form: "SettForm",
})(Sett);

const Settings = (props) => {
  if (
    props.error ===
    "This operation is sensitive and requires recent authentication. Log in again before retrying this request."
  ) {
    props.CleanAfter();
  }

  if (props.suc) {
    props.CleanAfter();
  }
  const [show, setShow] = useState(false);

  if (!props.initialValues) return null;
  //отправка данных с формы
  let Submit = (formdata) => {
    props.NewSett(formdata);
  };
  // удалить аккаунт
  let tryDelete = () => {
    props.Delete();
    setShow(false);
  };
  return (
    <Fade>
      <div className={classes.formbox}>
        <div className={classes.form}>
          <div>
            <h3>Обновление профиля</h3>
            <SettForm onSubmit={Submit} {...props}></SettForm>
            <Password onSubmit={Submit} {...props}></Password>
          </div>
          <div>
            <Button
              type="button"
              color="red"
              block
              onClick={() => setShow(true)}
              className={classes.dangerButton}
            >
              Удалить аккаунт
            </Button>
            <Modal backdrop="static" show={show} onHide={() => setShow(false)}>
              <Modal.Header>
                <Modal.Title>Удаление аккаунта</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Все ваши данные, поручения и задания будут удалены, вы
                действительно хотите удалить аккаунт?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => {
                    tryDelete();
                  }}
                  appearance="primary"
                >
                  Я подтверждаю удаление
                </Button>
                <Button onClick={() => setShow(false)} appearance="subtle">
                  Отмена
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </Fade>
  );
};
export default Settings;
