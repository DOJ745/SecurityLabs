// Подключение express
const express = require("express");
const bodyParser = require("body-parser");

// Создаем объект приложения
const app = express();

/*
// Определяем обработчик для маршрута "/"
app.get("/", function(request, response){
     
    // Отправляем ответ
    response.send("<h2>Привет Express!</h2>");
});
// Начинаем прослушивать подключения на 3000 порту
app.listen(3000);*/

/*
app.get("/", function(request, response){
    response.send("<h1>Главная страница</h1>");
});

app.get("/about", function(request, response){
    response.send("<h1>О сайте</h1>");
});

app.get("/contact", function(request, response){
    response.send("<h1>Контакты</h1>");
});

app.listen(3000);*/

// Отправка html страницы
// C помощью __dirname получаем абсолютный путь к текущему проекту

/*
app.use(function (request, response) {
    response.sendFile(__dirname + "/start_page.html");
  });
*/

// Отправка ответа в виде кода-статуса с пояснением
/*
app.use("/home/dir1/dir2", function (request, response) {
    response.status(404).send(`Ресурс не найден`);
});
*/


// Отправка аргументов в запросе (GET)

/*
app.get("/", function(request, response) {
    response.sendFile(__dirname + "/start_page.html");
});

app.use("/about", function(request, response) {
    let id = request.query.id;
    let userName = request.query.name;
    response.send("<h1>Информация о полученных атрибутах</h1><p>id = " + id +"</p><p>name = " + userName + "</p>");
});
*/

// Cоздаем парсер для данных application/x-www-form-urlencoded

/*
 В функцию urlencoded() передается объект, устанавливающий параметры парсинга. 
 Значение extended: false указывает, что объект - 
 результат парсинга будет представлять набор пар ключ-значение, 
 а каждое значение может быть представлено в виде строки или массива.
*/
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.get("/register", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/register.html");
});

app.post("/register", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`<h3>Результат ----- ${request.body.userName} - ${request.body.userAge}</h3>`);
});
  
app.get("/", function(request, response){
    response.send("Главная страница");
});

app.listen(3000);