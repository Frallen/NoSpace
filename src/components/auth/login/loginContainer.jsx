import React from "react";
import { connect } from "react-redux";
import Login from "./login";
import {LogInUser,Clean} from "./../../../redux/registrationReducer"
class AuthBox extends React.Component{
  
  Userlogin=(data)=>{

   this.props.LogInUser(data)
  }
  CleanUp=()=>{
    this.props.Clean()
  }
  render(){
    return<Login {...this.props} Userlogin={this.Userlogin} CleanUp={this.CleanUp}></Login>
  }
}

let mapStateToProps=(state)=>{
  return{
  loading:state.Regis.loading,
  error:state.Regis.error
  }
}

export default connect(mapStateToProps,{LogInUser,Clean})(AuthBox);
