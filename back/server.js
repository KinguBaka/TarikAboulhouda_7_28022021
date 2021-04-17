// Imports
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require("./apiRouter").router;

// Instantiate server
const server = express();

// Body parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(express.static('public'));

// Configure routes

server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

server.use('/api/', apiRouter);

// Launch server
const port = 3000;
server.listen(port, function() {
    console.log('Serveur en écoute sur le port :  ' + port)
});