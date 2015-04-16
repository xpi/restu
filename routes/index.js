var express = require('express');	
var router = express.Router();
var connection =require("../dbconnetion.js").connection;  

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(router.dbconnetion);
  res.render('index', { title: '开单页面'});
});


module.exports = router;
