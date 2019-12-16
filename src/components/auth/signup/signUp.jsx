import React from "react";
import classes from "./../auth.module.scss";
import { Field, reduxForm } from "redux-form";
import {
  authInput,
  SelectUser
} from "../../../components/commons/formsControls/formsControls";
import {
  required,
  PasswordCheck,
  OnlyLetters
} from "../../../untils/validators/validators";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import { useSnackbar } from "notistack";
import { Fade } from "react-reveal";
import { InputLabel } from "@material-ui/core";
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
      <div className={classes.flexspace}>
        <InputLabel htmlFor="age-native-simple">Выберите отдел</InputLabel>
        <Field component={SelectUser} name="Otdel" validate={[required]} id="age-native-simple">
          <option value="" />
          <option value="Имущество">Хозяйство</option>
          <option value="Хозяйства">Градостроительство</option>
          <option value="Организационный">ЖКХ</option>
          <option value="Управление делами">Управление делами</option>
          <option value="Бухгалтерия">Бухгалтерия</option>
          <option value="Градостроительства">Градостроительства</option>
          <option value="Экономическое развитие">Экономическое развитие</option>
          <option value="Муниципальный заказ">Муниципальный заказ</option>
          <option value="Социальное развитие">Социальное развитие</option>
          <option value="Образование">Образование</option>
          <option value="Финансовый">Финансовый</option>
          <option value="Социальная защита">Социальная защита</option>
        </Field>
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
  let message = "Этот адрес почты уже кем-то используется";
  if (
    props.error === "The email address is already in use by another account."
  ) {
    enqueueSnackbar(message, {
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 3000
    });
  }
  return (
    <Fade>
      <div className={classes.formbox}>
        <div className={classes.form}>
          <h5 className={classes.formtitle}>Регистрация</h5>
          <SignUpForm onSubmit={onSubmit} {...props.loading}></SignUpForm>
        </div>
      </div>
    </Fade>
  );
};

export default SignUp;
