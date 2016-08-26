import React, { Component } from 'react';
import _ from 'lodash';

import Second from './component_gl_second';

class GlDisplay extends Component {
  constructor(props){
    super(props);
    const initData = this.props.data;
    this.state={ hidden: [], holder: '', data: initData };
    this.buttonClick = this.buttonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }
  handleClick(newKey, e) {
    var hiddenValues = this.state.hidden.slice();
    var index = hiddenValues.indexOf(newKey);
    if(index == -1){
      hiddenValues.push(newKey);
    } else {
      hiddenValues.splice(index, 1);
    }
    this.setState({ hidden: hiddenValues });
  }
  handleChange(e){
    this.setState({ holder: e.target.value });
  }
  clearSearch(e){
    this.setState({ data: this.props.data, holder: '', hidden: [] });
  }
  buttonClick(e){
    var search = this.state.holder.toLowerCase();
    var dataArray = [];
    var holder = [];
    //console.log(this.props.data);
    this.props.data.forEach(function (result){
      //console.log(result);
      var checker = result.glDescription.toLowerCase();
      if(checker.includes(search)){
        if(holder.indexOf(result.glCode) == -1){
          dataArray.push(result);
          holder.push(result.glCode);
        }
      } else {
        result.array.forEach(function (resultb){
          var fDesc = '';
          if(resultb.fDesc != null){
            fDesc = resultb.fDesc.toLowerCase();
          }
          if(fDesc.includes(search)){
            if(holder.indexOf(result.glCode) == -1){
              dataArray.push(result);
              holder.push(result.glCode);
            }
          } else {
            resultb.data.forEach(function (resultc){
              var itmDesc = resultc.itmDesc.toLowerCase();
              if(itmDesc.includes(search)){
                if(holder.indexOf(result.glCode) == -1){
                  dataArray.push(result);
                  holder.push(result.glCode);
                }
              }
            })
          }
        })
      }
    })
    this.setState({ data: dataArray, hidden: [] });
  }
  renderGl(data){
    var topData = data;
    var dataToPass = data.array;
    var that = this;
    var newKey = topData.glCode;
    return (
      <div key={newKey}>
        <div className="row" onClick={that.handleClick.bind(that, newKey)}>
          <div className="col-md-4 main-part">
            {topData.glCode}
          </div>
          <div className="col-md-8 main-part">
            {topData.glDescription}
          </div>
        </div>
        {this.state.hidden.indexOf(newKey) != -1 ? <Second data={dataToPass} /> : ''}
      </div>
    )
  }
  render() {
    return (
      <div className="container-fluid">
        <center>
          <h2>GL Item List</h2>
        </center>
        <div className="input-group">
          <input type="text"
          placeholder="Search Query"
          className="form-control"
          onChange={this.handleChange}
          value={this.state.holder} />
          <span className="input-group-btn">
            <button className="btn btn-primary" type="button" onClick={this.buttonClick}>Filter!</button>
            <button className="btn btn-danger" type="button" onClick={this.clearSearch}>Clear!</button>
          </span>
        </div>
        <br />
        {this.state.data.map(this.renderGl.bind(this))}
      </div>
    );
  }
}

export default GlDisplay;
