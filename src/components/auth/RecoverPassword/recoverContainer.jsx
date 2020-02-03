import React from "react";
import { connect } from "react-redux";
import { RecoverPass, Clean } from "./../../../redux/registrationReducer";
import ChangePass from "./changePass";
import { useEffect } from "react";
const RecBox = props => {
  useEffect(() => {
    props.Clean();
  },[props]);
  
  let NewPass = data => {
    props.RecoverPass(data);
  };


  return <ChangePass {...props} NewPass={NewPass}></ChangePass>;
};

let mapStateToProps = state => {
  return {
    error: state.Regis.error,
    loading: state.Regis.loading
  };
};

export default connect(mapStateToProps, { RecoverPass, Clean })(RecBox);
