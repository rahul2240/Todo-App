const {MongoClient, ObjectId} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if(err) {
    return console.log('Unable to connect to mongodb server');
  }

  var db = client.db('TodoApp');
  console.log('Connected to mongodb server');

  db.collection('Todos').find({
    _id: new ObjectId('5b18d34ea9d37433ccc4a805')
  }).toArray().then((docs) => {

    console.log(JSON.stringify(docs, undefined , 2));
  }, (err) => {
    console.log('Unable to find todos');
  });

  client.close();
});
