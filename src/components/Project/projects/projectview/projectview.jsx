import React, { useState } from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import { required } from "../../../../untils/validators/validators";
import {
  ProjectDate,
  ProjectTextArea,
  ProjectInput,
  Upload
} from "../../../commons/formsControls/formsControls";
import classes from "./projectView.module.scss";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";
import { Fade } from "react-reveal";
import { useHistory } from "react-router-dom";
import { Form, Alert, Modal, Button, Message } from "rsuite";

//для вставки массива целей
const AddSubTargets = ({ fields, meta: { error } }) => (
  <ul>
    {fields.map((hobby, index) => (
      <li key={index} className={classes.targetSpace}>
        <Field
          name={hobby}
          type="text"
          component={ProjectTextArea}
          text={`Цель #${index + 1}`}
          validate={[required]}
        />
        <Button
          type="button"
          text="Удалить цель"
          className={classes.deletetarget}
          onClick={() => fields.remove(index)}
        >
          Удалить цель
        </Button>
      </li>
    ))}
    <li className={classes.boxbutton}>
      <Button type="button" onClick={() => fields.push()}>
        Добавить цель
      </Button>
    </li>
    {error && <li className="error">{error}</li>}
  </ul>
);

const ProjBox = props => {
  return (
    <Form
      fluid
      onSubmit={props.handleSubmit}
      initialvalues={{
        NameMission: props.initialValues.NameMission,
        Text: props.initialValues.Text,
        SubTargets: props.initialValues.SubTargets,
        startdate: props.initialValues.startdate,
        enddate: props.initialValues.enddate
      }}
    >
      <Field
        component={ProjectInput}
        type="text"
        name="NameMission"
        text="Название поручения"
        validate={[required]}
      />

      <Field
        component={ProjectTextArea}
        text="Описание"
        name="Text"
        validate={[required]}
      />

      <FieldArray name="SubTargets" component={AddSubTargets} />

      <Field type="file" component={Upload} name="document"></Field>

      <div className={classes.datebox}>
        <Field
          component={ProjectDate}
          text="Начать с"
          name="startdate"
          validate={[required]}
        />

        <Field
          component={ProjectDate}
          text="Сдать до"
          name="enddate"
          validate={[required]}
        />
      </div>
      <Button
        type="submit"
        disabled={props.loading || props.initialValues.NotMy === true}
      >
        Сохранить данные
      </Button>
    </Form>
  );
};

const ChangeForm = reduxForm({
  form: "ChangeForm"
})(ProjBox);

const ProjView = props => {
  //чекбокс
  //Состояние чекбоскса чекед/нечекед
  const [state, setState, showForm] = useState({
    checkedA: false
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  ////////////////

  //вызываю историю роутинка из react-router дом
  const history = useHistory();
  //удаление поручения
  let tryDelete = data => {
    let get = {
      id: props.initialValues.idMission,
      tohistory: data
    };
    props.Delete(get);
    //после передачи данных для удаления возращаюсь на предыдущую страницу (missions)
    history.goBack();
    close()
  };

  // let message = "Для выполнения этой операции нужно выполнить повторный вход в систему";

  const [show, setShow] = useState(false);

  let close = () => {
    setShow(false);
  };
  let open = () => {
    setShow(true);
  };

  if (props.error) {
    Alert.error(props.error);
  }

  let onSubmitMain = FormData => {
    FormData.startdate = moment(FormData.startdate).format();
    FormData.enddate = moment(FormData.enddate).format();
    //добавляю айди проекта и айди создателя
    FormData.id = props.initialValues.idMission;
    FormData.idOwner = props.initialValues.idOwner;
    //при обновлении изменять статус задачи
    FormData.isDone = false;
    //удаляю мусор undefined тк выдает ошибку,поле с undefined не может быть обновленно
    delete FormData.LinkBoss;
    delete FormData.LinkWorker;
    delete FormData.TextDone;
    delete FormData.MissionDoneTitle;
    if (!FormData.SubTargets) {
      delete FormData.SubTargets;
    }
    if (FormData.NotMy === undefined) {
      delete FormData.NotMy;
    }
    ///
    props.Update(FormData);
  };

  return (
    <div>
      {props.initialValues.NotMy === true && (
        <Fade>
          <div className={classes.BoxIsDone}>
            <Message
              showIcon
              type="error"
              description="   Вы отправили задание не тому сотруднику,перепроверьте данные,
              удалите данное задание и создайте новое."
            />
          </div>
        </Fade>
      )}
      {props.initialValues.isDone === true && (
        <Fade>
          <div className={classes.BoxIsDone}>
            <Message
              showIcon
              type="success"
              description="Задание выполненно, проверьте отчет."
            />
          </div>
          <div className={classes.done}>
            <div className={classes.createbox}>
              <div className={classes.boxcenter}>
                <h3 className={classes.NameMission}>
                  Заголовок отчета: {props.initialValues.MissionDoneTitle}
                </h3>
                <p className={classes.Text}>
                  Текст отчета:
                  {props.initialValues.TextDone && props.initialValues.TextDone}
                </p>
                <div className={classes.donwloadbox}>
                  <Button href={props.initialValues.LinkWorker}>
                    Скачать отчет
                  </Button>
                </div>
                <Button
                  color="green"
                  className={classes.succbutton}
                  onClick={open}
                >
                  Подтвердить выполнение
                </Button>
                <Modal backdrop="static" show={show} onHide={close} size="xs">
                  <Modal.Header>
                    <Modal.Title>Валидация задания</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Вы уверенны в правильности выполненного задания?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => {
                        tryDelete(true);
                      }}
                      appearance="primary"
                    >
                      Подтвердить
                    </Button>
                    <Button onClick={close} appearance="subtle">
                      Отмена
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </Fade>
      )}
      <Fade>
        <div className={classes.create}>
          <FormControlLabel
            className={classes.Regactive}
            control={
              <Checkbox
                className={classes.adaptRegactive}
                checked={state.checkedA}
                onChange={handleChange("checkedA")}
                value="checkedA"
              />
            }
            label="Режим редактирования"
          />
          {state.checkedA ? (
            <div className={classes.createbox}>
              <Fade when={showForm}>
                <ChangeForm onSubmit={onSubmitMain} {...props}></ChangeForm>
              </Fade>
              <div className={classes.dangerbutton}>
                <Button color="red" onClick={open}>
                  Удалить поручение
                </Button>
              </div>
              <Modal backdrop="static" show={show} onHide={close} size="xs">
                <Modal.Header>
                  <Modal.Title>Удаление поручения</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Ваш проект будет удален, вы действительно хотите удалить
                  поручение?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={() => {
                      tryDelete(false);
                    }}
                    appearance="primary"
                  >
                    Подтвердить
                  </Button>
                  <Button onClick={close} appearance="subtle">
                    Отмена
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          ) : (
            <div className={classes.createbox}>
              <div className={classes.boxcenter}>
                <h3 className={classes.NameMission}>
                  Название поручения: {props.initialValues.NameMission}
                </h3>
                <p className={classes.Text}>{props.initialValues.Text}</p>
                <div className={classes.targetsbox}>
                  {props.initialValues.SubTargets && (
                    <h4 className={classes.targetstitle}>Цели:</h4>
                  )}
                  {props.initialValues.SubTargets &&
                    props.initialValues.SubTargets.map((p, index) => (
                      <div key={index} className={classes.targets}>
                        {p}
                      </div>
                    ))}
                </div>
              </div>

              <div className={classes.datebox}>
                <p className={classes.datespace}>
                  Старт
                  {moment(props.initialValues.startdate).format("DD-MM-YYYY")}
                </p>
                <p className={classes.datespace}>
                  Завершение
                  {moment(props.initialValues.enddate).format("DD-MM-YYYY")}
                </p>
              </div>

              <div className={classes.donwloadbox}>
                <Button
                  href={props.initialValues.LinkBoss}
                  className={classes.donwload}>
                  Скачать поручение
                </Button>
              </div>
            </div>
          )}
        </div>
      </Fade>
    </div>
  );
};

export default ProjView;
