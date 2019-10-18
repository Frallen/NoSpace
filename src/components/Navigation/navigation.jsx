import React from "react";
import classes from "./navigation.module.scss";
import { NavLink } from "react-router-dom";
class Navigation extends React.Component {
  state = {
    isActive: false
  };

  Setactive = () => {
    this.setState({
      isActive: true
    });
  };
 
  render() {
    const style = classes.stick + "" + classes.stickActive;
    return (
      <div className={classes.Navigatigon}>
        <div className={classes.container}>
          <h1 className={classes.logo}>NoSpace</h1>
          <ul className={classes.menuLanding}>
            <li className={classes.item}>
           <NavLink to="/" className={classes.login}>
                Главная</NavLink>
          
            </li>
            <li className={classes.item}>
              <NavLink to="/signup" className={classes.login}>
                Регистрация
              </NavLink>
            </li>
            <li className={classes.item}>
              <NavLink to="/login" className={classes.login}>
                Вход
              </NavLink>
            </li>
          </ul>
         
      
        </div>
      </div>
      
    );
  }
}
export default Navigation;
