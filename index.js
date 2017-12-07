const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
const todoRoutes = require('./routes/todos');

mongoose.connect(keys.mongoURI);
mongoose.Promise = Promise;

const PORT = process.env.PORT || 3500

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile("index.html");
});

app.use('/api/todos', todoRoutes);

app.listen(PORT, function() {
  console.log(`APP IS LISTENING ON PORT ${PORT}`);
});
