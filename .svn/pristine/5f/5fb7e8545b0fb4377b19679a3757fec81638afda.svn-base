angular.module('vnChipsModule', [ 'mdChips', ],function () {})
.controller('vnChipsController', function( $scope ){
	$scope.initChips = function(){
		
	};
})
.directive('vnChips', function() {
    return {
	    restrict: 'E',
	    scope: {
			collection: '=',
			ngModel: '=',
			vnTemplate: '@',
			text: '@',
			mdItem: '@',
			mdTitle: '@',
			mdThumbnail: '@',
			mdSubtitle: '@',
			vnPlaceholder: '@',
			vnSecondaryPlaceholder: '@',
			addChipsHandler: '&'
		},
	    templateUrl: 'apps/components/chips/vnchips.html'
    };
});