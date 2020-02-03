import React from "react";
import classes from "./../auth.module.scss";
import { Field, reduxForm } from "redux-form";
import { NavLink } from "react-router-dom";
import { required, PasswordCheck } from "../../../untils/validators/validators";
import { authInput } from "../../../components/commons/formsControls/formsControls";
import { Fade } from "react-reveal";
import { Form, Button, Alert } from "rsuite";
const MinValue = PasswordCheck(8);
const FormBox = props => {
  return (
    <Form onSubmit={props.handleSubmit}>
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

      <Button type="submit" appearance="primary" block disabled={props.loading}>
        Войти
      </Button>
    </Form>
  );
};

const LoginForm = reduxForm({
  form: "Auth"
})(FormBox);

const Login = props => {
  if (props.error && props.error !== null) {
    Alert.error("Неправильный пароль или емейл",4000);
  }
  let onSubmit = formData => {
    props.Userlogin(formData);
  };

  return (
    <Fade>
      <div className={classes.formbox}>
        <div className={classes.form}>
          <h5 className={classes.formtitle}>Вход</h5>
          <LoginForm onSubmit={onSubmit} {...props.loading}></LoginForm>
          <NavLink to="/recover-password" className={classes.recoverPass}>
            Забыли пароль?
          </NavLink>
        </div>
      </div>
    </Fade>
  );
};

export default Login;
