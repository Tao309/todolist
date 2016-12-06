var app  = angular.module('app', ['ngRoute'], function($httpProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
});

app.config(function($routeProvider) {
$routeProvider
	.when('/',{
		templateUrl: 'list.tpl',
		controller: 'ToDoListCtrl',
	})
	.when('/add/',{
		templateUrl: 'add.tpl',
		controller: 'add',
	})
	.when('/view/:id/',{
		templateUrl: 'view.tpl',
		controller: 'view',
	})
	.otherwise({
		redirectTo: '/'
	});
});

app.run(function($templateCache) {
	$templateCache.put('list.tpl',"<div class='header'>{{headerTitle}}</div><div class='list'><div class='one' ng-repeat='r in list'>{{r.title}}</div></div>");
	$templateCache.put('add.tpl',"add.tpl");
	$templateCache.put('view.tpl',"view.tpl");
});

var options = {
	site:'',
};

app.controller('ToDoListCtrl', function($scope) {
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
	
	$scope.headerTitle = "Список задач";
	/*
	$scope.list = function() {
		
		var url = options.site+'';
		
		
		$http.post(url, {
			'type': 'list',
		})
		.success(function(response) {
			
		})
		.error(function(response) {
			
		});
	};
	*/
  
});














