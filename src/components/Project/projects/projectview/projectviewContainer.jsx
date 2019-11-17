import React from "react";
import ProjView from "./projectview";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { GetProjData } from "./../../../../redux/projectReducer";

class View extends React.Component {
  componentDidMount() {
    //беру айди из пропсов
    let id = this.props.match.params.id;
    //отправляю его в стейт
    this.props.GetProjData(id);
  }

  render() {
    return <ProjView {...this.props}></ProjView>;
  }
}

let mapStateToProps = state => {
  return {
    initialValues:{
      NameProj:state.project.OneProject.NameProj,
      Text:state.project.OneProject.Text,
      target:state.project.OneProject.target,
      startdate:state.project.OneProject.startdate,
      enddate:state.project.OneProject.enddate,
    }
  };
};

export default compose(
  connect(mapStateToProps, { GetProjData }),
  withRouter
)(View);
