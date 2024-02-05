angular.module('vnPrescriptionModule', [],function () {})
.controller('vnPrescriptionController', function ( 
	$scope, 
	$rootScope,
	visionFactory, 
	vnScreenManagementFactory,
	vnNavigationFactory) {
	$scope.init = function ( callback ) {
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
        visionFactory.retrieveData( database[ THERAPY ].name, retrieveTherapyHandler,
			index,
			bounds
		);
	};

	$scope.handleRightClick = function( event, element ){
		vnScreenManagementFactory.handleItemClick( event, element, {}, prescriptionRightCommands, true );
	};

	$scope.handlePatientClick = function(){
        visionFactory.handlePatientClick( this.therapyitem.patient.id );
        event.stopPropagation();
	};

	var retrieveTherapyHandler = function( results ){
        $scope.$apply(function(){
          $scope.therapy = results;
        });
    };
}).directive('vnPrescription', function() {
    return {
      restrict: 'E',
      scope: {
      	patientspecific: '@vnPatientSpecific',
      	screenToWatch: '@vnWatch'
      },
      templateUrl: 'apps/components/prescriptions/vnprescription.html'
    };
  });



