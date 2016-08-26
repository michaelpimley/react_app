import React, { Component } from 'react';

class Delay extends Component {
  renderRows(data){
    return (
      <tr key={data.orderNo}>
        <td>{data.shpDescription}</td>
        <td>{data.TimeDelay}</td>
        <td>{data.ReasonDelay}</td>
        <td>{data.orderNo}</td>
        <td>{data.Comment}</td>
      </tr>
    );
  }
  render() {
    return (
      <div className="col-md-12">
        <h2>{this.props.title}</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th><center>Truck</center></th>
              <th><center>Time Delay</center></th>
              <th><center>Reason</center></th>
              <th><center>Order Number</center></th>
              <th><center>Comment</center></th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.delay ? this.props.data.delay.map(this.renderRows) : ''}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Delay;
