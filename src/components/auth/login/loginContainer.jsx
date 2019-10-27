import React from "react";
import { connect } from "react-redux";
import Login from "./login";
import LogInUser from "./../../../redux/registrationReducer"
class FormBox extends React.Component{

  Userlogin=(formdata)=>{
    this.props.LogInUser(formdata)
  }
  render(){
    return<Login {...this.props} Userlogin={this.Userlogin}></Login>
  }
}

let mapStateToProps=(state)=>{
  return{
  loading:state.Regis.loading,
  error:state.Regis.error
  }
}


export default connect(mapStateToProps,{LogInUser})(FormBox);
