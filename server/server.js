const {ObjectId} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

var app = express();

const port = 8080;

app.use(function (req, res, next) {

     // Website you wish to allow to connect
     res.setHeader('Access-Control-Allow-Origin', '*');
-     res.setHeader('x-auth', '*');
+     res.setHeader('Access-Control-Expose-Headers', 'x-auth');

     // Request methods you wish to allow
     // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

     // Request headers you wish to allow
     res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,content-type, Accept');
 
     // Set to true if you need the website to include cookies in the requests sent
     // to the API (e.g. in case you use sessions)
     // res.setHeader('Access-Control-Allow-Credentials', true);

     // Pass to next layer of middleware
     next();
});
app.set('view engine', 'hbs');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render(__dirname + '/views/home.hbs')
});

app.post('/todos', authenticate,async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  try {
    const doc = await todo.save();
    res.send(doc);
  } catch(e) {
    res.status(400).send(e);
  };
});

app.get('/todos', authenticate,async (req, res) => {

  try {
    const todos = await Todo.find({
    _creator: req.user._id
  });
    res.send({todos})
  } catch(e) {
    res.status(400).send(e);
  };
});

app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;

  if(!ObjectId.isValid(id)){
    return res.status(400).send();
  }

  try {
    const todo = await Todo.findById(id);
      if(!todo){
        return res.status(400).send();
      }

      res.status(200).send({todo});

    } catch(e) {
      res.status(400).send(e);
    }
});

app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;

  if(!ObjectId.isValid(id)){
    return res.status(404).send();
  }

  try {
    const todo = await Todo.findByIdAndRemove(id);

    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  } catch(e) {
    res.status(400).send();
  };
});

app.patch('/todos/:id', async (req, res) => {


  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectId.isValid(id)){
    return res.status(400).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  try {
  const todo = await Todo.findByIdAndUpdate(id, {$set: body}, {new: true});
  res.status(200).send(todo);
  } catch(e) {
  res.status(400).send();
  }
});

app.post('/users', async (req, res) => {

  try {  const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch(e) {
    res.status(400).send();
  }
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', async (req, res) => {

  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredential(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch(e) {
    res.status(400).send();
  }
});

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
      await req.user.removeToken(req.token)
      res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

module.exports = {app};
