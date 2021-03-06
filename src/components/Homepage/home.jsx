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
            <p className={classes.subtext}>Планируем будущее вместе</p>
          </div>
        </Fade>
        <Fade delay={800}>
          <img src={fire} alt="nospace" className={classes.fire} />
        </Fade>
      </div>

      <div className={classes.tehnologes} id="tehnologes">
        <Fade delay={100}>
          <div className={classes.headingTitlebox}>
            <div>
              <h2 className={classes.headingTitle}>Технологии</h2>
              <p className={classes.headingText}>
                NoSpace использует передовые веб-технологии такие как:
              </p>
            </div>
          </div>
        </Fade>
        <div className={classes.tehnologesbox}>
          <Fade delay={300}>
            <div className={classes.item}>
              <h3 className={classes.itemTitle}>React</h3>
              <div className={classes.box}>
                <img src={react} alt="react" />
              </div>
            </div>
          </Fade>
          <Fade delay={700}>
            <div className={classes.item}>
              <h3 className={classes.itemTitle}>Firebase</h3>
              <div className={classes.box}>
                <img src={firebase} alt="firebase" />
              </div>
            </div>
          </Fade>
          <Fade delay={1000}>
            <div className={classes.item}>
              <h3 className={classes.itemTitle}>Redux</h3>
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
