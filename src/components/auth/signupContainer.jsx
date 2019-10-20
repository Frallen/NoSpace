import React from "react";
import classes from "./auth.module.scss";
import { Field, reduxForm } from "redux-form";
import { authInput } from "../commons/formsControls/formsControls";
import { required, PasswordCheck } from "../../untils/validators/validators";
import { connect } from "react-redux";
import {NewUser} from "./../../redux/registrationReducer"
  const MinValue=PasswordCheck(5)
const SignUpBox = props => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="FIO">ФИО</label>
        <Field component={authInput} type="text" name="FIO" validate={[required,]}/>
      </div>
      <div>
        <label htmlFor="username">Никнейм</label>
        <Field component={authInput} type="text" name="username" validate={[required,]}/>
      </div>
      <div>
        <label htmlFor="email">Почта</label>
        <Field component={authInput} type="email" name="email" validate={[required,]}/>
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <Field component={authInput} type="password" name="password" validate={[required,MinValue]}/>
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

const SignUp = (props) => {
  let onSubmit=(formData)=>{
   // props.NewUser(formData)
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

export default connect(null,{NewUser})(SignUp);
