var mysql = require("mysql");  
  
var connection = mysql.createConnection({  
    host: 'localhost',  
    user: "root",  
    password: "",  
    database: "restu" 
});
  
 exports.connection = connection;
//   connection.query('select * from rbill where bill_id= ?',[req.params.bill_id] , function (error, rows, fields) {  
//     if(error!=null){
//         console.log(error); 
//     }
// });