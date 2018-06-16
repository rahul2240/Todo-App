const expect = require('expect');
const request = require('supertest');

const {Todo} = require('./../models/todo');
const {app} = require('./../server');
const {ObjectID} = require('mongodb');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');



beforeEach(populateUsers);
beforeEach(populateTodos);


describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      })
  });

  it('should not create a new todo', (done) => {
    var text = '';

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
      .end((err,res) => {
        if(err) {
          return done(err)
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });

});

  describe('GET /todos', () => {
    it('should return all todos', (done) => {
      request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(1);
      })
      .end(done)
    });
  });

  describe('GET /todos/:id', () => {
    it('should return the todo by id', (done) => {
      request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        //expect(res.body.todo.id).toBe(todos[0]._id.toHexString());
        expect(res.body.todo.text).toBe('text 1');
      })
      .end(done)
    });

    it('should return 400 on bad id', (done) => {
      request(app)
      .get('/todos/123')
      .expect(400)
      .end(done)
    });
  });

  describe('DELETE /todos/:id', () => {

    it('should delete a todo', (done) => {
      var hexId = todos[0]._id.toHexString();

      request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('text 1');
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      })
    });

    it('should return 404 if todo not found', (done) => {
      var id = new ObjectID().toHexString();

      request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
    });

    it('should return 404 if todo id is invalid', (done) => {
      var id = '123'

      request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
    });
  });

  describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
      var id = todos[0]._id.toHexString();
      var text = 'hello everyone';

      request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
      expect(res.body.text).toBe(text);
      expect(res.body.completedAt).toBeTruthy();

      })
      .end(done);

    });

    it('should clear completedAt when todo is not completed', (done) => {
      var hexId = todos[1]._id.toHexString();
      var text = 'This should be the new text!!';

      request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: false,
          text
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
          expect(res.body.completedAt).toBeFalsy();
        })
        .end(done);
    });
  });
