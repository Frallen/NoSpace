import React from "react";
import ProjView from "./projectview";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { GetProjData, Clean } from "./../../../../redux/projectReducer";
import { Preloader } from "../../../../untils/preloader/preloader";

class View extends React.Component {
 constructor(props) {
    super(props);
    this.props.Clean()
    //беру айди из пропсов
    let id = this.props.match.params.id;
    //отправляю его в стейт
    this.props.GetProjData(id);
  }

  render() {
    if (this.props.initialValues && this.props.initialValues.NameProj) {
      return <ProjView {...this.props} />;
    }
    return <Preloader></Preloader>; // or loading graphic
  }
}

let mapStateToProps = state => {
  return {
    initialValues: {
      NameProj: state.project.OneProject.NameProj,
      Text: state.project.OneProject.Text,
      target: state.project.OneProject.target,
      startdate: state.project.OneProject.startdate,
      enddate: state.project.OneProject.enddate
    },
    error: state.settings.error,
    loading: state.settings.loading
  };
};

export default compose(
  connect(mapStateToProps, { GetProjData, Clean }),
  withRouter
)(View);
