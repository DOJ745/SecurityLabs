'use strict';

var utils = require('../utils/writer.js');
var Index = require('../service/IndexService');

module.exports.rootGET = function rootGET (req, res, next) {
  Index.rootGET()
    .then(function (response) {
      //res.send(`<h1>Hello world!</h1>`); - cause error
      utils.writeJson(res, response);
      //response.send(`<h1>Hello world!</h1>`);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
