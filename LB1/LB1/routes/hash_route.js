'use strict';
var express = require('express');
var router = express.Router();

/* GET hash.html page. */
router.get('/', function (req, res) {
    res.sendFile(__dirname + "/hash.html");
});

module.exports = router;