angular.module('vnVisionAppointmentsModule', [
	'vnVisionAppointmentsDayModule',
	'vnVisionAppointmentsCalendarModule',
	'vnVisionAppointmentsBookingModule'],function () {})
.run(function( vnAppManagementFactory ){
	var APP_ID 			= "VN_APP";
	var DAY 			= APP_ID + '__DAY';
	var CALENDAR 		= APP_ID + '__CALENDAR';
	var BOOKING_FORM 	= APP_ID + '__BOOKING_FORM';

	vnAppManagementFactory.registerApp( 
		{ id: APP_ID, 
		name: "Appointments",
		icon: "apps/visionappointments/images/appointments.png",
		screens: [
			CALENDAR,
			DAY,
			BOOKING_FORM ]
		});
})
.controller('vnVisionAppointmentsController', function( 
	$scope,
	$rootScope, 
	vnActionFactory,
	vnTaskActionFactory,
	vnNavigationFactory,
	visionFactory,
	SCREENS ){
	$scope.backbutton = false;
	//var canHelpWithCallback = null;

	
	vnActionFactory.canHelpWith( vnActionFactory.BOOK_SLOT, bookSlot );

	function bookSlot( data, callback ){
		var TASK = 0;
		var PATIENT_ID = 1;

		vnActionFactory.setToasterMessageTemplate( "apps/visionappointments/vnactioncontexttoast.html" );
		$rootScope.$on( vnActionFactory.CANCEL_ACTION, function(){
			vnTaskActionFactory.setTaskContext( null );
		});

		if( data[ TASK ] != null ){
			// Setting the task context that can be used once the booking has been made.
			vnTaskActionFactory.setTaskContext( data[ TASK ] );
			if( data[ TASK ].attachments != null && data[ TASK ].attachments.selectedPatients != null ){
				if( data[ TASK ].attachments.selectedPatients.length > 0 ){
					$rootScope.selectedPatient = data[ TASK ].attachments.selectedPatients[0];
				}
			}
			vnNavigationFactory.switchScreens( SCREENS.CALENDAR );
		    
		    if( callback != null ){
		    	callback();
		    }
		}else if( data[ PATIENT_ID ] != null ){
			visionFactory.retrieveData( database[ PATIENT ].name, function( result ){
	          	$rootScope.selectedPatient = result[0];
	          	vnNavigationFactory.switchScreens( SCREENS.CALENDAR );
	          	var patient = {
	          		active: false,
					id: result[0].Id,
					subtitle: result[0].DOB,
					thumbnailUrl: "",
					title: result[0].Surname.toUpperCase() + ", " + result[0].Forename
	          	};

	          	$rootScope.selectedPatient = patient;
	          	
		    
			    if( callback != null ){
			    	callback();
			    }

	        }, null, { start: data[ PATIENT_ID ], end: data[ PATIENT_ID ] } );
		}
		$scope.model = {};
		$scope.model.message = 'Booking appt';
		//$scope.model.message = ( $rootScope.selectedPatient != null ) 
		//? 'Booking appointment for ' + $rootScope.selectedPatient.title + " (" + $root.selectedPatient.subtitle + ")" : 'Booking appointment';

	    
	    
	    /*

	    if( action == "REVDOC" ){
	      vnNavigationFactory.switchScreens( VN_TASK_SCREENS.DOCUMENT_REVIEW);
	    }else if( action == "BKAPPT" ){
	      var patientId;
	      if( args != null && args.length > 0 ){
	        patientId = args[0];
	        visionFactory.retrieveData( database[ PATIENT ].name, function( result ){
	          $rootScope.patientTransient = result[0];

	        }, null, { start: patientId, end: patientId } );
	        
	      }
	      vnNavigationFactory.switchScreens( SCREENS.CALENDAR );
	    }

	    */
	}
})
.directive('vnVisionAppointments', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionappointments/vnvisionappointments.html'
    };
  })
.value('SCREENS',  { 
	DAY: "VN_APP__DAY",
	CALENDAR: "VN_APP__CALENDAR",
	BOOKING_FORM: "VN_APP__BOOKING_FORM" 
});


