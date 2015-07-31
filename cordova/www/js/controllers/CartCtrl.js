

angular.module('fshop.controllers')
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

}]);