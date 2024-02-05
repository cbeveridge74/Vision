angular.module('vnDynamoModule')
.controller('vnComboController', function( 
	$scope,
	$rootScope,
	$timeout,
	vnValidationMessageFactory,
	vnDatabaseFactory ){

	var listener;

	$scope.init = function(){
		$rootScope.$watch( "screens.VN_DYNAMO", function( value ){
			if( value ){
				handleShow();
	    	}
      	});
	};

	var handleShow = function(){
		vnDatabaseFactory.retrieveData( $scope.dataSource, function( data, item ){
			$timeout( function(){
				$scope.options = data;
				$scope.selected = { id: parseInt( $scope.selected ) };
			}, 1, true );
		}, null, null, 1000 );
	};

	
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
.directive('vnCombo', function() {
    return {
      restrict: 'E',
      scope: {
      	label: '@vnLabel',
      	target: '@vnTarget',
      	dataSource: '@vnDataSource',
      	selected: '@vnSelected'
      },
      templateUrl: 'apps/visiondynamo/common/component/combo/vncombo.html'
    };
});