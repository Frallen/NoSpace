import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import classes from "./settings.module.scss";
import { OnlyLetters } from "../../untils/validators/validators";
import { AllInput } from "../commons/formsControls/formsControls";
import { Fade } from "react-reveal";
import { Form, Button, Alert, Modal } from "rsuite";

let Sett = props => {
  return (
    <Form
      fluid
      onSubmit={props.handleSubmit}
      initialvalues={{
        FIO: props.initialValues.FIO,
        username: props.initialValues.username,
        email: props.initialValues.email
      }}
    >
      <Field
        component={AllInput}
        type="text"
        placeholder="ФИО"
        name="FIO"
        validate={[OnlyLetters]}
      />

      <Field
        component={AllInput}
        type="email"
        placeholder="Почта"
        name="email"
      ></Field>

      <Field
        component={AllInput}
        type="password"
        placeholder="Пароль"
        name="password"
      ></Field>

      <Button type="submit" block appearance="primary" disabled={props.loading}>
        Изменить
      </Button>
    </Form>
  );
};

//форма смены емейла
const SettForm = reduxForm({
  form: "SettForm"
})(Sett);

const Settings = props => {
  if (
    props.error ===
    "This operation is sensitive and requires recent authentication. Log in again before retrying this request."
  ) {
    let message =
      "Для выполнения этой операции нужно выполнить повторный вход в систему";
    Alert.warning(message);
  }

  if (props.suc === true) {
    props.CleanAfter();
    Alert.success("Операция выполнена успешно");
  }
  const [show, setShow] = useState(false);

  let open = () => {
    setShow(true);
  };
  let close = () => {
    setShow(false);
  };

  if (!props.initialValues) return null;
  //отправка данных с формы
  let Submit = formdata => {
    props.NewSett(formdata);
  };
  // удалить аккаунт
  let tryDelete = () => {
    props.Delete();
    close();
  };
  return (
    <Fade>
      <div className={classes.formbox}>
        <div className={classes.form}>
          <div>
            <h3>Обновление профиля</h3>
            <SettForm onSubmit={Submit} {...props}></SettForm>
          </div>
          <div>
            <Button
              type="button"
              color="red"
              block
              onClick={open}
              className={classes.dangerButton}
            >
              Удалить аккаунт
            </Button>
            <Modal backdrop="static" show={show} onHide={close}>
              <Modal.Header>
                <Modal.Title>Удаление аккаунта</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Все ваши данные и проекты будут удалены,вы действительно ходите
                удалить аккаунт?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => {
                    tryDelete();
                  }}
                  appearance="primary"
                >
                  Я подтвержаю удаление
                </Button>
                <Button onClick={close} appearance="subtle">
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
