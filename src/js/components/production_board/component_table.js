import React, { Component } from 'react';

/*
receives data from component_panel to render into a table for the cards.
Initially sets up table arrangement with table headers then maps through the array
of data to show the rows contained.
*/

class Table extends Component {
  renderRows(data){
    var newKey = Math.random();
    return (
      <tr key={newKey}>
        <td><center>{data ? data.schdDeptDueDate.substring(0,10) : 0}</center></td>
        <td><center>{data ? data.DayLoad : 0}</center></td>
        <td><center>{data ? data.DayRemaing : 0}</center></td>
        <td><center>{data ? data.DayLateCount : 0}</center></td>
      </tr>
    );
  }
  render() {
    return (
      <div>
      <br />
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-default">
              <tr>
                <th><center>Due Date</center></th>
                <th><center>Load</center></th>
                <th><center>Remaining</center></th>
                <th><center>Late</center></th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map(this.renderRows)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default (Table);
