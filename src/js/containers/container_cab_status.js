import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import d3 from 'd3';

import { fetchStatus } from '../actions/index';
import CabDisplay from '../components/cab_status/component_cab_display';

/*
This page is for the total part breakdown of a cabinet with a specific job and cabNo
After typing in the a valid jobno and cabno you are able to search for a part breakdown
dirty grouping in the renderData() based off of a few groups this allows
for the information to be grouped off of a parental status for each child part
as well as children of children.

After data is gathered it is then rendered through the CabDisplay component at
components/cab_status/component_cab_display
*/

class Status extends Component {
  constructor(props){
    super(props);
    this.state={jobNo: null, cabNo: null, error: null, data: []};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onJobChange = this.onJobChange.bind(this);
    this.onCabChange = this.onCabChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps(newProp){
    if(newProp.status != null){
      this.setState({ data: newProp.status });
      if(newProp.status.length == 0){
        this.setState({error: 'No Information Found. Please check the number and try again.'});
      } else {
        this.setState({error: null});
      }
    }
  }
  handleClick(e){
    this.setState({ jobNo: null, cabNo: null, error: null });
    ReactDOM.findDOMNode(this.refs.jobnumber).focus();
  }
  onJobChange(e){
    this.setState({ jobNo: e.target.value });
  }
  onCabChange(e){
    this.setState({ cabNo: e.target.value });
  }
  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.jobnumber).focus();
  }
  handleSubmit(e){
    e.preventDefault();
    if(!this.state.jobNo){
      ReactDOM.findDOMNode(this.refs.jobnumber).focus();
    }
    if(!this.state.cabNo){
      ReactDOM.findDOMNode(this.refs.cabnumber).focus();
    }
    if(this.state.cabNo && this.state.jobNo.length == 5){
      this.props.fetchStatus(this.state.jobNo, this.state.cabNo);
    }
  }
  renderData(){
    var data = this.state.data;
    var cabDetail = [];
    var finalArray = [];
    var nestData = d3.nest()
      .key(function (d) {return d.Group1;})
      .key(function (d) {return d.Group2;})
      .key(function (d) {return d.Group3;})
      .entries(data);
    nestData.forEach(function (result){
      var top = [];
      var g2Data = result.values;
      var g2Array = [];
      g2Data.forEach(function (resultb){
        if(resultb.key === '0'){
          cabDetail.push(resultb.values[0].values[0]);
        } else {
          var tempArray = [];
          var tempMain = [];
          var g3Data = resultb.values;
          g3Data.forEach(function (resultc){
            if(resultc.key !== '0'){
              tempArray.push(resultc.values[0]);
            }
            if(resultc.key === '0'){
              tempMain.push(resultc.values[0]);
            }
          })
          finalArray.push({main: tempMain, not: tempArray});
        }
      })
    })
    var arrayToPass = [];
    arrayToPass.push({cab: cabDetail, array: finalArray});
    return arrayToPass;
  }
  render(){
    return (
      <div>
        <center>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Job Number"
                ref="jobnumber"
                value={this.state.jobNo}
                onChange={this.onJobChange} />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Cabinet Number"
                ref="cabnumber"
                value={this.state.cabNo}
                onChange={this.onCabChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <div className="clearfix"></div>
            <br />
            {this.state.error ? <div className='alert alert-danger' role='alert'>
              <button
                type="button"
                onClick={this.handleClick}>
                  <i className="fa fa-times"></i>
              </button>
              {this.state.error}
            </div> : ''}
          </form>
        </center>
        {this.state.data.length > 0 ? <CabDisplay data={this.renderData()} /> : ''}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    status: state.status
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStatus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Status);
