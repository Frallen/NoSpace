import React from "react"
import TextField from "@material-ui/core/TextField"
import classes from "./formsControls.module.scss"
import InputLabel from '@material-ui/core/InputLabel';

export const authInput=({input,meta,...props})=>{
    const HasError=meta.touched && meta.error
    return<div>
       <TextField {...input} {...props} className={classes.Input}></TextField>
    <InputLabel htmlFor="component-error" className={HasError && classes.reqError}>{HasError &&meta.error}</InputLabel>
    </div> 
}

export const ProjectInput=({input,meta,...props})=>{
    const HasError=meta.touched && meta.error
    return<div>
            <TextField {...input} {...props} className={classes.projinput}></TextField>
            <InputLabel htmlFor="component-error" className={HasError && classes.reqError}>{HasError &&meta.error}</InputLabel>
        </div>
    
}

export const ProjectTextArea=({input,meta,...props})=>{
    const HasError=meta.touched&&meta.error
    return(
        <div>
            <textarea {...input} {...props} className={classes.textarea}></textarea>
        </div>
    )
}