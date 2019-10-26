import React from "react";
import "./App.scss";
import { Route,Switch,Redirect } from "react-router-dom";
import NavigationContainer from "./components/Navigation/navigationContainer";
import HomePage from "./components/Homepage/home";
import LoginContainer from "./components/auth/login/loginContainer"
import SignupContainer from "./components/auth/signup/signupContainer";
import ProjectsContainer from "./components/Project/projects/ProjectsContainer";
import CreateContainer from "./components/Project/create/createContainer";
import {connect} from "react-redux"
const App = ({loggedIn}) => {
  console.log(loggedIn)
let routes;
//если есть айди пользовалеля то 
if(loggedIn){
  routes=(
    <Switch>
    <Route exact path={"/"} render={()=><HomePage></HomePage>}></Route>
    <Route path={"/projects"} render={()=><ProjectsContainer></ProjectsContainer>}></Route>
      <Route path={"/create"} render={()=><CreateContainer></CreateContainer>}></Route>
      <Redirect to={"/"}></Redirect>
      </Switch>
  )
}else{
  routes=(
    <Switch>  
     <Route path={"/login"} render={ ()=><LoginContainer></LoginContainer>}></Route>
      <Route path={"/signup"} render={ ()=><SignupContainer></SignupContainer>}></Route>
      <Redirect to={"/"}></Redirect>
      </Switch>
  )
}
  return (
    <div className="main">
      <NavigationContainer></NavigationContainer>
      <Route exact path={"/"} render={()=><HomePage></HomePage>}></Route>
     <div className="container">
    {routes}
</div>
   </div>
  );
};

let mapStateToProps=({firebase})=>{
 
  return{
    loggedIn:firebase.auth.uid ? true:null
  }
}

export default connect(mapStateToProps,)(App);
