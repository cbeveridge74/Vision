angular.module('vnWorkflowBarModule', [],function () {})
.factory('vnWorkflowBarFactory', function(
  $rootScope,
	vnTrackingFactory,
	vnRecurrenceFactory
	){
  var factory = {};
  factory.TRACKING_UPDATED = vnTrackingFactory.TRACKING_UPDATED;
  factory.RECURRENCE_UPDATED = vnRecurrenceFactory.RECURRENCE_UPDATED;

  /* DOCUMENTS */
  factory.setDocuments = function( value ){
    documents = value;
  };

  factory.getDocuments = function(){
    return documents;
  };

  factory.clearDocuments = function(){
    documents = [];
  };

  /* PATIENTS */
  factory.setPatients = function( value ){
    patients = value;
  };

  factory.getPatients = function(){
    return patients;
  };

  factory.clearPatients = function(){
    patients = [];
  };

  /* TRACKING */
  factory.setTracking = function( value ){
    vnTrackingFactory.setTracking( value );
  };

  factory.getTracking = function(){
    return vnTrackingFactory.getTracking();
  };

  factory.clearTracking = function(){
  	vnTrackingFactory.clearTracking();
  };

  factory.hasTracking = function(){
  	return vnTrackingFactory.hasTracking();
  };

  /* RECURRENCE */
  factory.setRecurrence = function( value ){
    vnRecurrenceFactory.setRecurrence( value );
  };

  factory.getRecurrence = function(){
    return vnRecurrenceFactory.getRecurrence();
  };

  factory.clearRecurrence = function(){
  	vnRecurrenceFactory.clearRecurrence();
  };

  factory.hasRecurrence = function(){
  	return vnRecurrenceFactory.hasRecurrence();
  };

  return factory;
})
.controller('vnWorkflowBarController', function( 
	$scope, 
	$rootScope, 
	$timeout, 
	$mdDialog,
	vnScrollFactory, 
	vnWorkflowFactory, 
	vnScreenManagementFactory,
	vnNavigationFactory,
	vnWorkflowBarFactory,
  vnTaskCreateFactory,
	visionFactory,
	VN_TASK_SCREENS,
	VN_MAIL_SCREENS,
  gaTracker ){

      	
    $rootScope.$on( vnWorkflowFactory.CLEAR_WORKFLOW, function(){
    	vnWorkflowBarFactory.initWorkflow();
    });

	vnWorkflowBarFactory.clearTracking();
	vnWorkflowBarFactory.clearRecurrence();
  vnWorkflowBarFactory.clearPatients();
  vnWorkflowBarFactory.clearDocuments();
    
	

  	/* DRAG DROP FILE */
  	var holder = $('#holder')[0];
	    //state = document.getElementById('status');

	if (typeof window.FileReader === 'undefined') {
	  
	  //state.className = 'fail';
	} else {
		
	  //state.className = 'success';
	  //.innerHTML = 'File API & FileReader available';
	}
	 
	holder.ondragover = function () {  
		$( this ).addClass( 'hover' );
		return false; };
	
	holder.ondragend = function () { 
		$( this ).removeClass( 'hover' ); 
		return false; 
	};

	holder.ondragleave = function () { 
		$( this ).removeClass( 'hover' ); 
		return false; 
	};

	
	holder.ondrop = function (e) {
	  
	  e.preventDefault();

	  var file = e.dataTransfer.files[0],
	      reader = new FileReader();
	  reader.onload = function (event) {
	    //holder.style.background = 'url(' + event.target.result + ') no-repeat center';
	  };
	  //console.log(file.name);
	  $( this ).removeClass( 'hover' ); 
	  $scope.model.documentCollection.push( { label: file.name } );
	  $scope.$apply();
	  reader.readAsDataURL(file);
    gaTracker.sendEvent('Workflow', 'Document attached via drag', 'drag');
	  return false;
	};

  	/******************/
  	$scope.initWorkflowBar = function () {
  		$rootScope.$watch( 
	      	"screens.VN_TASK__WORKFLOW", function( value ){
      		if( value ){

      			vnWorkflowBarFactory.setTracking( $scope.model.trackingSummary );
      			vnWorkflowBarFactory.setRecurrence( $scope.model.recurrenceSummary );
      			if( $scope.model.documentCollection == null ){
      				$scope.model.documentCollection = vnWorkflowBarFactory.getDocuments();
      			}
      			if( $scope.model.selectedPatients == null ){
      				$scope.model.selectedPatients = vnWorkflowBarFactory.getPatients();
      			}
      		}
      	});
  	};

  	$scope.handleAttachedDocDeleteClick = function(){
  		$scope.model.documentCollection = [];
  	};

  	$scope.handleTrackingDeleteClick = function(){
  		vnWorkflowBarFactory.clearTracking();
  	};

  	$scope.handleRecurrenceDeleteClick = function(){
  		vnWorkflowBarFactory.clearRecurrence();
  	};

  	$scope.handleTrackingEdit = function(){
  		vnNavigationFactory.switchScreens( VN_TASK_SCREENS.TRACKING );
  	};

  	$scope.handleRecurrenceEdit = function(){
  		vnNavigationFactory.switchScreens( VN_TASK_SCREENS.RECURRENCE );
  	};

  	$scope.handlePatientClick = function( e ){
  		console.log( "Patient Clicked" );
  	};

  	$scope.handleAddClinicalItem = function( e ){
  		vnNavigationFactory.switchScreens( VN_MAIL_SCREENS.DOCUMENT_INBOX );
  	};
  	

  	$scope.handleAttachmentDeleteClick = function( e ){
  		$scope.attacheddocument = null;
  	};

  	$rootScope.$on( vnWorkflowBarFactory.TRACKING_UPDATED, function( scope ){
  		$scope.hasTracking = vnWorkflowBarFactory.hasTracking();
  		$scope.model.trackingSummary = vnWorkflowBarFactory.getTracking();
      gaTracker.sendEvent('Tracking', 'Tracking updated', 'tracking');
  	});

  	$rootScope.$on( vnWorkflowBarFactory.RECURRENCE_UPDATED, function( scope, value ){
  		$scope.hasRecurrence = vnWorkflowBarFactory.hasRecurrence();
  		$scope.model.recurrenceSummary = vnWorkflowBarFactory.getRecurrence();
      gaTracker.sendEvent('Recurrence', 'Recurrence updated', 'recurrence');
  	});

  	vnScreenManagementFactory.initialiseMenuOptions( correspondenceLeftCommands, workflowRightCommands );
    // DCB - COmmented out as part of VIsion Mail dev.  Should listen to this factory instead for document updates
    // See vncreateviewmodule.js and implement in same way
  	/*$rootScope.$on( "DOCUMENT_ATTACHMENT", function( scope, values ){
      if( $scope.model.documentCollection == null ){
        return;
      }
      vnTaskCreateFactory.attachDocuments( $scope.model, values );
	 });*/
})
.directive('vnWorkflowBar', function() {
    return {
      scope: {
      	model: "=",
      	reinitialise: "="
      },
      restrict: 'E',
      templateUrl: 'apps/visiontasks/workflow/vnworkflowbar.html'
    };
});