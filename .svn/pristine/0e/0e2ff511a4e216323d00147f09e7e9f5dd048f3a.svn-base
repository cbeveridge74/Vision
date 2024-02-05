angular.module('vnActionModule', [],function () {})
.factory('vnActionFactory',  function( 
	$mdToast,
	$timeout,
	$rootScope,
	visionFactory,
	vnNavigationFactory ){
	var factory = {};
	var canHelpWith = {};
	factory.CANCEL_ACTION = "CANCEL_ACTION";

	factory.REVIEW_DOC 			= 1;
	factory.BOOK_SLOT 			= 2;
	factory.GENERAL 			= 3;
	factory.FILE_DOCUMENTS 		= 4;
	factory.TASK_DETAIL 		= 5;
	factory.SEND_MESSAGE 		= 6;
	factory.OVERDUE_TASK 		= 7;
	factory.MAIL_ITEM_DISPLAY 	= 8;
	factory.PRESCRIBING 		= 9;

	var originalScreen;
	var toasterMessageTemplate;

	factory.getOrginalScreen = function(){
		return originalScreen;
	};

	factory.clearOrginalScreen = function(){
		originalScreen = null;
	};

	factory.cancelAction = function(){
		$rootScope.selectedPatient = null;
		factory.setToasterMessageTemplate();
		factory.clearOrginalScreen();
		$mdToast.hide();
		$mdToast.cancel();
		$rootScope.$broadcast( factory.CANCEL_ACTION );
	};

	var showActionContextToaster = function(){
		console.log( "Show Toaster" );
		$timeout( function(){
			$mdToast.show({
		      templateUrl: getToasterMessageTemplate(),
		      controller: "ActionContextToastController",
		      hideDelay: 0,
		      position: "bottom left"
		    });
		}, 1000 );
		

	    /*var toaster = $( '.vision-parent-module md-toast.md-left.md-bottom' );
	    toaster.addClass( 'action-toast' );*/
	};

	var getToasterMessageTemplate = function(){
		return toasterMessageTemplate;
	};

	factory.setToasterMessageTemplate = function( value ) {
		toasterMessageTemplate = value;
	};

	factory.canHelpWith = function( action, callback ){
		canHelpWith[ action ] = callback;
	};

	factory.needHelpWith = function( action, data, callback, returnToOriginalScreen, showToaster ){
		var helper = canHelpWith[ action ];
		if( helper != null ){
			if( returnToOriginalScreen == true ){
				originalScreen = vnNavigationFactory.getCurrentScreen();
			}
			helper.call( this, data, callback, showToaster );
			if( showToaster == true ){
				showActionContextToaster();
			}
		}else{
			visionFactory.retrieveData( database[ ACTION_TYPES ].name, function( results ){
				chrome.notifications.create("NO_HELPER", {
				  type: "basic",
				  title: "No Available Apps",
				  message: "Sorry, we don't yet have an app for " + results[0].description + ", but we're working on it...",
				  iconUrl: "../images/inps_logo_blue_128.png",
				  priority: 2
				}, function(){});
			}, 
	        null,
	        { start: action, end: action });
		}
	}
	return factory;
})
.controller("ActionContextToastController", function(
	$scope,
	vnActionFactory ){
	$scope.cancelAction = function(){
		vnActionFactory.cancelAction();
	};
})
.directive( 'vnActionContextToast', function(){
	return {
      restrict: 'E',
      templateUrl: 'actions/vnactioncontexttoast.html',
      scope: {
      	message: "@"
      },
      controller: function( $scope, vnActionFactory ){
      	$scope.cancelAction = function(){
      		vnActionFactory.cancelAction();
      	};
      }
    };
});