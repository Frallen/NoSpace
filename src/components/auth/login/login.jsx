import React from "react";
import classes from "./../auth.module.scss";
import { Field, reduxForm } from "redux-form";
import { required, PasswordCheck } from "../../../untils/validators/validators";
import { authInput } from "../../../components/commons/formsControls/formsControls";

const MinValue = PasswordCheck(5);
const FormBox = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
       <Field
          component={authInput}
          type="email"
          name="email"
          label="Почта"
          validate={[required]}
        />
      </div>
      <div>
      <Field
          component={authInput}
          type="password"
          name="password"
          label="Пароль"
          validate={[required, MinValue]}
        />
      </div>
      <div>
        <button type="submit" className={classes.submited}>
          Войти
        </button>
      </div>
    </form>
  );
};

const LoginForm = reduxForm({
  form: "login"
})(FormBox);

const Login = props => {
  let onSubmit = formData => {
    props.UserisAuth(formData.email, formData.password);
  };
  return (
    <div className={classes.formbox}>
      <div className={classes.form}>
        <h5 className={classes.formtitle}>Вход</h5>
        <LoginForm onSubmit={onSubmit}></LoginForm>
      </div>
    </div>
  );
};

export default Login;
