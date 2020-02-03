import React from "react";
import { connect } from "react-redux";
import { SignUpUsers, Clean } from "../../../redux/registrationReducer";
import SignUp from "./signUp";
import { useEffect } from "react";

const SignUpBox = props => {
  useEffect(() => {
    props.Clean();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  let NewUser = formdata => {
    props.SignUpUsers(formdata);
  };

  return <SignUp {...props} NewUser={NewUser}></SignUp>;
};

let mapStateToProps = state => {
  return {
    loading: state.Regis.loading,
    error: state.Regis.error
  };
};

export default connect(mapStateToProps, { SignUpUsers, Clean })(SignUpBox);
