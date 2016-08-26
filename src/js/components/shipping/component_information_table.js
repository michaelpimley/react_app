import React, { Component } from 'react';
import { connect } from 'react-redux';

import DetailModal from './component_detail_modal';

class Information extends Component {
  constructor(props){
    super(props);
    this.state={modal: false, data: []};
    this.renderFunc = this.renderFunc.bind(this);
  }
  renderRows(data){
    var that = this;
    return (
      <tr key={data.shpDescription}>
        <td>{data.shpDescription}</td>
        <td>{data.truckDriver}</td>
        <td>{data.driverHelper}</td>
        <td>{data.truckDeparture}</td>
        <td>{data.truckReturn}</td>
        <td>{data.totalTime != null ? data.totalTime.substring(11,16) : ''}</td>
        <td>{data.boxPerTruck}</td>
        <td>{data.ordPerTruck}</td>
        <td>{data.itmPerTruck}</td>
        <td>{data.shpNotes}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.renderModal.bind(that, data)}
            disabled={this.props.truck.length > 0 ? false : true} >
            Details <span>{this.props.truck.length > 0 ? '' : <i className="fa fa-cog fa-spin"></i>}</span>
          </button>
        </td>
      </tr>
    );
  }
  renderModal(data, e){
    this.setState({modal: !this.state.modal, data: data});
  }
  renderFunc(){
    this.setState({modal: !this.state.modal});
  }
  render() {
    return (
      <div className="col-md-12">
        <h2>{this.props.title}</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th><center>Truck</center></th>
              <th><center>Driver</center></th>
              <th><center>Helper</center></th>
              <th><center>Departure</center></th>
              <th><center>Returned</center></th>
              <th><center>Time</center></th>
              <th><center># of Cabs</center></th>
              <th><center># of Jobs</center></th>
              <th><center># of Items</center></th>
              <th><center>Notes</center></th>
              <th><center>Details</center></th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.main.map(this.renderRows.bind(this))}
          </tbody>
        </table>
        <DetailModal modal={this.state.modal} func={this.renderFunc} data={this.state.data} />
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    truck: state.truck
  }
}

export default connect(mapStateToProps,null)(Information);
