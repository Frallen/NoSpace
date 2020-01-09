import React from "react";
import classes from "./navigation.module.scss";
import { NavLink } from "react-router-dom";
class Navigation extends React.PureComponent {
  state = {
    isActive: false
  };

  Setactive = () => {
    this.setState({
      //возвращет тру,получается toggleclass
      isActive: !this.state.isActive
    });
  };

  render() {
    let routes;
    if (this.props.loggedIn) {
      routes = (
        <ul
          className={ this.state.isActive? classes.menuLandingAcitve: classes.menuLanding }>
          <li className={classes.item}>
            <NavLink to="/" className={classes.login}>
              Главная
            </NavLink>
          </li>

          <li className={classes.item}>
            <NavLink to="/create" className={classes.login}>
              Создать
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink to="/missions" className={classes.login}>
              Поручения
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink to="/Tasks" className={classes.login}>
              Мои задачи
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink to="/history" className={classes.login}>
              История
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink to="/settings" className={classes.login}>
              Настройки
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink to="/logout" className={classes.login}>
              Выйти
            </NavLink>
          </li>
        </ul>
      );
    } else {
      routes = (
        <ul
          className={
            this.state.isActive
              ? classes.menuLandingAcitve
              : classes.menuLanding
          }
        >
          <li className={classes.item}>
            <NavLink to="/" className={classes.login}>
              Главная
            </NavLink>
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
      );
    }

    return (
      <div className={classes.Navigatigon}>
        <div className={classes.container}>
          <h1 className={classes.logo}>NoSpace</h1>
         {routes} 
        <label htmlFor="toggle" onClick={this.Setactive} className={classes.hamburgerbox}>
            <span className={classes.hamburger +" " +(this.state.isActive ? classes.activehamburger : "")}
            ></span>
          </label>
        </div>
      </div>
    );
  }
}
export default Navigation;