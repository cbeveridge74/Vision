angular.module('vnNavigationModule', [],function () {})
.factory('vnNavigationFactory',  function( 
	$rootScope, 
	$timeout, 
	vnAppManagementFactory,
	gaTracker ){
	var factory = {};
	var currentScreen;
	$rootScope.screens = {};
	$rootScope.screens[ "VN_LOGIN" ] = true;
	var screenHistory = new Array();
	var HISTORY_LENGTH = 10;
	factory.SCREEN_CURRENT = 0;
	factory.SCREEN_PREVIOUS = 1;

	factory.getCurrentScreen = function(){
		if( currentScreen != null ){
			return currentScreen;
		}
		 
	};

  	factory.switchScreens = function( to ){
  		angular.forEach( $rootScope.screens, function( value, index ){
			$rootScope.screens[ index ] = false;
		});
		$timeout( function(){
			$rootScope.screens[to] = true;
			currentScreen = to;
			gaTracker.sendAppView(to);
			// I'm only keeping current and previous at the moment
			var screenHistoryLength = screenHistory.unshift( to );
			if( screenHistoryLength > HISTORY_LENGTH ){
				screenHistory.pop();
			}
			var appName = to.split( '__' );
			if( appName != null ){
				$rootScope.screens[appName[0]] = true;
				var app = vnAppManagementFactory.getApp( appName[0] );
				if( app != null ){
					$rootScope.currentapp = app;	
				}
			}
		}, 1, true );
	 }; 

	 factory.retrieveScreenFromHistory = function( screenHistoryIndex ){
	 	if( screenHistoryIndex == factory.SCREEN_PREVIOUS ){
	 		var returnScreen = screenHistory[ factory.SCREEN_PREVIOUS ];
	 		// Remove the first 2 history items as the previous screen
	 		// is going to be added again
	 		screenHistory.splice( 0, 2 );
	 		return returnScreen;
	 	}
	 	return screenHistory[ screenHistoryIndex ];
	 };
	return factory;
});
