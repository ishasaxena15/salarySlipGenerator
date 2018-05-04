angular.module('NerdCtrl', []).controller('NerdController', function($scope, $stateParams, $state) {
	console.log("here in nerdctrl")
	$scope.salarySlip = $stateParams.salarySlip;
	console.log("$scope.salarySlip??", $scope.salarySlip);
	$scope.goBack = function(){
		$state.transitionTo('home');
	}
});