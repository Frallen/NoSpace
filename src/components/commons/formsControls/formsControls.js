import React from "react";
import classes from "./formsControls.module.scss";
import {
  FormGroup,
  SelectPicker,
  FormControl,
  DatePicker,
  ControlLabel,
  Toggle
} from "rsuite";
import { Button } from "@material-ui/core";

//согласие на обработку данных
export const Checker = ({ input, meta, ...props }) => {
  return (
    <FormGroup>
      <ControlLabel>Соглашение</ControlLabel>
      <div className={classes.Rules}>
        <FormControl
          accepter={Toggle}
          {...props}
          {...input}
          errorMessage={input.value===false ? "Это обязательное поле" : null}
        ></FormControl>
        <p className={classes.RulesText}>Я согласен на обработку данных</p>
      </div>
    </FormGroup>
  );
};

//общий инпут для всех
export const AllInput = ({ input, meta, text, ...props }) => {
  const HasError = meta.touched && meta.error;

  return (
    <FormGroup>
      <ControlLabel>{text}</ControlLabel>
      <FormControl
        errorMessage={HasError ? meta.error : null}
        {...input}
        {...props}
        className={classes.Input}
      />
    </FormGroup>
  );
};

//кастомная текстареа
export const ProjectTextArea = ({ input, meta, text, ...props }) => {
  const HasError = meta.touched && meta.error;
  return (
    <FormGroup>
      <ControlLabel>{text}</ControlLabel>
      <FormControl
        errorMessage={HasError && meta.error}
        {...input}
        {...props}
        rows={5}
        name="textarea"
        componentClass="textarea"
      ></FormControl>
    </FormGroup>
  );
};
//кастомная дата
export const ProjectDate = ({ input, meta, text, ...props }) => {
  const HasError = meta.touched && meta.error;
  return (
    <FormGroup>
      <ControlLabel>{text}</ControlLabel>
      <FormControl
        name="datePicker"
        oneTap
        block
        format="DD-MM-YYYY"
        accepter={DatePicker}
        errorMessage={HasError && meta.error}
        {...input}
        {...props}
      ></FormControl>
    </FormGroup>
  );
};
//кастомный выбор пользователей
export const SelectUser = ({ input, meta, data, text, ...props }) => {
  const HasError = meta.touched && meta.error;
  return (
    <FormGroup>
      <ControlLabel>{text}</ControlLabel>
      <FormControl
        className={classes.combo}
        name="selectPicker"
        errorMessage={HasError ? meta.error : null}
        accepter={SelectPicker}
        {...input}
        {...props}
        data={data}
      ></FormControl>
    </FormGroup>
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
  /*<Uploader {...inputProps}
  key={resetKey} action={handleChange}></Uploader>
*/
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
        <Button variant="contained" color="default" component="span">
          Загрузить
        </Button>
      </label>
      {HasError && (
        <div className={classes.reqErrorProj}>{HasError && meta.error}</div>
      )}
    </div>
  );
};
