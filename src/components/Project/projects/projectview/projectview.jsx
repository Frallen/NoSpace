import React from "react"

const ProjView=(props)=>{
    console.log(
        
    )
    let content
    if (props.project) {
     content = (

  <div>{props.project[props.userId].project[props.id]}</div>

        )
    }
    return(
        <div>
           {content}
        </div>
    )
}

export default ProjView