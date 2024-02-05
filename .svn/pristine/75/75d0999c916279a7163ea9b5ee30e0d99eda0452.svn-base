angular.module('vnTourModule', [],function () {})
.controller('vnTourController', function( $scope, $rootScope ){
 
})
.factory('vnTourFactory',  function( $rootScope ){
  var factory = {};
  factory.toggleTips = function(){
    if( $rootScope.hidetour == true ){
      $rootScope.hidetour = false;
    }else{
      $rootScope.hidetour  = true;
    }
  };
  return factory;
})
.directive('vnTour', function() {
    return {
      restrict: 'EA',
      scope: {
        firsttime: "@vnFirstTime"
      },
      templateUrl: function(elem, attr){
        return 'tour/vntour.html';
      },
      controller: function ($scope, $rootScope) {
          if( $scope.firsttime != 'true' ){
            $rootScope.$watch("hidetour",function(newValue,OldValue,scope){
               if (newValue){ 
                   $scope.hidetour = newValue;
               }else{
                  $scope.hidetour = false;
               }
            });
            $rootScope.hidetour = true;
          }  
       },
      link: function(scope, element, attr){
        if( scope.firsttime == 'true' ){
          element.find( ".tour-container" ).addClass( "noshow" );
        }

        var itemcss = {
          top : attr.vnItemTop,
          left : attr.vnItemLeft,
          height : attr.vnItemHeight,
          width : attr.vnItemWidth
        };

        var arrowcss = {
          top : attr.vnArrowTop,
          left : attr.vnArrowLeft
        };

        element.find( '.tour-item' ).css( itemcss );
        element.find( '.tour-arrow' ).css( arrowcss );
        element.find( '.tour-arrow' ).addClass( attr.vnArrowDirection );
        element.find( '.tour-item span' ).text( attr.vnText );
      }
    };
});