import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { fetchMatch, postCreate, pushCreate, pushCheckOut, postCheckOut } from '../actions/index';

import InputBar from '../components/color_match_create/component_input_bar';
import ItemView from '../components/color_match_create/component_item_view';
import Buttons from '../components/color_match_create/component_buttons';
import ErrorAlert from '../components/color_match_create/component_error';
import SuccessAlert from '../components/color_match_create/component_success';
import BinBar from '../components/color_match_create/component_bin_bar';

class MatchCreator extends Component {
  constructor(props){
    super(props);
    const today = moment().format("YYYY-MM-DD");
    this.state={icn: '', error: null, bin: '', data: null, today: today, success: null, successWords: '', errorWords: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.icnChange = this.icnChange.bind(this);
    this.binChange = this.binChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
    this.handleBinSubmit = this.handleBinSubmit.bind(this);
  }
  componentWillReceiveProps(newProps){
    if(newProps.match) {
      if(newProps.match.length > 0){
        this.setState({error: null, data: newProps.match[0], success: null});
      } else {
        this.setState({error: true, data: null, success: null, errorWords: 'Please verify ICN data and try again.'});
      }
    }
    if(newProps.create == true){
      this.setState({data: null, success: true, bin: '', icn: '', successWords: 'Item Successfully Posted!'});
    } else if (newProps.create == false) {
      this.setState({successs: false, successWords: 'Item Failed to Post!'});
    }
    if(newProps.checkOut == true){
      this.setState({data: null, success: true, bin: '', icn: '', successWords: 'Item Successfully Checked-Out!'});
    } else if (newProps.checkOut == false) {
      this.state({success: false, successWords: 'Item Failed to Check-Out!'})
    }
  }
  icnChange(e) {
    this.setState({icn: e.target.value});
  }
  binChange(e) {
    this.setState({bin: e.target.value});
  }
  handleExit(e){
    e.preventDefault();
    this.setState({data: null, success: null, error: false, bin: '', icn: ''});
  }
  handleBinSubmit(e) {
    e.preventDefault();
  }
  handleSubmit(e){
    var icn = this.state.icn;
    e.preventDefault();
    if(icn.length == 7){
      this.props.fetchMatch(icn);
      this.props.pushCreate(null);
      this.props.pushCheckOut(null);
    }
  }
  handleCreate(e){
    e.preventDefault();
    if(this.state.bin.length == 3){
      this.props.postCreate(this.state.data, this.state.bin, this.state.today);
    }
  }
  handleCheckOut(e){
    e.preventDefault();
    this.props.postCheckOut(this.state.data, this.state.today);
  }
  render() {
    const datas = this.state.data;
    return (
      <div className="container-fluid">
        <center>
          <InputBar
            icn={this.icnChange}
            submit={this.handleSubmit}
            icnVal={this.state.icn} />
          <BinBar
            bin={this.binChange}
            binVal={this.state.bin}
            submit={this.handleBinSubmit} />
          <br />
          {this.state.error == true ? <ErrorAlert func={this.handleExit} words={this.state.errorWords} /> : ''}
          {this.state.success ?
            <SuccessAlert
              succ={this.state.successWords}
              alertColor={this.state.success == true ? 'alert-success' : 'alert-danger'} />
          : ''}
          {datas ? <ItemView data={datas}/> : ''}
          <br />
          {datas ? <div className="btn-group" role="group">
            <Buttons
              name="Create"
              icon={<i className="fa fa-plus"></i>}
              disabled={datas.binID == null ? false : true}
              func={this.handleCreate} />
            <Buttons
              name="In"
              icon={<i className="fa fa-sign-in"></i>}
              disabled={datas.binID && datas.binID.length > 4 ? false : true}
              func={this.handleCreate} />
            <Buttons
              name="Out"
              icon={<i className="fa fa-sign-out"></i>}
              disabled={datas.binID && datas.binID.length < 4 ? false : true}
              func={this.handleCheckOut} />
          </div> : ''}
        </center>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchMatch, postCreate, pushCreate, pushCheckOut, postCheckOut }, dispatch);
}
function mapStateToProps(state){
  return {
    match: state.match,
    create: state.create,
    checkOut: state.checkOut
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MatchCreator);
