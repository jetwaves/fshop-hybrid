angular.module('starter.services', [])

.factory('Products', function($http) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var products = [{
        _id: "54a7dd5acb1853042d935448",
        product_name: "新奇士脐橙",
        uid: "",
        spec: "80#",
        unit_quantity: "17KG",
        price: "250",
        pic_url: "http://www.huaguoshan.com/Public/Images/2/11152_main.jpg",
        sup_info: "美国产，特别好吃"
    }, {
        _id: "54a8e2557ed9df4824dc0060",
        product_name: "智利车厘子",
        spec: "J",
        unit_quantity: "5KG",
        price: "300",
        pic_url: "http://www.huaguoshan.com/Public/Images/8/11158_main.jpg",
        sup_info: "特别好吃"
    }];

    return {
        all: function() {
            // return products;
            if (DEBUG_MODE) {
                return products;
            } else {
                $http.get('http://192.168.1.212:3000/products/listData').
                success(function(data, status, headers, config) {
                    // return data[data];
                    console.log('data');
                    console.dir(data['data']);
                    return data['data'];
                }).
                error(function(data, status, headers, config) {
                    console.log('bbbbbbbbb');
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
})

.factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
        id: 2,
        name: 'Andrew Jostlin',
        lastText: 'Did you get the ice cream?',
        face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    }, {
        id: 3,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
        id: 4,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
    }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    // Some fake testing data
    var friends = [{
        id: 0,
        name: 'Ben Sparrow',
        notes: 'Enjoys drawing things',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        notes: 'Odd obsession with everything',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
        id: 2,
        name: 'Andrew Jostlen',
        notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
        face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    }, {
        id: 3,
        name: 'Adam Bradleyson',
        notes: 'I think he needs to buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
        id: 4,
        name: 'Perry Governor',
        notes: 'Just the nicest guy',
        face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
    }];


    return {
        all: function() {
            return friends;
        },
        get: function(friendId) {
            // Simple index lookup
            return friends[friendId];
        }
    }
});