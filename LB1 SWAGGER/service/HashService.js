'use strict';
/**
 * Returns hash
 *
 * no response value expected for this operation
 **/

const crypto = require('crypto');
//var sha256 = require('js-sha256').sha256;

//sha256(res.json({requestBody: req.body}))
//var crypt_message = sha256('hello world!');
//var resultOf = request.body;

exports.hashPOST = function(req) {
  return new Promise(function(resolve, reject) {

  var data = req.body.data;
  //console.log(data);
  var hash = crypto.createHash("sha256").update(data, "utf-8").digest("hex")

  hash = hash.split("").map(function (ch){ return ch.charCodeAt(0).toString(16) }).join(" ")

  var response = {};
  response['application/json'] = {"hash": hash};

  if (Object.keys(response).length > 0) {
    resolve(`HASH result - ${response[Object.keys(response)[0]]}`);
    // HASH result - ${response[Object.keys(response)[0]]}
  } else { resolve("Empty resolve"); }

  });
}

