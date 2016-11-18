
var express = require('express');
var router = express.Router();
var fs = require('fs');
var dal = require('../../common/dalData');

//发表页面
router.get('/add',function(req,res){

    var postUrl = '/users/create';
    res.render('admin/add',{data:{},postUrl:postUrl});

})
//列表页面
router.get('/list',function(req,res){
  var data = dal.getData();

  res.render('admin/list',{list:data});
});

//修改页面
router.get('/edit/:id',(req,res) =>{
  var data = dal.getDataByID(req.params.id);

  var postUrl = '/users/update/'+req.params.id;
  res.render('admin/add',{data:data,postUrl:postUrl});

})

router.post('/create',function(req,res){
  var arr = dal.getData();
  var blog = {};
  blog = req.body;
  var now = new Date();
  blog.id = now.getTime();
  blog.create_time = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
  blog.view_times = 0;
  arr.push(req.body);
  fs.writeFile('./data/users.json', JSON.stringify(arr));
  res.redirect('/users/list');

});

//删除数据
router.post('/delete',(req,res) =>{

      dal.getDelDataByID(req.body.id);
    res.redirect('/users/list');
});

//修改表单数据
router.post('/update/:id',(req,res) =>{
  dal.update(req.params.id,req.body);
  res.redirect('/users/list');
});


module.exports = router;
