import React, { Component } from 'react';

import Detail from './component_detail';

/*
This is rendered through the container_cab_status container. the information is gathered there
then passed here through a filter.
Because of dirty grouping with d3 I specifically grabbed a portion of data that would be used in the
top section. It is found at data[0].cab[0]. This is the top level of all data.
Then the information found in the child components is mapped over to display the information on the second layer.
this information is found at data[0].array. The top info is the total cab info - ie dimensions/name/cab status.
the mapped array is the parent of the breakdown. ie door, face frame, etc.
Finally the child of the parent breakdown is sent to the component_detail component for final rendering.
*/

class DisplayStatus extends Component {
  constructor(props){
    super(props);
  }
  renderCab(data){
    var key = Math.random();
    var detail = data.main[0];
    if(data.not.length == 0){
      return (
        <div className="row main-part" key={key}>
          <div className="col-md-4 col-sm-12">Description: {detail.itmDescription}</div>
          <div className="col-md-4 col-sm-12">Item Number: {detail.itmItemNumber}</div>
          <div className="col-md-4 col-sm-12">Quantity: {detail.oriReqQty}</div>
        </div>
      )
    } else {
      return (
        <div key={key}>
          <div className="row main-part">
            <div className="col-md-4 col-sm-12">Description: {detail.itmDescription}</div>
            <div className="col-md-4 col-sm-12">Width: {detail.dimX} - Height: {detail.dimy} - Depth: {detail.dimz}</div>
            <div className="col-md-4 col-sm-12">{detail.itemSttDesc}</div>
          </div>
          <Detail data={data.not} />
        </div>
      )
    }
  }
  render() {
    const cab = this.props.data[0].cab[0];
    const data = this.props.data[0].array;
    return (
      <div>
        <center>
          <div className="container-fluid">
            <div className="row cab-parent">
              <div className="col-md-2 col-sm-12">Cab No: {cab.CvCabId}</div>
              <div className="col-md-2 col-sm-12">{cab.olnShortDesc}</div>
              <div className="col-md-4 col-sm-12">W: {cab.CabWidth}  H: {cab.CabHeight}  D: {cab.CabDepth}</div>
              <div className="col-md-4 col-sm-12">{cab.itemSttDesc}</div>
            </div>
          </div>
          {data.map(this.renderCab)}
        </center>
      </div>
    );
  }
}

export default DisplayStatus;
