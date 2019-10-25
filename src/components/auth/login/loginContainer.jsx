import React from "react";
import { connect } from "react-redux";
import Login from "./login";

class FormBox extends React.Component{
  NewUser=(formdata)=>{
    //this.props.SignUpUsers(formdata)
  }
  render(){
    return<Login {...this.props}></Login>
  }
}

let mapStateToProps=(state)=>{
  return{
  
  }
}
export default connect(mapStateToProps,{})(FormBox);
