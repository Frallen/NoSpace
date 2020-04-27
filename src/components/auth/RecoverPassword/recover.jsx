import React from "react";
import { Field, reduxForm } from "redux-form";
import classes from "./../auth.module.scss";
import { AllInput } from "../../commons/formsControls/formsControls";
import { required } from "../../../untils/validators/validators";
import { Fade } from "react-reveal";
import { Form, Button, Alert } from "rsuite";

const Recover = (props) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Field
        component={AllInput}
        type="email"
        text="Почта"
        name="email"
        validate={[required]}
      />

      <Button type="submit" appearance="primary" block disabled={props.loading}>
        Продолжить
      </Button>
    </Form>
  );
};

let RecoverForm = reduxForm({
  form: "reecoverPass",
})(Recover);

let ChangePass = (props) => {
  if (props.error) {
    Alert.error("Такого емейла не существует.", 4000);
    props.Clean()
  }
  if (props.succ) {
    
    Alert.success(
      "На вашу почту были высланы инструкции по восстановлению пароля.",
      5000
    );
    props.Clean();
  }
  let onSubmit = (fromdata) => {
    props.NewPass(fromdata);
  };

  return (
    <Fade>
      <div className={classes.formbox}>
        <div className={classes.form}>
          <h5 className={classes.formtitle}>Восстановление пароля</h5>
          <RecoverForm onSubmit={onSubmit} {...props.loading}></RecoverForm>
        </div>
      </div>
    </Fade>
  );
};
export default ChangePass;
