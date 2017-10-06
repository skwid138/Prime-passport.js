myApp.service('UserService', function ($http, $location) {
    console.log('UserService loaded');
    var self = this;

    self.userObj = {username: ''};
    self.itemObj = {list: []};

    self.getUser = function () {
        $http.get('/user').then(function(respFromServer) {
            console.log('user respFromServer', respFromServer);
            self.userObj.username = respFromServer.data.username;

        }).catch(function(error) {
            // catch block will run when 401
            console.log('error', error);
            
            $location.path('/home');
        });
    };

    self.logout = function() {
        
        $http.get('/user/logout').then(function(respFromServer) {
            console.log('user logout respFromServer', respFromServer);
            
            $location.path('/home');
        });
    };
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
    };

    self.login = function(userObj) {
        $http.post('/', userObj).then(function(response) {
            console.log('user logged in correctly');
            // allow them into other views
            $location.path('/user');
        }).catch(function(err) {
            console.log(err);
        });
    };

    self.makeItem = function (item) {
        $http.put('/shelf', item).then(function (response) {
            console.log('makeItem', item);
            self.getItems();
        }).catch(function (err) {
            console.log(err);
        });
    };

    self.getItems = function () {
        $http.get('/shelf').then(function (respFromServer) {
            console.log('getItems resp from server, you got served', respFromServer);
            
            self.itemObj.list = respFromServer.data;
            console.log('self.itemObj.list', self.itemObj.list);

        }).catch(function (error) {
            // catch block will run when 401
            console.log('error', error);

            $location.path('/user');
        });        
    };

});