import React from "react";
import classes from "./email.module.scss";
import EmailAnim from "./../../media/EmailAnim.svg";
import { Alert } from "rsuite";
let EmailVer = props => {
  //Отправка письма на почту и сообщения (снебкары)
  let Email = () => {
    props.EmailSend();
    if (props.error) {
      Alert.error(props.error);
    } else {
      Alert.success("Письмо успешно отправленно");
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
