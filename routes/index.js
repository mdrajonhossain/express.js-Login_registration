var express = require('express');

 

 



 
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

router.get('/home', function(req, res, next) {
  res.render('home');
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





router.post('/loginpaging', function(req, res){
	
	var username = req.body.username1;
	var password = req.body.password1;
	 
	models.instance.User.findOne({username:username},{raw:true, allow_filtering: true}, function(err, people){
	// console.log("sdfdsf......"+people.password)     			 	

		var loginss = bcrypt.compareSync(password, people.password);

	    	if (loginss === true) {
	    		req.session.username = username;	    		 
	     		res.redirect('/home');	     		 
	    	} 
	    	else {
	    		res.redirect('/');
	    	};
	});   
});
 



router.get('/logoute', function(req, res, next) {	

	req.session.destroy(function(err) {
   		console.log("sss") 
   		res.redirect('/');
	});
});



 

module.exports = router;
 

 


