import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./layout/Hearder";
import Dashboard from "./lead/Dashboard";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRouter from "../common/PrivateRouter";

// using redux
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

// react-alert
import { Provider as AlertProvier } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// alert options
const alertOptions = {
  timeout: 3000, // 3초
  position: "top center",
};

class App extends Component {
  componentWillMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvier template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRouter exact path="/" component={Dashboard} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvier>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
