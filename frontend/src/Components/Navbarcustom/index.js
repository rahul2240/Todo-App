import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
class Navbarcustom extends Component {
  
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Testing</a>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <NavLink to="/">SignUp</NavLink>
              </li>
              <li>
                <NavLink to="/Login">Login</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      );
  }
}

export default Navbarcustom;
