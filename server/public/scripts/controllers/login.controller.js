myApp.controller('LoginController', function(UserService) {
    console.log('in LoginController');
    
    var vm = this;
    
    vm.user = {
        username: '',
        password: ''
    }

    vm.registerUser = function() {
        UserService.registerUser(vm.user);
    }
    
});