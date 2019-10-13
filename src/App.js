import React from "react";
import "./App.scss";
import { Route } from "react-router-dom";
import NavigationContainer from "./components/Navigation/navigationContainer";
import HomePage from "./components/Homepage/home";
import LoginContainer from "./components/auth/loginContainer"
import SignupContainer from "./components/auth/signupContainer";
import DashboardContainer from "./components/dashboard/dashboardContainer";
const App = () => {
 //<HomePage></HomePage> 
  return (
    <div className="main">
      <NavigationContainer></NavigationContainer>
     
      <Route path={"/login"} render={ ()=><LoginContainer></LoginContainer>}></Route>
      <Route path={"/signup"} render={ ()=><SignupContainer></SignupContainer>}></Route>
      <Route path={"/dashboard"} render={()=><DashboardContainer></DashboardContainer>}></Route>
    </div>
  );
};

export default App;
