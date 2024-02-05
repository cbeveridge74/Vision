angular.module('vnAssemblerModule', [],function () {})//'ngTouch'
.factory('vnAssemblerFactory',  function( $http, $q ){
	var factory = {};
	var assembler;// = new WebServiceAssembler();

	if( config.mode === "webservice" ){
		//assembler = new WebServiceAssembler();
	}else{
		assembler = new DemoAssembler( $http, $q );
	}

	factory.status = assembler.status;

	factory.assembleMailItemOrder = function( data ){
		return assembler.assembleMailItemOrder( data );
	};

	factory.assembleMailItems = function( data ){
		return assembler.assembleMailItems( data );
	};

	factory.assembleMailFilters = function( data ){
		return assembler.assembleMailFilters( data );
	};

	factory.assembleNotifications = function( data ){
		return assembler.assembleNotifications( data );
	};

	factory.assembleComments = function( data ){
		return assembler.assembleComments( data );
	};

	factory.assembleAnnouncements = function( data ){
		return assembler.assembleAnnouncements( data );
	};

	factory.assembleTrackingData = function( data ){
		return assembler.assembleTrackingData( data );
	};

	factory.assembleTracking = function( data ){
		return assembler.assembleTracking( data );
	};

	factory.assembleTaskWorkflow = function( data ){
		return assembler.assembleTaskWorkflow( data );
	};

	factory.assembleTaskSubjects = function( data ){
		return assembler.assembleTaskSubjects( data );
	};

	factory.assemblePersonGroups = function( data ){
		return assembler.assemblePersonGroups( data );
	};

	factory.assembleActionTypes = function( data ){
		return assembler.assembleActionTypes( data );
	};

	factory.assembleClinicalDocs = function( data ){
		return assembler.assembleClinicalDocs( data );
	};

	factory.assembleClinicalDoc = function( data ){
		return assembler.assembleClinicalDoc( data );
	};

	factory.assembleDynamoForms = function( data ){
		return assembler.assembleDynamoForms( data );
	};

	factory.assembleStaff = function( data ){
		return assembler.assembleStaff( data );
	};

	factory.assembleForms = function( data ){
		return assembler.assembleForms( data );
	};

	factory.assembleEntity = function( data ){
		return assembler.assembleEntity( data );
	};

	factory.assembleAttributes = function( data ){
		return assembler.assembleAttributes( data );
	};

	factory.assembleAppInfo = function( data ){
		return assembler.assembleAppInfo( data );
	};

	factory.assembleTask = function( practiceId, data ){
		return assembler.assembleTask( practiceId, data );
	};

	factory.assembleAppointment = function( data ){
		return assembler.assembleAppointment( data );
	};

	factory.assembleTherapy = function( data ){
		return assembler.assembleTherapy( data );
	};

	factory.assembleMailItem = function( data ){
		return assembler.assembleMailItem( data );
	};

	factory.assembleReminder = function( data ){
		return assembler.assembleReminder( data );
	};

	factory.assemblePerson = function( data ){
		return assembler.assemblePerson( data );
	};

	factory.assemblePatient = function( data ){
		return assembler.assemblePatient( data );
	};

	factory.assembleDiscussion = function( data ){
		return assembler.assembleDiscussion( data );
	};
	


	factory.assembleTasks = function( data ){
		return assembler.assembleTasks( data );
	};

	factory.assembleAppointments = function( data ){
		return assembler.assembleAppointments( data );
	};

	factory.assembleTherapies = function( data ){
		return assembler.assembleTherapies( data );
	};

	factory.assembleMail = function( data ){
		return assembler.assembleMail( data );
	};

	factory.assembleReminders = function( data ){
		return assembler.assembleReminders( data );
	};

	factory.assemblePersons = function( data ){
		return assembler.assemblePersons( data );
	};

	factory.assemblePatients = function( data ){
		return assembler.assemblePatients( data );
	};

	factory.assembleDiscussions = function( data ){
		return assembler.assembleDiscussions( data );
	};

	
	return factory;
});