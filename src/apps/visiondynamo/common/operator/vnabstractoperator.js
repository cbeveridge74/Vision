angular.module('vnDynamoModule')
.factory('vnAbstractOperator', function( 
	vnExceptionFactory,
	vnComponent,
	vnOperator,
	vnViewComponentFinderFactory ){
	var factory = {};

	factory.instance = function( impl, args){ //args[0] = target
		var operator = new vnOperator.instance( impl );
		var _self = this;
		_self.component;
	

		_self.execute = function( target, value ){
			console.log( "AbstractOperator.execute" );

			if( target == null ){
				vnExceptionFactory.raiseException( 
					vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
					"<target> required" );
				return;
			}

			_self.component = vnViewComponentFinderFactory.find (target);
			if( _self.component == null ){
				vnExceptionFactory.raiseException( 
					vnExceptionFactory.NO_SUCH_TARGET_EXCEPTION, 
					target + " not found" );
				return;
			}
			//_self.execute();
		}
	}
	return factory;
});