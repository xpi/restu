var express = require('express'); 
var router = express.Router();
var connection =require("../dbconnetion.js").connection;  
var session = require('cookie-session')
router.use(session({name:"restu",secret:"admin"}));
/* GET home page. */



router.get('/:panel', function(req, res, next) {
     var currentTab={panel1:"",panel2:"",panel3:"",panel4:"",title: '餐厅管理界面'}
     currentTab[req.params.panel]="active";
   res.render('admin', currentTab);

});


router.get('/query/staff', function(req, res, next) {
  var all_food_sql="select * from radmin";
  connection.query(all_food_sql, function (error, rows, fields) {  
    res.send(rows);
      if(error!=null){
          console.log(error); 
      }
  });
});



module.exports = router;
