'use strict';

var path = require('path');
var http = require('http');
var fs = require('fs');
var https = require('https');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

//https configurations

var key = fs.readFileSync('encryption/private.key');
var cert = fs.readFileSync( 'encryption/server.crt' );
//var ca = fs.readFileSync( 'encryption/intermediate.crt' );

var options = {
    key: key,
    cert: cert
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

https.createServer(httpsOptions, app).listen(serverPort, function () {
    console.log('Your HTTPS server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});


// Initialize the Swagger middleware

/*
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});*/

