import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import classes from "./../auth.module.scss";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import { authInput } from "../../commons/formsControls/formsControls";
import { required } from "../../../untils/validators/validators";
import { useSnackbar } from "notistack";
import { Fade } from "react-reveal";

const Recover = props => {
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
      <div>
        <button className={classes.submited} disabled={props.loading}>
          Продолжить
        </button>
      </div>
    </form>
  );
};

let RecoverForm = reduxForm({
  form: "reecoverPass"
})(Recover);

let ChangePass = props => {
  useEffect(()=>{
  
     
   if(props.error){ 
        enqueueSnackbar(messageErr, {
          variant: "error",
          preventDuplicate: true,
          autoHideDuration: 3000
        })}
  })
  const { enqueueSnackbar } = useSnackbar();
  let messageErr = "Не существует такого емейла";
  let messageSucc = "Письмо успешно отправленно";

  let onSubmit = fromdata => {
    props.NewPass(fromdata);
   
  };

  return (
    <Fade>
    <div className={classes.formbox}>
      <div className={classes.form}>
        <h5 className={classes.formtitle}>Восстановление пароля</h5>
        <RecoverForm onSubmit={onSubmit} {...props.loading}></RecoverForm>
      </div>
 
    </div></Fade>
  );
};
export default ChangePass;
