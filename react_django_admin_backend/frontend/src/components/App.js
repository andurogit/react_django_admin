import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import Header from "./layout/Hearder";
import Dashboard from "./lead/Dashboard";
import Alerts from "./layout/Alerts";

// using redux
import { Provider } from "react-redux";
import store from "../store";

// react-alert
import { Provider as AlertProvier } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// alert options
const alertOptions = {
  timeout: 3000, // 3초
  position: "top center",
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AlertProvier template={AlertTemplate} {...alertOptions}>
          <Fragment>
            <Header />
            <Alerts />
            <div className="container">
              <Dashboard />
            </div>
          </Fragment>
        </AlertProvier>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
