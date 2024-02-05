angular.module('vnMailModule', [],function () {})
.controller('vnMailController', function(
	$rootScope,
	$scope, 
	visionFactory, 
	vnScreenManagementFactory, 
	vnAssemblerFactory, 
	vnActionFactory,
	vnNavigationFactory){

	$scope.init = function () {
		$rootScope.$watch( $scope.screenToWatch, function( value ){
			if( value ){
				handleShow();
	    	}
      });
	};

	var handleShow = function(){
        visionFactory.retrieveData( database[ MAIL_ITEMS ].name, function( results ){
			retrieveMailHandler( results );
		}, "by_userid", {start: $rootScope.user.id, end: $rootScope.user.id}, 6);
	};

	$scope.handleRightClick = function( event, element ){
		vnScreenManagementFactory.handleItemClick( event, element, {}, mailRightCommands, true );
	};

	$scope.handleItemClick = function( event, element ){
		
	};

	
	var retrieveMailHandler = function( results ){
	    $scope.$apply(function(){
	      $scope.mail = results;
	    });
	};
	
}).directive('vnMail', function() {
    return {
      restrict: 'E',
      scope: {
      	patientspecific: '@vnPatientSpecific',
      	screenToWatch: '@vnWatch'
      },
      templateUrl: 'apps/components/mail/vnmail.html'
    };
  });