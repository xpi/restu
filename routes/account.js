var express = require('express'); 
var router = express.Router();

/* GET home page. */
router.get('/:table_num/:bill_id', function(req, res, next) {
  console.log(router.dbconnetion);
  res.render('account', { title: '结账界面',table_num:req.params.table_num,bill_id:req.params.bill_id});
});

module.exports = router;
