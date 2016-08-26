import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import d3 from 'd3';
import moment from 'moment';

import { getShipping } from '../actions/index';
import ShippingApp from '../components/shipping/component_shipping';

/*
This page displays the information from steve machusko. After trucks are built the data appears here.
The main section of data contains everything from total parts to total jobs on the truck.
The bottom section contains the delay information. ie if they cant get into a home for some reason it will
be displayed at the bottom of the page.
Information is filtered then sent to component_shipping.
*/

class Ship extends Component {
  componentWillMount(){
    this.props.getShipping();
  }
  siphonData(){
    var finalArray = [];
    var delayedDays = [];
    var dayPushed = [];
    var nestDelay = d3.nest()
      .key(function(d) {return d.shipDate;})
      .entries(this.props.delay);
    var nestedShipping = d3.nest()
      .key(function(d) { return d.shipDate; })
      .entries(this.props.shipping);
    var nestTruck = d3.nest()
      .key(function(d) { return d.shipDate; })
      .entries(this.props.truck);
    nestDelay.forEach(function (result){
      delayedDays.push(result.key);
    })
    nestedShipping.forEach(function (result){
      var date = result.key;
      var addDate = moment(date).add(1, 'days');
      var temp = moment(addDate).format('MMM D YYYY');
      if(nestDelay.length > 0 ){
        nestDelay.forEach(function (resultb){
          if(delayedDays.indexOf(result.key) == -1){
            if(dayPushed.indexOf(result.key) == -1){
              finalArray.push({day: temp, main: result.values});
              dayPushed.push(result.key);
            }
          } else {
            if(dayPushed.indexOf(result.key) == -1){
              if(result.key == resultb.key){
                finalArray.push({day: temp, main: result.values, delay: resultb.values});
                dayPushed.push(result.key);
              }
            }
          }
        })
      } else {
          if(delayedDays.indexOf(result.key) == -1){
            if(dayPushed.indexOf(result.key) == -1){
              finalArray.push({day: temp, main: result.values});
              dayPushed.push(result.key);
            }
          } else {
            if(dayPushed.indexOf(result.key) == -1){
                finalArray.push({day: temp, main: result.values, delay: resultb.values});
                dayPushed.push(result.key);
            }
          }
      }
    })
    return finalArray;
  }
  render() {
    return (
      <div>
        {this.props.shipping.length > 0 ? <ShippingApp data={this.siphonData()} /> : ''}
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    shipping: state.shipping,
    delay: state.delay,
    truck: state.truck
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ getShipping }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Ship);
