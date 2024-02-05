angular.module('vnBrickModule',function () {})
.directive('vnBrick', function(  ) {
    return {
      restrict: 'E',
      controller: function( $scope, $rootScope, $timeout, vnWorkflowFactory, gaTracker ){
      	$scope.$watch( 
	      	"screens.VN_TASK__WORKFLOW", function( value ){
      		if( value ){
      			//handleShow();
      		}
      	});

	   if( $rootScope.taskoutercreators != null 
  			&& $rootScope.taskoutercreators.length > 0
  			&& $rootScope.taskoutercreators[$scope.$index].taskinnercreators == null ){
      		vnWorkflowFactory.addTaskCardTo( $scope.$index, null );
      	}

		$scope.minFieldsSatisfiedHandler = function( isSatisfied ){
			var isLastInChain = $rootScope.taskoutercreators.length - 1 ==  $scope.$index;
			if( isLastInChain ){
				$scope.outeritem.showouterbrick = isSatisfied;
			}
			$scope.outeritem.showinnerbrick = isSatisfied;
			$rootScope.invalidcardopen = !isSatisfied;
		};

		$scope.handleCardClick = function( e ){
			if( this.inneritem.minimise == true ){
				//this.inneritem.minimise = false;
			}
			
		};

		$scope.handleInnerAddClick = function( createNew ){
			gaTracker.sendEvent('Workflow', 'Create Parallel Task', 'Parallel');
			vnWorkflowFactory.addTaskCardTo( $scope.$index, null );
		};
      },
      templateUrl: 'apps/visiontasks/workflow/vnbrick.html'
    };
});