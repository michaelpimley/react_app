import React, { Component } from 'react';

class ModalTable extends Component {
  renderRows(data){
    return (
      <tr key={data.ordOrderNo}>
        <td>{data.ordOrderNo}</td>
        <td>{data.ordDescription}</td>
        <td>{data.TotalCabs}</td>
        <td>{data.salesPerson}</td>
        <td>{data.venCompanyName}</td>
      </tr>
    )
  }
  render() {
    return (
        <tbody>
          {this.props.data ? this.props.data.map(this.renderRows) : ''}
        </tbody>
    )
  }
}

export default ModalTable;
