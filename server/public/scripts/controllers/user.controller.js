myApp.controller('UserController', function(UserService) {
    console.log('in UserController');
    
    var vm = this;
    vm.userObj = UserService.userObj;
    

    vm.addItem = function () {
        vm.item = {
            name: vm.itemName,
            description: vm.itemDescription,
            image: vm.itemImage
        }    
        userService.makeItem(vm.item);
    }

    vm.logout = function() {
        UserService.logout();
    }
    
});