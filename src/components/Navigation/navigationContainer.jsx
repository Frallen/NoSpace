import React from "react"
import { connect } from "react-redux"
import Navigation from "./navigation"

class navigationBox extends React.Component{

    render(){
        return <Navigation></Navigation>
        
    }
}

let mapStateToProps=(state)=>{

}

const NavigationContainer=connect(mapStateToProps)(navigationBox)

export default NavigationContainer