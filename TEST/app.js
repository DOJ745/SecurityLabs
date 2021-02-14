'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var hash_route = require('./routes/hash_route');
const { sha256 } = require('C:\\Users\\Andrei\\node_modules\\js-sha256');

module.exports = app; // for testing
//var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);
app.use('/users', users);
app.use('/hashroute', hash_route);

app.post("/hash", function (request, response) {
  if (!request.body) return response.sendStatus(400);
  console.log(request.body);
  response.send(`
  <html>
  <head><meta http-equiv="Content-Type" content="text/html"; charset="utf-8"/></head>
  <body>
      <p>Input string - ${request.body.strForHash}</p>
      <p>Output hash - ${sha256(request.body.strForHash)}</p>
  </body>
  </html>`);
});

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
