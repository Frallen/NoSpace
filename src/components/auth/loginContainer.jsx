import React from "react";
import classes from "./auth.module.scss";
import { Field, reduxForm } from "redux-form";
import { required, PasswordCheck } from "../../untils/validators/validators";
import { authInput } from "../commons/formsControls/formsControls";
import { UserisAuth } from "../../redux/authReducer";
import { connect } from "react-redux";
const MinValue=PasswordCheck(5)
const FormBox = props => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="email">Емейл</label>
        <Field component={authInput} type="email" name="email" validate={[required,]}/>
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <Field component={authInput} type="password" name="password" validate={[required,MinValue]}/>
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

const Login = (props) => {
  let onSubmit=(formData)=>{
 props.UserisAuth(formData.email,formData.password)
//console.log(formData)
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

export default connect(null,{UserisAuth})(Login);
