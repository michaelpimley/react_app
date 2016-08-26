import React, { Component } from 'react';

/*
This is rendered through Container_color_match_create and it acts as a styled
wrapper for the input bar in the color match application.
*/

class InputBar extends Component {
  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={this.props.submit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter icn..."
              ref="icn"
              className="form-control"
              onChange={this.props.icn}
              value={this.props.icnVal} />
          </div>
        </form>
      </div>
    )
  }
}

export default InputBar;
