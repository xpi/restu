var express = require('express'); 
var router = express.Router();
var session = require('cookie-session')
router.use(session({name:"restu",secret:"admin"}));
/* GET home page. */

router.use(function(req,res,next){
  if(req.session.admin_type){
  	 	next();
  	}else{
  		res.redirect("/main");
  	}
});


router.get('/', function(req, res, next) {
  var n  =	req.session.keys || 0;
  req.session.keys =++n;
  console.log(req.session.keys);
  res.render(req.session.admin_type, { title: '收银员界面'});

});

module.exports = router;
