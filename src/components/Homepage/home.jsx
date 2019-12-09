import React from "react";
import classes from "./home.module.scss";
import { Link } from "react-scroll";
import redux from "./../../media/redux.svg";
import react from "./../../media/react.svg";
import firebase from "./../../media/firebase.svg";
import fire from "./../../media/fire.svg";

class WelcomePage extends React.Component {
  componentDidMount() {
    //из-за редиректа удаления проекта главная страница скроллица вниз 
    //делаю автоматический скролл вверх при монтировании
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className={classes.landing}>
        <ul className={classes.landingNav}>
          <Link
            activeClass={classes.active}
            to="home"
            spy={true}
            smooth={true}
            offset={-200}
            duration={500}
            className={classes.action}
          ></Link>
          <Link
            activeClass={classes.active}
            to="advantages"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            className={classes.action}
          ></Link>
          <Link
            activeClass={classes.active}
            to="tehnologes"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            className={classes.action}
          ></Link>
        </ul>
        <div className={classes.home} id="home">
          <div className={classes.textbox}>
            <img src={fire} alt="nospace" className={classes.fire} />
            <h2 className={classes.title}>NOSPACE</h2>
            <p className={classes.subtext}>То что нужно вашему бизнесу.</p>
          </div>
        </div>
        <div className={classes.advantages} id="advantages">
          <div className={classes.item}>
            <h3 className={classes.titleSmall}>Готово к использованию</h3>
          </div>
          <div className={classes.item}>
            <h3 className={classes.titleSmall}>Бесплатно</h3>
          </div>
          <div className={classes.item}>
            <h3 className={classes.titleSmall}>Открытый исходный код</h3>
          </div>
        </div>
        <div className={classes.tehnologes} id="tehnologes">
          <div className={classes.item}>
            <div className={classes.box}>
              <img src={react} alt="react" />
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.box}>
              <img src={firebase} alt="firebase" />
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.box}>
              <img src={redux} alt="redux" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomePage;
