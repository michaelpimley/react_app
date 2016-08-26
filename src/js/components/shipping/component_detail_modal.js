import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import ModalTable from './component_modal_table';

class DetailModal extends Component {
  constructor(props){
    super(props);

    this.state={truck: []};
  }
  componentWillReceiveProps(newProps){
    this.setState({truck: newProps.truck});
  }
  renderData(data){
    var foo = this.props.data;
    var tempArray = [];
    data.forEach(function (result){
      if(result.shipDate == foo.shipDate && result.shpTruckNo == foo.shpTruckNo){
        tempArray.push(result);
      }
    });
    return tempArray;
  }
  render() {
    return (
      <Modal show={this.props.modal} onHide={this.props.func} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>
            <center>
              {this.props.data.shpDescription}
            </center>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th><center>Order</center></th>
                  <th><center>Address</center></th>
                  <th><center>Count</center></th>
                  <th><center>Sales Person</center></th>
                  <th><center>Builder</center></th>
                </tr>
              </thead>
              {this.props.data ? <ModalTable data={this.renderData(this.state.truck)} /> : '' }
            </table>
          </div>
          <center>
            <button type="button" className="btn btn-primary" onClick={this.props.func}>Close</button>
          </center>
        </Modal.Body>
      </Modal>
    )
  }
}
function mapStateToProps(state){
  return {
    truck: state.truck
  }
}

export default connect(mapStateToProps, null)(DetailModal);
