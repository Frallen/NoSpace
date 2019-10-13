import React from "react";
import classes from "./create.module.scss";
import { Field, reduxForm } from "redux-form";

const CreateBox = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="ProjectName"></label>
        <Field component="input"
          type="text"
          name={"Name"}
          className={classes.projinput}
        />
      </div>
      <div>
        <label htmlFor="ProjectText"></label>
        <Field component="textarea"
          name={"Text"}
          className={classes.projinput}
        />
      </div>
      <div>
        <label htmlFor="ProjectTarget"></label>
        <Field component="input"
          type="text"
          name={"target"}
          className={classes.projinput}
        />
      </div>
      <button className={classes.creabtn}>Создать проект</button>
    </form>
  );
};

const CreateForm=reduxForm({
  form:"createForm"
})(CreateBox)

const Create=()=>{
  let onSubmit=(formData)=>{
    console.log(formData)
  }
  return(
    <div className={classes.createbox}>
      <CreateForm onSubmit={onSubmit}></CreateForm>
    </div>
  )
}

export default Create;
