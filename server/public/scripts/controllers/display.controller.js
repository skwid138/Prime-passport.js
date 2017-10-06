myApp.controller('DisplayController', function (UserService){
    console.log('in DisplayController');


    var vm = this;
    vm.item = UserService.itemObj;

    vm.getItems = function (){
        UserService.getItems();
    };
    vm.getItems();
});