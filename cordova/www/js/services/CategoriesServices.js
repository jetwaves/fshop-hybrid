            var DEBUG_MODE = true;
            var remoteServerURL = 'http://aaaaaaa.com';
angular.module('fshop.services')
.factory('Categories', ['$http', function($http){
    var catList = [ {
                        _id     :   "1",
                        name    :   "苹果",
                        on_sale :   "1"
                    },{
                        _id     :   "2",
                        name    :   "梨",
                        on_sale :   "1"
                    },{
                        _id     :   "3",
                        name    :   "柑橘",
                        on_sale :   "1"
                    },{
                        _id     :   "4",
                        name    :   "西瓜",
                        on_sale :   "1"
                    },{
                        _id     :   "5",
                        name    :   "草莓",
                        on_sale :   "1"
                    },{
                        _id     :   "666666",
                        name    :   "火龙果",
                        on_sale :   "1"
                    }];
    return {
        all     :   function(){
            if (DEBUG_MODE) {
                return catList;
            } else {
                $http.get(remoteServerURL + '/categories/listData/').
                success(function(data, status, headers, config) {
                    // return data[data];
                    console.log(' services.js   Categories.all()      http success: data');
                    console.dir(data);
                    return data;
                }).
                error(function(data, status, headers, config) {
                    console.log(' services.js   Categories.all()      http error');
                });
            }
        }
    };
    
}


]);

