var express = require('express');	
var router = express.Router();
var connection =require("../dbconnetion.js").connection;  

var all_food_sql="select * from rfood";
var find_food_by_id = "select * from rfood where food_id = ?"


//所有菜式
router.get('/', function(req, res, next) {
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
	connection.query(find_food_by_id,[req.params.id],function (error, rows, fields) {  
		res.send(rows);
	    if(error!=null){
	        console.log(error); 
	    }
	});
});



//根据ID查找菜式
router.post('/add', function(req, res, next) {
	var add_food_sql="insert into rfood(food_id,food_name,food_price) values(?,?,?)"
	connection.query(add_food_sql,[req.body.food_id,req.body.food_name,req.body.food_price],function (error, rows, fields) {  
		res.send(rows);
	    if(error!=null){
	        console.log(error); 
	    }
	});
});



module.exports = router;
