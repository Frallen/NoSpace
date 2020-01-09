import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Preloader } from "../../../../../untils/preloader/preloader";
import { GetProjData } from "./../../../../../redux/projectReducer";
import OneOld from "./old";

class View extends React.Component {
  //как данные будут готовы то они вмонтируются в функцию
  componentDidMount(){
     //беру айди из пропсов
    let id = this.props.match.params.id;
    //отправляю его в стейт
    let to = "History";
    this.props.GetProjData(id,to);
  }

  render() {
    //потом копонента дожидается пропсов,а не отрисовывает сразу
    //если не сделать условие то компонента при первом ренеде окажется без пропсов
    if (this.props.HistoryItem && this.props.LinkBoss && this.props.LinkWorker) {
      return <OneOld {...this.props} />;
    }
    return <Preloader></Preloader>; // or loading graphic
  }
}

let mapStateToProps = state => {
  return {
    HistoryItem: state.project.OneProject,
    ////ссылки для скачивания
    LinkBoss: state.project.LinkBoss,
    LinkWorker: state.project.LinkWorker
    ////
  };
};

export default compose(
  connect(mapStateToProps, {
    GetProjData
  }),
  withRouter
)(View);
