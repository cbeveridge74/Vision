angular.module('vnDynamoModule')
.factory('vnComponent', function( vnExceptionFactory ){
	var factory = {};

	factory.instance = function( impl ){
		var _self = this;
		
		if( impl == null ||
			impl.getValue == null || 
			impl.setValue == null ||
			impl.disable == null ||
			impl.enable == null ||
			impl.setOnChangeListener == null ||
			impl.isListenerSet == null ||
			impl.showValidationMessage == null ||
			impl.clearValidationMessage == null
			){
			vnExceptionFactory.raiseException( 
				vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
				"<impl> exception for <Component>" );
		}
		
		_self.getValue 					= impl.getValue; //<>( String )
		_self.setValue 					= impl.setValue; //<>()
		_self.disable 					= impl.disable; //<bool>()
		_self.enable 					= impl.enable; //<bool>() 
		_self.setOnChangeListener 		= impl.setOnChangeListener; //<>( INPSOnChangeListener )
		_self.isListenerSet 			= impl.isListenerSet; //<bool>()
		_self.showValidationMessage 	= impl.showValidationMessage; //<bool>( String )
		_self.clearValidationMessage 	= impl.clearValidationMessage; //<bool>()
		
	}
	return factory;
});

