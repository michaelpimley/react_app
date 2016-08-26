import React, { Component } from 'react';

/*
This component is rendered from the Container_color_match_create container when
the item is successfully pushed to the table.
*/

class SuccessAlert extends Component {
  render() {
    return (
      <div className="col-md-6">
        <div className={`alert ${this.props.alertColor} alert-dismissible fade in`} role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>{this.props.succ}</strong>
        </div>
      </div>
    )
  }
}

export default SuccessAlert;
