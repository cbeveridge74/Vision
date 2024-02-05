angular.module('vnVisionAppointmentsDayModule', function () {})
.controller('vnVisionAppointmentsDayController', function( 
  $scope,
  $rootScope,
  $filter,
  visionFactory,
  vnScrollFactory,
  vnNavigationFactory,
  vnScreenManagementFactory,
  SCREENS,
  DATE_FORMAT ){
    var previousDate;
    $( window ).resize(function() {
        handleResize();
      });

    var moveZoomButton = function(){
      var viewportWidth = $(window).width();
      var viewportHeight = $(window).height();
      $( ".zoom-button-day" ).css( 'top', viewportHeight - 40  );
      $( ".zoom-button-day" ).css( 'left', viewportWidth - 40  );
    };

    $scope.init = function () {
      $scope.$watch("screens." + SCREENS.DAY, function( value ){
        if( value ){
          handleShow();
        }
      });
      $rootScope.$watch("hidetour",function(value){
        if( value == false ){
          vnScrollFactory.scrollTo( "day-scroller", 0 );
        }
        
      });
      handleShow();
    };

    $scope.handleSlotClick = function( element ){
        $rootScope.selectedSlot = element.slot.id;
        vnNavigationFactory.switchScreens( SCREENS.BOOKING_FORM );
    };

    var handleShow = function(){
      
      if( $rootScope.selectedDate == null ){
        $rootScope.selectedDate = moment( '2014-Jul-11' ).format( 'YYYY-MM-DD' );
      }

      var fromDate = moment( $rootScope.selectedDate );
      var toDate = moment( $rootScope.selectedDate ).add(1, 'days');

      if( previousDate != fromDate ){
          visionFactory.retrieveData( database[ APPOINTMENT ].name, function( results ){
            retrieveSlotsHandler( results );
          },"by_date", { start: new Date( fromDate ), end: new Date( toDate ) }, 1000);
      }else{
        handleResize();
      }
      moveZoomButton();
      previousDate = fromDate;
    };

    var results = new Array();
    var retrieveSlotsHandler = function( results ){
      $scope.$apply(function(){
        $scope.slots = results;
      }); 
      handleResize();
    };

    var handleResize = function(){
      if( $scope.screens[ SCREENS.DAY ] ){
        moveZoomButton();
        vnScrollFactory.handleResize( "day-scroller" );
      }
    };
    $scope.semanticZoom = function( $event ){};
    $scope.handleZoomOutClick = function(date, $event){
      vnNavigationFactory.switchScreens( SCREENS.CALENDAR );
    };

    $scope.handleArrowClick = function( element, direction ){
    
      var momentDate = moment($rootScope.selectedDate, 'YYYY-MM-DD');
      
      

      if( direction == 'right' ){
       
        if( momentDate.isoWeekday() == 5 ){
          momentDate.add(3, 'days');
        }else{
          momentDate.add(1, 'days');
        }
      }else if(direction == 'left' ){
       
        if( momentDate.isoWeekday() == 1 ){
          momentDate.add(-3, 'days');
        }else{
          momentDate.add(-1, 'days');
        }
      }
      $rootScope.selectedDate = $filter('date')(momentDate.format( 'YYYY-MM-DD' ), DATE_FORMAT);
      handleShow();
      
    };
})
.directive('vnDay', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionappointments/day/vnday.html'
    };
})
.directive('inpsOwnerSrc', function(){
    return function(scope, element, attrs){
      var image = attrs.inpsOwnerSrc;
      if( image == null || image.length < 1 ){
        element.next().toggleClass( "showme" );
        element.toggleClass( "showme" );
        return;
      }
      element.attr( "src", "apps/components/images/" + image );
    };
  });;