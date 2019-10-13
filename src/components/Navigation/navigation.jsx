import React from "react";
import classes from "./navigation.module.scss";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
class Navigation extends React.Component {
  state = {
    isActive: false
  };

  Setactive = () => {
    this.setState({
      isActive: true
    });
  };
 

/* 
          <ul className={classes.mainMenu}>
           <li>
             <NavLink>Создать проект</NavLink>
           </li>
           <li>
             <NavLink>Проекты</NavLink>
           </li>
           <li>
             <NavLink></NavLink>
           </li>
           <li>
             <NavLink to="/">Выйти</NavLink>
           </li>
         </ul> */

/*   <div className={classes.mobile} onClick={this.Setactive}>
            <span
              className={this.state.isActive ? style : classes.stick}
            ></span>
          </div> */
  render() {
    const style = classes.stick + "" + classes.stickActive;
    return (
      <div className={classes.Navigatigon}>
        <div className={classes.container}>
          <h1 className={classes.logo}>NoSpace</h1>
          <ul className={classes.menuLanding}>
            <li className={classes.item}>
              <Link
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Главная
              </Link>
            </li>
            <li className={classes.item}>
              <Link
                activeClass="active"
                to="advantages"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
              >
                Возможности
              </Link>
            </li>
            <li className={classes.item}>
              <Link
                activeClass="active"
                to="tehnologes"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
              >
               Технологии
              </Link>
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
