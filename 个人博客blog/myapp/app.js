 var express = require('express');
 var app = express();
 var path = require('path');
var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');

 app.use(bodyParser.urlencoded({ extended: false }));
 // parse application/json
 app.use(bodyParser.json());

app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
var template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');


app.get('/login',(req,res) => {

    res.redirect('/login/register')
});

app.get('/',function(req,res){

  res.redirect('/blog/index');

});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users',require('./router/admin/blogs'));
app.use('/blog',require('./router/blog'));
app.use('/login',require('./router/login/login'));


app.listen(5000,function(){
  console.log('服务器运行于5000端口....');
});
