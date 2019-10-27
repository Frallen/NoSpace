import React from "react"
import preloader from "./../../media/preloader.svg"
import classes from "./preloader.module.scss"
export let Preloader=()=>{
    return(
        <div className={classes.preloader}><img src={preloader} alt="preloader"></img></div>
    )
}