'use strict';

var utils = require('../utils/writer.js');
var Hash = require('../service/HashService');

module.exports.hashPOST = function hashPOST (req, res, next) {
  Hash.hashPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
