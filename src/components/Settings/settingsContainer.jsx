import React from "react";
import { connect } from "react-redux";
import { Clean, ChangeProfile, Delete } from "./../../redux/settingsReducer";
import Settings from "./settings";
import { Preloader } from "../../untils/preloader/preloader";

class SettBox extends React.Component {
  componentDidMount() {
    this.props.Clean();
  }

  NewSett = data => {
    this.props.ChangeProfile(data);
  };
  Delete = () => {
    this.props.Delete();
  };
  render() {
    if (this.props.initialValues && this.props.initialValues.FIO) {
      return (
        <Settings
          {...this.props}
          NewSett={this.NewSett}
          Delete={this.Delete}
        ></Settings>
      );
    }
    return <Preloader></Preloader>
  }
}
let mapStateToProps = state => {
  return {
    initialValues: {
      FIO: state.firebase.profile.FIO,
      username: state.firebase.profile.username,
      email: state.firebase.auth.email
    },
    error: state.settings.error,
    loading: state.settings.loading
  };
};

export default connect(mapStateToProps, { Clean, ChangeProfile, Delete })(
  SettBox
);
