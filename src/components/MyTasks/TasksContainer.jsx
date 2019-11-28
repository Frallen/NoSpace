import React from "react";
import { connect } from "react-redux";
import Task from "./Tasks";

class TaksBox extends React.Component {
  
  render() {
    return <Task {...this.props}></Task>;
  }
}

let mapStateToProps = state => {
  return {

  };
};

export default connect(mapStateToProps, {})(TaksBox);
