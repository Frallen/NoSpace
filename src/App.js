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
import { compose } from "redux";
import TasksContainer from "./components/TasksPage/DoTask/TasksContainer";
import TaskPageContainer from "./components/TasksPage/TaskPageContainer";
import { withRouter } from "react-router-dom";
import HistoryContainer from "./components/Project/projects/history/historyContainer";
import OldContainer from "./components/Project/projects/history/old/oldContainer";

const App = ({ loggedIn, emailVerified, location }) => {
  let routes;
  if (loggedIn && !emailVerified) {
    routes = (
      <Switch>
        <Route path="/verification">
          <Email></Email>
        </Route>
        <Route path="/logout">
          <LogOut></LogOut>
        </Route>
        <Redirect to="/verification"></Redirect>
      </Switch>
    );
  }
  //если есть айди пользовалеля то
  else if (loggedIn && emailVerified) {
    routes = (
      <Switch>
        <Route path="/create">
          <CreateContainer></CreateContainer>
        </Route>
        <Route path="/missions">
          <ProjectsContainer></ProjectsContainer>
        </Route>
        <Route path="/mission/:id">
          <ProjViewCont></ProjViewCont>
        </Route>
        <Route path="/logout">
          <LogOut></LogOut>
        </Route>
        <Route path="/settings">
          <SettingsContainer></SettingsContainer>
        </Route>
        <Route path="/Tasks">
          <TaskPageContainer></TaskPageContainer>
        </Route>
        <Route path="/Task/:id">
          <TasksContainer></TasksContainer>
        </Route>
        <Route path="/history/">
          <HistoryContainer></HistoryContainer>
        </Route>
        <Route path="/old/:id">
          <OldContainer></OldContainer>
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login">
          <LoginContainer></LoginContainer>
        </Route>
        <Route path="/signup">
          <SignupContainer></SignupContainer>
        </Route>
        <Route path="/recover-password">
          <RecoverContainer></RecoverContainer>
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );
  }
  return (
    <div className="main">
      <NavigationContainer></NavigationContainer>
      <Route exact path="/">
        <HomePage></HomePage>
      </Route>
      <div className="container">{routes}</div>
    </div>
  );
};

let mapStateToProps = ({ firebase }) => {
  return {
    loggedIn: firebase.auth.uid,
    emailVerified: firebase.auth.emailVerified,
  };
};

export default compose(connect(mapStateToProps, null), withRouter)(App);
