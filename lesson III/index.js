var express = require("express");
var app = express();

app.get('/', function(req, res){
    res.send("<h1>Hello world</h1>");
});

app.get('/:name', function(req, res){
    var name = req.params.name;
    console.log(req.params);
    
    res.send('<h1>Hello ' + name + '</h1>');
});

app.get('/google/:search', function(req, res){
    var search = req.params.search;    
    res.redirect("https://www.google.com/search?q=" + search);
});

app.listen(4000, function(){
    console.log('Example is running on port 4000');
});