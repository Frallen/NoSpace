import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import classes from "./settings.module.scss";
import { OnlyLetters } from "../../untils/validators/validators";
import { authInput } from "../commons/formsControls/formsControls";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

let Sett = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.flexspace}>
        <Field
          component={authInput}
          type="text"
          label={props.FIO}
          value={props.FIO}
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
          type="text"
          label={props.username}
          name="username"
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
          label={props.email}
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
  form: "ChangeSettings"
})(Sett);

const Settings = props => {
  useEffect(() => {
    return () => {
      props.CleanUp();
    };
  });

  let message = "Для выполнения этой операции нужно выполнить повторный вход в систему";
  const { enqueueSnackbar } = useSnackbar(); 
  if (props.error==="This operation is sensitive and requires recent authentication. Log in again before retrying this request.") {
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
  if (!props.profile.isLoaded) return null;
//отправка данных с формы
  let Submit = formdata => {
    props.NewSett(formdata);
  };
// удалить аккаунт
  let tryDelete = () => {
    props.Delete();
  };
  return (
    <div className={classes.formbox}>
      <div className={classes.form}>
        <div>
          <h3>Обновление профиля</h3>
          <SettForm
            onSubmit={Submit}
            {...props.loading}
            {...props.profile}
            {...props.auth}
          ></SettForm>
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
    </div>
  );
};
export default Settings;
