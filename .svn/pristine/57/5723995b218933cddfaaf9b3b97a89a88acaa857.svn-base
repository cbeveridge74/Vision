angular.module('vnCommentsModule', [],function () {})
.factory( "vnCommentsFactory", function(
	$rootScope, 
	visionFactory ){
	var factory = {};
	var commentsid;

	factory.setCommentsId = function( value ){
		commentsid = value;
		$rootScope.$broadcast( "COMMENTSID_SET" );
	};

	factory.getCommentsId = function(){
		return commentsid;
	};

	factory.clearCommentsId = function(){
		commentsid = -1;
	};
	factory.clearCommentsId();
	return factory;
})
.controller('vnCommentsController', function ( 
	$scope, 
	$rootScope,
	$timeout,
	visionFactory,
	vnCommentsFactory,
	vnNotificationsFactory ) {
	var COMMENTS_UPDATED = "COMMENTS_UPDATED";
	$scope.init = function() {
		
	};

	$rootScope.$on( "COMMENTSID_SET", function(){
		retrieveComments();
	});

	var retrieveComments = function(){
		visionFactory.retrieveData( database[ COMMENTS ].name, function( comments ){
			if( comments.length > 0 ){
				$timeout( function(){ $scope.model = comments[0] });
			}else{
				$scope.model = { comments: [] };
				$scope.model.id = vnCommentsFactory.getCommentsId();
			}
			
		}, null, { start: vnCommentsFactory.getCommentsId(), end: vnCommentsFactory.getCommentsId() } );
	}

	chrome.runtime.onMessage.addListener(

	  function(response, sender, sendResponse) {
	  	if( response.comments == null || $scope.model == null || ( response.comments.id != $scope.model.id ) ){
	  		return;
	  	}
	  	retrieveComments();
	  	$timeout( function(){ $rootScope.$broadcast( COMMENTS_UPDATED, [ $scope.model.id ] ); } );
	  }
	);

	var updateComment = function(){
		var comment = { user: $rootScope.user, 
						time: new Date(),
						comment: $scope.commentText };
		$scope.model.comments.unshift( comment );
		persist( function( comments ){ 
			comments.comments[0].time = comments.comments[0].time.getTime();
			chrome.runtime.sendMessage( { comments: comments }, function() {});
		});
		
		$scope.commentText = "";
	};

	var persist = function( callback ){
		visionFactory.updateData( database[ COMMENTS ].name, $scope.model, function( comments ){
			$rootScope.$broadcast( COMMENTS_UPDATED, { commentid: $scope.model.id } );
			
			if( callback != null ){
				callback( comments );
			}
		});
	};

	$scope.handleAddComment = function(){
		updateComment()	
	};
})
.directive('vnComments', function() {
	return {
	  restrict: 'E',
	  scope: {
	  	ngModel: '='
	  },
	  templateUrl: 'apps/components/comments/vncomments.html'
	};
});