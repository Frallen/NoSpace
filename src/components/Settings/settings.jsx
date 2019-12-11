import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import classes from "./settings.module.scss";
import { OnlyLetters } from "../../untils/validators/validators";
import { authInput } from "../commons/formsControls/formsControls";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import { useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Fade } from "react-reveal";

let Sett = props => {
  return (
    <form
      onSubmit={props.handleSubmit}
      initialvalues={{
        FIO: props.initialValues.FIO,
        username:props.initialValues.username,
        email: props.initialValues.email
      }}
    >
      <div className={classes.flexspace}>
        <Field
          component={authInput}
          type="text"
          label="ФИО"
          name="FIO"
          validate={[OnlyLetters]}
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
          //иконки.
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            )
          }}
        ></Field>
      </div>
      <div className={classes.flexspace}>
        <Field
          component={authInput}
          type="password"
          label="Пароль"
          name="password"
          //иконки
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            )
          }}
        ></Field>
      </div>
      <button className={classes.submited} disabled={props.loading}>
        Изменить
      </button>
    </form>
  );
};

//форма смены емейла
const SettForm = reduxForm({
  form: "SettForm"
})(Sett);

const Settings = props => {


  let message =
    "Для выполнения этой операции нужно выполнить повторный вход в систему";
  const { enqueueSnackbar } = useSnackbar();
  if (
    props.error ===
    "This operation is sensitive and requires recent authentication. Log in again before retrying this request."
  ) {
    enqueueSnackbar(message, {
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 3000
    });
  }

  /// Dialog material ui
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  ////////////////
  if (!props.initialValues) return null;
  //отправка данных с формы
  let Submit = formdata => {
    props.NewSett(formdata);
  };
  // удалить аккаунт
  let tryDelete = () => {
    props.Delete();
  };
  return (
    <Fade>
    <div className={classes.formbox}>
      <div className={classes.form}>
        <div>
          <h3>Обновление профиля</h3>
          <SettForm onSubmit={Submit} {...props}></SettForm>
        </div>
        <div>
          <button className={classes.dangerbutton} onClick={handleClickOpen}>
            Удалить аккаунт
          </button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Удаление аккаута"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Все ваши данные и проекты будут утеряны,вы действительно ходите
                удалить аккаунт?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Отмена
              </Button>
              <Button onClick={tryDelete} color="primary" autoFocus>
                Подтвердить
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div></Fade>
  );
};
export default Settings;
