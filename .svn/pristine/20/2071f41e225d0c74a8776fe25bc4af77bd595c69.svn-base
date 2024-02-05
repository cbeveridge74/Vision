angular.module('vnDynamoModule')
.factory('vnComponentState', function( vnExceptionFactory ){
	var factory = {};

	factory.instance = function( impl ){
		var _self = this;
		
		if( impl == null ||
			impl.isDisabled == null ){
			vnExceptionFactory.raiseException( 
				vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
				"<impl> exception for <ComponentState>" );
		}
		_self.isDisabled = impl.isDisabled; //<bool>()
		
	}
	return factory;
});