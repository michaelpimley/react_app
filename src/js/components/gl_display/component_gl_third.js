import React, { Component } from 'react';

class Third extends Component {
  renderData(data){
    return (
      <div key={data.itm}>
        <div className="row thirdLevel">
          <div className="col-md-4">
            {data.itm}
          </div>
          <div className="col-md-8">
            {data.itmDesc}
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="col-md-12">
        <center>
          {this.props.data.map(this.renderData)}
        </center>
      </div>
    )
  }
}

export default Third;
