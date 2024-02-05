angular.module('vnPatientChipsDetailModule', [ ],function () {})
.controller('vnPatientChipsDetailController', function( 
	$scope, 
	$timeout, 
	visionFactory, 
	vnTrackingManagerFactory,
	gaTracker ){

	$scope.initPatientChipsDetail = function(){
		visionFactory.retrieveData( database[ PATIENT ].name, function( results ){
			$scope.patient = results[0];
			$scope.$apply();
		}, null, {start: parseInt( $scope.id ), end: parseInt( $scope.id )}, null);
		
		vnTrackingManagerFactory.retrievePatientTracking( parseInt( $scope.id ), function( tracking ){
			$scope.track = tracking;
			$scope.$watch( "track", function( newValue, oldValue ){
				if( newValue == oldValue ){
					return;
				}
				saveTracking();
			}, true );
			$scope.$apply();
		});
	};

	var saveTracking = function(){
		vnTrackingManagerFactory.updatePatientTracking( $scope.patient.Id, $scope.track );
		gaTracker.sendEvent('Patient', 'Tracking set via patient chip', 'patient');
	};

	$scope.handleClick = function( event ){
		event.stopPropagation();
	};
})
.directive('vnPatientChipsDetail', function() {
    return {
    	scope: {
			id: '@'
		},
	    restrict: 'E',
	    templateUrl: 'apps/components/chips/patient/vnpatientchipsdetail.html'
    };
});