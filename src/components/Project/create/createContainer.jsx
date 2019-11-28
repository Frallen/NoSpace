import { connect } from "react-redux";
import React from "react";
import Create from "./create";
import {
  CreateNewproject,
  Clean,
  AllUsers
} from "../../../redux/projectReducer";

class dashBox extends React.Component {
  constructor(props) {
    super(props);
    this.props.AllUsers();
  }
  NewProject = formData => {
    this.props.CreateNewproject(formData);
  };
  componentDidMount() {
    this.props.Clean();
  }

  render() {
    if (this.props.initialValues) {
      return <Create {...this.props} NewProject={this.NewProject}></Create>;
    }
  }
}

let mapStateToProps = state => {
  return {
    initialValues: {
      users: state.project.DataUsers
    },
    error: state.project.error,
    loading: state.project.loading
  };
};

const CreateContainer = connect(mapStateToProps, {
  CreateNewproject,
  Clean,
  AllUsers
})(dashBox);

export default CreateContainer;
