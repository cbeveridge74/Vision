angular.module('vnDynamoModule')
.factory('vnEndsWith', function( 
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
			console.log( getBase().component.getValue() + " endsWith " + value );
			return getBase().component.getValue().indexOf(value, this.length - value.length) !== -1;
		}
	}
	return factory;
});