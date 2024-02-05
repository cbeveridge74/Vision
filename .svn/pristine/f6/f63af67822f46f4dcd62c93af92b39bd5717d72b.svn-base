angular.module('vnVisionThreeModule', [],function () {})
.run(function( vnAppManagementFactory ){
	var APP_ID 	= "VN_V3";
	var HOME 	= APP_ID + '__HOME';

	vnAppManagementFactory.registerApp( 
		{ id: "VN_V3", 
		name: "Vision 3",
		icon: "images/INPS_Logo.svg",
		defaultapp: true,
		screens: [
			HOME
		]});
})
.controller('vnVisionThreeController', function( 
	$scope,
	$timeout,
	$compile
	){

	$scope.model = {
		selectedItem: {}
	};

	$scope.handleClick = function(){
		$scope.dataInputView = $scope.dataInputViews.DEFAULT;
	};

	$scope.$watch( 'model.selectedItem', function( nValue, oValue ){
		var status = 'new';
		if( nValue == null ){
			return;
		}

		if( nValue.aliasinfo == null ){
			status = "form";
		}

		if( nValue != oValue && status == 'new' ){
			$scope.journalData.unshift({
			status: status,
		    user: 'SYS',
		    priority: '3',
		    clinician: 'JCHES',
		    date: new Date(),
		    data: [{
		      icon: nValue.aliasinfo.image,
		      description: nValue.term
		    }]
		  });
		}else if( nValue.group != null ){
			if( nValue.group == 'D' ){
				$scope.dataInputView = $scope.dataInputViews.DRUG;
			}else{
				$scope.dataInputView = $scope.dataInputViews.READ;
			}
		}
    });

	$scope.dataInputViews = { 
		DEFAULT: {
			id: 0,
			label: "Read Term - Add",
			buttons: [
				"OK", "Cancel"
			]
		},
		TEMPERATURE: {
			id: 1,
			label: "Temperature - Add",
			buttons: [
				"Recall", "OK", "Cancel", "Help"
			]
		},
		DRUG: {
			id: 2,
			label: "Drug - Add",
			buttons: [
				"Recall", "OK", "Cancel", "Help"
			]
		},
		READ: {
			id: 3,
			label: "Read - Add",
			buttons: [
				"Recall", "OK", "Cancel", "Help"
			]
		}  
	}

	$scope.dataInputView = $scope.dataInputViews.DEFAULT;
	$scope.JOURNAL_TAB = 5;

	var data = new DataStore();
	$scope.init = function(){
		$timeout( function(){
			$( "#journal-tabs" ).tabs({
			  active: 5
			});
			$( "#problems-tabs" ).tabs({
			  active: 1
			});
			
		} );
	};


	$scope.problemsTabs = [	{ name: 'Current Consultation' },
				   			{ name: 'Problems' }];

	$scope.tabs 		= data.CONMAN_TABS;
	$scope.menuItems 	= data.CONMAN_MENU_ITEMS;
	$scope.icons 		= data.CONMAN_ICONBAR_ITEMS;
	$scope.filterItems 	= data.CONMAN_FILTER_ITEMS;
	$scope.journalData 	= data.CONMAN_JOURNAL;
})
.directive('vnVisionThree', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionthree/vnvisionthree.html'
    };
})
.directive('vnReadSearch', function() {
    return {
      restrict: 'E',
      scope: {
      	model: "="
      },
      templateUrl: 'apps/visionthree/forms/vnreadsearch.html',
      controller: function( $scope ){
      	
      }
    };
})
.directive('vnTemperature', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionthree/forms/vntemperature.html',
      controller: function(){
      	
      }
    };
})
.directive('vnDrug', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionthree/forms/vndrug.html',
      controller: function(){
      	
      }
    };
})
.directive('vnRead', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionthree/forms/vnread.html',
      controller: function(){
      	
      }
    };
})
.value('VN_V3_SCREENS',  { 
	HOME: "VN_V3__HOME"
});