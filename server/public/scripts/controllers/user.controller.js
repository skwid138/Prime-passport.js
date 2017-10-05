myApp.controller('UserController', function(UserService) {
    console.log('in UserController');
    
    var vm = this;
    vm.userObj = UserService.userObj;

    vm.logout = function() {
        UserService.logout();
    }
    
});