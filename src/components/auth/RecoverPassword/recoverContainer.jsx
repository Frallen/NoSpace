import React from "react"
import { connect } from "react-redux";
import {RecoverPass} from "./../../../redux/registrationReducer";
import ChangePass from "./changePass"
class RecBox extends React.Component{

    NewPass=(data)=>{
        this.props.RecoverPass(data)
    }
    render(){
        return<ChangePass {...this.props} NewPass={this.NewPass}></ChangePass>
    }
}

let mapStateToProps=(state)=>{
    return{
        error:state.Regis.recoverpass.error,
        loading:state.Regis.recoverpass.loading,
    }
}

export default connect(mapStateToProps,{RecoverPass})(RecBox)