import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";

import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  //   componentDidMount() {
  //     this.props.alert.show("it works");
  //   }
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
    }

    if (message !== prevProps.message) {
      if (message.leadAdd) alert.success(message.leadAdd);
      if (message.leadDelete) alert.success(message.leadDelete);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.message,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
