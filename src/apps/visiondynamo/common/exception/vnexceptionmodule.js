angular.module('vnExceptionModule', [],function () {})
.factory('vnExceptionFactory', function(){
	var factory = {};

	factory.PARAMETER_REQUIRED_EXCEPTION 				= 0;
	factory.NO_SUCH_TARGET_EXCEPTION 					= 1;
	factory.STATE_RULES_NOT_INITIALISED_EXCEPTION 		= 2;
	factory.DIRECT_INVOKE_EXCEPTION 					= 3;
	factory.NO_SUCH_TAG_EXCEPTION 						= 4;
	

	factory.raiseException = function( exception, message ){
		console.error( message );
		throw {};
	};
	return factory;
});