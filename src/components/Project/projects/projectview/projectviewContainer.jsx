import React from "react";
import ProjView from "./projectview";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import {GetProjData} from "./../../../../redux/projectReducer"

class View extends React.Component {
  componentDidMount(){
    //беру айди из пропсов
   let id=this.props.match.params.id
   //отправляю его в стейт
    this.props.GetProjData(id);

  }
  
  render() {
    return <ProjView {...this.props}></ProjView>;
  }
}

let mapStateToProps = ({ firestore, firebase },) => {
  return {
    userId: firebase.auth.uid,
    users:firestore.data.users,
  };
};

export default compose(
  connect(
    mapStateToProps,
    {GetProjData}
  ),
  withRouter,
  firestoreConnect(props => [`users/${props.userId}/Projects`])
)(View);
