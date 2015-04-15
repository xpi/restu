var express = require('express');	
var router = express.Router();
var connection =require("../dbconnetion.js").connection;  

/* GET home page. */
router.get('/', function(req, res, next) {
   connection.query('select * from rtable', function (error, rows, fields) {  
         res.send(rows);
   })
});
router.get('/init', function(req, res, next) {
   res.render('init',{});
});

router.get('/:num/', function(req, res, next) {
   connection.query('select * from rtable where table_num  = ?',[req.params.num], function (error, rows, fields) {  
   		res.send(rows);
         if(error){
            console.log(error)
         }
   })
});

router.get('/need/pay', function(req, res, next) {
   connection.query('select * from rtable rt left join rbill rb on rb.bill_id = rt.bill_id where rt.bill_id is not null and rb.pay_state < 3', function (error, rows, fields) {  
   		res.send(rows);
         if(error){
            console.log(error)
         }
   })
});

router.post('/add', function(req, res, next) {
   connection.query('insert into rtable(table_num) values(?)', [req.body.table_num],function (error, rows, fields) {  
   		res.send(rows);
         if(error){
            console.log(error)
         }
   })
});

router.post('/clear',function(req,res,next){
   connection.query('update rtable set bill_id = null where table_num = ? ', [Number(req.body.table_num)],function (error, rows, fields) {  
         res.send(rows);
         if(error){
            console.log(error)
         }
   })
});

module.exports = router;
