import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Preloader } from "../../../../../untils/preloader/preloader";
import { GetProjData } from "./../../../../../redux/projectReducer";
import OneOld from "./old";

const View = (props) => {
  //беру айди из пропсов
  let id = props.match.params.id;
  //отправляю его в стейт
  let to = "History";
  useEffect(() => {
    props.GetProjData(id, to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //как данные будут готовы то они вмонтируются в функцию

  //потом копонента дожидается пропсов,а не отрисовывает сразу
  //если не сделать условие то компонента при первом ренеде окажется без пропсов
  if (props.HistoryItem.length !== 0) {
    if (props.HistoryItem.idOwner === props.sec) {
      return <OneOld {...props} />;
    }
  }
  return <Preloader></Preloader>;
};

let mapStateToProps = (state) => {
  return {
    HistoryItem: state.project.OneProject,
    sec: state.firebase.auth.uid,
    ////ссылки для скачивания
    LinkBoss: state.project.LinkBoss,
    LinkWorker: state.project.LinkWorker,
    ////
  };
};

export default compose(
  connect(mapStateToProps, {
    GetProjData,
  }),
  withRouter
)(View);
