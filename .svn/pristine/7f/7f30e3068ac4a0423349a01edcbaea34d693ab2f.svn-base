angular.module('vnDiscussionsModule', [],function () {})//'ngRoute', 'ngTouch', 'ngAnimate'
.controller('vnDiscussionsController', function(
	$scope, 
	visionFactory,
	vnScreenManagementFactory){
	$scope.init = function ( callback ) {
		
        visionFactory.retrieveData( database[ DISCUSSION ].name, function( results ){
			retrieveDiscussionHandler( results );
			if( callback ){
            	callback();
            }
		});
	        
	};

	$scope.handleRightClick = function( event ){
		vnScreenManagementFactory.handleItemClick( 
			event, 
			null, 
			null, 
			discussionsRightCommands, 
			true );
	};

	var retrieveDiscussionHandler = function( results ){
	    $scope.$apply(function(){
	      $scope.discussions = results;
	    });
	  };
}).directive('vnDiscussions', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/components/discussions/vndiscussions.html'
    };
  });