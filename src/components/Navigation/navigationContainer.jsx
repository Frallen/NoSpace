import React from "react";
import { connect } from "react-redux";
import Navigation from "./navigation";

class NavigationBox extends React.PureComponent {
  render() {
    return <Navigation {...this.props}></Navigation>;
  }
}

let mapStateToProps = ({ firebase }) => {
  return {
    loggedIn: firebase.auth.uid
  };
};

export default connect(mapStateToProps, null)(NavigationBox);
