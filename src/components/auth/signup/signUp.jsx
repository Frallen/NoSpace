import React from "react";
import classes from "./../auth.module.scss";
import { Field, reduxForm } from "redux-form";
import { authInput } from "../../../components/commons/formsControls/formsControls";
import {
  required,
  PasswordCheck,
  OnlyLetters
} from "../../../untils/validators/validators";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import clsx from "clsx"
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonIcon from "@material-ui/icons/Person";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

const MinValue = PasswordCheck(5);

const SignUpBox = props => {
  console.log(props.error);
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.flexspace}>
        <Field
          component={authInput}
          type="text"
          label="ФИО"
          name="FIO"
          validate={[required, OnlyLetters]}
        />
      </div>
      <div className={classes.flexspace}>
        <Field
          component={authInput}
          type="text"
          label="Никнейм"
          name="username"
          validate={[required]}
        />
      </div>
      <div className={classes.flexspace}>
        <Field
          component={authInput}
          type="email"
          label="Почта"
          name="email"
          validate={[required]}
        />
      </div>
      <div className={classes.flexspace}>
        <Field
          component={authInput}
          type="password"
          label="Пароль"
          name="password"
          validate={[required, MinValue]}
        />
      </div>
      <div>
        <button className={classes.submited} disabled={props.loading}>
          Завершить
        </button>
      </div>
    </form>
  );
};

const SignUpForm = reduxForm({
  form: "signUp"
})(SignUpBox);

const SignUp = props => {
  let onSubmit = formData => {
    props.NewUser(formData);
  };
  return (
    <div className={classes.formbox}>
      <div className={classes.form}>
        <h5 className={classes.formtitle}>Регистрация</h5>
        <SignUpForm onSubmit={onSubmit} {...props.loading}></SignUpForm>
        {props.error&&<div>{props.error}</div>}
      </div>
    </div>
  );
};

export default SignUp;
