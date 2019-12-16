import React from "react";
import TextField from "@material-ui/core/TextField";
import classes from "./formsControls.module.scss";
import { Select, Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
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
      <Select native {...input} className={classes.combo}>
        {children}
      </Select>
      {HasError && (
        <div className={classes.reqErrorProj}>{HasError && meta.error}</div>
      )}
    </div>
  );
};

export const Upload = ({ input, meta }) => {
  // delete input.value
  const HasError = meta.touched && meta.error;
  const resetKey = input.value && delete input.value;
  const { value, ...inputProps } = input;

  const handleChange = e => {
    input.onChange(e.target.files[0]);
  };

  return (
    <div className={classes.boxUload}>
      <input
        {...inputProps}
        key={resetKey}
        type="file"
        id="contained-button-file"
        className={classes.InputFile}
        onChange={handleChange}
        onBlur={() => {}}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="default"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Загрузить
        </Button>
      </label>
      {HasError && (
        <div className={classes.reqErrorProj}>{HasError && meta.error}</div>
      )}
    </div>
  );
};
