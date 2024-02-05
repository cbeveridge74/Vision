angular.module('vnDynamoModule')
.controller('vnDateController', function( 
	$scope,
	vnValidationMessageFactory ){

	var listener;
	$scope.disabled = false;

	$scope.init = function(){
		$scope.setValue( new Date() );
	};
	$scope.getValue 				= function(){ 
		return this.value; 
	}; //<>( String )
	$scope.setValue 				= function( value ){ 
		this.value = value;
	}; //<>()
	$scope.disable 					= function(){ 
		$scope.disabled = true;
	}; //<bool>()
	$scope.enable 					= function(){ 
		$scope.disabled = false;
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
	$scope.isDisabled 				= function(){ 
		return disabled; 
	};
	$scope.handleChange				= function(){
		if( $scope.isListenerSet() ){
			listener.onChange( $scope.target );
		}
	};
})
.directive('vnDate', function() {
    return {
      restrict: 'E',
      scope: {
      	label: '@vnLabel',
      	target: '@vnTarget',
      	min: '@vnMin'
      },
      templateUrl: 'apps/visiondynamo/common/component/date/vndate.html'
    };
});