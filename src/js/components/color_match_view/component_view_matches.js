import React, { Component } from 'react';

/*
Component is rendered through the container_color_match_viewer. receives all data from parent
component and is rendered only when data is found. This component is mapped over
and displays 1 of these for every record in the array.
*/

class ViewMatch extends Component {
  renderLi(data){
    var newKey = Math.random();
    return (
      <div key={newKey}>
        <ul className='list-group'>
          <li className="colorView">Original Order No: {data.loggedOrder}</li>
          <li className="list-group-item">Bin: {data.binID}</li>
          <li className="list-group-item">Finish: {data.finish}</li>
          <li className="list-group-item">Area: {data.loggedAREA}</li>
          <li className="list-group-item">Logged In: {data.logIn ? data.logIn.substring(0,10) : 'No Record'}</li>
          <li className="list-group-item">Logged Out: {data.logOut ? data.logOut.substring(0,10) : 'No Record'}</li>
          <li className="list-group-item">Logged By: {data.logOutBy ? data.logOutBy : 'No Record'}</li>
        </ul>
        <br />
      </div>
    )
  }
  render () {
    return (
      <div className="container-fluid">
        {this.props.data.map(this.renderLi)}
      </div>
    )
  }
}

export default ViewMatch;
