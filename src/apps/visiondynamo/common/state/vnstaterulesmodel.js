angular.module('vnDynamoModule')
.factory('vnStateRulesModel', function( vnExceptionFactory ){
	var factory = {};

	factory.instance = function( impl ){
		var _self = this;
		
		if( impl == null ||
			impl.retrieveStateRules == null ){
			vnExceptionFactory.raiseException( 
				vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
				"<impl> exception for <StateRulesModel>" );
			return;
		}
		_self.retrieveStateRules = impl.retrieveStateRules; //<Array[StateRule]>(int formName)

	}
	return factory;
});