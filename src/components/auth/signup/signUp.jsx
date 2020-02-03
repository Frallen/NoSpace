import React from "react";
import classes from "./../auth.module.scss";
import { Field, reduxForm } from "redux-form";
import {
  authInput,
  SelectUser,
  Checker
} from "../../../components/commons/formsControls/formsControls";
import {
  required,
  PasswordCheck,
  OnlyLetters
} from "../../../untils/validators/validators";
import { Fade } from "react-reveal";
import { Button, Form, Alert } from "rsuite";

//firestore вроде как принимает пароли от 8 символов
const MinValue = PasswordCheck(8);

const SignUpBox = props => {
  let data = [
    { label: "Имущество", value: "Имущество" },
    { label: "Хозяйства", value: "Хозяйства" },
    { label: "Организационный", value: "Организационный" },
    { label: "Управление делами", value: "Управление делами" },
    { label: "Бухгалтерия", value: "Бухгалтерия" },
    { label: "Градостроительства", value: "Градостроительства" },
    { label: "Экономическое развитие", value: "Экономическое развитие" },
    { label: "Муниципальный заказ", value: "Муниципальный заказ" },
    { label: "Социальное развитие", value: "Социальное развитие" },
    { label: "Образование", value: "Образование" },
    { label: "Финансовый", value: "Финансовый" },
    { label: "Социальная защита", value: "Социальная защита" }
  ];

  return (
    <Form onSubmit={props.handleSubmit}>
      <Field
        component={authInput}
        type="text"
        name="FIO"
        text="ФИО"
        validate={[required, OnlyLetters]}
      />
      <Field
        text="Отдел"
        component={SelectUser}
        name="Otdel"
        data={data}
        validate={[required]}
      ></Field>
      <Field
        component={authInput}
        type="email"
        name="email"
        text="Почта"
        validate={[required]}
      />
      <Field
        component={authInput}
        type="password"
        name="password"
        text="Пароль"
        validate={[required, MinValue]}
      />

      <Field component={Checker} validate={[required]} name="IsAgree"/>

      <Button type="submit" appearance="primary" block disabled={props.loading}>
        Завершить
      </Button>
    </Form>
  );
};

const SignUpForm = reduxForm({
  form: "signUp"
})(SignUpBox);

const SignUp = props => {
  let onSubmit = formData => {
    delete formData.IsAgree
    props.NewUser(formData);
  };

  if (
    props.error === "The email address is already in use by another account."
  ) {
    Alert.error("Этот адрес почты уже кем-то используется",4000);
  }
  return (
    <Fade>
      <div className={classes.formbox}>
        <div className={classes.form}>
          <h5 className={classes.formtitle}>Регистрация</h5>
          <SignUpForm onSubmit={onSubmit} {...props.loading}></SignUpForm>
        </div>
      </div>
    </Fade>
  );
};

export default SignUp;
