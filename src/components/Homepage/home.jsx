import React from "react";
import classes from "./home.module.scss";
const WelcomePage = () => {
  return(
 <div>
<div className={classes.home} id="home">
  <div className={classes.text}>
    <div className={classes.textbox}>
    <h2 className={classes.title}>Все генеальное <span>просто</span></h2>
 <p className={classes.subtext}>ваш беспланый бизнес помощник</p>
 </div>
  </div>
  
</div>
<div className={classes.advantages} id="advantages">
  <div className={classes.item}>
    <h3 className={classes.titleSmall}>Готово к использованию</h3>
  </div>
  <div className={classes.item}>
    <h3 className={classes.titleSmall}>Бесплано</h3>
  </div>
  <div className={classes.item}>
    <h3 className={classes.titleSmall}>Открытый исходный код</h3>
  </div>
</div>
<div className={classes.tehnologes} id="tehnologes">
<div className={classes.item}>
    
  </div>
  <div className={classes.item}>
    
  </div>
  <div className={classes.item}>
   
  </div>
</div>
 </div>
  );
};

export default WelcomePage;
