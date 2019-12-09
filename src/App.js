import React, { useState } from "react";
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
import { compose } from "redux";
import TasksContainer from "./components/TasksPage/MyTasks/TasksContainer";
import TaskPageContainer from "./components/TasksPage/TaskPageContainer";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withRouter } from "react-router-dom";

const App = ({ loggedIn, emailVerified, location }) => {
  let routes;
  if (loggedIn && !emailVerified) {
    routes = (
      <Switch location={location}>
        <Route path={"/verification"} render={() => <Email></Email>}></Route>
        <Route path={"/logout"} render={() => <LogOut></LogOut>}></Route>
        <Redirect to={"/verification"}></Redirect>
      </Switch>
    );
  }
  //если есть айди пользовалеля то
  else if (loggedIn && emailVerified) {
    routes = (
      <Switch location={location}>
        <Route
          path={"/missions"}
          render={() => <ProjectsContainer></ProjectsContainer>}
        ></Route>
        <Route
          path={"/create"}
          render={() => <CreateContainer></CreateContainer>}
        ></Route>
        <Route
          path={"/mission/:id"}
          render={() => <ProjViewCont></ProjViewCont>}
        ></Route>
        <Route path={"/logout"} render={() => <LogOut></LogOut>}></Route>
        <Route
          path={"/settings"}
          render={() => <SettingsContainer></SettingsContainer>}
        ></Route>
        <Route
          path={"/Tasks"}
          render={() => <TaskPageContainer></TaskPageContainer>}
        ></Route>
        <Route
          path={"/Task/:id"}
          render={() => <TasksContainer></TasksContainer>}
        ></Route>
        <Redirect to={"/"}></Redirect>
      </Switch>
    );
  } else {
    routes = (
      <Switch location={location}>
        <Route
          path={"/login"}
          render={() => <LoginContainer></LoginContainer>}
        ></Route>
        <Route
          path={"/signup"}
          render={() => <SignupContainer></SignupContainer>}
        ></Route>
        <Route
          path={"/recover-password"}
          render={() => <RecoverContainer></RecoverContainer>}
        ></Route>
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

let mapStateToProps = ({ firebase, firestore }) => {
  return {
    loggedIn: firebase.auth.uid,
    emailVerified: firebase.auth.emailVerified
  };
};

export default compose(connect(mapStateToProps), withRouter)(App);
