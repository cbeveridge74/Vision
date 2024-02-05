angular.module('vnVisionAnnouncementsModule', [],function () {})
.run(function( vnAppManagementFactory ){
var APP_ID 			= "VN_ANNOUNCEMENTS";
var HOME 			= APP_ID + '__HOME';


vnAppManagementFactory.registerApp( 
	{ id: APP_ID, 
	name: "Announcements",
	icon: "images/announcement_white.svg",
	screens: [
		HOME
		]
	});
})
.controller('vnVisionAnnouncementsController', function( 
	VN_ANNOUNCEMENTS_SCREENS,
	$scope,
	vnNavigationFactory
 ){

	$scope.counts = {};
    $scope.counts.announcementscount = 0;
    $scope.counts.sentcount = 0;

     $scope.handleBackButton = function(){
    	vnNavigationFactory.switchScreens( vnNavigationFactory.retrieveScreenFromHistory( vnNavigationFactory.SCREEN_PREVIOUS ) );
     };
    
	 
})
.directive('vnVisionAnnouncements', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionannouncements/vnvisionannouncements.html'
    };
  })
.directive('vnVisionAnnouncementsList', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionannouncements/vnannouncementslist.html',
      controller: function( 
			$scope,
			$rootScope,
			vnActionFactory,
			vnNavigationFactory,
			vnAnnouncementsFactory,
			vnScrollFactory,
			vnDetailViewFactory,
			vnScreenManagementFactory ){
			var announcementsScroller;

			$( window ).resize(function() {
		        handleResize();
		      });

			$rootScope.$watch( 
	      	"screens.VN_ANNOUNCEMENTS", function( value ){
	      		if( value ){
	      			handleShow();
	      		}
	      	});

			var handleShow = function(){
				vnAnnouncementsFactory.retrieveAnnouncementsFor( $rootScope.user.id, true,  handleAnnouncementsRetrieved );
			};

			$rootScope.$on( "COMMENTS_UPDATED", function( event, data ){
				vnAnnouncementsFactory.retrieveAnnouncementsFor( $rootScope.user.id, false, handleAnnouncementsRetrieved );
			});

			var handleResize = function(){
		      //if( $scope.screens[ VN_TASK_SCREENS.HOME ] ){
		        vnScrollFactory.handleResize( "announcements-scroller" );
		        getAnnouncementsScroller().css( "height", "100vh" );
		        
		      //}
		    };

		    var getAnnouncementsScroller = function(){
		    	if( announcementsScroller == null ){
		    		announcementsScroller = $( ".announcements-scroller" );
		    	}
		    	return announcementsScroller;
		    };

		    var handleAnnouncementsRetrieved = function( announcements ){
		        if( announcements != null ){
		         
		          $scope.$apply( function(){
		            $scope.announcements = announcements;
		            $scope.$parent.counts.announcementscount = $scope.announcements.length;
		          });
		        }else{
		        	$scope.announcements = null;
		        }
		        
				handleResize();
		    };

		  	vnAnnouncementsFactory.registerAnnouncementEventListener( vnAnnouncementsFactory.ANNOUNCEMENTS_UPDATED, function( event, announcement ){
		 		angular.forEach( announcement.assignee, function( value, index ){
		 			if( $rootScope.user != null && $rootScope.user.id == value ){
		 				vnAnnouncementsFactory.retrieveAnnouncementsFor( $rootScope.user.id, handleAnnouncementsRetrieved );
		 			}
		 		});	
		 	});

		 	$scope.handleAnnouncementItemClick = function( ){
			 	var announcement = this.item;
		 		vnDetailViewFactory.setModel( announcement );
				vnScreenManagementFactory.openMenu( ".detail-view" );
			};
		}
    };
  })
.directive('vnVisionAnnouncementsSent', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionannouncements/vnannouncementssent.html',
      controller: function( 
			$scope,
			$rootScope,
			vnActionFactory,
			vnAnnouncementsFactory,
			vnScrollFactory,
			visionFactory,
			vnDetailViewFactory,
			vnScreenManagementFactory ){
			var sentScroller;

			$( window ).resize(function() {
		        handleResize();
		      });

			$rootScope.$watch( 
	      	"screens.VN_ANNOUNCEMENTS", function( value ){
	      		if( value ){
	      			handleShow();
	      		}
	      	});

			var handleShow = function(){
				retrieveSentAnnouncements();
			};

			var retrieveSentAnnouncements = function(){
				visionFactory.retrieveData( database[ ANNOUNCEMENTS ].name, function( sent ){
					handleSentRetrieved( sent );
				}, "by_assigner", { start: $rootScope.user.id, end: $rootScope.user.id}, 100 );
			};

			$rootScope.$on( "COMMENTS_UPDATED", function( event, data ){
				retrieveSentAnnouncements();
			});

			var handleResize = function(){
		      //if( $scope.screens[ VN_TASK_SCREENS.HOME ] ){
		        vnScrollFactory.handleResize( "announcements-sent-scroller" );
		        getSentScroller().css( "height", "100vh" );
		        
		      //}
		    };

		    var getSentScroller = function(){
		    	if( sentScroller == null ){
		    		sentScroller = $( ".announcements-sent-scroller" );
		    	}
		    	return sentScroller;
		    };

		    var handleSentRetrieved = function( sent ){
		        if( sent != null ){
		         
		          $scope.$apply( function(){
		            $scope.sent = sent;
		            $scope.$parent.counts.sentcount = $scope.sent.length;
		          });
		        }else{
		        	$scope.sent = null;
		        }
		        
				handleResize();
		    };



		  	vnAnnouncementsFactory.registerAnnouncementEventListener( vnAnnouncementsFactory.ANNOUNCEMENTS_UPDATED, function( event, announcement ){
		 		angular.forEach( announcement.assignee, function( value, index ){
		 			if( $rootScope.user != null && $rootScope.user.id == value ){
		 				retrieveSentAnnouncements();
		 			}
		 		});	
		 	});

		 	$scope.handleAnnouncementItemClick = function( ){
			 	var announcement = this.item;
		 		vnDetailViewFactory.setModel( announcement );
				vnScreenManagementFactory.openMenu( ".detail-view" );
			};
		}
    };
  })
.value('VN_ANNOUNCEMENTS_SCREENS',  { 
	HOME: "VN_ANNOUNCEMENTS__HOME"
});


