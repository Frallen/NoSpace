import React from "react";
import ProjView from "./projectview";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import {
  GetProjData,
  Clean,
  UpdateProject,
  DeleteProject,
} from "./../../../../redux/projectReducer";
import { Preloader } from "../../../../untils/preloader/preloader";
import { useEffect } from "react";

let View = (props) => {
  //до того как компонента примонтирована закидываю айди в функцию
  useEffect(() => {
    //беру айди из пропсов
    let id =props.match.params.id;
    //отправляю его в стейт
    props.GetProjData(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //обновление полей проекта
  let Update = (data) => {
    props.UpdateProject(data);
  };
  //удаление проекта
  let Delete = (data) => {
    props.DeleteProject(data);
    //простой редирект после удаления
  };

  //потом копонента дожидается пропсов,а не отрисовывает сразу
  //если не сделать условие то компонента при первом ренеде окажется без пропсов
  if (
    props.initialValues &&
    props.initialValues.NameMission &&
    props.initialValues.LinkBoss
  ) {
    return <ProjView {...props} Update={Update} Delete={Delete}></ProjView>;
  }
  return <Preloader></Preloader>; // or loading graphic
};

let mapStateToProps = (state) => {
  return {
    // initialValues это специальный конейнер для reduxForms чтобы подставить в поля
    initialValues: {
      //нужно для оновления и удаления
      idMission: state.project.OneProject.idMission,
      idOwner: state.project.OneProject.idOwner,
      //
      NameMission: state.project.OneProject.NameMission,
      Text: state.project.OneProject.Text,
      SubTargets: state.project.OneProject.SubTargets,
      ////ссылки для скачивания
      LinkBoss: state.project.LinkBoss,
      LinkWorker: state.project.LinkWorker,
      ////
      startdate: state.project.OneProject.startdate,
      enddate: state.project.OneProject.enddate,
      //данные о выполнении
      isDone: state.project.OneProject.isDone,
      MissionDoneTitle: state.project.OneProject.MissionDoneTitle,
      TextDone: state.project.OneProject.TextDone,
      //
      //Если отправили не тому сотруднику
      NotMy: state.project.OneProject.NotMy,
      //
    },
    error: state.settings.error,
    loading: state.settings.loading,
  };
};

export default compose(
  connect(mapStateToProps, {
    GetProjData,
    Clean,
    UpdateProject,
    DeleteProject,
  }),
  withRouter
)(View);
