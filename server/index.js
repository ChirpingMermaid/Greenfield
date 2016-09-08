var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db/index');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
global.counter = 0;

app.use(express.static(__dirname + '/../client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
  res.redirect('/index.html');
});

io.on('connection', function (socket) {

  global.counter++;
  socket.broadcast.emit('makePlayer', global.counter);
  console.log("new player joined, player: " + global.counter + " id=" + socket.id + ".");
  socket.on('disconnect', function() {
    global.counter--;

  });
});


http.listen(3000, '127.0.0.1');