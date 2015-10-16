var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/tutorial', function(req, res, next) {
  res.render('tutorial');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

module.exports = router;
