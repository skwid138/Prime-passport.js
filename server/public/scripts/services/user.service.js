myApp.service('UserService', function ($http, $location) {
    console.log('UserService loaded');
    var self = this;

    self.userObj = {username: ''};

    self.getUser = function () {
        $http.get('/user').then(function(respFromServer) {
            console.log('respFromServer', respFromServer);
            self.userObj.username = respFromServer.data.username;

        }).catch(function(error) {
            // catch block will run when 401
            console.log('error', error);
            
            $location.path('/home');
        });
    }

    self.logout = function() {
        
        $http.get('/user/logout').then(function(respFromServer) {
            console.log('respFromServer', respFromServer);
            
            $location.path('/home');
        });
    }
    /**
     * Takes a userObj and calls /register route to 
     * create a new user in the system
     */
    // UserService.registerUser({username: 'bob', password: 'asdf'})
    self.registerUser = function (userObj) {
        console.log('userObj', userObj);
        
        $http.post('/register', userObj).then(function (respFromServer) {
            console.log('successful user creation', respFromServer);
            $location.path('/login');
        }).catch(function (error) {
            console.log(error);
        });
    }

    self.login = function(userObj) {
        $http.post('/', userObj).then(function(response) {
            console.log('user logged in correctly');
            // allow them into other views
            $location.path('/user');
        }).catch(function(err) {
            console.log(err);
        })
    }

});