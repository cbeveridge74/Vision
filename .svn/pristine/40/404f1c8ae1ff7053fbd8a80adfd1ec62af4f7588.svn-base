angular.module('vnValidationMessageModule', [],function () {})
.controller('vnValidationMessageController', function( $scope, $rootScope ){})
.factory('vnValidationMessageFactory',  function( $rootScope ){
  var factory = {};
  return factory;
})
.directive('vnValidationMessage', function() {
    return {
      restrict: 'EA',
      scope: {
        message: "@vnText"
      },
      templateUrl: function(elem, attr){
        return 'validation/vnvalidationmessage.html';
      },
      controller: function () {},
      link: function(scope, element, attr){

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

        element.find( '.validation-item' ).css( itemcss );
        element.find( '.validation-arrow' ).css( arrowcss );
        element.find( '.validation-arrow' ).addClass( attr.vnArrowDirection );
        //element.find( '.validation-item span' ).text( attr.vnText );
      }
    };
});