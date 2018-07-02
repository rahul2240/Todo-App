import React, { Component } from 'react';
import superagent from 'superagent';
import Navbarcustom from '../Navbarcustom/';
class Login extends  Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }
  handleemailChanged(event) {
    this.setState({email: event.target.value});
  }
   handlePasswordChanged(event) {
    this.setState({password: event.target.value});
  }
  submitForm(event) {
    event.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password
    }
    superagent
  .post("http://54.157.21.6:8080/users/login")
      .set("Content-Type", "application/json")
      .send(payload)
      .then(res => {
        console.log(res);        
        localStorage.setItem("token", res.headers["x-auth"]);
        this.props.onSuccessfulLogin();
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  render() {
    return (
      <div>
       <Navbarcustom />
        <div className="wrapper">
          <form 
            className="form-signin"
            onSubmit={this.submitForm.bind(this)}
            >       
            <h2 className="form-signin-heading">Please login</h2>
            <input type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleemailChanged.bind(this)}
              placeholder="Email"
              />
            <input type="password" 
              className="form-control" 
              value={this.state.password} 
              name="password"
              placeholder="Password"
              onChange={this.handlePasswordChanged.bind(this)}
              />      
            <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
          </form>
        </div>
      </div>
      );
  }
}

export default Login;
