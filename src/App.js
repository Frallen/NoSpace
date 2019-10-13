import React from "react";
import "./App.scss";
import { Route } from "react-router-dom";
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
      <HomePage></HomePage> 
     <div className="container">
      <Route path={"/login"} render={ ()=><LoginContainer></LoginContainer>}></Route>
      <Route path={"/signup"} render={ ()=><SignupContainer></SignupContainer>}></Route>
      <Route path={"/projects"} render={()=><ProjectsContainer></ProjectsContainer>}></Route>
      <Route path={"/create"} render={()=><CreateContainer></CreateContainer>}></Route>
      </div>
    </div>
  );
};

export default App;
