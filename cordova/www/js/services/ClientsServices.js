
angular.module('fshop.services')
.factory('Clients', function($http){
    var clientInfo = {
                        _id: "54af8e05e3d9c7d823581c4f",
                        user_name: "18676780441",
                        shop_name: "花果山水果店",
                        owner: "大强哥",
                        tel: "18676780441",
                        email: "qq@qq.com",
                        wechat: "wechatQQ",
                        address: "广东省深圳市南山区花果山路888号",
                        status: "1",
                        sup_info: "",
                        password: "aaaaaa",
                        bonus: "999",
                        account_manager: "杜黄平",
                        am_tel: "13131313131"
                    };
    return {
        info: function(clientId) {
            var DEBUG_MODE = true;
            var remoteServerURL = 'http://aaaaaaa.com';
            if (DEBUG_MODE) {
                return clientInfo;
            } else {
                $http.get(remoteServerURL + '/clients/info/' + clientId).
                success(function(data, status, headers, config) {
                    // return data[data];
                    console.log(' services.js   Clients.info()      http success: data');
                    console.dir(data);
                    return data;
                }).
                error(function(data, status, headers, config) {
                    console.log(' services.js   Clients.info()      http error');
                });
            }
        }
    }

});

