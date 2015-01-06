var DEBUG_MODE = false;
var remoteServerURL = "http://192.168.1.212:3000";

angular.module('starter.controllers', [])

.controller('PlistCtrl', function($scope, $stateParams, Products, $http) {
    $scope.reload = function(){
        if (DEBUG_MODE) {
            $scope.products = Products.all();
        } else {
            $http.get( remoteServerURL + '/products/listData').
                success(function(data, status, headers, config) {
                $scope.products = data['data'];
            }).
            error(function(data, status, headers, config) {
                $scope.products = Products.all();
            });
        }
    }
    // 列表向下拉到头的时候会刷新列表
    $scope.onSwipeDown= function(){
        console.log(' controller.js     PlistCtrl   onSwipeDown ');
        $scope.reload();
    }
    $scope.remove = function(product) {
        Products.remove(product);
    }
    $scope.reload();
})

.controller('ProductCtrl', function($scope, $stateParams, Products) {
    $scope.product = Products.get($stateParams.productId);
})

.controller('CartCtrl', function($scope, $stateParams, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
    $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
