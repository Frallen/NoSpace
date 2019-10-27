import { connect } from "react-redux";
import React from "react";
import Projects from "./Projects";
import { compose } from "redux";
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
 // firestoreConnect(["Projects"]),
  connect(mapStateToProps),
 
)(dashBox);
