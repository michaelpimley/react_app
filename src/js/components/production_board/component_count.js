import React, { Component } from 'react';

/*
This page renders the count data into cards with a checkpoint name on top and
the scans per hour/scans for the day underneath it. Quick look at the scans through the shop.
*/

class Count extends Component {
  renderPanel(data){
    return (
      <div key={data.cptID} className="card-deck col-lg-4 col-md-6 col-sm-12">
        <div className="card">
          <div className="card-block">
            <center>
              <p className="card-text card-underline big-text-too">{data.cptDescription}</p>
              <p className="card-text second-text">Hourly: {data.scansPerHour} - Total: {data.scanTotalDay} </p>
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

export default (Count);
