import React, { Component } from 'react';

/*
This page is for the cards underneath the main data on the frame table route.
It will only show up if the frame route is selected.
*/

class Frame extends Component {
  renderTables(data){
    var newKey=Math.random();
    return (
      <div className="card-deck col-md-3 col-sm-6 big-text" key={newKey}>
        <center>
          <div className="card">
            <div className="card-block">
              <p className="card-text card-underline">Table {data.FrameTable}</p>
              <p className="card-text">{data.DailyBuild}</p>
            </div>
          </div>
        </center>
      </div>
    )
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.props.data.map(this.renderTables)}
        </div>
      </div>
    );
  }
}

export default (Frame);
