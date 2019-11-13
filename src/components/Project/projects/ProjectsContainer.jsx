import React from "react";
import Projects from "./Projects";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect,withFirestore } from "react-redux-firebase";
class dashBox extends React.Component {
  render() {
    return <Projects {...this.props}></Projects>;
  }
}

let mapStateToProps = ({ firebase, firestore }) => {
  return {
    userId: firebase.auth.uid,
    projects: firestore.data.Projects,
    loading: firestore.status.requesting,
    fetched: firestore.status.requested
  };
};

export default compose(
  connect(mapStateToProps),
  withFirestore,
  //получение данных юзера
  firestoreConnect(props => [`Projects/${props.userId}`])
)(dashBox);
