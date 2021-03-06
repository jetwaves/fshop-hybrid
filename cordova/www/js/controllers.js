// var DEBUG_MODE = false;
var DEBUG_MODE = true;
var remoteServerURL = "http://192.168.1.212:3000";
// var remoteServerURL = "http://127.0.0.1:3000";
// var remoteServerURL = "http://192.168.1.104:3000";


function isArray(arr) 
{ 
    return arr instanceof Array; 
} 

function isObject(arr) 
{ 
    return arr instanceof Object; 
} 

function countCartSize( cartList){
    var cnt = 0;
    for(item in cartList){
        // cnt = cnt + cartList[item]['number'];
        cnt = cnt + cartList[item];
    }
    return cnt;
}

function logComplexeArray(arr){
    for( i in arr){
        console.log(' logComplexeArray      i = ' + i);
        console.log(' logComplexeArray      val = ' + arr[i]);
        if (isArray(arr[i]) || isObject(arr[i])) {
            console.log(' logComplexeArray      val = ' + arr[i] + "==================");
            logComplexeArray(arr[i]);
            console.log(' logComplexeArray      val = ' + arr[i] + "------------------");
        };
    }
}

angular.module('starter.controllers', [])

.controller('PlistCtrl', ['$scope', '$rootScope', '$stateParams', 'Products', 'Categories', '$http', '$ionicSideMenuDelegate', 
            function($scope,$rootScope, $stateParams, Products, Categories, $http, $ionicSideMenuDelegate){

    $rootScope.cartIdList = [];
    $rootScope.subTotal = 0;
    $rootScope.cartHasProducts = false;
    $scope.toggleLeft = function() {
        console.log('controllers.js     PlistCtrl   toggleLeft   ');
        console.dir($ionicSideMenuDelegate);
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.setFilter = function(plist_filter_condition){
        if (eval(plist_filter_condition) == 0) {
            $scope.plist_filter_condition = "";
        } else{
            $scope.plist_filter_condition = plist_filter_condition;
        };
        $ionicSideMenuDelegate.toggleLeft(false);
    }
    // $scope.plistSelected = function(){
    //     console.log('controllers.js     PlistCtrl   plistSelected    ');
    //     $ionicSideMenuDelegate.toggleLeft(false);
    // }
    $scope.cartSelected = function(){
        // $scope.$apply();
        $scope.$broadcast('cart-selected', $rootScope.cartIdList);
        console.log('controllers.js     PlistCtrl   cartSelected    broadcast');
    }
    $scope.reload = function(){
        if (DEBUG_MODE) {
            $rootScope.products = Products.all();
            $rootScope.categories = Categories.all();
        } else {
            $http.get( remoteServerURL + '/products/listData').
                success(function(data, status, headers, config) {
                $rootScope.products = data['data'];
            }).
            error(function(data, status, headers, config) {
                $rootScope.products = Products.all();
            });
        }
        var idProductMapping = new Array();
        for( i in $rootScope.products){
            var item = $rootScope.products[i];
            idProductMapping[item['_id']] = item;
        }
        $rootScope.idProductMapping = idProductMapping;

    }
    // 列表向下拉到头的时候会刷新列表
    $scope.onSwipeDown = function(){
        console.log(' controller.js     PlistCtrl   onSwipeDown ');
        $scope.reload();
    }

    // 订单提交
    $scope.submit = function(){
        console.log('   controllers.js      PlistCtrl     submit before del');
        $rootScope.cartIdList = "";
        $rootScope.cartSize = "";
        $scope.$broadcast('cart-refresh', $rootScope.cartIdList);   // 提示刷新购物车
    }

    // 购物车数量变化处理 
    //     @param       pid    ,    商品id，用于识别和对应购物车里面的对象
    //     @param       changeNumber, 变化数来那个，用于记录加减  +1 or -1
    //          cartIdList 数据结构：    { id1: number1, id2: number2, id3: number3 .... }
    $scope.updateCart = function( pid, changeNumber){
        var cartIdList = $rootScope.cartIdList;
        if (eval(changeNumber) == 1) {      // 加一的情况
            if ( cartIdList[pid] == null || cartIdList[pid] == undefined ) {
                cartIdList[pid] = 1;
            } else {
                cartIdList[pid] = eval(cartIdList[pid]) + eval(changeNumber);    
            }
        } else {                            // 减一的情况
            if ( cartIdList[pid] == null || cartIdList[pid] == undefined ) {
                cartIdList[pid] = 0;
                // cartIdList.splice(pid,1);
            } else {
                cartIdList[pid] = eval(cartIdList[pid]) + eval(changeNumber);
                if (eval(cartIdList[pid]) < 0) {
                    cartIdList[pid] = 0;
                    // cartIdList.splice(pid,1);
                } 
            }
        };
        var cartRes = new Array();
        // 计算总价，数量，并且把数量为0的商品从结果列表里面删掉
        var subTotal = 0;
        for( item in cartIdList){
            var product = $rootScope.idProductMapping[item];
            product['number'] = cartIdList[item];
            if (product['number'] > 0 ) {
                cartRes[item] = product['number'];
            };
            var pSum = product['number'] * product['price'];
            subTotal = subTotal + pSum;
        }
        $rootScope.subTotal = subTotal;
        $rootScope.cartIdList = cartRes;
        $rootScope.cartSize = countCartSize(cartRes);
        $rootScope.cartHasProducts = ($rootScope.cartSize>0)?true:false;
        console.log(' PlistCtrl     updateCart      cartRes = ');  console.dir(cartRes);
        $scope.$broadcast('cart-refresh', $rootScope.cartIdList);   // 提示刷新购物车
    }
    // console.log(' PlistCtrl     cartSize 02= ' + $rootScope.cartSize);
    $scope.reload();
}])

.controller('ProductCtrl', ['$scope', '$stateParams', 'Products', 
                    function($scope, $stateParams, Products){
    $scope.product = Products.get($stateParams.productId);
}])


.controller('CartCtrl', ['$scope', '$rootScope', '$stateParams', 
                    function($scope, $rootScope, $stateParams){
    $scope.refresh = function(){
        var clist = $rootScope.cartIdList;
        var res = new Array();
        for( item in clist){
            var product = $rootScope.idProductMapping[item];
            product['number'] = clist[item];
            res.push(product);
        }
        $scope.cartList = res;
    }
    $scope.$on('cart-refresh', function(event, data){
        $scope.refresh();
    });
    $scope.$on('cart-selected', function(event ,data){
        console.log('   controllers.js      CartCtrl     cart-selected    $rootScope.cartIdList = ');  console.dir($rootScope.cartIdList);
        $scope.refresh();
    });

}])

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
}])


.controller('CheckoutCtrl', ['$scope', '$http' , 
                    function($scope, $http){
    console.log('   controller.js       CheckoutCtrl       000 ');
    
}])



