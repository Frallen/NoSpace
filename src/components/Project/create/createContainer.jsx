import { connect } from "react-redux";
import React from "react";
import Create from "./create";
import { CreateNewproject, Clean } from "../../../redux/projectReducer";

class dashBox extends React.Component {
  NewProject = formData => {
    this.props.CreateNewproject(formData);
  };
  componentDidMount() {
    this.props.Clean();
  }

  render() {
    return (
      <Create
        {...this.props}
        NewProject={this.NewProject}
      ></Create>
    );
  }
}

let mapStateToProps = state => {
  return {
    error: state.project.error,
    loading: state.project.loading
  };
};

const CreateContainer = connect(mapStateToProps, { CreateNewproject, Clean })(
  dashBox
);

export default CreateContainer;
