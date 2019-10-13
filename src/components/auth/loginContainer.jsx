import React from "react";
import classes from "./auth.module.scss";
import { Field, reduxForm } from "redux-form";

const FormBox = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="email">Емейл</label>
        <Field component="input" type="email" name={"email"} className={classes.input}></Field>
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <Field component="input" type="password" name={"password"} className={classes.input}></Field>
      </div>
      <div>
        <button className={classes.submited}>Войти</button>
      </div>
    </form>
  );
};

const LoginForm = reduxForm({
  form: "login"
})(FormBox);

const Login = (formData) => {
  let onSubmit=(formData)=>{
console.log(formData)
}
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
