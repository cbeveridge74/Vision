angular.module('vnCommandMenuModule', [],function () {})
.controller('vnCommandMenuController', function( $scope, $rootScope, gaTracker ){
	$scope.handleCommandClick = function( e, keepOpen ){
		$rootScope.$broadcast( "COMMAND_SELECTED", this.command );
		if( this.command != null ){
			gaTracker.sendEvent('Command Selected', this.command.id, 'command');
		}
		if( keepOpen == true ){
			e.stopPropagation();
		}
	};
})
.directive('vnCommandMenu', function() {
    return {
      restrict: 'E',
      templateUrl: 'menus/vncommandmenu.html'
    };
  });