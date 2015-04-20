var express = require('express'); 
var router = express.Router();
var connection =require("../dbconnetion.js").connection;  
var session = require('cookie-session')
router.use(session({name:"restu",secret:"admin"}));
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('main', { title: '餐厅管理登录界面'});
});


router.post('/login', function(req, res, next) {
  	connection.query('select * from radmin where admin_user = ? and admin_pwd = ?',[req.body.admin_user,req.body.admin_pwd] ,function (error, rows, fields) {  
  		if(rows.length==0){
  			res.send("密码错误<a href='/main'>返回</a>");
  		}else{	
  		var admin_type = rows[0].admin_type;
  		req.session.admin_type=admin_type;
  		res.redirect("/"+admin_type);
   		}
   })

});



module.exports = router;
