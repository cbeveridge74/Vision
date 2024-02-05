angular.module('vnTaskCreateModule', [],function () {})
.factory('vnTaskCreateFactory', function( 
	$rootScope, 
	vnWorkflowFactory,
	vnTaskFactory,
	gaTracker ){
	var factory = {};
	var model;

	factory.TASK_CREATE_UPDATED = "TASK_CREATE_UPDATED";
	
	factory.setModel = function( value ){
		model = value;
		$rootScope.$broadcast( factory.TASK_CREATE_UPDATED );
	};

	factory.getModel = function(){
		return model;
	};

	factory.clearModel = function(){
		factory.setModel({ 
			selectedRecipients: [],
			selectedSubjects: -1,
			description: "",
			urgency: "Routine",
			due: null,
			isAnnouncement: false
		});
	};

	factory.clearModel();

	return factory;
})
.directive('vnTaskCreate', function() {
    return {
      restrict: 'E',
      controller:  function ( 
			$scope, 
			$rootScope,
			$mdToast,
			$timeout,
			vnActionFactory,
			visionFactory,
			vnTaskFactory,
			vnScreenManagementFactory,
			vnNavigationFactory,
			vnWorkflowFactory,
			vnTaskCreateFactory,
			VN_TASK_SCREENS,
			gaTracker
			){
      		$rootScope.$on( "TASK_CREATE_UPDATED", function(){ 
      			initModel(); 
      		} );
			$scope.recipientCollection = [];
			var initModel = function(){
				$scope.model = vnTaskCreateFactory.getModel();
				console.log( model );
			};

			if( $scope.model == null ){
				initModel();
			}

			var minimiseAllCards = function(){
				createRecipientsLabel();
      			vnWorkflowFactory.minimiseAllCards();
      		};

      		var createRecipientsLabel = function(){
      			$scope.recipientsLabel = "";
				angular.forEach( $scope.model.selectedRecipients, function( value, index ){
					$scope.recipientsLabel += value.title + ", ";
				});
				$scope.recipientsLabel = $scope.recipientsLabel.substring( 0, $scope.recipientsLabel.length - 2 );
      		};


			$scope.init = function ( callback ) {
				$rootScope.$watch( "screens." + VN_TASK_SCREENS.TASK_CREATE, function( value ){
					if( value ){
						handleShow();
			    	}
		      	});

		      	$rootScope.$on( vnScreenManagementFactory.GENERAL_CLICK, function( event, clickEvent ){

		      		if( clickEvent == null ||
		      			clickEvent.target.tagName == "BUTTON" || 
		      			clickEvent.target.tagName == "MD-ICON" ){
		      			return;
		      		}
	      			if( !$scope.minimise && minCriteria() ){
	      				minimiseAllCards();
	      				$rootScope.$apply();
	      			}
	      		});

				$scope.dueDateLabel = "No due date";
				createRecipientsLabel();
		      	
				$scope.$watch( 'model.selectedRecipients', function(){
					handleMinFieldsChange();
					createRecipientsLabel();
				}, true );

				$scope.$watch( 'model.selectedSubjects', function(){
					handleMinFieldsChange();
				}, true );

				var handleMinFieldsChange = function(){
					$scope.mincriteriaachieved = minCriteria();
					if( $scope.minimumFieldsSatisfiedCallback != null ){
						$scope.minimumFieldsSatisfiedCallback( {isSatisfied: minCriteria()} );
						$rootScope.$broadcast( "TASK_MIN_FIELDS_SATISFIED", $scope.mincriteriaachieved );
					}
				};

				var minCriteria = function(){
					if( $scope.model == null || $scope.model.selectedRecipients == null || $scope.model.selectedSubjects == null){
						return false;
					}
					return $scope.model.selectedRecipients.length > 0 && $scope.model.selectedSubjects > 0;
				};

				$scope.mincriteriaachieved = minCriteria();

				visionFactory.retrieveData( database[ TASK_SUBJECTS ].name, function( result ){
					$scope.subjectCollection = result;
				});
				
			};

			$scope.handleCalendarClick = function( event ){
				
			};

			$scope.handleGeneralClick = function( event ){
				if( event != null ){
			      	event.stopPropagation();
			    }
			};


			/* NOTE: this is only used on the workflow screen  */
			$scope.handleDeleteClick = function( idx, outerBoxIdx ){
				vnWorkflowFactory.deleteTaskCard( idx, outerBoxIdx );
			};

			$scope.handleAddClick = function( outerBoxIdx ){
				minimiseAllCards();
			};

			$scope.handleEditClick = function( idx, outerBoxIdx, e ){
				if( $scope.minimise ){
					minimiseAllCards();
					vnWorkflowFactory.restoreCard( idx, outerBoxIdx );
				}
			};

			
			$scope.handleAdvancedClick = function( event ){
				vnWorkflowFactory.clearWorkflow();
				gaTracker.sendEvent('Task', "Create workflow clicked", 'Task');
				if( $scope.model.task == null ){
					vnWorkflowFactory.initialiseWorkflowWithModel({ 
						selectedRecipients: $scope.model.selectedRecipients,
						selectedSubjects: $scope.model.selectedSubjects,
						description: $scope.model.description,
						urgency: $scope.model.urgency,
						due: $scope.model.due,
						isAnnouncement: $scope.model.isAnnouncement   
					}, false);//Don't minimise it.
					
					vnNavigationFactory.switchScreens( VN_TASK_SCREENS.WORKFLOW );
				}else{
					vnActionFactory.needHelpWith( vnActionFactory.GENERAL, [ $scope.model.task ], function(){
				
					});
				}

				$scope.handleCancelClick();
			};

			$scope.handleCancelClick = function( event ){
				gaTracker.sendEvent('Task', "Cancel task clicked", 'Task');
				vnScreenManagementFactory.closeMenus();
				initModel();
				$scope.dueDateLabel = "No due date";
			};

			$scope.handleSaveClick = function( event ){

				/* DCB - I don't think this is being used anymore */



				console.log( "#########" );
				vnTaskCreateFactory.sendTask( function(){
					console.log( "Calling" );
					$scope.handleCancelClick();
				} );
				gaTracker.sendEvent('Task', "Save task clicked", 'Task');
				var task = vnTaskFactory.buildTask( 
					$scope.model.selectedRecipients, 
					$scope.model.selectedSubjects, 
					$scope.model.description, 
					-1, 
					-1,
					null,
					$scope.model.urgency );

				vnWorkflowFactory.convertTaskToWorkflow( task, null, function( workflowedTask ){
					vnWorkflowFactory.saveWorkflow ( workflowedTask, function(){
						vnWorkflowFactory.beginWorkflow( workflowedTask.name );
						$scope.handleCancelClick();
					});
				});

			};

			var handleShow = function(){
				
			};
	  },
      scope: {
      	minimumFieldsSatisfiedCallback: "&minimumFieldsSatisfiedHandler",
      	model: "=",
      	minimise: "="
      },
      require: 'model',
      templateUrl: 'apps/visiontasks/workflow/vntaskcreate.html'
    };
  });