myApp.controller('UserController', function(UserService) {
    console.log('in UserController');
    
    var vm = this;
    vm.userObj = UserService.userObj;

    UserService.getUser();

    vm.logout = function() {
        UserService.logout();
    }
    
});