
angular.module('fshop.controllers')
.controller('ProductCtrl', ['$scope', '$stateParams', 'Products', 
                    function($scope, $stateParams, Products){
    $scope.product = Products.get($stateParams.productId);
}]);