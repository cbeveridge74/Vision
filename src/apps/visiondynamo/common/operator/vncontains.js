angular.module('vnDynamoModule')
.factory('vnContains', function( 
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
			console.log( "Contains.execute" );
			getBase().execute( target, value );
			return getBase().component.getValue().indexOf( value ) > -1;
		}
	}
	return factory;
});