angular.module('vnDynamoModule')
.factory('vnComponentTwoState', function( 
	vnExceptionFactory, 
	vnComponentState ){
	var factory = {};

	factory.instance = function( impl ){
		var _self = new vnComponentState.instance( impl );
		if( impl == null ||
			impl.isChecked == null ){
			vnExceptionFactory.raiseException( 
				vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
				"<impl> exception for <ComponentTwoState>" );
		}	
		_self.isChecked = impl.isChecked; //<bool>()
		
	}
	return factory;
});