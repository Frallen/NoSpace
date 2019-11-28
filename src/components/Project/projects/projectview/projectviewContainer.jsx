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

class View extends React.Component {
  //до того как компонента примонтирована закидываю айди в функцию
  constructor(props) {
    super(props);
    this.props.Clean();
    //беру айди из пропсов
    let id = this.props.match.params.id;
    //отправляю его в стейт
    this.props.GetProjData(id);
  }
  //обновление полей проекта
  Update = data => {
    this.props.UpdateProject(data);
  };
  //удаление проекта
  Delete = data => {
    this.props.DeleteProject(data);
    //простой редирект после удалением
    this.props.history.push('/')
  };
  
  render() {
    //потом копонента дожидается пропсов,а не отрисовывает сразу
    //если не сделать условие то компонента при первом ренеде окажется без пропсов
    if (this.props.initialValues && this.props.initialValues.NameMission) {
      return <ProjView {...this.props} Update={this.Update} Delete={this.Delete}/>;
    }
    return <Preloader></Preloader>; // or loading graphic
  }
}

let mapStateToProps = state => {
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
      startdate: state.project.OneProject.startdate,
      enddate: state.project.OneProject.enddate
    },
    error: state.settings.error,
    loading: state.settings.loading
  };
};

export default compose(
  connect(mapStateToProps, { GetProjData, Clean, UpdateProject,DeleteProject }),
  withRouter
)(View);
