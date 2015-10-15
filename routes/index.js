var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../views/index.html'));
});

router.get('/tutorial', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../views/tutorial.html'));
});

router.get('/about', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../views/about.html'));
});

module.exports = router;
