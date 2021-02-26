'use strict';

var path = require('path');
var http = require('http');
var fs = require('fs');
var https = require('https');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

//https configurations

  var options = {
    key: fs.readFileSync('HTTPS/server-key.pem'),
    cert: fs.readFileSync('HTTPS/server-crt.pem'),
    ca: fs.readFileSync('HTTPS/ca-crt.pem'),
    requestCert: true, 
    rejectUnauthorized: true
};

/*
httpsOptions = {
    key: fs.readFileSync("server.key"), // путь к ключу
    cert: fs.readFileSync("server.crt") // путь к сертификату
}*/


// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

// Launch https server

https.createServer(options, app).listen(serverPort, function () {

    console.log('Your HTTPS server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});


// Initialize the Swagger middleware

/*
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});*/

