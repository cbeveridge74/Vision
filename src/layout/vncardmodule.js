angular.module('vnCardModule', [],function () {})
.controller('vnCardController', ['$scope', '$rootScope', 'vnScreenManagementFactory', 'gaTracker', function( $scope, $rootScope, vnScreenManagementFactory, gaTracker){


  $scope.init = function(){
      $scope.cardactionsinit( { callback: initActions } );
  };

  var initActions = function( leftActions, rightActions ){
    $scope.leftcardactions = leftActions;
    $scope.rightcardactions = rightActions;
  };

  /* Doing this using mousedown etc to get more control over when the card looks pressed */
  $scope.mousedown = function( e ){
    if( !$( e.target ).hasClass( 'action' ) ){
      $( e.currentTarget ).addClass( 'pressed' );
    }
  };

  $scope.mouseup = function( e ){
    $( e.currentTarget ).removeClass( 'pressed' );
  };

  $scope.supress = function( e ){
    e.stopPropagation();
  }; 

  $scope.handleActionClick = function( cardaction, e ){
    gaTracker.sendEvent('Card action', cardaction.id, 'Card action');
    if( $scope.cardactionclick != null ){
      $scope.cardactionclick( { action: cardaction, e: e } );
    }
  };
}])
.directive('vnCard', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        onfilterimage: '@vnOnFilterImage',
        offfilterimage: '@vnOffFilterImage',
        cardactionsinit: '&vnCardActionsInit',
        cardentity: '=vnCardEntity',
        cardactionclick: '&vnCardActionClick'
      },
      templateUrl: function(elem, attr){
        return 'layout/vncard.html';
      }
    };
});