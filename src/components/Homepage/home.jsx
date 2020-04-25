import React from "react";
import classes from "./home.module.scss";
import redux from "./../../media/redux.svg";
import react from "./../../media/react.svg";
import firebase from "./../../media/firebase.svg";
import fire from "./../../media/fire.svg";
import { Fade } from "react-reveal";

const WelcomePage = () => {
  return (
    <div className={classes.landing}>
      <div className={classes.home} id="home">
        <Fade delay={300}>
          <div className={classes.text}>
            <h2 className={classes.title}>NOSPACE</h2>

            <p className={classes.subtext}>
              <span className={classes.ex}>Управляй</span>
              <span className={classes.ex}>Координируй</span>
              <span className={classes.ex}>Помогай</span>
            </p>
          </div>
        </Fade>
        <Fade delay={800}>
          <img src={fire} alt="nospace" className={classes.fire} />
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
