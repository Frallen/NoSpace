import { connect } from "react-redux";
import React from "react";
import EmailVer from "./email";
import { verifyEmail, Clean } from "./../../redux/registrationReducer";

class Emailbox extends React.Component {
  EmailSend = () => {
    this.props.verifyEmail();
  };
  componentDidMount() {
    this.props.Clean();
  }
  render() {
    return <EmailVer {...this.props} EmailSend={this.EmailSend}></EmailVer>;
  }
}

let mapStateToProps = state => {
  return {
    email: state.Regis.verifyemail.error,
    loading: state.Regis.verifyemail.loading
  };
};

export default connect(mapStateToProps, { verifyEmail, Clean })(Emailbox);
