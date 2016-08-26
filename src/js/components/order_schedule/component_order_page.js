import React, { Component } from 'react';

import Selections from './component_order_selections';
import TableRow from './component_table_row';

/*
Receives information from container_order_schedule.
The necessary information is then pulled off through the const selection = this.props.data[0].val[0]
This information is then sent to component_order_selections instead of being written out as their own divs.
The component_order_selections page is nothing but a shell that accepts 3 parameters:
data, title, and colsize. This allows for everything to be rendered in 1 line versus 2-3 lines for each line.
The table = this.props.data[0] is then sent to component_table_row to display the rows of data.
*/

class OrderPage extends Component {
  createRow(data){
    var newKey = Math.random();
    return <TableRow data={data} key={newKey} />
  }
  render() {
    const selection = this.props.data[0].val[0];
    const table = this.props.data[0].val;
    return (
      <div className="col-md-10 col-md-offset-1">
        <div>
          <br />
          <div className="clearfix"></div>
          <Selections data={selection.releaseDate.substring(0,10)} title='Release Date : ' colSize='col-md-4' />
          <Selections data={selection.completionDate.substring(0,10)} title='Completion Date : ' colSize='col-md-4' />
          <Selections data={selection.orderType} title='Order Type : ' colSize='col-md-4' />
          <div className="clearfix"></div>
        </div>
        <hr />
        <h3><center><b>Selections</b></center></h3>
        <br />
        <div>
          <div className="clearfix"></div>
          <Selections data={selection.facemat} title='Face Material : ' colSize='col-md-6' />
          <Selections data={selection.doorStyle} title='Door Style : ' colSize='col-md-6' />
          <Selections data={selection.finish} title='Finish : ' colSize='col-md-6' />
          <Selections data={selection.series} title='Series : ' colSize='col-md-6' />
          <Selections data={selection.casemat} title='Case Material : ' colSize='col-md-6' />
          <Selections data={selection.drawerGuide} title='Drawer Guide : ' colSize='col-md-6' />
          <Selections data={selection.drawerStyle} title='Drawer Style : ' colSize='col-md-6' />
          <Selections data={selection.drawerBox} title='Drawer Box : ' colSize='col-md-6' />
          <div className="clearfix"></div>
        </div>
        <hr />
        <h3><center><b>Schedule</b></center></h3>
        <br />
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Check Point</th>
                <th>Department Due Date</th>
              </tr>
            </thead>
            <tbody>
              {table.map(this.createRow)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default OrderPage;
