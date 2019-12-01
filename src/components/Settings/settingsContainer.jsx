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
    //копонента дожидается пропсов,а не отрисовывает сразу
     //если не сделать условие то компонента при первом ренеде окажется без пропсов
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
    // initialValues это специальный конейнер для reduxForms чтобы подставить в поля
    initialValues: {
      FIO: state.firebase.profile.FIO,
      email: state.firebase.auth.email
    },
    error: state.settings.error,
    loading: state.settings.loading
  };
};

export default connect(mapStateToProps, { Clean, ChangeProfile, Delete })(
  SettBox
);
