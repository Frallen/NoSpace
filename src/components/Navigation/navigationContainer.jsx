import React from "react"
import { connect } from "react-redux"
import Navigation from "./navigation"

class navigationBox extends React.Component{

    render(){
        return <Navigation {...this.props}></Navigation>
        
    }
}

let mapStateToProps=({firebase})=>{
    return{
        loggedIn:firebase.auth.uid
    }
}

const NavigationContainer=connect(mapStateToProps)(navigationBox)

export default NavigationContainer