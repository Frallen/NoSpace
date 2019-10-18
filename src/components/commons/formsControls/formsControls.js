import React from "react"
import classes from "./formsControls.module.scss"
export const authInput=({input,meta,...props})=>{

    const HasError=meta.touched && meta.error
    return(
        <div>
        <input {...input} {...props} className={classes.Input+" "+(HasError ? classes.errorInput:"")}></input>
    {HasError && <div className={classes.reqError}><p>{meta.error}</p></div>}
    </div>
    )
}