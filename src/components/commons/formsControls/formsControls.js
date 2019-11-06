import React from "react";
import TextField from "@material-ui/core/TextField";
import classes from "./formsControls.module.scss";

export const authInput = ({ input, meta, ...props }) => {
  const HasError = meta.touched && meta.error;
  return (
    <div>
      <TextField {...input} {...props} className={classes.Input}></TextField>
      {HasError && (
        <div className={classes.reqError}>{HasError && meta.error}</div>
      )}
    </div>
  );
};

export const ProjectInput = ({ input, meta, ...props }) => {
  const HasError = meta.touched && meta.error;
  return (
    <div>
      <TextField {...input} {...props} className={classes.Input}></TextField>
      {HasError && (
        <div className={classes.reqErrorProj}>{HasError && meta.error}</div>
      )}
    </div>
  );
};

export const ProjectTextArea = ({ input, meta, ...props }) => {
  const HasError = meta.touched && meta.error;
  return (
    <div>
      <TextField
        multiline={true}
        {...input}
        {...props}
        className={classes.textarea}
      ></TextField>
      {HasError && (
        <div className={classes.reqErrorProj}>{HasError && meta.error}</div>
      )}
    </div>
  );
};

export const ProjectDate = ({ input, meta, ...props }) => {
  const HasError = meta.touched && meta.error;
  return (
    <div>
      <TextField
        {...input}
        {...props}
        id="date"
       
        type="date"
        InputLabelProps={{
          shrink: true
        }}
      ></TextField>
      {HasError && (
        <div className={classes.reqErrorProj}>{HasError && meta.error}</div>
      )}
    </div>
  );
};
