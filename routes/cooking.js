var express = require('express');	
var router = express.Router();
var connection =require("../dbconnetion.js").connection;  

//根据ID查找
router.get('/bill/:bill_id', function(req, res, next) {
	var cooking_by_billId = "select * from tf_state ts right join cooking_state cs on cs.cooking_state_id = ts.cooking_state_id right join rfood rf on rf.food_id = ts.food_id	 where bill_id = ?";
	connection.query(cooking_by_billId,[req.params.bill_id],function (error, rows, fields) {  
		res.send(rows);
	    if(error!=null){
	        console.log(error); 
	    }
	});
});
//根据ID查找
router.get('/bill/pay/:bill_id', function(req, res, next) {
	var cooking_by_billId = "select * from tf_state ts right join cooking_state cs on cs.cooking_state_id = ts.cooking_state_id right join rfood rf on rf.food_id = ts.food_id	 where bill_id = ? and ts.cooking_state_id > 0 ";
	connection.query(cooking_by_billId,[req.params.bill_id],function (error, rows, fields) {  
		res.send(rows);
	    if(error!=null){
	        console.log(error); 
	    }
	});
});

//根据单据ID查找
router.get('/:id', function(req, res, next) {
	var cooking_by_id = "select * from tf_state where cooking_id = ?";

	connection.query(cooking_by_id,[req.params.id],function (error, rows, fields) {  
		res.send(rows);
	    if(error!=null){
	        console.log(error); 
	    }
	});
});

//筛选单据
router.get('/cooking_state/:compare/:cooking_state_id', function(req, res, next) {
	var base = "select * from tf_state ts right join rfood rf  on rf.food_id = ts.food_id right join rbill rb on rb.bill_id = ts.bill_id where "
	var lt_csta = base+"cooking_state_id < ?"
	var gt_csta = base+"cooking_state_id > ? "
	var eq_csta =  base+"cooking_state_id = ?"

	var find_cookings_sql = "select * from tf_state";
	if(req.params.compare=="lt"){
		find_cookings_sql=lt_csta;
	}else if(req.params.compare=="gt"){
		find_cookings_sql=gt_csta;
	}else if(req.params.compare=="eq"){
		find_cookings_sql=eq_csta;
	}
	find_cookings_sql+=" and rb.pay_state = 0"
	connection.query(find_cookings_sql,[req.params.cooking_state_id],function (error, rows, fields) {  
		res.send(rows);
	    if(error!=null){
	        console.log(error); 
	    }
	});
});

//新增戴点餐
router.post('/add',function(req,res,next){
	var add_cooking_sql="insert into tf_state(bill_id,table_num,food_id,order_date,cooking_id) values(?,?,?,?,?)";

	var bill_id = req.body.bill_id;
	var table_num = req.body.table_num;
	var food_id = req.body.food_id;
	var cooking_id = table_num+new Date().getTime();
	console.log(req.body);
	var insert_data = [bill_id,table_num,food_id,new Date().getTime(),cooking_id];
	connection.query(add_cooking_sql,insert_data,function (error, rows, fields) {  
		res.send({cooking_id:cooking_id});
	    if(error!=null){
	        console.log(error); 
	    }
	});
});

//更改状态
router.post('/update/state/',function(req,res,next){
	var update_state_sql="update tf_state set cooking_state_id = ? where cooking_id = ?";
	var cooking_id = req.body.cooking_id;
	var cooking_state_id = req.body.cooking_state_id;
	var update_data = [cooking_state_id,cooking_id];
	connection.query(update_state_sql,update_data,function (error, rows, fields) {  
		res.send(rows);
	    if(error!=null){
	        console.log(error); 
	    }
	});
});




module.exports = router;
