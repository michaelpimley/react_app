import React, { Component } from 'react';

/*
Component is the bin input bar for the color match application.
Container_color_match_create uses this component and passes all props down to it.
All this component does it act as a styled input bar.
*/

class BinBar extends Component {
  render() {
    return (
      <form className="form-inline" onSubmit={this.props.submit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Bin #..."
            className="form-control"
            onChange={this.props.bin}
            value={this.props.binVal} />
        </div>
      </form>
    )
  }
}

export default BinBar;
