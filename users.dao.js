// DAO: data access object

var USERS = [
	{name: 'bob', age: 21},
	{name: 'alex', age:22},
	{name: 'alice', age: 23}
];

// CRUD: create, read, update , delete
var userDao = {
	findAll: function() {
		return USERS;
	},

	insert: function(newUser) {
		var u = USERS.find(function(user) {
			return user.name === newUser.name;
		});
		if (u === undefined) {
			USERS.push(newUser);
			return true;
		} else {
			return false;
		}	
	},

	remove: function(nameToDelete) {
		
		for (i in USERS) {
			if (USERS[i].name === nameToDelete) {
				USERS.splice(i, 1);
				return true;
			} else {
				return fales;
			}
		}	
	},

	update: function(userToUpdate) {

		var u = USERS.find(function(user) {
			return user.name === userToUpdate.name;
		});	
		for (i in USERS) {
			if (u === undefined) {
				USERS.push(userToUpdate);
				return true;
			} else if (USERS[i].name === userToUpdate.name) {
				USERS.splice(USERS.length - 1, 1, userToUpdate);
				return true;
			}
		}
	}

};

module.exports = userDao;




// solution
    // remove: function(name) {
    //     var index = USERS.findIndex(function(user) {
    //         return user.name === name;
    //     });
    //     if (index >= 0) {
    //         USERS.splice(index, 1);
    //         return true;
    //     } else {
    //         return false;
    //     }
    // },
    // update: function(nameToUpdate, userToUpdate) {
    //     var index = USERS.findIndex(function(user) {
    //         return user.name === nameToUpdate;
    //     });
    //     if (index >= 0) { // replace
    //         USERS.splice(index, 1, userToUpdate);
    //     } else {
    //         USERS.push(userToUpdate);
    //     }
    //     return true;
    // }

