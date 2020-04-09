var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

var app = express();

// ROUTES

var user_routes = require('./routes/user');
var categoria_routes = require('./routes/categoria');
var producto_routes = require('./routes/producto');


mongoose.connect('mongodb://localhost:27017/sistema',{useUnifiedTopology: true, useNewUrlParser:true}, (err, res) =>{
    if(err){
        throw err;
    }else{
        console.log("Servidor funcionando");
        app.listen(port, function(){
            console.log("Servidor conectado en " + port);
        });
    }
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use('/api', user_routes);
app.use('/api', categoria_routes);
app.use('/api', producto_routes);


module.exports = app;