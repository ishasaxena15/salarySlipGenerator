angular.module('MainCtrl', []).controller('MainController', function($scope, SalarySlipService, $state) {

	$scope.userDetailForm = {};	
	$scope.userDetail = {};	
	$scope.fetchError = null;	

	let months = {
		"1" : "January",
		"2" : "February",
		"3" : "March",
		"4" : "April",
		"5" : "May",
		"6" : "June",
		"7" : "July",
		"8" : "August",
		"9" : "September",
		"10" : "October",
		"11" : "November",
		"12" : "December"
	};

	$scope.submit = function(isValid) {
		if(isValid) {
			console.log("scope.userDetail>>", $scope.userDetail);
			SalarySlipService.getSlip($scope.userDetail).then($scope.onSuccess, $scope.onError);
		}
	}	

	
	$scope.setStartDate = function(date) {
		if(date) {
			$scope.userDetail.pay_start_date = "";
			var month = JSON.stringify(date.getMonth()+1);
			$scope.userDetail.pay_start_date = "1st "+months[month]+" - 31st "+months[month];
		}
	}
	$scope.onSuccess = function (response) {
			// console.log("response>>", response)
			$state.transitionTo('result', { salarySlip : response.data.salarySlip});
       };

      $scope.onError = function (reason) {
			// console.log("reason>>", reason)
            $scope.fetchError = "Error in retrieving data.";
       };

});