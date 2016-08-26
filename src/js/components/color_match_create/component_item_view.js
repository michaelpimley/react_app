import React, { Component } from 'react';

/*
This component receives data from and is rendered in the Container_color_match_create container.
This component is only rendered when data is received in the parent container
and passed to this component.
*/

class ItemView extends Component{
  constructor(props){
    super(props);

  }
  render() {
    const data = this.props.data;
    return (
      <div className="container">
        <ul className="list-group">
          <li className="list-group-item">{data.area}</li>
          <li className="list-group-item">Finish: {data.finish}</li>
          <li className="list-group-item">Face Material: {data.facemat}</li>
          <li className="list-group-item">Bin Location: {data.binID}</li>
        </ul>
      </div>
    )
  }
}

export default ItemView;
