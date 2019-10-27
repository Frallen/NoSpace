import React from "react";
import classes from "./../auth.module.scss";
import { Field, reduxForm } from "redux-form";
import { required, PasswordCheck } from "../../../untils/validators/validators";
import { authInput } from "../../../components/commons/formsControls/formsControls";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";

const MinValue = PasswordCheck(8);
const FormBox = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.flexspace}>
        <Field
          component={authInput}
          type="email"
          name="email"
          label="Почта"
          validate={[required]}
          //иконки
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            )
          }}
        />
      </div>
      <div className={classes.flexspace}>
        <Field
          component={authInput}
          type="password"
          name="password"
          label="Пароль"
          validate={[required, MinValue]}
          //иконки
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            )
          }}
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
  props.Userlogin(formData);
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