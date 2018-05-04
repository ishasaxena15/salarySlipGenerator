angular.module('appRoutes', []).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {


    $stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.state('result', {
			url: '/viewSlip',
			params: { salarySlip : null},
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

	$urlRouterProvider.otherwise('/');

}]);