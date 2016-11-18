var fs = require('fs');

 var dalData = {};

 //获取用户数据
 dalData.getUserData = function(){
   var strData = fs.readFileSync('./data/usersRegister.json').toString();
   var arr = [];
   if (strData) {
      arr = JSON.parse(strData);
   }
   return arr;
 }

 //获取文章数据
 dalData.getData = function(){
   var strData = fs.readFileSync('./data/users.json').toString();
   var arr = [];
   if (strData) {
     arr = JSON.parse(strData);
   }
   return arr;
 }

//根据 id 更新数据

dalData.update = function(id,data){
  var arr = this.getData();

  var index = arr.findIndex(function(item){
    return item.id == id;
  })
  arr[index].name = data.name;
  arr[index].nickName = data.nickName;
  arr[index].detail = data.detail;
 this.save(arr);
}

/**
 * 根据ID删除数据
 */
dalData.getDelDataByID = function(id){
  var arr = this.getData();
  var result = arr.filter(function(item){
    if (item.id != id) {
        return item;
    }

  });
 this.save(result);
}

//根据ID获取数据
dalData.getDataByID = function(id){

    var arr = this.getData();
    var id = arr.filter(function(item){

        if (item.id == id) {

            return item;
        }
    });

    if (id.length > 0) {
       return id[0];
    }else{
      return {};
    }
}

 /**
  * 保存数据
  */
 dalData.save = function(arr){
 	fs.writeFileSync('./data/users.json',JSON.stringify(arr));
 }

//点击次数
 dalData.updateViewTimes = function(id){
 	var arr = this.getData();
 	var result = arr.filter(function(item){
 		if (item.id == id) {
 			return item.view_times+=1;
 		}else{
 			return item;
 		}
 	});
 	this.save(result);
 }


module.exports = dalData;
