import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import d3 from 'd3';
import moment from 'moment';

import { fetchGl } from '../actions/index';
import GlDisplay from '../components/gl_display/component_gl_display';

class Gl extends Component {
  componentDidMount() {
    this.props.fetchGl();
  }
  renderData(){
    var nestedData = d3.nest()
      .key(function (d) {return d.glcCode;})
      .key(function (d) {return d.itmfCode;})
      .entries(this.props.data);

    var finalArray = []
    var famData = [];
    nestedData.forEach(function (result){
      var someData = result.values;
      var famGroup = [];
      var glCode = '';
      var glDescription = '';
      someData.forEach(function (resultb){
        var fam = resultb.values;
        var famArray = [];
        var fCode = '';
        var fDesc = '';
        fam.forEach(function (resultc){
          glCode = resultc.glcCode;
          glDescription = resultc.glcDescription;
          fCode = resultc.itmfCode;
          fDesc = resultc.itmfDescription;
          famArray.push({itm: resultc.itmItemNumber, itmDesc: resultc. itmDescription});
        })
        famGroup.push({fCode: fCode, fDesc: fDesc, data: famArray});
      })
      finalArray.push({glCode: glCode, glDescription: glDescription, array: famGroup});
    })
    //console.log(finalArray)
    return finalArray;
  }
  render() {
    return (
      <div>
        {this.props.data.length > 0 ? <GlDisplay data={this.renderData()} /> : ''}
      </div>
    );
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchGl }, dispatch);
}
function mapStateToProps(state){
  return {
    data: state.gl
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Gl);
