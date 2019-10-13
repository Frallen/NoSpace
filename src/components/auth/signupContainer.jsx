import React from "react";
import classes from "./auth.module.scss";
import { Field, reduxForm } from "redux-form";

const SignUpBox = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="FIO">ФИО</label>
        <Field className={classes.input} component="input" type="text" name={"FIO"}/>
      </div>
      <div>
        <label htmlFor="email">Емейл</label>
        <Field className={classes.input} component="input" type="email" name={"Email"}/>
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <Field className={classes.input} component="input" type="password" name={"password"}/>
      </div>
      <div>
        <button className={classes.submited}>Завершить</button>
      </div>
    </form>
  );
};

const SignUpForm = reduxForm({
  form: "signUp"
})(SignUpBox);

const SignUp = (formData) => {
  let onSubmit=(formData)=>{
    console.log(formData)
  }
  return (
    <div className={classes.formbox}>
      <div className={classes.form}>
        <h5 className={classes.formtitle}>Регистрация</h5>
        <SignUpForm onSubmit={onSubmit}></SignUpForm>
      </div>
    </div>
  );
};

export default SignUp;
