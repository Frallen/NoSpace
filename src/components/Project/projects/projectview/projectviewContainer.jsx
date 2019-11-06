import React from "react";
import ProjView from "./projectview";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
class View extends React.Component {
  componentDidMount() {

  }
  render() {
    return <ProjView {...this.props}></ProjView>;
  }
}

let mapStateToProps = ({firestore,firebase}) => {
    return {



  };
};

export default compose(
  connect(
    mapStateToProps,
    {},
  )(View)
);
