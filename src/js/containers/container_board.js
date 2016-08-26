import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchMain,fetchCount,fetchCnc,fetchFinish,fetchFrame, getAll, getReload } from '../actions/index';
import Panel from '../components/production_board/component_panel';
import Frame from '../components/production_board/component_frame_table';
import Count from '../components/production_board/component_count';

/*
This page controls the production boards in the shop as well as the
home screen that contains all of the counts currently in the shop.
componentWillReceiveProps(newpros) watches for new props to be passed to it through redux.
Because of no two-way data binding and in order to make the page itself re-render with correct data
you must update state. Thats what this function does. it watches redux then changes the app's state accordingly.
based on route selected it also applies new cptid's.
Data is mapped/filtered through the renderData() and is passed to either component_panel,
component_frame_table, or component_count based off of route selection.
*/

class Board extends Component {

  componentWillReceiveProps (newProps) {
    this.setState({
      department: newProps.routeParams.department
    });
    var cncArray = [141,140];
    var doorArray = [158,179,138,154,172];
    var weinArray = [158,179,138];
    var panelArray = [154,172,138];
    var finishArray = [149,176,143];
    var frameArray = [166,155,139];
    var millArray = [159,170,137];
    var qcArray = [144];
    var inventoryArray = [124];
    var nullArray = [];
    switch(newProps.routeParams.department) {
      case 'door':
        if(newProps.data.length != 0){
          this.setState({mainArray: doorArray, data: newProps.data});
        }
        break;
      case 'wein':
        if(newProps.data.length != 0){
          this.setState({mainArray: weinArray, data: newProps.data});
        }
        break;
      case 'cnc':
        if(newProps.cnc.length != 0){
          this.setState({mainArray: cncArray, data: newProps.cnc});
        }
        break;
      case 'panel':
        if(newProps.data.length != 0){
          this.setState({mainArray: panelArray, data: newProps.data});
        }
        break;
      case 'inventory':
        if(newProps.data.length != 0){
          this.setState({mainArray: inventoryArray, data: newProps.data});
        }
        break;
      case 'qc':
        if(newProps.finish.length != 0){
          this.setState({mainArray: qcArray, data: newProps.finish});
        }
        break;
      case 'mill':
        if(newProps.data.length != 0){
          this.setState({mainArray: millArray, data: newProps.data});
        }
        break;
      case 'frame':
        if(newProps.data.length != 0){
          this.setState({mainArray: frameArray, data: newProps.data});
        }
        break;
      case 'finish':
        if(newProps.finish.length != 0){
          this.setState({mainArray: finishArray, data: newProps.finish});
        }
        break;
      case 'home':
        this.setState({mainArray: nullArray});
        break;
    }
  }
  componentWillMount(){
    this.props.getAll();
    this.props.getReload();
  }

  componentDidMount(){
    var self = this;
    this.interval = setInterval(function(){
      self.props.getAll();
    }, 300000);
    this.counts = setInterval(function(){
      self.props.getReload();
    }, 30000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.counts);
  }
  constructor(props){
    super(props);
    const startingDepartment = this.props.routeParams.department;
    this.state={department: startingDepartment, mainArray: {}, data: {} };
  }
  renderFrame(){
    var frame = this.props.frame;
    var frameTableArray = [];
    const now = moment().format("YYYY-MM-DD");
    for(var i = frame.length - 1; i > 0; i--){
      var scanDate = frame[i].ScanDate.substring(0,10);
      if(now == scanDate){
        frameTableArray.push(frame[i]);
      }
    }
    return frameTableArray;
  }
  renderCount(){
    var data = this.props.count;
    var cptHolder = [];
    var countArray = [];
    var now = moment().format('YYYY-MM-DD');
    for(var i = 0; i < data.length; i++){
      var date = data[i].dateToUse.substring(0,10);
      if(now == date){
        if(cptHolder.indexOf(data[i].cptID) == -1){
          if(data[i].scansPerHour != 0){
            cptHolder.push(data[i].cptID);
            countArray.push(data[i]);
          }
        }
      }
    }
    return countArray;
  }
  renderData(){
    var data = this.state.data;
    var mainArray = this.state.mainArray;
    const now = moment().format('YYYY-MM-DD');
    var arrayToShow = [];
    var countArray = [];
    var pastDue = 0;
    var todayLate = 0;
    var finalArray = [];
    var cptHolder = [];
    var countData = this.props.count;
    mainArray.forEach(function (result){
      for(var i = 0; i < data.length; i++) {
        var date = data[i].schdDeptDueDate.substring(0,10);
        if(result == data[i].cptID){
          if(now == date){
            var index = i;
            arrayToShow.push(data[index-2], data[index-1], data[index], data[index+1], data[index+2]);
          } if(date < now) {
            pastDue = pastDue + data[i].DayRemaing;
            var idDesc = data[i].cptDescription;
          } if(date <= now) {
            todayLate = todayLate + data[i].DayRemaing;
          }
        }
      }
      for(var i = 0; i < countData.length; i++){
        var countDate = countData[i].dateToUse.substring(0,10);
        if(now == countDate){
          if(cptHolder.indexOf(result) == -1){
            if(result == countData[i].cptID){
              if(countData[i].scansPerHour != 0){
                cptHolder.push(result);
                countArray.push(countData[i]);
              }
            }
          }
        }
      }
      finalArray.push({array: arrayToShow, pastDue: pastDue, desc: idDesc, todayLate: todayLate, cptId: result, count: countArray});
      arrayToShow = [];
      countArray = [];
      pastDue = 0;
      todayLate = 0;
    });
    return finalArray;
  }
  render() {
    return (
      <div>
        {this.state.data.length > 0 && this.state.department != 'home' ? <Panel data={this.renderData()} /> : ''}
        {this.state.department == 'frame' && this.state.department != 'home' && this.state.data.length > 0 ? <Frame data={this.renderFrame()} /> : ''}
        {this.state.department == 'home' && this.props.count.length > 0 ? <Count data={this.renderCount()} /> : ''}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    data: state.main,
    count: state.count,
    cnc: state.cnc,
    finish: state.finish,
    frame: state.frame
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMain, fetchCount, fetchCnc, fetchFrame, fetchFinish, getAll, getReload }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
