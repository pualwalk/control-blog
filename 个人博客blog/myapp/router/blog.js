var express = require('express');
var router = express.Router();

var dal = require('../common/dalData');

function getLoginedUserName(req){
  var user = '';
  if(req.cookies.user){
    user = req.cookies.user;
  }
  return user;
}

router.get('/index',function(req,res){
var data = dal.getData();
 var user = getLoginedUserName(req);
 
	res.render('blog/index',{list:data,user:user});
});

router.get('/detail/:id',(req,res) => {

 dal.updateViewTimes(req.params.id);
 var data = dal.getDataByID(req.params.id);


		res.render('blog/detail',{detail:data});
});



module.exports = router;
