myApp.service('UserService', function ($http) {
    console.log('UserService loaded');
    var self = this;

    /**
     * Takes a userObj and calls /register route to 
     * create a new user in the system
     */
    // UserService.registerUser({username: 'bob', password: 'asdf'})
    self.registerUser = function (userObj) {
        console.log('userObj', userObj);
        
        $http.post('/register', userObj).then(function (respFromServer) {
            console.log('successful user creation', respFromServer);
        }).catch(function (error) {
            console.log(error);
        });
    }

});