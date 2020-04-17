import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import {
  ProjectTextArea,
  ProjectInput,
  Upload
} from "../../commons/formsControls/formsControls";
import classes from "./Tasks.module.scss";
import { required } from "../../../untils/validators/validators";
import { Fade } from "react-reveal";
import { Form, Button, Message, Alert, Modal } from "rsuite";
import moment from "moment";

const TaskBox = props => {
  return (
    <Form onSubmit={props.handleSubmit} fluid>
      <Field
        component={ProjectInput}
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

      <Field
        type="file"
        component={Upload}
        name="document"
        validate={[required]}
      ></Field>

      <Button
        type="submit"
        className={classes.creabtn}
        disabled={
          props.loading ||
          props.Task.isDone === true ||
          props.Task.NotMy === true
        }
      >
        Отправить на проверку
      </Button>
    </Form>
  );
};

const TaskForm = reduxForm({
  form: "MyTasks"
})(TaskBox);

const Task = props => {
  const [show, setShow] = useState(false);

  let close = () => {
    setShow(false);
  };
  let open = () => {
    setShow(true);
  };

  //если начальник послал задание не тому сотруднику
  let NotMY = () => {
    let data = {
      //обязательный айди задания для where
      idMission: props.Task.idMission,
      //для определния не выполненности
      NotMy: true
    };
    props.SendTask(data);
    close();
  };
  let onSubmit = FormData => {
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
            <div className={classes.boxcenter}>
              <h3>{props.Task.NameMission}</h3>
              <p>{props.Task.Text}</p>
              <div className={classes.targetsbox}>
                {props.Task.SubTargets && (
                  <h4 className={classes.targetstitle}>Цели:</h4>
                )}
                {props.Task.SubTargets &&
                  props.Task.SubTargets.map((p, index) => (
                    <div key={index} className={classes.targets}>
                      {p}
                    </div>
                  ))}
              </div>
              <div className={classes.donwloadbox}>
                <Button href={props.LinkBoss} className={classes.donwload}>
                  Скачать
                </Button>
              </div>
              <div className={classes.datebox}>
                <p className={classes.datespace}>
                  Начать с {moment(props.Task.startdate).format("DD-MM-YYYY")}
                </p>
                <p className={classes.datespace}>
                  Завершение {moment(props.Task.enddate).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
            <TaskForm {...props} onSubmit={onSubmit}></TaskForm>
            <div className={classes.wrongblock}>
              <Button color="red" className={classes.wrong} onClick={open}>
                Это не ваше задание?
              </Button>

              <Modal backdrop="static" show={show} onHide={close} size="xs">
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
                  <Button onClick={close} appearance="subtle">
                    Отмена
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Task;
