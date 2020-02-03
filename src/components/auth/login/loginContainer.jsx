import React from "react";
import { connect } from "react-redux";
import Login from "./login";
import { LogInUser, Clean } from "./../../../redux/registrationReducer";
import { useEffect } from "react";

const AuthBox = props => {
  useEffect(() => {
    props.Clean();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  let Userlogin = data => {
   props.LogInUser(data);
  };

  return <Login {...props} Userlogin={Userlogin}></Login>;
};

let mapStateToProps = state => {
  return {
    loading: state.Regis.loading,
    error: state.Regis.error
  };
};

export default connect(mapStateToProps, { LogInUser, Clean })(AuthBox);
