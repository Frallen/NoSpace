import React from "react"
import classes from "./dashboard.module.scss"
const Dashboard=(props)=>{

    let nemaeproj=(e)=>{
        let text =e.currentTarget.value
        props.projName(text)
    }
    let CreateProj=()=>{
        props.NewProject()
    }
    return(
        <div className={classes.dascontaier}>
            <div className={classes.projects}>
                <div className={classes.createbox}>
               
  <input type="text" onChange={nemaeproj} value={props.createprojectname} className={classes.projinput}/>
 
                    <button className={classes.creabtn} onClick={CreateProj}>Создать проект</button>
                </div>
                {
                    props.projectList.map(p=><div key={p.id}>
                        <p>{p.title}</p>
                    </div>)
                }
            </div>
            <div className={classes.details}>
            <div>
                project details
            </div>
            </div>
            <div className={classes.party}>
                <div>
                    propject members
                </div>
            </div>
        </div>

    )
}

export default Dashboard