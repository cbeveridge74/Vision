angular.module('vnDynamoModule')
.factory('vnOperator', function( vnExceptionFactory ){
	var factory = {};

	factory.instance = function( impl ){
		var _self = this;
		
		if( impl == null ||
			impl.execute == null ){
			vnExceptionFactory.raiseException( 
				vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
				"<impl> exception for <Operator>" );
		}
		_self.execute = impl.execute; //<>()
	}
	return factory;
});