var express = require('express');	
var router = express.Router();
var connection =require("../dbconnetion.js").connection;  



/* GET home page. */
router.get('/:table_num/:bill_id', function(req, res, next) {
	console.log(router.dbconnetion);
	if(req.params.bill_id&&req.params.table_num){
		connection.query('select * from rtable where table_num  = ? and bill_id = ?',[req.params.table_num,req.params.bill_id], function (error, rows, fields) {  
   			if(rows.length==0){
   				res.render("index");
   				return;
   			}else{
   				res.render('customer', { title: '点餐主界面',bill_id:req.params.bill_id,table_num:req.params.table_num});
   			}
   		})
	}else{
		res.render("index");
	}
});



module.exports = router;
