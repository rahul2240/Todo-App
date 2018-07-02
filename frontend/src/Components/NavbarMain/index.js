import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
// import superagent from 'superagent';
class NavbarMain extends Component {
  
 getAuthenticationToken() {
    return  localStorage.getItem('token');
  }

  handleLogout() {
     // superagent
     // .del('http://54.157.21.6:8080/me/' + this.getAuthenticationToken())
     // .set('x-auth' , this.getAuthenticationToken())
     // .then(res => {
        localStorage.removeItem('token');
      //  })
      // .catch(err =>
      //    console.log(err)
      //    );
           
      
  }
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return token && token.length > 10;
  }
  render() {
     const isAlreadyAuthenticated = this.isAuthenticated();
    return (
      <div className="App">
      { !isAlreadyAuthenticated ? <Redirect to={{
        pathname: '/Login'
      }}/> : (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li>
              <NavLink to="#">
                <button
                className="btn btn-link" 
                onClick={this.handleLogout.bind(this)}>
                Logout
                </button>
                </NavLink>
                </li>
                <li>
                <NavLink to="/Protected/NewTodo">
                <button
                className="btn btn-link"
                >
                CreateTodo
                </button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/Protected/Directory">
                <button
                className="btn btn-link"
                >
                Dashboard
                </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        )
    }
      </div>
      );
  }
}

export default NavbarMain;
