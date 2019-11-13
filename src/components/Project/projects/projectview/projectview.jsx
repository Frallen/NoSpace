import React from "react"

const ProjView=(props)=>{
 console.log(props.error)
    let content
    if (props.project) {
     content = (

        props.projects[props.userId].slice(0).map(p => 
            <div>{p.NameProj} </div>
        ))
    }

    return(
        <div>
           {content}
        </div>
    )
}

export default ProjView