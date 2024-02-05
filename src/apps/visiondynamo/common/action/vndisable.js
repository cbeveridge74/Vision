angular.module('vnDynamoModule')
.factory('vnDisable', function( 
	vnAbstractRuleAction ){
	var factory = {};

	factory.instance = function( args ){ //args[0] = target
		var _self = this;

		var getBase = function(){
			if( _self.abstractRuleAction == null ){
				_self.abstractRuleAction = new vnAbstractRuleAction.instance( _self, args );
			}
			return _self.abstractRuleAction;
		}
		
		_self.execute = function(){
			console.log( "Disable.execute" );
			getBase().execute();
			getBase().component.disable();
		}
	}
	return factory;
});