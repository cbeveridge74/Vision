angular.module('vnDynamoModule')
.factory('vnEnable', function( 
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
			console.log( "Enable.execute" );
			getBase().execute();
			getBase().component.enable();
		}
	}
	return factory;
});