angular.module('vnBarModule', [],function () {})//'ngRoute', 'ngTouch', 'ngAnimate'
.factory( 'vnBarFactory', function(  ){
  var factory = {};
  factory.APPBAR_COMMAND_SELECTED = "APPBAR_COMMAND_SELECTED";

  return factory;
} )
.controller('vnBarController', function(
  $scope, 
  $rootScope, 
  vnScreenManagementFactory,
  vnBarFactory,
  gaTracker){

  $scope.applogo = "INPS_logo.svg";

  $scope.handleUserClick = function( event ){
      if( $( ".bar .user-menu" ).hasClass( "open" ) ){
        vnScreenManagementFactory.closeMenus();
      }else{
        vnScreenManagementFactory.openMenu( ".bar .user-menu" );
      }
      gaTracker.sendEvent('User menu', 'User menu opened', 'User menu');
  };

  $scope.handleButtonClick = function( event ){
      $rootScope.$broadcast( "APPBAR_COMMAND_SELECTED", this.command );
      if( this.appBarIcon.id == HMB ){
        // Nothing is listening to this at the moment 01/11/2015
        $rootScope.$broadcast( vnBarFactory.APPBAR_COMMAND_SELECTED, this.appBarIcon );
        vnScreenManagementFactory.toggleBars( true );
        vnScreenManagementFactory.closeMenus();
      }else if( this.appBarIcon.id == NTF ){
        vnScreenManagementFactory.openMenu( ".bar .vision-notifications .menu" );
        gaTracker.sendEvent('Notification', 'Notifications opened', 'Notifications');
      }
      event.stopPropagation();
  };
})

.directive('vnBar', function() {
    return {
      restrict: 'E',
      templateUrl: 'layout/vnbar.html'
    };
  });