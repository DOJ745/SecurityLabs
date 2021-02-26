'use strict';

var path = require('path');
var http = require('http');
var fs = require('fs');
var https = require('https');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
    key: fs.readFileSync('HTTPS2/key.pem'),
    cert: fs.readFileSync('HTTPS2/cert.pem')
    //requestCert: false, 
    //rejectUnauthorized: false
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

https.createServer(options, app).listen(serverPort, function () {
    console.log('Your HTTPS server is listening on port %d (https://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on https://localhost:%d/docs', serverPort);
});


// Initialize the Swagger middleware

/*
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});*/

