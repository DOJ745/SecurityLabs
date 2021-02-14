const http = require("http");
const os = require("os");

const greeting = require("./greeting");
const User = require("./user.js");

// Получим имя текущего пользователя
let userName = os.userInfo().username;
console.log(userName);

console.log(`Дата запроса: ${greeting.date}`);
console.log(greeting.getMessage(userName));

let random_user = new User("Andrew", 19);
random_user.sayHi();

// Тесты с greeting

var greeting1 = require("./greeting.js");
console.log(`Hello ${greeting1.name}`);
 
var greeting2 = require("./greeting.js");
greeting2.name = "Bob";
 
console.log(`Hello ${greeting2.name} ----- greeeting2`);
// greeting1.name тоже изменилось!
console.log(`Hello ${greeting1.name} ----- greeeting1`); 

const welcome = require("./welcome");
 
welcome.getMorningMessage();
welcome.getEveningMessage();

/*
http.createServer(function(request,response) { response.end("Hello NodeJS!"); })
.listen(3000, "127.0.0.1",function(){
    console.log("Сервер начал прослушивание запросов на порту 3000");
});*/