import { useEffect } from "react";
import { connect } from "react-redux";
import { signOut } from "../../../redux/registrationReducer";

const Logout = (props) => {
  useEffect(() => {
    props.signOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default connect(null, { signOut })(Logout);
