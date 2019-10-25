import React from "react";
import { connect } from "react-redux";
import {SignUpUsers} from "../../../redux/registrationReducer"
import SignUp from "./signUp";





class SignUpBox extends React.Component{
  componentDidMount(){
  }
  NewUser=(formdata)=>{
      this.props.SignUpUsers(formdata)
    }
  render(){
    return<SignUp {...this.props} NewUser={this.NewUser}></SignUp>
  }
}


let mapStateToProps=(state)=>{
  return{
    loading:state.Regis.loading,
    error:state.Regis.error,
    
  }
}

export default connect(mapStateToProps,{SignUpUsers})(SignUpBox);
