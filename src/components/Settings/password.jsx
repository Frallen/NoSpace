import React from "react";
import { reduxForm, Field } from "redux-form";
import { PasswordCheck, required } from "../../untils/validators/validators";
import { Form, Button } from "rsuite";
import { AllInput } from "../commons/formsControls/formsControls";
import classes from "./settings.module.scss";

const MinValue = PasswordCheck(8);

let Box = (props) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Field
        component={AllInput}
        type="password"
        text="Пароль"
        name="password"
        validate={[required, MinValue]}
      ></Field>
      <Button type="submit" block appearance="primary" disabled={props.loading}>
        Изменить пароль
      </Button>
    </Form>
  );
};

const PassForm = reduxForm({
  form: "Passw",
})(Box);

let Password = (props) => {
  let onSubmit = (formdata) => {
    props.Submit(formdata);
  };
  return (
    <div className={classes.secform}>
      <PassForm onSubmit={onSubmit} {...props}></PassForm>
    </div>
  );
};

export default Password;
