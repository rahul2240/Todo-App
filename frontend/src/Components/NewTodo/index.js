import React, { Component } from 'react';
import superagent from 'superagent';

class NewTodo extends  Component {
  constructor() {
    super();
    this.state = {
      text: ''
    }
  }
   getAuthenticationToken() {
    return localStorage.getItem('token');
  }
  handleTextChanged(event) {
    this.setState({
      text: event.target.value
    })
  }
  submit(event) {
    event.preventDefault();
    const payload = {
      text: this.state.text
    }

    superagent
    .post("http://54.157.21.6:8080/todos")
      .set('x-auth' , this.getAuthenticationToken())
      .send(payload)
      .then(res => {
        console.log(res.body._id);
        const newTodo = {
      text: this.state.text , 
      _id: res.body._id
    } 
      this.props.addTodo(newTodo)    
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
        <div className="wrapper">
          <form 
            className="form-signin"
            onSubmit={this.submit.bind(this)}
            >       
            <h2 className="form-signin-heading">Enter The Todo</h2>
            <input type="text"
              className="form-control"
              value={this.state.text}
              onChange={this.handleTextChanged.bind(this)}
              placeholder="Enter Todo"
              />     
              <br/>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>   
          </form>
        </div>
      );
  }
}

export default NewTodo;
