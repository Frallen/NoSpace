import React from "react";
import { connect } from "react-redux";
import { RecoverPass, Clean } from "./../../../redux/registrationReducer";
import ChangePass from "./recover";
import { useEffect } from "react";

const RecBox = props => {
  useEffect(() => {
    props.Clean();
  },[props]);
  
  let NewPass = data => {
    props.RecoverPass(data);
  };

  let Clean=()=>{
    props.Clean()
  }

  return <ChangePass {...props} NewPass={NewPass} Clean={Clean}></ChangePass>;
};

let mapStateToProps = state => {
  return {
    error: state.Regis.error,
    loading: state.Regis.loading,
    succ: state.Regis.succ
  };
};

export default connect(mapStateToProps, { RecoverPass, Clean })(RecBox);
