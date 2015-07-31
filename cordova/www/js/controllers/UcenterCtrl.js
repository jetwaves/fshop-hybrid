
angular.module('fshop.controllers')
.controller('UcenterCtrl', ['$scope','$rootScope', 'Clients', '$window', 
                    function($scope, $rootScope, Clients, $window){
    // 判断是否已经登录 
    if ($rootScope.isLoggedIn != true) {
        $rootScope.isLoggedIn = false
    };
    $scope.login = function(user_name, pwd){
        console.log('   controllers.js      UcenterCtrl     login ');
        // 判断用户名和密码合法性
        $rootScope.isLoggedIn = true;
        $scope.loadClientInfo(user_name);
        // 判断来路决定要跳转到哪里去
        var url = $window.location.hash;
        url = url.replace('#/tab/login','');
        console.log('   controllers.js      UcenterCtrl     url =  ' + url);
        if (url != "") {
            $window.location.href = "#/tab" + url;
        } else{
            $window.location.href = "#/tab/ucenter";
        };
        // 取用户信息，回去个人中心页面
    }
    $scope.logout = function(){
        console.log('   controllers.js      UcenterCtrl     logout ');
        $rootScope.isLoggedIn = false;
    }

    $scope.loadClientInfo = function(clientId){
        if ($rootScope.isLoggedIn) {

        } else{
            $scope.clientInfo = Clients.info(clientId);
        };
    }
    $scope.loadClientInfo('user_name');
}]);