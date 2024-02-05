angular.module('vnUserChipsDetailModule', [ ],function () {})
.controller('vnUserChipsDetailController', function( $scope, visionFactory, $timeout ){
	

	$scope.initUserChipsDetail = function(){
		
	};

	var saveUser = function(){
		
	};

	$scope.handleClick = function( event ){
		event.stopPropagation();
	};
})
.directive('vnUserChipsDetail', function() {
    return {
    	scope: {
			id: '@'
		},
	    restrict: 'E',
	    templateUrl: 'apps/components/chips/user/vnuserchipsdetail.html'
    };
});