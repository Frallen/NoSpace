import React from "react";
import classes from "./email.module.scss";
import EmailAnim from "./../../media/EmailAnim.svg";
import { useSnackbar } from "notistack";
let EmailVer = props => {
 

  const { enqueueSnackbar } = useSnackbar();
  //Отправка письма на почту и сообщения (снебкары)
  let Email = () => {
    props.EmailSend();
    if (props.error) {
      let message = props.error;
      enqueueSnackbar(message, {
        variant: "error",
        preventDuplicate: true,
        autoHideDuration: 3000
      });
    } else {
      let message = "Письмо успешно отправленно";
      enqueueSnackbar(message, {
        variant: "success",
        preventDuplicate: true,
        autoHideDuration: 3000
      });
    }
  };
  return (
    <div className={classes.EmailBox}>
      <div className={classes.box}>
        <img src={EmailAnim} alt="Email" />
        <h2 className={classes.Emailh2}>
          Вам на почту отравленно письмо с подтверждением регистрации.
        </h2>
        <p className={classes.text}>
          Чтобы продолжить перейдите по ссылке в письме.
        </p>
        <button
          className={classes.button}
          onClick={Email}
          disabled={props.loading}
        >
          Отправить письмо
        </button>
      </div>
    </div>
  );
};

export default EmailVer;
