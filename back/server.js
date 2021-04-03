// Imports
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require("./apiRouter").router;

// Instantiate server
const server = express();

// Body parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configure routes
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', '*');
    next();

    server.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', '*');
        res.send();
    });
});

server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1> Bonjour sur mon serveur </h1>');
});

server.use('/api/', apiRouter);

// Launch server
const port = 3000;
server.listen(port, function() {
    console.log('Serveur en écoute sur le port :  ' + port)
});