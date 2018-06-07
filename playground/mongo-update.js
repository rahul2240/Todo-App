const {MongoClient, ObjectId} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if(err) {
    return console.log('Unable to connect to mongodb server');
  }

  var db = client.db('TodoApp');
  console.log('Connected to mongodb server');

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectId('5b18d3a562d0a633ed435292')
  }, {
    $set: {
      completed: false
    }
  },
  {
    returnOriginal: false
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });

  client.close();
});
