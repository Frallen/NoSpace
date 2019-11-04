import React, { useEffect } from "react";
import classes from "./../auth.module.scss";
import { Field, reduxForm } from "redux-form";
import { NavLink } from "react-router-dom";
import { required, PasswordCheck } from "../../../untils/validators/validators";
import { authInput } from "../../../components/commons/formsControls/formsControls";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import { useSnackbar } from "notistack";
const MinValue = PasswordCheck(8);
const FormBox = props => {
  return (
    <form onSubmit={props.handleSubmit}>
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
          Войти
        </button>
      </div>
    </form>
  );
};

const LoginForm = reduxForm({
  form: "Auth"
})(FormBox);

const Login = props => {
  useEffect(() => {
    return () => {
      props.CleanUp();
    };
  });
  //let message = "Такая почта или никейм уже имеется";
  let message = "Неправильный пароль или емейл";
  const { enqueueSnackbar } = useSnackbar();
  if (props.error) {
    enqueueSnackbar(message, {
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 3000
    });
  }
  let onSubmit = formData => {
    props.Userlogin(formData);
  };

  return (
    <div className={classes.formbox}>
      <div className={classes.form}>
        <h5 className={classes.formtitle}>Вход</h5>
        <LoginForm onSubmit={onSubmit} {...props.loading}></LoginForm>
        <NavLink to={"/recover-password"} className={classes.recoverPass}>
          Забыли пароль?
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
