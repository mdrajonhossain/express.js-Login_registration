var express = require('express');
var session = require('express-session')

const cookieParser = require('cookie-parser');
// const session = require('express-session');
 
var bcrypt = require('bcryptjs');
var router = express.Router();
var {cassandra,models,User} = require('../models/User');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/registration', function(req, res, next) {
  res.render('registration');
});



router.post('/regi_form', async function(req, res, next) {
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;	
	var salt = bcrypt.genSaltSync(10);
	var password = bcrypt.hashSync(password, salt);

	var data = new models.instance.User({email:email, username:username, password:password});	
	data.save();
	res.redirect('/')
});




router.post('/loginpage', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	models.instance.User.findOne({username:username},{raw:true, allow_filtering: true}, function(err, people){     			 	

		bcrypt.compare(password, people.password, function(err, res2) {
		    if(res2 === true){
		    	res.redirect('/home')
		    }else{
		    	res.redirect('/')
		    }
		});
	});   
});
 

module.exports = router;


// req.session.save(function(err) {
//   // session saved
// })