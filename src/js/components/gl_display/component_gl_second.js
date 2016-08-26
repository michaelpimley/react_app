import React, { Component } from 'react';

import Third from './component_gl_third';

class Second extends Component {
  constructor(props){
    super(props);
  }
  renderData(data){
    var dataToPass = data.data;
    var newKey = Math.random();
    return (
      <div key={newKey}>
        <div className="row">
          <div className="col-md-4">
            <b>{data.fCode}</b>
          </div>
          <div className="col-md-8">
            <b>{data.fDesc}</b>
          </div>
        </div>
        <Third data={dataToPass} />
      </div>
    )
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-12">
          {this.props.data.map(this.renderData)}
        </div>
      </div>
    )
  }
}

export default Second;
