import React, { Component } from 'react';

/*
component is rendered if there is an error regarding the gathering
or the sending of data. You are also able to click to cancel the alert
*/

class ErrorAlert extends Component {
  render() {
    return (
      <div className="col-md-6">
        <div className="alert alert-warning alert-dismissible fade in" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.func}>
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>{this.props.words}</strong>
        </div>
      </div>
    )
  }
}

export default ErrorAlert;
