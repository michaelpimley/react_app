import React, { Component } from 'react';

class ModalOption extends Component {
  render() {
    return (
      <fieldset className="form-group">
        <label for={`#${this.props.label}`}>Salesman</label>
        <select className="form-control" id={this.props.label} onChange={this.props.func}>
          {this.props.data.map(sales => {
            return (
              <option key={sales}>{sales}</option>
            )
          })}
        </select>
      </fieldset>
    )
  }
}

export default ModalOption;
