import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import d3 from 'd3';
import moment from 'moment';

import { fetchOrder } from '../actions/index';
import OrderPage from '../components/order_schedule/component_order_page';

/*
Page for oscar parada - this page accepts a job number as a parameter. The information returned
includes checkpoints as well as the department due dates for those checkpoints.
The top portion is rendered through the component_order_page component.
*/

class OrderSchedule extends Component {
  constructor(props) {
    super(props);
    this.state={jobNumber: '', areasInJob: null, select: 'Select Area', error: null, noFound: false };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(e){
    this.setState({ jobNumber: e.target.value });
  }
  onFormSubmit(e){
    e.preventDefault();
    if(this.state.jobNumber.length == 5){
      this.props.fetchOrder(this.state.jobNumber);
      this.setState({error: null});
    } else {
      this.setState({error: 'Enter a valid number.'});
    }
  }
  componentWillReceiveProps (newProps) {
    if(newProps.order){
      if(newProps.order.length > 0) {
        var areasArray = [];
        var nestArea = d3.nest()
          .key(function(d) {return d.area;})
          .entries(newProps.order);
        nestArea.forEach(function (result){
          areasArray.push(result.key);
        });
        this.setState({areasInJob: areasArray, select: areasArray[0], error: null});
      } else {
        this.setState({error: 'Enter a valid number.'});
      }
    }
  }
  reportData(select){
    var data = this.props.order;
    var displayArray = [];
    var nestArea = d3.nest()
      .key(function(d) {return d.area;})
      .entries(data);
    nestArea.forEach(function (result){
      if(select == result.key){
        displayArray.push({val: result.values});
      }
    })
    if(data.length > 0){
      return displayArray;
    }
  }
  onLiClick(area, e){
    this.setState({select: area});
  }
  render() {
    var that = this;
    return (
      <div>
        <center>
          <form onSubmit={this.onFormSubmit} className={`form-inline ${this.state.error ? 'has-danger' : ''}`}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Job Number."
                className="form-control"
                onChange={this.onInputChange} />
              <div className="btn-group">
                <button className="btn btn-primary" type="submit">Search</button>
                <button type='button' className='btn btn-info dropdown-toggle' data-toggle='dropdown'>
                  {this.state.select}
                </button>
                <ul className="dropdown-menu">
                  {this.state.areasInJob ? this.state.areasInJob.map(function (area){
                    return(
                      <a
                        key={area}
                        value={area}
                        onClick={that.onLiClick.bind(that, area)}
                        className="dropdown-item">
                        {area}
                      </a> )}) : ''}
                </ul>
              </div>
              <div className='text-help'>{this.state.error ? this.state.error : ''}</div>
            </div>
          </form>
        </center>
        {this.state.areasInJob && this.reportData(this.state.select) ?
          <OrderPage data={this.reportData(this.state.select)} /> : ''}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    order: state.order
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchOrder }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSchedule);
