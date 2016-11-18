var express = require('express');
var router = express.Router();

var fs = require('fs');

var dalData = require('../../common/dalData');

var arr = dalData.getUserData();


function getLoginedUserName(req) {
    var user = '';
    if (req.cookies.user) {
        user = req.cookies.user;
    }
    return user;
}

//登录
router.get('/login', (req, res) => {

    res.render('login/login');
});

router.get('/validate_email', (req, res) => {

    var arrFilterResult = arr.filter(function(item) {
        if (item.email == req.query.email) {
            return item;
        }
    });

    if (arrFilterResult.length > 0) {
        res.send('false');
    } else {
        res.send('true');
    }

})

router.get('/register', (req, res) => {
    res.render('login/register');
});

router.post('/create', (req, res) => {

    arr.push(req.body);

    fs.writeFileSync('./data/usersRegister.json', JSON.stringify(arr));

    res.render('login/login');
});

router.post('/user', (req, res) => {

    var user = req.body;

    var arrFilterResult = arr.filter(function(item) {

        if (user.email == item.email && user.password == item.password) {

            return item;
        }
    });

    if (arrFilterResult.length <= 0 ) {
      var loginFalse = 'true';

      res.render('login/login',{loginFalse:loginFalse});
    } else {

        res.cookie('user', arrFilterResult, {
            path: '/'
        });
        res.redirect('/login/userhome');
    }
})

router.get('/userhome', (req, res) => {

    if (req.cookies.user) {

        res.render('blog/userHome', {
            list: req.cookies.user
        })
    } else {
        res.render('login/login');
    }

})

router.post('/clear', (req, res) => {
    res.clearCookie('user', {
        path: '/'
    });
    res.redirect('/blog/index');
});

module.exports = router;
