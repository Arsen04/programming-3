var wild = require('./modules/class.wild.js');
var base = require('./modules/base.js');
var cl = require('./modules/class.js');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
server.listen(4000);