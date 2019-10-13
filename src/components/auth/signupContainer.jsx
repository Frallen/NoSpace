import React from "react";
import { connect } from "react-redux";
import classes from "./auth.module.scss";
class signup extends React.Component {
  state = {};
  render() {
    return (
      <div className={classes.formbox}>
        <div className={classes.form}>
          <h5 className={classes.formtitle}>Регистрация</h5>
          <form onSubmit="">
            <div>
              <label htmlFor="email">Емейл</label>
              <input className={classes.input} type="email" id="email" />
            </div>
            <div>
              <label htmlFor="password">Пароль</label>
              <input className={classes.input} type="password" id="password" />
            </div>
            <div>
              <button className={classes.submited}>Завершить</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {};

const SignupContainer = connect(mapStateToProps)(signup);

export default SignupContainer;
