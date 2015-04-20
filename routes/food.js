var express = require('express');	
var router = express.Router();
var path = require('path');
var fs = require('fs');
var connection =require("../dbconnetion.js").connection;  
var session = require('cookie-session')
var multer  = require('multer')
router.use(multer({ dest: './public/food_pic',rename:function (fieldname, filename, req, res) {
  return req.body.food_id;
}}));

router.use(session({name:"restu",secret:"admin"}));

//所有菜式
router.get('/', function(req, res, next) {
	var all_food_sql="select * from rfood";
	connection.query(all_food_sql, function (error, rows, fields) {  
		var foods = {};
		for(i in rows){
			foods[rows[i].food_id]=rows[i]
		}
		res.send(foods);
	    if(error!=null){
	        console.log(error); 
	    }
	});
});

//根据ID查找菜式
router.get('/:id', function(req, res, next) {
	var find_food_by_id = "select * from rfood where food_id = ?"
	connection.query(find_food_by_id,[req.params.id],function (error, rows, fields) {  
		res.send(rows);
	    if(error!=null){
	        console.log(error); 
	    }
	});
});


router.use('/add',function(req,res,next){
  if(req.session.admin_type){
  	 	next();
  	}else{
  		res.redirect("/main");
  	}
});

//添加菜式
router.post('/add', function(req, res, next) {
	var add_food_sql="insert into rfood(food_id,food_name,food_price) values(?,?,?)"
	console.log(req.body)
	console.log(req.files)
	connection.query(add_food_sql,[req.body.food_id,req.body.food_name,req.body.food_price],function (error, rows, fields) {  
		res.rediect("/admin/panel2");
	    if(error!=null){
	        console.log(error); 
	    }
	});
});

//根据ID删除菜式
router.post('/delete', function(req, res, next) {
	var add_food_sql="delete from rfood where food_id= ?"
	connection.query(add_food_sql,[req.body.food_id],function (error, rows, fields) {  
		res.send(rows);
	    if(error!=null){
	        console.log(error); 
	    }
	});
});



module.exports = router;
