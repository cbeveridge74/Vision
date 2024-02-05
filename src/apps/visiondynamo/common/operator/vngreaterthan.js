angular.module('vnDynamoModule')
.factory('vnGreaterThan', function( 
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
			getBase().execute( target, value );
			console.log( getBase().component.getValue() + " > " + value );
			return parseFloat( getBase().component.getValue() ) > parseFloat( value );
		}
	}
	return factory;
});