//const http = require("http");
//http.createServer(function(request, response){ response.end("Hello world!"); }).listen(3000);

/*
var http = require("http");
http.createServer(function(request, response){
     
    console.log("Url: " + request.url);
    console.log("Тип запроса: " + request.method);
    console.log("User-Agent: " + request.headers["user-agent"]);
    console.log("Все заголовки");
    console.log(request.headers);
     
    response.end();
}).listen(3001);
*/

/*
const http = require("http");
http.createServer(function(request, response){
     
    response.setHeader("UserId", 12);
    response.setHeader("Content-Type", "text/html; charset=utf-8;");
    response.write("<h2>Hello world!</h2>");
    response.end();

}).listen(3000);*/

const http = require("http");
  
http.createServer(function(request, response){
      
    response.setHeader("Content-Type", "text/html");
    response.write("<!DOCTYPE html>");
    response.write("<html>");
    response.write("<head>");
    response.write("<title>Hello Node.js</title>");
    response.write("<meta charset=\"utf-8\" />");
    response.write("</head>");
    response.write("<body><h2>Hello world!</h2></body>");
    response.write("</html>");
    response.end();

}).listen(3000);
