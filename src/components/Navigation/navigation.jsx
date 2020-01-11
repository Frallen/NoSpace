import React, { useState } from "react";
import classes from "./navigation.module.scss";
import { NavLink } from "react-router-dom";
const Navigation = props => {
  const [isActive, setActive] = useState(false);

  let Mobile = () => {
    if (isActive === false) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  let routes;
  if (props.loggedIn) {
    routes = (
      <ul
        className={isActive ? classes.menuLandingAcitve : classes.menuLanding}
      >
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
        className={isActive ? classes.menuLandingAcitve : classes.menuLanding}
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
        <label
          htmlFor="toggle"
          onClick={Mobile}
          className={classes.hamburgerbox}
        >
          <span
            className={
              classes.hamburger +
              " " +
              (isActive ? classes.activehamburger : "")
            }
          ></span>
        </label>
      </div>
    </div>
  );
};
export default Navigation;
