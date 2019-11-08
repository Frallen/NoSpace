import React from "react";
import ProjView from "./projectview";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
class View extends React.Component {
  id = this.props.match.params.id;

  render() {
    return <ProjView {...this.props} id={this.id}></ProjView>;
  }
}

let mapStateToProps = ({ firestore, firebase }) => {
  return {
    userId: firebase.auth.uid,
    project: firestore.data.Projects
  };
};

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  withRouter,
  firestoreConnect(props => [`Projects/${props.userId}`])
)(View);
