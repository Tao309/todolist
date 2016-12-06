var app  = angular.module('app', ['ngRoute','jkuri.datepicker'], function($httpProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
});

app.config(function($routeProvider) {
$routeProvider
	.when('/',{
		templateUrl: 'tpl/list.html',
		controller: 'ToDoListCtrl',
	})
	.when('/add/',{
		templateUrl: 'tpl/add.html',
		controller: 'add',
	})
	.when('/view/:id/',{
		templateUrl: 'tpl/view.html',
		controller: 'view',
	})
	.otherwise({
		redirectTo: '/'
	});
});

app.run(function($templateCache) {
	
});

var options = {
	site:'',
};

app.controller('body',function($scope,$rootScope,$window,$location,$route) {

});

app.controller('add', function($scope,$http) {
	$scope.send = function() {
		if(typeof $scope.title == 'undefined' || $scope.title=='' || typeof $scope.choosedate == 'undefined' || $scope.choosedate=='') {return false;}
		
		$http.post('/additem/', {
			'title': $scope.title,
			'date': $scope.choosedate,
			'status': '0',
		})
		.success(function(response) {
			$scope.title = "";
		})
		.error(function(response) {
			console.log('Send error!');
		});
		
	};
});

app.controller('ToDoListCtrl', function($scope,$http) {
	$scope.list = [];
	$http.get('/list/').success(function(response) {
		$scope.list = response;
	})
	.error(function(response) {
		console.log('Read error!');
	});
	
	/*
	$scope.list = [
		{
			title:'первое',date:'',status:'1',
		},
		{
			title:'второе',date:'',status:'1',
		},
		{
			title:'третье',date:'',status:'0',
		},
		{
			title:'четвёртое',date:'',status:'1',
		},
		{
			title:'пято',date:'',status:'0',
		},
	];
	*/
	
	$scope.headerTitle = "Список задач";
  
});














