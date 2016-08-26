import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import moment from 'moment';

import SuccessAlert from '../components/color_match_create/component_success';
import { fetchInvMatch, postInventory, pushInventory, getInvMatch } from '../actions/index';

class ColorInventory extends Component {
  constructor(props){
    super(props);
    var today = moment().format('YYYY-MM-DD');
    this.state={ icn: '', bin: '', array: [], success: null, successWords: '', today: today }
    this.icnChange = this.icnChange.bind(this);
    this.binChange = this.binChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBinSubmit = this.handleBinSubmit.bind(this);
    this.finalSub = this.finalSub.bind(this);
  }
  componentWillReceiveProps(newProps){
    if(newProps.inv != null){
      if(newProps.inv.length > 0){
        var array = this.state.array;
        array.push({ data: newProps.inv, bin: this.state.bin, today: this.state.today });
        this.setState({ array: array, success: true, successWords: `Successfully added ${this.state.icn}.` });
        this.setState({ icn: '' });
      } else {
        this.setState({ success: true, successWords: 'Please double check ICN' });
      }
      if(newProps.pushInv == true){
        this.setState({ array: [], successWords: `Successfully pushed ${this.state.bin}.`, bin: '' });
        this.props.getInvMatch({data: null});
        ReactDOM.findDOMNode(this.refs.bin).focus();
      }
    }
  }
  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.bin).focus();
  }
  finalSub(e){
    e.preventDefault();
    this.props.postInventory(this.state.array);
  }
  handleSubmit(e){
    e.preventDefault();
    if(this.state.icn.length == 7 ){
      this.setState({success: null});
      this.props.pushInventory(false);
      this.props.fetchInvMatch(this.state.icn);
    } else {
      this.setState({success: false, successWords: 'Enter valid ICN', icn: ''});
      ReactDOM.findDOMNode(this.refs.icn).focus();
    }
  }
  icnChange(e) {
    this.setState({icn: e.target.value});
  }
  binChange(e) {
    this.setState({bin: e.target.value});
  }
  handleBinSubmit(e) {
    e.preventDefault();
    if(this.state.bin.length == 3){
      this.setState({success: null});
      ReactDOM.findDOMNode(this.refs.icn).focus();
    } else {
      this.setState({success: false, successWords: 'Enter valid Bin', bin: ''});
    }
  }
  render() {
    return (
      <div>
        <center>
          <form className="form-inline" onSubmit={this.handleBinSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Bin #..."
                ref="bin"
                className="form-control"
                onChange={this.binChange}
                value={this.state.bin} />
            </div>
          </form>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter icn..."
                ref="icn"
                className="form-control"
                onChange={this.icnChange}
                value={this.state.icn} />
            </div>
          </form>
          <br />
          {this.state.success != null ?
            <SuccessAlert
              succ={this.state.successWords}
              alertColor={this.state.success == true ? 'alert-success' : 'alert-danger'} />
          : ''}
          <br />
          <button
            onClick={this.finalSub}
            className="btn btn-primary"
            type="button"
            disabled={this.state.array.length == 0 ? true : false}>
              Submit Bin
          </button>
        </center>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchInvMatch, postInventory, pushInventory, getInvMatch }, dispatch);
}
function mapStateToProps(state){
  return {
    inv: state.inv,
    pushInv: state.pushInv
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ColorInventory);
