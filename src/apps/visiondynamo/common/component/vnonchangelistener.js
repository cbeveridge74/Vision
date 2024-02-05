angular.module('vnDynamoModule')
.factory('vnOnChangeListener', function( vnExceptionFactory ){
	var factory = {};

	factory.instance = function( impl ){
		var _self = this;
		
		if( impl == null ||
			impl.onChange == null ){
			vnExceptionFactory.raiseException( 
				vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
				"<impl> exception for <OnChangeListener>" );
		}
		_self.onChange = impl.onChange; //<>( String )
	}
	return factory;
});