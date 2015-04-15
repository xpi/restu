var express = require('express');	
var router = express.Router();
var connection =require("../dbconnetion.js").connection;  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('client', { title: 'Express' ,data:["hello","word"]});
});

module.exports = router;
