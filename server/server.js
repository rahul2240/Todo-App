const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  complete: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

var newTodo = new Todo({
  text: 'second todo',
  complete: true,
  completedAt: 123
});

newTodo.save().then((doc) => {
  console.log(doc);
}, (e) => {
  console.log('Unable to connect to the database');
});
