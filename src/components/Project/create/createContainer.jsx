import { connect } from "react-redux";
import React from "react";
import Create from "./create";
import { CreateNewproject,CleanUp } from "../../../redux/projectReducer";

class dashBox extends React.Component {
 
  NewProject = formData => {
    
    this.props.CreateNewproject(formData);
  };
  Clean=()=>{
    this.props.CleanUp()
  }
  render() {
    return <Create {...this.props} NewProject={this.NewProject} Clean={this.Clean}></Create>;
  }
}

let mapStateToProps = state => {
  return {
    error:state.project.error,
    loading:state.project.loading,
  };
};

const CreateContainer = connect(mapStateToProps,{ CreateNewproject,CleanUp })(dashBox);

export default CreateContainer;
