angular.module('vnDynamoModule')
.factory('vnAbstractRuleAction', function( 
	vnExceptionFactory,
	vnComponent,
	vnViewComponentFinderFactory ){
	var factory = {};

	factory.instance = function( impl, args ){ //args[0] = target
		var _self = this;
		_self.component;

		if( impl == null ||
			impl.execute == null ){
			vnExceptionFactory.raiseException( 
				vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
				"<impl> exception for <AbstractRuleAction>" );
		}
		
		if( args == null || args.length < 1 ){
			vnExceptionFactory.raiseException( 
				vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
				"<args> required" );
			return;
		}

		_self.execute = function(){
			console.log( "AbstractRuleAction.execute" );
			var target = args[ 0 ];
			_self.component = vnViewComponentFinderFactory.find (target);
			if( _self.component == null ){
				vnExceptionFactory.raiseException( 
					vnExceptionFactory.NO_SUCH_TARGET_EXCEPTION, 
					target + " not found" );
				return;
			}
		}
		
	}
	return factory;
});