import React from "react";
import TextField from "@material-ui/core/TextField";
import classes from "./formsControls.module.scss";
import { Select, InputLabel } from "@material-ui/core";
//кастомный инпут аутификации
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
//кастомный инпут для проектов
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
//кастомная текстареа
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
//кастомная дата
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
//кастомный вобор пользователей
export const SelectUser = ({ input, meta, children, ...props }) => {
  const HasError = meta.touched && meta.error;
  return (
    <div className={classes.combobox}>
      <InputLabel htmlFor="age-native-simple">Выберите сотрудника</InputLabel>
      <Select
        native
        {...input}
       
        className={classes.combo}
        inputProps={{
          id: "age-native-simple"
        }}
      >
        {children}
      </Select>
      {HasError && (
        <div className={classes.reqErrorProj}>{HasError && meta.error}</div>
      )}
    </div>
  );
};
