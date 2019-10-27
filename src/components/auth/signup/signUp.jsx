import React from "react";
import classes from "./../auth.module.scss";
import { Field, reduxForm } from "redux-form";
import { authInput } from "../../../components/commons/formsControls/formsControls";
import {
  required,
  PasswordCheck,
  OnlyLetters
} from "../../../untils/validators/validators";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useSnackbar } from "notistack";
//firestore вроде как принимает пароли от 8 символов
const MinValue = PasswordCheck(8);

const SignUpBox = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.flexspace}>
        <Field
          component={authInput}
          type="text"
          label="ФИО"
          name="FIO"
          validate={[required, OnlyLetters]}
          //иконки
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBoxOutlinedIcon />
              </InputAdornment>
            )
          }}
        />
      </div>
      <div className={classes.flexspace}>
        <Field
          component={authInput}
          type="text"
          label="Никнейм"
          name="username"
          validate={[required]}
          //иконки
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            )
          }}
        />
      </div>
      <div className={classes.flexspace}>
        <Field
          component={authInput}
          type="email"
          label="Почта"
          name="email"
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
          label="Пароль"
          name="password"
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
  const { enqueueSnackbar } = useSnackbar();
  let message = "Такая почта или никейм уже имеется";
  return (
    <div className={classes.formbox}>
      <div className={classes.form}>
        <h5 className={classes.formtitle}>Регистрация</h5>
        <SignUpForm onSubmit={onSubmit} {...props.loading}></SignUpForm>
        {props.error &&
          enqueueSnackbar(message, {
            variant: "error",
            preventDuplicate: true
          })}
      </div>
    </div>
  );
};

export default SignUp;