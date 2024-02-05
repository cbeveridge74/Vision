angular.module('vnPatientChipsModule', [ 'vnPatientChipsDetailModule' ],function () {})
.directive('vnPatientChips', function() {
    return {
	    restrict: 'E',
	    controller: function( $scope, visionFactory ){
	
			$scope.patientsCollection = [];
			if( $scope.primaryPlaceholder == null	 ){
				$scope.primaryPlaceholder = "Patient search...";
			}

			$scope.initPatientChips = function(){
				
			};

			$scope.addChipsHandler = function(){
		      		
		    };

			visionFactory.retrieveData( database[ PATIENT ].name, function( patientsResult ){
				var patients = new Array();
				
				angular.forEach( patientsResult, function( value, index ){
					patients.push({
						id: value.Id,
					    thumbnailUrl: '',
					    title: value.Surname.toUpperCase() + ", " + value.Forename,
					    subtitle: value.DOB
					});
				});
				$scope.patientsCollection = patients;
			}, null, null, 100);
		},
	    scope: {
	    	'primaryPlaceholder': '@',
	    	'ngModel': '=',
	    	'vnTemplate': '@'
	    },
	    templateUrl: 'apps/components/chips/patient/vnpatientchips.html'
    };
});