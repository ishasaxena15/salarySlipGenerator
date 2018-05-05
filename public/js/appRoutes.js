angular.module('appRoutes', []).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {


    $stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.state('result', {
			url: '/viewSlip',
			params: { salarySlip : null},
			templateUrl: 'views/viewSlip.html',
			controller: 'ViewSlipController'
		})

	$urlRouterProvider.otherwise('/');

}]);