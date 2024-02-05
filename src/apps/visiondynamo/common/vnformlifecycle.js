angular.module('vnDynamoModule')
.controller('vnFormLifecycleController', function( 
	$scope,
	$rootScope,
	$timeout,
	vnFormDefinitionModel,
	vnStateEngine,
	vnDatabaseFactory,
	vnField ){

	$scope.init = function(){
		//$scope.formDefinition = new vnFormDefinitionModel.instance().retrieveFormDefinition();
		$rootScope.$watch( "screens.VN_DYNAMO", function( value ){
			if( value ){
				handleShow();
	    	}
      });
	};

	$scope.handleFormClick = function( name ){

		new vnFormDefinitionModel.instance().retrieveFormDefinition( name, function( formDefinition, formState ){
			//var formDefinition = data.formdefinition;
			console.log( formDefinition );
			$timeout( function(){
				$scope.formDefinition = formDefinition;
			}, 1, true );

			//$scope.formDefinition = new vnFormDefinitionModel.instance().retrieveFormDefinition( name );
			$timeout( function(){
				new vnStateEngine.instance().addStateRules( formState );
			}, 100 );
		});
	};

	var handleShow = function(){

		vnDatabaseFactory.retrieveData( "dynamoforms", function( data ){
			console.log( data[0] );

			$timeout( function(){
				$scope.forms = data;
			}, 1, true );

			
				}, "by_name", null, 100 );
	};
	
})
.factory('vnFormLifecycle', function( 
	vnExceptionFactory,
	vnComponent,
	vnViewComponentFinderFactory ){
	var factory = {};

	factory.instance = function( args ){ //args[0] = formdefinition
		var _self = this;
		
		if( args == null || args.length < 1 ){
			vnExceptionFactory.raiseException( 
				vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
				"<args> required" );
			return;
		}

		_self.render = function(){
			console.log( "FormLifeCycleImpl.render" );
			var formDefinition = args[ 0 ];
			
			if( formDefinition == null ){
				vnExceptionFactory.raiseException( 
					vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
					"<formDefinition> required" );
				return;
			}
			//Render the form from here
		}
		
	}
	return factory;
}).directive('vnFormLifecycleDirective', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visiondynamo/common/vnformrenderer.html'
    };
});