var express = require('express');	
var router = express.Router();
var connection =require("../dbconnetion.js").connection;  



//根据ID查找单据 
router.get('/:id', function(req, res, next) {
	var find_bill_by_id = "select * from rbill rb right join pay_state ps on ps.pay_state = rb.pay_state where bill_id = ?";

	connection.query(find_bill_by_id,[req.params.id],function (error, rows, fields) {  
		console.log(rows);
		res.send(rows);
	    if(error!=null){
	        console.log(error); 
	    }
	});
});

//筛选单据
router.get('/paystate/:compare/:pay_state', function(req, res, next) {

	var lt_psta_bill = "select * from rbill where pay_state < ?"
	var gt_psta_bill = "select * from rbill where pay_state > ?"
	var eq_psta_bill = "select * from rbill where pay_state = ?"

	var find_bills_sql = "select * from rbill";
	if(req.params.compare=="lt"){
		find_bills_sql=lt_psta_bill;
	}else if(req.params.compare=="gt"){
		find_bills_sql=gt_psta_bill;
	}else if(req.params.compare=="eq"){
		find_bills_sql=eq_psta_bill;

	}
	connection.query(find_bills_sql,[req.params.pay_state],function (error, rows, fields) {  
		res.send(rows);
	    if(error!=null){
	        console.log(error); 
	    }
	});
});

//新增单据
router.post('/add/:table_num',function(req,res,next){
	var add_bill_sql="insert into rbill(bill_id,table_num,create_date) values(?,?,?)";
	var update_table_bill="update rtable set bill_id = ? where table_num = ?";
	var bill_id = req.params.table_num+""+new Date().getTime();
	var insert_data = [bill_id,req.params.table_num,new Date().getTime()];
	var update_data = [bill_id,req.params.table_num];
	
	connection.query(update_table_bill,update_data,function (error, rows, fields) {  
	    if(error!=null){
	        console.log(error); 
	    }
	});

	connection.query(add_bill_sql,insert_data,function (error, rows, fields) {  
		res.send({bill_id:bill_id});
	    if(error!=null){						
	        console.log(error); 
	    }
	});
});

router.post('/update/pay_state',function(req,res,next){
	var update_bill_pay_state="update rbill set pay_state = ? where bill_id = ?";
	var update_data = [req.body.pay_state,req.body.bill_id];
	console.log(update_data);
	connection.query(update_bill_pay_state,update_data,function (error, rows, fields) {  
		res.send({bill_id:req.body.bill_id});
	    if(error!=null){
	        console.log(error); 
	    }
	});
});


module.exports = router;
