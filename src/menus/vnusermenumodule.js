angular.module('vnUserMenuModule', [],function () {})
.controller('vnUserMenuController', function( $scope, $rootScope, vnTourFactory, vnNavigationFactory, gaTracker ){
	$scope.tipslabel = "Show hints";
	$scope.handleTourToggleClick = function(){
		if( $scope.tipslabel == "Hide hints" ){
			$scope.tipslabel = "Show hints";
		}else{
			$scope.tipslabel = "Hide hints";
		}
		//vnTourFactory.toggleTips();
	};

	$scope.handleSignOutClick = function(){
		$rootScope.user = null;
		vnNavigationFactory.switchScreens( "VN_LOGIN" );
		$rootScope.$broadcast( "LOGOUT" );
		gaTracker.sendEvent('Logout', 'User logged out', 'logout');
	};
})
.directive('vnUserMenu', function() {
    return {
      restrict: 'E',
      templateUrl: 'menus/vnusermenu.html'
    };
  });;