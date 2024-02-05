angular.module('vnDynamoModule')
.factory('vnShowValidationMessage', function( 
	vnAbstractRuleAction,
	vnExceptionFactory ){
	var factory = {};

	factory.instance = function( args ){ //args[0] = target // args[1] = value
		var _self = this;

		if( args.length < 2 ){
			vnExceptionFactory.raiseException( 
				vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
				"SetValue args[1] message required" );
			return;
		}

		var getBase = function(){
			if( _self.abstractRuleAction == null ){
				_self.abstractRuleAction = new vnAbstractRuleAction.instance( _self, args );
			}
			return _self.abstractRuleAction;
		}
		
		_self.execute = function(){
			console.log( "ShowValidationMessage.execute" );
			getBase().execute();
			getBase().component.showValidationMessage( args[1] );
		}
	}
	return factory;
});