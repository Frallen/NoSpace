import React from "react";
import classes from "./home.module.scss";
import { Link } from "react-scroll";
import redux from "./../../media/redux.svg";
import react from "./../../media/react.svg";
import firebase from "./../../media/firebase.svg";
import fire from "./../../media/fire.svg";
import { Fade } from "react-reveal";

const WelcomePage = () => {
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
        <Fade delay={300}>
          <div>
            <Fade delay={350}>
              <h2 className={classes.title}>NOSPACE</h2>
            </Fade>
            <p className={classes.subtext}>То что нужно вашему бизнесу.</p>
          </div>
          <img src={fire} alt="nospace" className={classes.fire} />
        </Fade>
      </div>
      <div className={classes.advantages} id="advantages">
        <Fade delay={500}>
          <div className={classes.headingTitlebox}>
            <h2 className={classes.headingTitle}>Преимущества</h2>
          </div>
          <div className={classes.advantagesbox}>
            <Fade delay={300}>
              <div className={classes.item}>
                <h3 className={classes.titleSmall}>OpenSource</h3>
              </div>
            </Fade>
            <Fade delay={700}>
              <div className={classes.item}>
                <h3 className={classes.titleSmall}>Бесплатно</h3>
              </div>
            </Fade>
            <Fade delay={1000}>
              <div className={classes.item}>
                <h3 className={classes.titleSmall}>Лицензия MIT</h3>
              </div>
            </Fade>
          </div>
        </Fade>
      </div>
      <div className={classes.tehnologes} id="tehnologes">
        <Fade delay={100}>
          <div className={classes.headingTitlebox}>
            <h2 className={classes.headingTitle}>Технологии</h2>
          </div>
        </Fade>
        <div className={classes.tehnologesbox}>
          <Fade delay={300}>
            <div className={classes.item}>
              <div className={classes.box}>
                <img src={react} alt="react" />
              </div>
            </div>
          </Fade>
          <Fade delay={700}>
            <div className={classes.item}>
              <div className={classes.box}>
                <img src={firebase} alt="firebase" />
              </div>
            </div>
          </Fade>
          <Fade delay={1000}>
            <div className={classes.item}>
              <div className={classes.box}>
                <img src={redux} alt="redux" />
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
