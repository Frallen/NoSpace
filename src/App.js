import React from "react";
import "./App.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import NavigationContainer from "./components/Navigation/navigationContainer";
import HomePage from "./components/Homepage/home";
import LoginContainer from "./components/auth/login/loginContainer";
import SignupContainer from "./components/auth/signup/signupContainer";
import ProjectsContainer from "./components/Project/projects/ProjectsContainer";
import CreateContainer from "./components/Project/create/createContainer";
import { connect } from "react-redux";
import LogOut from "./components/auth/LogOut/LogOut";
import Email from "./untils/EmailVerification/EmailContainer";
import RecoverContainer from "./components/auth/RecoverPassword/recoverContainer";
import SettingsContainer from "./components/Settings/settingsContainer";
import ProjViewCont from "./components/Project/projects/projectview/projectviewContainer";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const App = ({ loggedIn, emailVerified,project }) => {
  let routes;
  if (loggedIn && !emailVerified) {
    routes = (
      <Switch>
        <Route path={"/verification"} render={() => <Email></Email>}></Route>
        <Route path={"/logout"} render={() => <LogOut></LogOut>}></Route>
        <Redirect to={"/verification"}></Redirect>  
      </Switch>
    );
  }
  //если есть айди пользовалеля то
  else if (loggedIn && emailVerified) {
    routes = (
      <Switch>
        <Route
          path={"/projects"}
          render={() => <ProjectsContainer></ProjectsContainer>}
        ></Route>
        <Route
          path={"/create"}
          render={() => <CreateContainer></CreateContainer>}
        ></Route>
        <Route path={`/project/:${project}`} render={()=><ProjViewCont></ProjViewCont>}></Route>
        <Route path={"/logout"} render={() => <LogOut></LogOut>}></Route>
        <Route path={"/settings"} render={()=><SettingsContainer></SettingsContainer>}></Route>
        <Redirect to={"/"}></Redirect>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route
          path={"/login"}
          render={() => <LoginContainer></LoginContainer>}
        ></Route>
        <Route
          path={"/signup"}
          render={() => <SignupContainer></SignupContainer>}
        ></Route>
        <Route path={"/recover-password"} render={()=><RecoverContainer></RecoverContainer>}></Route>
        <Redirect to={"/"}></Redirect>
      </Switch>
    );
  }
  return (
    <div className="main">
      <NavigationContainer></NavigationContainer>
      <Route exact path={"/"} render={() => <HomePage></HomePage>}></Route>
      <div className="container">{routes}</div>
    </div>
  );
};

let mapStateToProps = ({ firebase,firestore }) => {
  return {
    loggedIn: firebase.auth.uid,
    emailVerified: firebase.auth.emailVerified,
    projects:firestore.data.Projects,
  };
};


export default compose(
  connect(mapStateToProps),
  //получение данных юзера
  firestoreConnect(props => [`App/${props.loggedIn}`])
)(App);