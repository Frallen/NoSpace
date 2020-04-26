import { connect } from "react-redux";
import React from "react";
import EmailVer from "./email";
import { verifyEmail, Clean } from "./../../redux/registrationReducer";
import { useEffect } from "react";

let Emailbox = (props) => {
  useEffect(() => {
    props.Clean();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let EmailSend = () => {
    props.verifyEmail();
  };

  return <EmailVer {...props} EmailSend={EmailSend}></EmailVer>;
};

let mapStateToProps = (state) => {
  return {
    email: state.Regis.error,
    loading: state.Regis.loading,
  };
};

export default connect(mapStateToProps, { verifyEmail, Clean })(Emailbox);
