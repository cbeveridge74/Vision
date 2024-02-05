angular.module('vnDynamoModule')
.factory('vnAbstractOperatorTwoState', function( 
	vnAbstractOperator ){
	var factory = {};

	factory.instance = function( args ){ //args[0] = target
		var _self = this;
		_self.component;

		var getBase = function(){
			if( _self.abstractOperator == null ){
				_self.abstractOperator = new vnAbstractOperator.instance( _self );
			}
			return _self.abstractOperator;
		}
		
		_self.execute = function( target, value ){
			console.log( "AbstractOperatorTwoState.execute" );
			getBase().execute( target, value );
			_self.component = getBase().component;
		}
	}
	return factory;
});