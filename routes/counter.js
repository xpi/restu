var express = require('express'); 
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(router.dbconnetion);
  res.render('counter', { title: '收银员界面'});

});

module.exports = router;
