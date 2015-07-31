
angular.module('fshop.controllers')
.controller('PlistCtrl', ['$scope', '$rootScope', '$stateParams', 
                            'Products', 'Categories', '$http', '$ionicSideMenuDelegate', 
                function($scope,$rootScope, $stateParams, 
                            Products, Categories, $http, $ionicSideMenuDelegate){

    $rootScope.cartIdList = [];
    $rootScope.subTotal = 0;
    $rootScope.cartHasProducts = false;
    $scope.init = function(){
        
    };
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
    };
    $scope.cartSelected = function(){
        // $scope.$apply();
        $scope.$broadcast('cart-selected', $rootScope.cartIdList);
        console.log('controllers.js     PlistCtrl   cartSelected    broadcast');
    };
    $scope.reload = function(){
        var DEBUG_MODE = true;
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

    };
    // 列表向下拉到头的时候会刷新列表
    $scope.onSwipeDown = function(){
        console.log(' controller.js     PlistCtrl   onSwipeDown ');
        $scope.reload();
    };

    // 订单提交
    $scope.submit = function(){
        console.log('   controllers.js      PlistCtrl     submit before del');
        $rootScope.cartIdList = "";
        $rootScope.cartSize = "";
        $scope.$broadcast('cart-refresh', $rootScope.cartIdList);   // 提示刷新购物车
    };

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
    };
    // console.log(' PlistCtrl     cartSize 02= ' + $rootScope.cartSize);
    $scope.reload();
}]);