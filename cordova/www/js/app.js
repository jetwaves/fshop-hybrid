// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])


.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    var iosConfig = {

    };
    var androidConfig = {
        tabs: {
            position: "bottom"
        }
    };
    $ionicConfigProvider.setPlatformConfig('android', androidConfig);
    $ionicConfigProvider.setPlatformConfig('ios', iosConfig);

    $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html",
        controller:'PlistCtrl'
    })
    // Each tab has its own nav history stack:
    .state('tab.plist', {
        url: '/plist',
        views: {
            'tab-plist': {
                templateUrl: 'templates/tab-plist.html',
            }
        }
    })
    // Each tab has its own nav history stack:
    .state('tab.product-detail', {
        url: '/product/:productId',
        views: {
            'tab-plist': {
                templateUrl: 'templates/product-detail.html',
                controller: 'ProductCtrl'
            }
        }
    })
    .state('tab.cart', {
        url: '/cart',
        views: {
            'tab-cart': {
                templateUrl: 'templates/tab-cart.html',
            }
        }
    })
    .state('tab.ucenter', {
        url: '/ucenter',
        views: {
            'tab-ucenter': {
                templateUrl: 'templates/tab-ucenter.html',
                controller: 'UcenterCtrl'
            }
        }
    })

    .state('tab.loginPage', {
        url: '/login',
        views: {
            'tab-ucenter': {
                templateUrl: 'templates/tab-login.html',
                controller: 'UcenterCtrl'
            }
        }
    })

    .state('tab.loginPageTo', {
        url: '/login/:to',
        views: {
            'tab-ucenter': {
                templateUrl: 'templates/tab-login.html',
                controller: 'UcenterCtrl'
            }
        }
    })

    .state('tab.checkout', {
        url: '/checkout',
        views: {
            'tab-cart': {
                templateUrl: 'templates/checkout.html',
                controller: 'CheckoutCtrl'
            }
        }
    })




    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/checkout');
}])


;