import React, { Component } from 'react';

/*
Component is rendered thrugh the container_color_match_viewer.
It is a styled wrapper for the input bar.
All functions come from the parent container
*/

class InputBar extends Component {
  render() {
    return (
      <form className="form-inline" onSubmit={this.props.submit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Job Number"
            value={this.props.jobNo}
            onChange={this.props.change} />
        </div>
      </form>
    )
  }
}

export default InputBar;
