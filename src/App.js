import React from "react";
import "./App.scss";
import { Route,Switch } from "react-router-dom";
import NavigationContainer from "./components/Navigation/navigationContainer";
import HomePage from "./components/Homepage/home";
import LoginContainer from "./components/auth/loginContainer"
import SignupContainer from "./components/auth/signupContainer";
import ProjectsContainer from "./components/Projects/ProjectsContainer";
import CreateContainer from "./components/Projects/create/createContainer";
const App = () => {
 //<HomePage></HomePage> 
  return (
    <div className="main">
      <NavigationContainer></NavigationContainer>
      <Route exact path={"/"} render={()=><HomePage></HomePage>}></Route>
     <div className="container">
       <Switch>
      <Route path={"/login"} render={ ()=><LoginContainer></LoginContainer>}></Route>
      <Route path={"/signup"} render={ ()=><SignupContainer></SignupContainer>}></Route>
      <Route path={"/projects"} render={()=><ProjectsContainer></ProjectsContainer>}></Route>
      <Route path={"/create"} render={()=><CreateContainer></CreateContainer>}></Route>
    </Switch>
      </div>
    </div>
  );
};

export default App;
