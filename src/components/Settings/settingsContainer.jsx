import React from "react";
import { connect } from "react-redux";
import { Clean, ChangeProfile, Delete } from "./../../redux/settingsReducer";
import Settings from "./settings";
import { Preloader } from "../../untils/preloader/preloader";
import { useEffect } from "react";

const SettBox = props => {
  useEffect(() => {
    props.Clean();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let CleanAfter = () => {
    props.Clean();
  };

  let NewSett = data => {
    props.ChangeProfile(data);
  };
  let Delete = () => {
    props.Delete();
  };

  //копонента дожидается пропсов,а не отрисовывает сразу
  //если не сделать условие то компонента при первом ренеде окажется без пропсов
  if (props.initialValues && props.initialValues.FIO) {
    return (
      <Settings
        {...props}
        NewSett={NewSett}
        Delete={Delete}
        CleanAfter={CleanAfter}
      ></Settings>
    );
  } else {
    return <Preloader></Preloader>;
  }
};
let mapStateToProps = state => {
  return {
    // initialValues это специальный конейнер для reduxForms чтобы подставить в поля
    initialValues: {
      FIO: state.firebase.profile.FIO,
      email: state.firebase.auth.email
    },
    error: state.settings.error,
    loading: state.settings.loading,
    suc: state.settings.suc
  };
};

export default connect(mapStateToProps, { Clean, ChangeProfile, Delete })(
  SettBox
);
