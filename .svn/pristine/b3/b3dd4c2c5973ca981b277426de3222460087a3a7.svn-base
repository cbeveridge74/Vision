angular.module('vnCorrespondenceModule', [],function () {})
.controller('vnCorrespondenceController', function ( 
	$scope,
	$rootScope, 
	visionFactory, 
	vnScreenManagementFactory,
	vnNavigationFactory) {

	$scope.init = function () {
		$rootScope.$watch( $scope.screenToWatch, function( value ){
			if( value ){
				handleShow();
	    	}
      });
	};

	var handleShow = function(){
		var index = 'by_id';
		var bounds = null;

		if( $scope.patientspecific == "true" ){
			index = 'by_patient';
			bounds = { start: $rootScope.patientid,
			          end: $rootScope.patientid
			        };
		}
        visionFactory.retrieveData( database[ MAIL ].name, retrieveMailHandler,
			index,
			bounds
		);
	};

	$scope.handleRightClick = function( event, element ){
		vnScreenManagementFactory.handleItemClick( event, element, {}, correspondenceRightCommands, true );
	};

	$scope.handlePatientClick = function(){
        visionFactory.handlePatientClick( this.mailitem.patient.id );
        event.stopPropagation();
	};

	var retrieveMailHandler = function( results ){
        $scope.$apply(function(){
          $scope.mail = results;
        });
      };
}).directive('vnCorrespondence', function() {
	return {
	  restrict: 'E',
	  scope: {
      	patientspecific: '@vnPatientSpecific',
      	screenToWatch: '@vnWatch'
      },
	  templateUrl: 'apps/components/correspondence/vncorrespondence.html'
	};
});