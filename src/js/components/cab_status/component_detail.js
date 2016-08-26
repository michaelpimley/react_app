import React, { Component } from 'react';

/*
Final step of the total status page. it recieves data from component_cab_display
then maps through the data and shows the final step. Ie. if parent is door child will be
left, right, top bottom rail + panel.
*/

class Detail extends Component {
  renderDetail(data){
    var key = Math.random();
    return(
      <div className="row" key={key}>
        <div className="col-md-4 col-sm-12">{data.itmDescription}</div>
        <div className="col-md-4 col-sm-12">{data.dimz ? `Width: ${data.dimX} - Height: ${data.dimy} - Depth: ${data.dimz}` : ''}</div>
        <div className="col-md-4 col-sm-12">{data.itmItemNumber}</div>
      </div>
    )
  }
  render(){
    return (
      <div>
        {this.props.data.map(this.renderDetail)}
      </div>
    )
  }
}

export default Detail;
