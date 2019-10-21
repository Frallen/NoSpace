import { connect } from "react-redux";
import React from "react";
import Projects from "./Projects";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
class dashBox extends React.Component {
  componentDidMount() {}

  render() {
    return <Projects {...this.props}></Projects>;
  }
}

let mapStateToProps = state => {
    return {
    Projects: state.project.Propjects,
   // firestore:state.firestore.ordered.projects
  };
};

export default compose(
  connect(mapStateToProps),
 // firestoreConnect([{ collection: "Projects" }])
)(dashBox);
