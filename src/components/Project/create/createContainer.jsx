import React, { useEffect } from "react";
import { connect } from "react-redux";
import Create from "./create";
import {
  CreateNewproject,
  Clean,
  AllUsers
} from "../../../redux/projectReducer";

const DashBox = props => {
  useEffect(() => {
    props.Clean();
    props.AllUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let NewProject = formData => {
   props.CreateNewproject(formData);
  };

  if (props.initialValues) {
    return <Create {...props} NewProject={NewProject}></Create>;
  }
};

let mapStateToProps = state => {
  return {
    initialValues: {
      users: state.project.DataUsers
    },
    ID: state.firebase.auth.uid,
    error: state.project.error,
    loading: state.project.loading
  };
};

export default connect(mapStateToProps, {
  CreateNewproject,
  Clean,
  AllUsers
})(DashBox);
