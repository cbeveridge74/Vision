angular.module('vnDynamoModule')
.controller('vnTextAreaController', function( 
	$scope,
	vnValidationMessageFactory ){

	var listener;

	$scope.init = function(){};
	$scope.getValue 				= function(){ 
		return this.value; 
	}; //<>( String )
	$scope.setValue 				= function( value ){ 
		console.log( "Setting " + value ); 
		this.value = value;
	}; //<>()
	$scope.disable 					= function(){ 
		console.log( "Disabling" ); 
	}; //<bool>()
	$scope.enable 					= function(){ 
		console.log( "Enabling" );
	}; //<bool>() 
	$scope.setOnChangeListener 		= function( stateEngineListener ){
		listener = stateEngineListener;
	}; //<>( INPSOnChangeListener )
	$scope.isListenerSet 			= function(){
		return listener != null;
	}; //<bool>()
	$scope.showValidationMessage 	= function( value ){ 
		$scope.message = value;
	}; //<bool>( String )
	$scope.clearValidationMessage 	= function(){ 
		$scope.message = null;
	};
	$scope.isChecked 				= function(){ return true; };
	$scope.isDisabled 				= function(){ return true; };

	$scope.handleChange				= function(){
		if( $scope.isListenerSet() ){
			listener.onChange( $scope.target );
		}
	};
})
.directive('vnTextArea', function() {
    return {
      restrict: 'E',
      scope: {
      	label: '@vnLabel',
      	target: '@vnTarget',
      	max: '@vnMax'
      },
      templateUrl: 'apps/visiondynamo/common/component/textarea/vntextarea.html'
    };
});