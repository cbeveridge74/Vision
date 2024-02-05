angular.module('vnVisionAnywhereModule', [],function () {})
.run(function( vnAppManagementFactory ){
	var APP_ID 			= "VN_ANY";
	var HOME 			= APP_ID + '__HOME';

	vnAppManagementFactory.registerApp( 
		{ id: APP_ID, 
		name: "Vision Anywhere",
		icon: "fa fa-keyboard-o",
		screens: [
			HOME 
			]
		});
})
.factory( 'vnVisionAnywhereFactory', function(){
	var factory = {};

	var patientId = -1;

	factory.setPatientId = function( value ){
		patientId = value;
	};

	factory.getPatientId = function(){
		return patientId;
	};

	return factory;
})
.controller('vnVisionAnywhereController', function( 
	$scope,
	$rootScope,
	vnNavigationFactory,
	vnVisionAnywhereFactory,
	vnActionFactory,
	ANYWHERE_SCREENS ){

	$scope.bannerModel = {};

	vnActionFactory.canHelpWith( vnActionFactory.PRESCRIBING, function( data, callback ){
		var PATIENT_ID = 0;
		vnVisionAnywhereFactory.setPatientId( data[ PATIENT_ID ] );
      	vnNavigationFactory.switchScreens( ANYWHERE_SCREENS.PRESCRIBING );
      	if( callback != null ){
      		callback();
      	}
	});

	$scope.$watch("screens." + ANYWHERE_SCREENS.PRESCRIBING, function( value ){

		if( value ){
			handleShow();
		}else{
			
		}
	});

	var handleShow = function(){
		$scope.bannerModel.localPatientId = vnVisionAnywhereFactory.getPatientId();
	};

	$scope.handleBackButtonClick = function(){
	  	vnNavigationFactory.switchScreens( vnNavigationFactory.retrieveScreenFromHistory( vnNavigationFactory.SCREEN_PREVIOUS ) );
	};

	
})
.directive('vnVisionAnywhere', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionanywhere/vnvisionanywhere.html'
    };
  })
.directive('vnPrescribing', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionanywhere/prescribing/vnprescribing.html'
    };
  })
.value('ANYWHERE_SCREENS', { 
	HOME: "VN_ANY__HOME",
	PRESCRIBING: "VN_ANY__PRESCRIBING"
});


