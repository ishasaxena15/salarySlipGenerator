angular.module('ViewSlipCtrl', []).controller('ViewSlipController', function($scope, $stateParams, $state) {
	$scope.salarySlip = $stateParams.salarySlip;
	$scope.goBack = function(){
		$state.transitionTo('home');
	}
});