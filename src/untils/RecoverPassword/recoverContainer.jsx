import React from "react"
import { connect } from "react-redux";
import RecoverPass from "./recoverPass";

class RecBox extends React.Component{

    render(){
        return<RecoverPass {...this.props}></RecoverPass>
    }
}

let mapStateToProps=(state)=>{
    return{

    }
}

export default connect(mapStateToProps,{})(RecBox)