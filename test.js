var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index',{});
});

//路由
var routes = ["client","table","food","bill","cooking","customer","kitchen","counter","account"];
for(i in routes){
  app.use('/'+routes[i], require('./routes/'+routes[i]));
}


//websocket
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.of('/client').on('connection', function (socket) {
  console.log("connection");
  socket.on('news',function(data){
  	console.log(data);
  	io.emit('news',data);
  });
});


server.listen(3000);
