angular.module('vnSnoozeModule', [],function () {})
.controller('vnSnoozeController', function ( 
	$scope,
	$rootScope,
	vnScreenManagementFactory,
	vnScrollFactory
){
	$rootScope.$on( vnScreenManagementFactory.GENERAL_CLICK, function( event ){
		vnScrollFactory.enableScrolling();
	});

	$scope.handleGeneralClick = function( event ){
		if( event != null ){
	      	event.stopPropagation();
	    }
	};
	
}).directive('vnSnooze', function() {
	return {
	  restrict: 'E',
	  templateUrl: 'apps/components/dialog/vnsnooze.html'
	};
});