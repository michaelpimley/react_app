import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchAllMatch } from '../actions/index.js';
import InputBar from '../components/color_match_view/component_input';
import ViewMatches from '../components/color_match_view/component_view_matches';
import ErrorAlert from '../components/color_match_create/component_error';

class ColorViewer extends Component {
  constructor(props) {
    super(props);
    this.state={ jobNo: '', error: null, errorWords: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }
  handleChange(e) {
    this.setState({ jobNo: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    if(this.state.jobNo.length == 5) {
      this.props.fetchAllMatch(this.state.jobNo);
    }
  }
  componentWillReceiveProps(newProps){
    if(newProps.allMatch.length == 0){
      this.setState({ errorWords: 'Please verify job number and try again.', error: true });
    } else {
      this.setState({ errorWords: '', error: null });
    }
  }
  handleExit(e){
    e.preventDefault();
    this.setState({ error: null, jobNo: '' });
  }
  render() {
    return (
      <div className="container-fluid">
        <center>
          <InputBar
            jobNo={this.state.jobNo}
            change={this.handleChange}
            submit={this.handleSubmit} />
          <br />
          { this.props.allMatch.length > 0 ? <ViewMatches data={this.props.allMatch} /> : '' }
          { this.state.error ? <ErrorAlert func={this.handleExit} words={this.state.errorWords} /> : '' }
        </center>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAllMatch }, dispatch);
}
function mapStateToProps(state){
  return {
    allMatch: state.allMatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ColorViewer);
