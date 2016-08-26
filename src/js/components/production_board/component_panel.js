import React, { Component } from 'react';

import Table from './component_table';

/*
Main portion of the production boards. This will show up on every route except for 'home'.
Receives data from the container_board filter and maps through it to display some header info.
Then passes an array to the component_table to render a table.
*/

class Panel extends Component {
  renderPanel(data){
    var newKey=Math.random();
    return (
      <div className='card-deck col-md-4 col-sm-12' key={newKey}>
        <div className="card">
          <div className="card-block">
            <center>
              <p className="card-text card-underline big-text-too">{data.desc}</p>
              <p className="card-text big-text">
                Today: {data.todayLate} - Late: {data.pastDue}
              </p>
              <p className="card-text big-text">
                Scans: {data.count[0] ? data.count[0].scanTotalDay : 0} - Hr: {data.count[0] ? data.count[0].scansPerHour : 0}
              </p>
              <Table data={data.array} />
            </center>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.props.data.map(this.renderPanel)}
        </div>
      </div>
    );
  }
}

export default (Panel);
