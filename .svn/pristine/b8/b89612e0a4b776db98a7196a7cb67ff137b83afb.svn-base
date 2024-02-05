angular.module('vnAppointmentsModule', [],function () {})
.controller('vnAppointmentsController', function(
	$rootScope,
	$scope, 
	$timeout,
	visionFactory, 
	vnScreenManagementFactory, 
	vnAssemblerFactory, 
	vnActionFactory,
	vnNavigationFactory){

	$scope.init = function () {
		$rootScope.$watch( $scope.screenToWatch, function( value ){
			if( value ){
				handleShow();
	    	}
      });
	};

	var handleShow = function(){
		var index = 'by_date';
		var bounds = { start: new Date( moment( '2014-Jul-11' ).format( 'YYYY-MM-DD' ) ),
			          end: new Date( moment( '2014-Jul-12' ).format( 'YYYY-MM-DD' ) )
			        };

		if( $scope.patientspecific == "true" ){
			index = 'by_patient';
			bounds = { start: $rootScope.patientid,
			          end: $rootScope.patientid
			        };
		}
        visionFactory.retrieveData( database[ APPOINTMENT ].name, function( results ){
			retrieveAppointmentsHandler( results );
		}, 
        index,
        bounds
        );
	};

	$scope.handleItemClick = function( event, element ){
		vnActionFactory.needHelpWith( vnActionFactory.GENERAL, {data: "Some data"}, function(){ 

		});
	};

	$scope.handleRightClick = function( event ){
		visionFactory.retrieveData( 
	  		database[ PERSON ].name, 
	  		function( result ){
	  			angular.forEach( appointmentsRightCommands, function( value, index ){
	  				if( value.id == SND ){
	  					value.label =  "Send message to " + result[0].shortdescription
	  				}
	  			} );

	  			vnScreenManagementFactory.handleItemClick( 
				event, 
				null, 
				null, 
				appointmentsRightCommands, 
				true );
	  		}, 
	  		null, 
	  		{start: this.appointment.ownerid, end: this.appointment.ownerid}, 
	  		null);
		
	};

	$scope.handleStatusClick = function( event, element){
		if( element.appointment != null ){
			var index = -1;
			angular.forEach(status, function(value, key) {
				
		       	if( element.appointment.status == value ){
			       	if( key > 3 ){
			       		index = 0
			       	}else{
			       		index = key + 1;
			       	}
		        }
		    });
		    element.appointment.status = status[ index ];
		    element.appointment.statusimage = vnAssemblerFactory.status[ element.appointment.status ];
		    
		}
		event.stopPropagation();
	};

	var retrieveAppointmentsHandler = function( results ){
	    $scope.$apply(function(){
	      $scope.appointments = results;
	    });
	};

	var status = [ "AVAILABLE", "BOOKED", "ARRIVED", "INCONSULTATION", "COMPLETED" ];
	
}).directive('vnAppointments', function() {
    return {
      restrict: 'E',
      scope: {
      	patientspecific: '@vnPatientSpecific',
      	screenToWatch: '@vnWatch'
      },
      templateUrl: 'apps/components/appointments/vnappointments.html'
    };
  });