import { connect } from "react-redux";
import React from "react";
import Create from "./create";
import { CreateNewproject } from "../../../redux/projectReducer";

class dashBox extends React.Component {
  componentDidMount() {}
  NewProject = formData => {
    debugger;
    this.props.CreateNewproject(formData);
  };

  render() {
    return <Create {...this.props} NewProject={this.NewProject}></Create>;
  }
}

let mapStateToProps = state => {
  return {};
};

const CreateContainer = connect(mapStateToProps,{ CreateNewproject })(dashBox);

export default CreateContainer;
