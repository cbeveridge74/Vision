angular.module('vnDocumentReviewModule', [],function () {})//'ngRoute', 'ngTouch', 'ngAnimate'
.controller('vnDocumentReviewController', function( 
  $scope, 
  $rootScope,
  vnNavigationFactory, 
  vnActionFactory,
  vnTaskActionFactory,
  VN_TASK_SCREENS ){
	
  var canHelpWithCallback;

  $scope.init = function ( callback ) {
    vnActionFactory.canHelpWith( vnActionFactory.REVIEW_DOC, reviewDoc );
    function reviewDoc( data, callback ){

      vnActionFactory.setToasterMessageTemplate( "apps/components/document/vnactioncontexttoast.html" );
      vnTaskActionFactory.setTaskContext( data[ 0 ] );
      $rootScope.$on( vnActionFactory.CANCEL_ACTION, function(){
        vnTaskActionFactory.setTaskContext( null );
      });

      vnNavigationFactory.switchScreens( VN_TASK_SCREENS.DOCUMENT_REVIEW );
      $scope.documents = data[0];
      canHelpWithCallback = callback;
      canHelpWithCallback();
    };
  };

  $scope.informCommands = documentInformCommands;

	$scope.handleBackButton = function(){
  	vnNavigationFactory.switchScreens( vnNavigationFactory.retrieveScreenFromHistory( vnNavigationFactory.SCREEN_PREVIOUS ) );
  };

  $rootScope.$on( "INFORM_COMMAND_SELECTED", function( scope, value, event ){
      if( value.id == DOCCOMP ){
          if( vnTaskActionFactory.getTaskContext() != null ){
            vnTaskActionFactory.markTaskAsActioned( vnTaskActionFactory.getTaskContext(), function( returnedTask ){
              vnActionFactory.needHelpWith( vnActionFactory.TASK_DETAIL, [ returnedTask ], function(){
                vnTaskActionFactory.setTaskContext( null );
              });
            });
          } 
      }
    });

	
}).directive('vnDocumentReview', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/components/document/vndocumentreview.html'
    };
  });