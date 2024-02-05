angular.module('vnUserChipsModule', [ 'vnUserChipsDetailModule' ],function () {})
.directive('vnUserChips', function() {
    return {
	    restrict: 'E',
	    controller: function( $scope, visionFactory ){
	
			$scope.usersCollection = [];
			
			$scope.initUserChips = function(){
				
			};

			$scope.addChipsHandler = function(){
		      	
		    };

			visionFactory.retrieveData( database[ PERSON ].name, function( peopleResult ){
				var recipients = new Array();
				visionFactory.retrieveData( database[ PERSON_GROUPS ].name, function( groupResult ){
					angular.forEach( peopleResult, function( value, index ){
						recipients.push({
							id: value.id,
						    thumbnailUrl:  value.image,
						    title: value.label,
						    subtitle: value.email
						});
					});

					angular.forEach( groupResult, function( value, index ){
						recipients.push({
							id: value.id,
						    thumbnailUrl: '',
						    title: value.label,
						    subtitle: value.description,
						    users: value.users
						});
					});

				});
				$scope.usersCollection = recipients;
			});
		},
	    scope: {
	    	'ngModel': '=',
	    	'vnTemplate': '@'
	    },
	    templateUrl: 'apps/components/chips/user/vnuserchips.html'
    };
});