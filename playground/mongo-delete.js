const {MongoClient, ObjectId} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if(err) {
    return console.log('Unable to connect to mongodb server');
  }

  var db = client.db('TodoApp');
  console.log('Connected to mongodb server');

  // Delete Many
  // db.collection('Todos').deleteMany({text: 'hello'}).then((result) => {
  //   console.log(result);
  // });

  // Delete One
  // db.collection('Todos').deleteOne({text: 'something'}).then((result) => {
  //   console.log(result);
  // })

  // FindOneAndDelete
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  });

  client.close();
});
