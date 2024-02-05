angular.module('vnDynamoModule')
.factory('vnChecked', function( 
	vnAbstractOperatorTwoState ){
	var factory = {};

	factory.instance = function( args ){ //args[0] = target
		var _self = this;

		var getBase = function(){
			if( _self.abstractOperatorTwoState == null ){
				_self.abstractOperatorTwoState = new vnAbstractOperatorTwoState.instance( _self, args );
			}
			return _self.abstractOperatorTwoState;
		}
		
		_self.execute = function( target, value ){
			console.log( "Checked.execute" );
			getBase().execute( target, value );
			return getBase().component.isChecked();
		}
	}
	return factory;
});