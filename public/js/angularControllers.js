'use strict';  
58-267215-800
var mediaController = angular.module('mediaController', []);

mediaController.controller('mediaController', ['$scope', '$window', '$document', '$http', function($scope, $window, $document, $http) {
	$http.get("/api/iamjustarobot/posts").success(function(data){
		$scope.media = data.Posts;
		$scope.featured = data.Posts;
		$scope.query = {};
    	$scope.queryBy = '$';
    	$scope.ads = {posts_ad:'false'}
    	$scope.columns = [{}];

    	if( $(window).width() > 1500 ) {
    		$scope.columns = [
    			{colnum: 1},
    			{colnum: 2},
    			{colnum: 3}
    		];
    	} else {
    		$scope.columns = [
    			{colnum: 1},
    			{colnum: 2}
    		];
    	}

		var limitStep = 10;
		$scope.limit = limitStep;
		$scope.incrementLimit = function() {
		    $scope.limit += limitStep;
		};

		/*
			-------------------------------------------------------------------
			-------------------------------------------------------------------
			--------------------------- Home Needs ----------------------------
			--------------------------- Home Needs ----------------------------
			-------------------------------------------------------------------
			-------------------------------------------------------------------
		*/

		$document.on('scroll', function() {	
			var winH = $(window).height();
			var sWinH = winH / 2;
			if($(window).scrollTop() + sWinH > $(document).height() - $(window).height() ) {
				$('#addMore').click();
			}
		});

		$('.sign-up form .more-options').click(function(){
			if( $(this).parent().parent().find($('span.options')).css('display') == "none" ){
				$(this).text("less options");
				$(this).parent().parent().find($('.options')).show();
			} else {
				$(this).text("more options");
				$(this).parent().parent().find($('.options')).hide();
			}
		});

		/*
			-------------------------------------------------------------------
			-------------------------------------------------------------------
			--------------------------- End Home Needs ---------------------------------
			--------------------------- End Home Needs ---------------------------------
			-------------------------------------------------------------------
			-------------------------------------------------------------------
		*/

		/*
			-------------------------------------------------------------------
			-------------------------------------------------------------------
			--------------------------- Login Popup ---------------------------
			--------------------------- Login Popup ---------------------------
			-------------------------------------------------------------------
			-------------------------------------------------------------------
		*/

		$('header .loggedout a').click(function(){
			$('#loginPopup').show();
		});

		$('#loginPopup .loginArea .closeBtn a').click(function(){
			$('#loginPopup').hide();
		});

		$('#loginPopup .background-shadow').click(function(){
			$('#loginPopup').hide();
		});

		/*
			-------------------------------------------------------------------
			-------------------------------------------------------------------
			--------------------------- End Login Popup -------------------------------
			--------------------------- End Login Popup -------------------------------
			-------------------------------------------------------------------
			-------------------------------------------------------------------
		*/


		/*
			-------------------------------------------------------------------
			-------------------------------------------------------------------
			--------------------------- Filtering -----------------------------
			--------------------------- Filtering -----------------------------
			-------------------------------------------------------------------
			-------------------------------------------------------------------
		*/

		// Filter Tools
		$scope.popOrNot = function(event){
			$('.media-filters span.popornot li a').removeClass('active');
			$(event.currentTarget).find('a').addClass('active');
		}

		$scope.actives = function(event){
			$('.media-filters span.activebuttons li a').removeClass('active');
			$(event.currentTarget).find('a').addClass('active');
		}

		$scope.top = function(){
			$('html, body').animate({scrollTop: $(".media-section").offset().top - 200}, 2000);
		}

		// Filter Results

		function sortResults(prop, asc) {
		    $scope.media = data.Posts.sort(function(a, b) {                
		        if (asc) {
		            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
		        } else {
		            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
		        }
		    });
		}

		$scope.filters = {};

		$scope.sectionsTypes = [
			{ section: "games" },
			{ section: "music" },
			{ section: "movies" },
			{ section: "news" },
			{ section: "politics" },
			{ section: "funny" },
			{ section: "technology" },
			{ section: "science" },
			{ section: "health" },			
			{ section: "local" }
		];

		$scope.sort = "-posts_love";

		$scope.popular = function(){
			sortResults('posts_love', false);
			$scope.sort = "-posts_love";
		};

		$scope.new = function(){
			sortResults('posts_date', false);
			$scope.sort = "-posts_date";
		};

		$scope.clearFilter = function(){
			$scope.filters = {};
			$scope.ads = {posts_ad:'false'};
		};

		$scope.adsOn = function(){
			if( $('.adsNav').hasClass('active') == false ){
				$('.adsNav').addClass('active');
				$scope.ads = {posts_ad:'true'};
			} else {
				$('.adsNav').removeClass('active');
				$scope.ads = {posts_ad:'false'};
			}
		}

		$scope.adsOff = function(){
			$scope.ads = {posts_ad:'false'};
			$('.adsNav').removeClass('active');
		}

		/*
			-------------------------------------------------------------------
			-------------------------------------------------------------------
			----------------------- End Filtering -----------------------------------
			----------------------- End Filtering -----------------------------------
			-------------------------------------------------------------------
			-------------------------------------------------------------------
		*/

	});
}]);

var userController = angular.module('userController', []);

userController.controller('userController', ['$scope', '$routeParams', '$http', '$document', '$window', function($scope, $routeParams, $http, $document, $window) {
	$http.get("/api/iamjustarobot/posts").success(function(data){
		$scope.media = data.Posts;
		$scope.username = function(){
			$scope.username = $routeParams.username.split("_").join(" ");
		};

		$scope.columns = [{}];

    	if( $(window).width() > 1500 ) {
    		$scope.columns = [
    			{colnum: 1},
    			{colnum: 2},
    			{colnum: 3}
    		];
    	} else {
    		$scope.columns = [
    			{colnum: 1},
    			{colnum: 2}
    		];
    	}


		var limitStep = 5;
		$scope.limit = limitStep;
		$scope.incrementLimit = function() {
		    $scope.limit += limitStep;
		};

		$document.on('scroll', function() {			
			if($(window).scrollTop() + 180 > $(document).height() - $(window).height() ) {
				$('#addMore').click();
			}
		});
	});
}]);

var profileController = angular.module('profileController', []);

profileController.controller('profileController', ['$scope', '$http', function($scope, $http) {
	$http.get("/api/iamjustarobot/users").success(function(data){
		$scope.users = data.Users;
	});
}]);


var createAccount = angular.module('createAccount', []);

createAccount.controller('createAccount', ['$scope', function($scope, $http) {
    $scope.submit = function(){
    	if ($scope.myForm.$valid){
    		$scope.location = 'api/iamjustarobot/users'
    	} else {
    		event.preventDefault();
    	};
    }
}]);