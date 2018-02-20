'use strict';
var myApp = angular.module('myApp', [
	//modules
	'ngRoute',
	//directives,

	//controllers
	'mediaController',
	'profileController',
	'userController',
	'createAccount'
]);

// Declare app level module which depends on filters, and services
myApp.
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'pages/index',
				controller: 'mediaController'
			}).
			when('/profile', {
				templateUrl: 'pages/profile',
				controller: 'profileController'
			})
			.when('/messagecenter', {
				templateUrl: 'pages/messagecenter'
			})
			.when('/settings', {
				templateUrl: 'pages/settings'
			})
			.when('/account-settings', {
				templateUrl: 'pages/account-settings'
			})
			.when('/partner-settings', {
				templateUrl: 'pages/partner-settings'
			})
			.when('/preferences', {
				templateUrl: 'pages/preferences'
			})
			.when('/privacy', {
				templateUrl: 'pages/privacy'
			})
			.when('/subscriptions', {
				templateUrl: 'pages/subscriptions'
			}).
			when('/:username', {
				templateUrl: 'pages/users',
				controller: 'userController'
			});
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
}]);

// Filters
myApp.filter('slugify', function(){
	return function(input) {
		input = input || '';
		return input.split(" ").join("_");
	}
});

// Directives
myApp.directive('headerData',['$window', function($window){
	var $win = angular.element($window); //wrap window as jquery object
    return {
		restrict: 'A',
		link: function (scope, element, attrs)
		{
			var images = ['andy-al-mesura-204460.png', 'austin-ban-401.png', 'carla-oliveira-219055.png', 'changyu-hu-4689.png', 'hans-vivek-176134.png', 'jan-erik-waider-126100.png', 'kazuend-32605.png'];

			var loginBlock = $('.loginBlock');
			element.css({'background-image': 'url(' + images[Math.floor(Math.random() * images.length)] + ')'});

			$('.main-content').css({'padding-top': '0px'});
			element.css({"height": $win.height()});

			if ( $win.scrollTop() > loginBlock.offset().top ) {
				$('header').css({'padding': '2px 0'});
			} else {
				$('header').css({'padding': '40px 0'});
				$('header .header .remarkdd img').css({'height': '125px'});
			}

			$win.on('scroll', function(){
				if ( $win.scrollTop() > loginBlock.offset().top ) {					
					$('header').animate({
						'padding': '2px 0',
					}, { 
						queue: false,
						duration: 300,
						easing: "swing"
					});
					$('header .header .remarkdd img').animate({
						'height': '70px'
					}, { 
						queue: false,
						duration: 300,
						easing: "swing"
					});
					$('header .header h1').animate({
						'top': '4px'
					}, { 
						queue: false,
						duration: 300,
						easing: "swing"
					});
					$('header').css({"box-shadow": "none"})
				} else {
					$('header').animate({
						'padding': '40px 0'
					}, {
						queue: false,
						duration: 300,
						easing: "swing"
					});
					$('header .header .remarkdd img').animate({
						'height': '125px'
					}, { 
						queue: false,
						duration: 300,
						easing: "swing"
					});
					$('header .header h1').animate({
						'top': '30px'
					}, { 
						queue: false,
						duration: 300,
						easing: "swing"
					});
					$('header').css({"box-shadow": ""})
				}
			});
		}
	};
}]);


myApp.directive('mediaFilters',['$window', function($window){
	var $win = angular.element($window); //wrap window as jquery object
    return {
		restrict: 'A',
		link: function (scope, element)
		{
			var eleX =  element.offset().top;

			$win.on('scroll', function(){
				if ( $win.scrollTop() >  eleX - 80 ) {
					element.css({"position": "fixed", "top": "88px"})
				} else {
					element.css({"position": "relative", "top": "auto"});
				}
			});
		}
	};
}] );

var adSenseTpl = '<div><h3>Your Ad Here</h3></div>';
myApp.directive('googleAdsense', function($window, $compile) {
    return {
        restrict: 'A',
        transclude: true,
        template: adSenseTpl,
        replace: false,
        link: function postLink(scope, element, iAttrs) {
                element.html("");
                element.append(angular.element($compile(adSenseTpl)(scope)));
                if (!$window.adsbygoogle) {
                    $window.adsbygoogle = [];
                }
                $window.adsbygoogle.push({});
        }
    };
});

/*
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- test -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-8542785283075052"
     data-ad-slot="7869771308"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
*/