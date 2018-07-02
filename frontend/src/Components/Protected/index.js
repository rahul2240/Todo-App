import React, { Component } from 'react';
import superagent from 'superagent'; 
import NewTodo from '../NewTodo';
class Protected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
    }
  }

  getAuthenticationToken() {
    return localStorage.getItem('token');
  }
  handleAddTodo = (newTodo) => {
    this.setState(oldState => ({
      todo: [...oldState.todo, newTodo]
    }))
  }
  handleDelete(id) {
    console.log(id)
    const remainingTodos = this.state.todo.filter(todo => todo._id !== id)
    console.log({remainingTodos});
    this.setState({
      todo: remainingTodos
    })
    superagent
     .del('http://54.157.21.6:8080/todos/' + id)
      .set('x-auth' , this.getAuthenticationToken())
      .then(res => {
        console.log(res);
      })
      .catch(err =>
         console.log(err)
        );
  }
  componentDidMount() {
    superagent
      .get('http://54.157.21.6:8080/todos')
      .set("Content-Type", "application/json")
      .set('x-auth' , this.getAuthenticationToken())
      .then(res => {
        const todo = res.body.todos;
         this.setState({ todo: todo });       
      })
      .catch(err => {
        console.log("error", err);
      });
  }

render() {
  return (
    <div className="App"> 
    <NewTodo addTodo={(this.handleAddTodo)} />
    <h1 style={{textAlign: 'center'}}>TODOS</h1>
    <br/>
      {this.state.todo.map(data => {
          return (
              <div key={data._id}>
              <h3 style={{display: 'inline-block'}}>
              {this.state.todo.indexOf(data)+1})&nbsp;
              </h3>
                <h3 style={{ textTransform: "upperCase" , display: 'inline-block' }}>
                  { data.text}
                </h3>
                <button 
                className="btn btn-danger"
                id={data._id}
                onClick={this.handleDelete.bind(this, data._id )}>
                Delete
                </button>
                </div>
              
          );
        })}
    </div>
    );
  }
}
export default Protected;
