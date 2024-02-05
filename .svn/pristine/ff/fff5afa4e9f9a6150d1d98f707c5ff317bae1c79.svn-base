angular.module('vnDynamoModule')
.factory('vnDisabled', function( 
	vnAbstractOperator ){
	var factory = {};

	factory.instance = function( args ){ //args[0] = target
		var _self = this;

		var getBase = function(){
			if( _self.abstractOperator == null ){
				_self.abstractOperator = new vnAbstractOperator.instance( _self, args );
			}
			return _self.abstractOperator;
		}
		
		_self.execute = function( target, value ){
			console.log( "Disabled.execute" );
			getBase().execute( target, value );
			return getBase().component.isDisabled();
		}
	}
	return factory;
});