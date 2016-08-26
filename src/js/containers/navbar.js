import React, { Component } from 'react';
import { Link } from 'react-router';
import { Nav, NavDropdown, NavItem, NavToggle, MenuItem } from 'react-bootstrap';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-inverse">
          <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbarToggle">
            &#9776;
          </button>
          <div className="collapse navbar-toggleable-xs" id="navbarToggle">
            <ul className="nav navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Production Boards
                </a>
                <div className="dropdown-menu" aria-labelledby="Preview">
                  <Link to='/dept/home' className="dropdown-item">Home</Link>
                  <Link to='/dept/mill' className="dropdown-item">Mill</Link>
                  <Link to='/dept/frame' className="dropdown-item">Frame</Link>
                  <Link to='/dept/qc' className="dropdown-item">QC</Link>
                  <Link to='/dept/door' className="dropdown-item">Door</Link>
                  <Link to='/dept/cnc' className="dropdown-item">CNC</Link>
                  <Link to='/dept/inventory' className="dropdown-item">Inventory</Link>
                  <Link to='/dept/wein' className="dropdown-item">Weinig/Assembly</Link>
                  <Link to='/dept/panel' className="dropdown-item">Panel Measure</Link>
                  <Link to='/dept/finish' className="dropdown-item">Finish</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  Calendars
                </a>
                <div className="dropdown-menu" aria-labelledby="Preview">
                  <Link to='/calendar/install' className="dropdown-item">Install</Link>
                  <Link to='/calendar/delivery' className="dropdown-item">Delivery</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  Reports
                </a>
                <div className="dropdown-menu" aria-labelledby="Preview">
                  <Link to='shipping' className="dropdown-item">Shipping</Link>
                  <Link to='orderSchedule' className="dropdown-item">Order Schedule</Link>
                  <Link to='totalStatus' className="dropdown-item">Cabinet Part Status</Link>
                  <Link to='gl' className="dropdown-item">Gl Code List</Link>
                  <Link to='maps' className="dropdown-item">Job Maps</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  Color Match
                </a>
                <div className="dropdown-menu" aria-labelledby="Preview">
                  <Link to='createMatch' className="dropdown-item">Create Color Match</Link>
                  <Link to='viewMatch' className="dropdown-item">View Color Match</Link>
                  <Link to='inventory' className="dropdown-item">Color Match Inventory</Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <br />
      </div>
    );
  }
}

export default Navbar;
