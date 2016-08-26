import React, { Component } from 'react';

class ModalLine extends Component {
  render() {
    return (
      <fieldset className="form-group">
        <input
        type="text"
        className="form-control"
        placeholder={this.props.placeholder}
        defaultValue={this.props.value}
        onChange={this.props.func}/>
      </fieldset>
    )
  }
}

export default ModalLine;
