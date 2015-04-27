var express = require('express');	
var router = express.Router();
var session = require('cookie-session')
router.use(session({name:"restu",secret:"admin"}));

router.use(function(req,res,next){
	
  if(req.session.admin_type&&req.session.admin_type=='kitchen'){
  	 	next();
  	}else{
  		res.redirect("/main");
  	}
});

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(router.dbconnetion);
	res.render('kitchen', { title: '后厨界面'});

});

module.exports = router;
