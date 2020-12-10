// use express library 
var express = require('express');	// import express library
var userDao = require('./users.dao');
var bodyParser = require('body-parser');

// to build a server application
var app = express();

// it should be runing on 3000 PORT
app.listen(process.env.PORT || 3000);

// it serves static contents which are in public folder
app.use(express.static(__dirname + '/public')); 	// absolute path of public


// use body-parser to parse data in request body in js object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));	// form data



// serve dynamic content


// http://localhost:3000/test.html
// HTTP Methods: GET, POST(add), PUT(replace or add)/PATCH(update part of the resource), DELETE

// http://localhost:3000/users


// check
// function checkLogin() {
// 	return Math.randodm() > 0.5 ? true : false;
// }


// // handle any type of request will be first handled by g1
// app.use(function g1(req, res, next) {			// same as app.use('/', function g1(req, res, next), which means, if the first parameter's path is '/', it will be omitted. '/' impacts all things under '/' 
// 	if (checkLogin()) {
// 		next();
// 	} else {
// 		res.send(new APIResponse(false, null, 'You must login!'));		// if no any success value, just pass null;
// 	}
// });



// GET	/users
app.get('/users', function(req, res) {		// filter all the users, and this function will be automatically invoked
	res.send(userDao.findAll());			// send json object to test.html line 13 "user" 
});		


// POST	/users
app.post('/users', function(req, res) {
	var newUser = req.body;
	var status = userDao.insert(newUser);
	if (status) {
		res.send({
			success: status,
			message: 'Add user successfully!'
		});
	} else {
		res.send({
			success: status,
			message: 'Fail to add user!'
		});
	}
});


// DELETE /users/bob
app.delete('/users/:name', function(req, res) {		// name here is variable, which can be changed to anything
	var nameToDelete = req.params.name;		// name here is the same as name in :name
	var status = userDao.remove(nameToDelete);
	res.send(new APIResponse(status, 'Delete Successfully!', 'Fail to Delete!'));
});


// PUT/users/alice					// hint, delete the old one, and add the new one. by using js array method keywordL splice
// request body: user to update
// PUT is like REPLACE(if object exist) OR ADD(if object doesn't exist)
app.put('/users', function(req, res) {
	//var nameToUpdate = req.params.name;
	var userToUpdate = req.body;
	var status = userDao.update(userToUpdate);
	if (status) {
		res.send({
			success: status,
			message: 'Update Successfully'
		}).status(200);				//	if status not declared, it will be implictly assigned as 200 if everything runs good
	} else {
		res.send({
			success: status,
			message: 'Fail to Update'
		});
	}
});


// solution

// DELETE /users/alice
// app.delete('/users/:name', function(req, res) {
//     var nameToDelete = req.params.name;
//     var status = userDao.remove(nameToDelete);
//     res.send(new APIResponse(status, 'User deleted!', 'User is not deleted!'));
// });
// // PUT /users/alice
// // request body: user to update
// // REPLACE OR ADD
// app.put('/users/:name', function(req, res) {
//     var nameToUpdate = req.params.name;
//     var userToUpdate = req.body;
//     var status = userDao.update(nameToUpdate, nameToDelete);
//     res.send(new APIResponse(status, 'User is saved!', 'User is not saved.'));
// });
// function APIResponse(status, successMessage, failureMessage) {
//     this.status = status;
//     this.message = status ? successMessage : failureMessage;
// }


	
app.get('/hello', function h1(req, res, next) {		// only respond h1, function h1 is a middleware function
	// res.send('hello from h1');
	console.log('h1 processed the request');
	next();											// next() will invoke the next middleware function in the chain
});

app.get('/hello', function h2(req, res) {
	res.send('hello from h2');
});