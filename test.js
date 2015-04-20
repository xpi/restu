var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('cookie-session');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index',{title:'开单页面'});
});

//路由
var admin_routes = ["admin","main","table","food","bill","cooking","customer","kitchen","waiter","counter","account"];
for(i in admin_routes){
  var router = require('./routes/'+admin_routes[i]); 
  app.use('/'+admin_routes[i], router);
}


var states = ['order','pay','finishpay','cooking','cook_state']; 
//websocket
var server = require('http').Server(app);
var io = require('socket.io')(server);
for(index in states){
  (function(index){
    io.of('/'+states[index]).on('connection', function (socket) {
      console.log(socket.id);
      socket.on(states[index], function (data,fn) {
          console.log(data);
          console.log(states[index]); 
          fn(200);
          io.emit(states[index], data); 
      });
    });
   })(index); 
}
server.listen(3000);
