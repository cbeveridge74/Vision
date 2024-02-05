angular.module('vnVisionBackofficeModule', [],function () {})
.run(function( vnAppManagementFactory ){
	var APP_ID 			= "VN_BACKOFFICE";
	var BACKOFFICE 		= APP_ID + '__BACKOFFICE';
	

	vnAppManagementFactory.registerApp( 
		{ id: APP_ID, 
		name: "Back Office",
		icon: "apps/visionappointments/images/appointments.png",
		screens: [ 
		BACKOFFICE ]
		});
})
.controller('vnVisionBackofficeController', function( 
	$scope,
	$rootScope, 
	vnActionFactory,
	vnTaskActionFactory,
	vnNavigationFactory,
	visionFactory,
	SCREENS ){
	$scope.backbutton = false;
	//var canHelpWithCallback = null;


	
})
.directive('vnVisionBackoffice', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionbackoffice/vnvisionbackoffice.html'
    };
  })
.value('SCREENS',  {
	BACKOFFICE: "VN_APP__BACKOFFICE"
 });


