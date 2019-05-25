base = require('./modules/base');
Grass = require('./modules/class.grass');

// var wild = require('./modules/class.wild.js');
// var grasseater = require('./modules/class.grasseater.js');
// var mover = require('./modules/class.mover.js');
// var double = require('./modules/class.double.js');


let matrixo = require('./modules/random.js');
matrix = matrixo(40, 40);
var n = 10;
var m = n;
var side = 10;

var data = {
    matrix: matrix,
}

grassArr = [];
grassEaterArr = [];
wildArr = [];
moverArr = [];
doubleArr = [];
chameleonArr = [];



var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.emit("data", matrix);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(4000);


function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grass = new Grass(x, y);
                grassArr.push(grass);
            }
        }
    }
}
creatingObjects();

function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }

    //! Object to send
    let sendData = {
        matrix: matrix
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)