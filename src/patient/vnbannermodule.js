angular.module('vnBannerModule', [],function () {})
.controller('vnBannerController', function($rootScope, $scope, visionFactory){

$scope.init = function () {

  var _screen = "screens.VN_REP__PATIENT";

  if( $scope.screenToWatch != null ){
    _screen = $scope.screenToWatch;
  }



  $rootScope.$watchGroup( [ _screen, 'patientid'  ], function( value ){
    if( value ){
      setTimeout( function(){
        handleShow();
      }, 1);
    }
  });

  $scope.$watch( 'model.localPatientId', function( value ){
    if( value ){
      setTimeout( function(){
        handleShow();
      }, 1);
    }
  });

};

$scope.handleContextClick = function(){
  $rootScope.patientid = null;
  $scope.model.localPatientId = null;
};

$scope.isPatientContext = function(){
  return !( ( $scope.model == null || $scope.model.localPatientId == null ) && $rootScope.patientid == null );
};

var handleShow = function(){

  if( !$scope.isPatientContext() ){
    return;
  }

  visionFactory.retrieveData( 
    database[ PATIENT ].name, 
    handlePatientRetrieved, 
    null, 
    { start: ( $scope.model.localPatientId == null ) ? $rootScope.patientid : $scope.model.localPatientId,
      end: ( $scope.model.localPatientId == null ) ? $rootScope.patientid : $scope.model.localPatientId} )};

   var handlePatientRetrieved = function( data ){
      $scope.patient = data[0];
      $scope.$apply();
    };

})
.directive('vnBanner', function() {
    return {
      restrict: 'E',
      scope: {
        contextButton: "@",
        model: "=",
        screenToWatch: '@'
      },
      templateUrl: function(elem, attr){
        return 'patient/vnbanner.html';
      }
    };
});