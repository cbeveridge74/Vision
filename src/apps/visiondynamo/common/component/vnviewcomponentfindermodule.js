angular.module('vnViewComponentFinderModule', [],function () {})
.factory('vnViewComponentFinderFactory', function(
	vnExceptionFactory
	){
	var factory = {};

	factory.find = function( target ){
		//console.log( "TARGET::" + target );

		/*var dummyComponent = {};

		dummyComponent.getValue 				= function(){ return 2 }; //<>( String )
		dummyComponent.setValue 				= function( value ){ console.log( "Setting " + value ); }; //<>()
		dummyComponent.disable 					= function(){ console.log( "Disabling" ); }; //<bool>()
		dummyComponent.enable 					= function(){ console.log( "Enabling" );}; //<bool>() 
		dummyComponent.setOnChangeListener 		= function(){}; //<>( INPSOnChangeListener )
		dummyComponent.isListenerSet 			= function(){}; //<bool>()
		dummyComponent.showValidationMessage 	= function( value ){ console.log( "Showing message " + value ); }; //<bool>( String )
		dummyComponent.clearValidationMessage 	= function(){ console.log( "Clearing Validation" ); };
		dummyComponent.isChecked 				= function(){ return true; };
		dummyComponent.isDisabled 				= function(){ return true; };*/

		var element = angular.element( "#" + target );
		if( element.length < 1 ){
			vnExceptionFactory.raiseException( 
            vnExceptionFactory.NO_SUCH_TARGET_EXCEPTION, 
            "No target found for " + target );
            return;
		}


		return element.scope();
	};
	return factory;
});