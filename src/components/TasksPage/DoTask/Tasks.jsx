import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import {
  ProjectTextArea,
  AllInput,
  Upload,
} from "../../commons/formsControls/formsControls";
import classes from "./Tasks.module.scss";
import classesAll from "./../../Project/projects/projectview/projectView.module.scss"
import { required } from "../../../untils/validators/validators";
import { Fade } from "react-reveal";
import { Form, Button, Message, Alert, Modal } from "rsuite";
import moment from "moment";

const TaskBox = (props) => {
  return (
    <Form onSubmit={props.handleSubmit} fluid>
      <Field
        component={AllInput}
        text="Заголовок ответа"
        type="text"
        name="MissionDoneTitle"
        validate={[required]}
      />

      <Field
        component={ProjectTextArea}
        text="Дополнение"
        name="TextDone"
        validate={[required]}
      />
      <div className={classes.donwbtn}>
        <Field
          type="file"
          component={Upload}
          name="document"
          validate={[required]}
        ></Field>
      </div>
      <Button
        type="submit"
        className={classes.creabtn}
        block
        appearance="primary"
        disabled={props.loading || props.Task.isDone || props.Task.NotMy}
      >
        Отправить на проверку
      </Button>
    </Form>
  );
};

const TaskForm = reduxForm({
  form: "MyTasks",
})(TaskBox);

const Task = (props) => {
  const [show, setShow] = useState(false);

  //если начальник послал задание не тому сотруднику
  let NotMY = () => {
    let data = {
      //обязательный айди задания для where
      idMission: props.Task.idMission,
      //для определния не выполненности
      NotMy: true,
    };
    props.SendTask(data);
    setShow(false);
    //setErr(true);
    Alert.warning("Уведомление отправлено");
  };
  let onSubmit = (FormData) => {
    FormData.isDone = true;
    FormData.idMission = props.Task.idMission;
    props.SendTask(FormData);

    Alert.success("Отчет отправлен");
  };

  if (props.error) {
    Alert.error("Произошла непредвиденная ошибка");
  }

  return (
    <div>
      {props.Task.isDone && (
        <Fade>
          <div className={classes.BoxIsDone}>
            <Message
              showIcon
              type="success"
              description="Задание на проверке"
            />
          </div>
        </Fade>
      )}
      {props.Task.NotMy && (
        <Fade>
          <div className={classes.BoxIsDone}>
            <Message
              type="warning"
              description="Вы уведомили начальнство, о ошибочной отправке"
            />
          </div>
        </Fade>
      )}

      <Fade>
        <div className={classes.create}>
          <div className={classes.createbox}>
            <div className={classes.wrongblock}>
              <Button
                color="red"
                className={classes.wrong}
                onClick={() => setShow(true)}
              >
                Это не ваше задание?
              </Button>

              <Modal
                backdrop="static"
                show={show}
                onHide={() => setShow(false)}
                size="xs"
              >
                <Modal.Header>
                  <Modal.Title>Ошибка начальства</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Вы уверенны что это задание предназначено не вам?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={() => {
                      NotMY();
                    }}
                    appearance="primary"
                    disabled={props.Task.isDone === true}
                  >
                    Подтвердить
                  </Button>
                  <Button onClick={() => setShow(false)} appearance="subtle">
                    Отмена
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className={classes.boxcenter}>
              <h3>{props.Task.NameMission}</h3>
              <p>
                <span className={classesAll.textStart}>От кого </span> -
                {props.Task.OwnName}
              </p>
              <p>
                <span className={classesAll.textStart}>Текст поручения</span> :
                {props.Task.Text}
              </p>
              {props.Task.SubTargets && (
                <div className={classes.targetsbox}>
                  <h4 className={classes.targetstitle}>Цели:</h4>
                  {props.Task.SubTargets.map((p, index) => (
                    <div key={index} className={classes.targets}>
                      {p}
                    </div>
                  ))}
                </div>
              )}
              <div className={classes.donwloadbox}>
                <Button href={props.LinkBoss} className={classes.donwload}>
                  Скачать
                </Button>
              </div>
              <div className={classes.datebox}>
                <p className={classes.datespace}>
                  <span className={classesAll.textStart}> Старт </span> -
                  {moment(props.Task.startdate).format("DD-MM-YYYY")}
                </p>
                <p className={classes.datespace}>
                  <span className={classesAll.textStart}> Завершение </span> -
                  {moment(props.Task.enddate).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
            <TaskForm {...props} onSubmit={onSubmit}></TaskForm>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Task;
