var DEBUG_MODE = true;
var remoteServerURL = "http://192.168.1.212:3000";

angular.module('starter.services', [])

.factory('Products', ['$http', function($http){
    // 测试数据
    var products = [{
        _id: "54a7dd5acb1853042d935448",
        product_name: "新奇士脐橙",
        uid: "",
        spec: "80#",
        unit_quantity: "17KG",
        price: "250",
        pic_url: "http://www.huaguoshan.com/Public/Images/2/11152_main.jpg",
        sup_info: "美国产，特别好吃",
        cid: "666666"
    }, {
        _id: "54a8e2557ed9df4824dc0060",
        product_name: "智利车厘子",
        spec: "J",
        unit_quantity: "5KG",
        price: "300",
        pic_url: "http://www.huaguoshan.com/Public/Images/8/11158_main.jpg",
        sup_info: "特别好吃",
        cid: "1"
    }, {
        _id: "54ab40e5574bfa183e699760",
        product_name: "德庆皇帝柑",
        spec: "70#",
        unit_quantity: "10公斤",
        price: "39",
        pic_url: "http://www.huaguoshan.com/Public/Images/0/11150_main.jpg",
        sup_info: "特别好吃呀特别好吃",
        cid: "2"
    }, {
        _id: "54ab4114574bfa183e699761",
        product_name: "新西兰佳沛经典绿奇异果",
        spec: "39#",
        unit_quantity: "74",
        price: "360",
        pic_url: "http://www.huaguoshan.com/Public/Images/18/11068_main.jpg",
        sup_info: "绿奇比较酸，口感较硬，没金奇那么软，整体比较爽口。",
        cid: "2"
    }, {
        _id: "54ab4138574bfa183e699762",
        product_name: "墨西哥牛油果",
        spec: "22#",
        unit_quantity: "22",
        price: "59",
        pic_url: "http://www.huaguoshan.com/Public/Images/16/11016_main.jpg",
        sup_info: "买来有点硬的，放了几天熟了，就很软了，给老人吃很好",
        cid: "3"
    }, {
        _id: "54ab4161574bfa183e699763",
        product_name: "特级智利加力果",
        spec: "115#",
        unit_quantity: "17.5公斤",
        price: "420",
        pic_url: "http://www.huaguoshan.com/Public/Images/2/11002_main.jpg",
        sup_info: "颜色漂亮，有点酸，酸酸甜甜，年轻的味道",
        cid: "4"
    }, {
        _id: "54ab53ae18dc176817133375",
        product_name: "陈绍琛的苹果",
        spec: "2",
        unit_quantity: "222",
        price: "999999999999",
        pic_url: "http://www.huaguoshan.com/Public/Images/2/11002_main.jpg",
        sup_info: "xxxxxxxxxxx",
        cid: "5"
    }, {
        _id: "54ab54e818dc176817133376",
        product_name: "陈绍琛的大苹果ccccccc",
        spec: "2",
        unit_quantity: "222",
        price: "222",
        pic_url: "http://www.huaguoshan.com/Public/Images/2/11002_main.jpg",
        sup_info: "xxxxxxxxxxx",
        cid: "5"
    }];

    return {
        all: function() {
            if (DEBUG_MODE) {
                // console.log(' services.js   Products.all()      DEBUG_MODE = true');
                return products;
            } else {
                $http.get(remoteServerURL + '/products/listData').
                success(function(data, status, headers, config) {
                    // return data[data];
                    console.log(' services.js   Products.all()      http success: data');
                    console.dir(data['data']);
                    return data['data'];
                }).
                error(function(data, status, headers, config) {
                    console.log(' services.js   Products.all()      http error');
                });
            }
        },
        remove: function(product) {
            products.splice(products.indexOf(product), 1);
        },
        get: function(productId) {
            for (var i = 0; i < products.length; i++) {
                if (products[i]['_id'] == (productId)) {
                    return products[i];
                }
            }
            return null;
        }
    }
}])

.factory('Clients', ['$http', function($http){
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
}])


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
}])


;