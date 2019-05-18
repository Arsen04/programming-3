var base = require('./modules/base');
var grass = require('./modules/grass');
// var wild = require('./modules/class.wild.js');
// var grasseater = require('./modules/class.grasseater.js');
// var mover = require('./modules/class.mover.js');
// var double = require('./modules/class.double.js');


var matrix = matrixo(40, 40);
var grassArr = [];
var grassEaterArr = [];
var wildArr = [];
var moverArr = [];
var doubleArr = [];
var chameleonArr = [];


let random = require('./modules/random');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
server.listen(4000);