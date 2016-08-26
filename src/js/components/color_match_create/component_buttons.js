import React, { Component } from 'react';

/*
These buttons are rendered in the Container_color_match_create container.
Their functions are in the parent component and the functions completed here
are run in the aprent
*/

class Buttons extends Component {
  render() {
    return (
        <button type="button" className="btn btn-primary" disabled={this.props.disabled} onClick={this.props.func}>
          {this.props.name} {this.props.icon}
        </button>
    )
  }
}

export default Buttons;
