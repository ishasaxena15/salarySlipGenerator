
angular.module('GetSalaryService', []).factory('SalarySlipService', ['$http', '$q', function($http, $q) {

    return({
        getSlip: getSlip
    });

    function getSlip( userDetail ) {
        return $http({
            method: "post",
            url: "http://localhost:8000/getSalarySlip",
            headers : { 'Access-Control-Allow-Origin' : "*"},
            data: userDetail
        });
	}

}]);