import React from "react";
import "./App.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import NavigationContainer from "./components/Navigation/navigationContainer";
import HomePage from "./components/Homepage/home";
import LoginContainer from "./components/auth/login/loginContainer";
import SignupContainer from "./components/auth/signup/signupContainer";
import ProjectsContainer from "./components/Project/projects/ProjectsContainer";
import CreateContainer from "./components/Project/create/createContainer";
import RecoverContainer from "./untils/RecoverPassword/recoverContainer"
import { connect } from "react-redux";
import LogOut from "./components/auth/LogOut/LogOut";
import Email from "./untils/EmailVerification/EmailContainer";

const App = ({ loggedIn, emailVerified }) => {
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
        <Route path={"/logout"} render={() => <LogOut></LogOut>}></Route>
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

let mapStateToProps = ({ firebase }) => {
  return {
    loggedIn: firebase.auth.uid,
    emailVerified: firebase.auth.emailVerified
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
