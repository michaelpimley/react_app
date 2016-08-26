import React, { Component } from 'react';

import Navbar from '../containers/navbar.js';

export default class App extends Component{
  render () {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}
