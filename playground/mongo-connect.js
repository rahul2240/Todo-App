const {MongoClient} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if(err) {
    return console.log('Unable to connect to mongodb server');
  }

  var db = client.db('TodoApp');
  console.log('Connected to mongodb server');

  db.collection('Todos').insertOne({
    text: 'something else',
    completed: true
  }, (err, result) => {
      if (err) {
        return console.log('Unable to insert', err);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
  });

  client.close();
});
