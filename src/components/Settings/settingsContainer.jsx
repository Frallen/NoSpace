import React from "react"
import { connect } from "react-redux";
import {Clean,ChangeProfile,Delete} from "./../../redux/settingsReducer"
import Settings from "./settings";

class SettBox extends React.Component{
    CleanUp=()=>{
        this.props.Clean()
    }
   
    NewSett=(data)=>{
        this.props.ChangeProfile(data)

    }
    Delete=()=>{
        this.props.Delete()
    }
    render(){
        return<Settings {...this.props} CleanUp={this.CleanUp} NewSett={this.NewSett} Delete={this.Delete}></Settings>
    }
}
let mapStateToProps=(state)=>{
    return{
        error:state.settings.error,
        loading:state.settings.loading,
        profile:state.firebase.profile,
        auth:state.firebase.auth
    }
}

export default connect(mapStateToProps,{Clean,ChangeProfile,Delete})(SettBox)