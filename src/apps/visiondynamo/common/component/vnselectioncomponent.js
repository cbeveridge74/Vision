angular.module('vnDynamoModule')
.factory('vnSelectionComponent', function( 
	vnExceptionFactory, 
	vnComponent ){
	var factory = {};

	factory.instance = function( impl ){
		var _self = new vnComponent.instance( impl );
		if( impl == null ||
			impl.setDataSource == null ){
			vnExceptionFactory.raiseException( 
				vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
				"<impl> exception for <SelectionComponent>" );
		}	
		_self.setDataSource = impl.setDataSource; //<bool>()
		
	}
	return factory;
});