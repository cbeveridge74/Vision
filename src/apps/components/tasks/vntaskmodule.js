angular.module('vnTaskModule', [],function () {})
.controller('vnTaskController', function ( 
	$scope, 
	$rootScope,
	$timeout,
	visionFactory, 
	vnActionFactory,
	vnDetailViewFactory,
	visionFactory,
	vnTaskFactory,
	vnTrackingManagerFactory,
	vnTaskActionFactory,
	vnScreenManagementFactory,
	vnScrollFactory,
	vnNavigationFactory,
	vnActivitiServiceFactory,
	vnAnnouncementsFactory
	) {

	//var canHelpWithCallback = null;
	vnActionFactory.canHelpWith( vnActionFactory.TASK_DETAIL, showTaskDetail );
	

	function showTaskDetail( data, callback ){
		if( vnActionFactory.screenDisplayedWhenActionStarted != null ){
			console.log( vnActionFactory.screenDisplayedWhenActionStarted );
		}
	    var task = data[ 0 ];
	    if( task.workflowid != null ){
	    	vnTaskFactory.retrieveTask( task.workflowid, task.id, function( result ){
		    	vnDetailViewFactory.setModel( result );
				vnScreenManagementFactory.openMenu( ".detail-view" );
				callback();
		    });
	    }else{
	    	vnAnnouncementsFactory.retrieveAnnouncement( task.id, function( result ){
	    		vnDetailViewFactory.setModel( result );
				vnScreenManagementFactory.openMenu( ".detail-view" );
				callback();
	    	} );
	    }
	};

	$scope.init = function ( callback ) {
		$rootScope.$watch( $scope.screenToWatch, function( value ){
			if( value ){
				handleShow();
	    	}
      	});
		vnTaskFactory.registerTaskEventListener( vnTaskFactory.TASK_UPDATED, function( event, task ){
			handleTaskUpdated( task );
	 	});
	};

	$( window ).resize(function() {
        handleResize();
      });

	var handleResize = function(){
		$timeout( function(){
			$('.tasks-cat .tasks').each(function( index ) {
			    var children = $( this ).children();
			    var lastChild = children.last();
			    var firstChild = $( children[ 1 ] );
			    if( firstChild.position() != null && ( firstChild.position().left != lastChild.position().left )  ){
			    	$(this).width('55em');
			    }else{
			    	$(this).width('30em');
			    }
			});
		}, 100);
    };

	$scope.handleActionClick = function( action, e ){
		vnTaskActionFactory.handleAction( action, this.task, function(){
			if( action.id == CRDSNZ ){
				vnTaskActionFactory.openSnooze( e );
			}
		});
	};

	$scope.initCardActions = function( callback ){

		vnTaskActionFactory.initialiseActions( this.task, function( leftActions, rightActions ){
			callback( leftActions, rightActions );
		});


		/*if( this.task.tasksubjects.actiontypeid == vnActionFactory.GENERAL ){
			return actionlessAction;
		}
		return vnTaskFactory.actions[ this.task.status ];*/
	};

	var handleTaskUpdated = function( task ){
		//angular.forEach( task.assignee, function( value, index ){
		if( $rootScope.user != null ){
			vnTaskFactory.retrieveTasksFor( $rootScope.user.id, handleTasksRetrieved );
		}
 		//});
	};

	var handleShow = function(){
		vnTaskFactory.retrieveTasksFor( $rootScope.user.id, handleTasksRetrieved, vnTaskFactory.TODO );
	};

	$rootScope.$on( "COMMENTS_UPDATED", function( event, data ){
		vnTaskFactory.retrieveTasksFor( $rootScope.user.id, handleTasksRetrieved, vnTaskFactory.TODO );
	});

	$scope.handleRightClick = function( event, element ){
		vnScreenManagementFactory.handleItemClick( event, element, {}, taskRightCommands, true );
	};

	$scope.handlePatientClick = function( event ){
        visionFactory.handlePatientClick( this.item.patient.id );
        event.stopPropagation();
	};

	$scope.handleAddClick = function( event ){
		
	};

	$scope.handleCardClick = function(){
		
		var task = this.task;
		var due = null;
		if( task.due != null ){
			due = moment( task.due ).toDate();
		}
		
		vnDetailViewFactory.setModel( task );
		vnScreenManagementFactory.openMenu( ".detail-view" );
		vnScrollFactory.disableScrolling();
	};

	var handleTasksRetrieved = function( tasks ){
		
        if( tasks != null ){
       		if( tasks.length > 8 ){
	   			tasks = tasks.slice( 0, 8 );
	   		}

	   		vnTaskFactory.assembleTasks( tasks );

			$scope.$apply( function(){
				$scope.taskreminders = tasks;
				$scope.patientcentric = false;
			});
			handleResize();
        }
      };
})
.factory( 'vnTaskActionFactory', function(
	$rootScope,
	$window,
	vnTrackingManagerFactory,
	vnTaskFactory,
	vnActionFactory,
	vnScrollFactory,
	vnNavigationFactory,
	vnScreenManagementFactory
	){
	var factory = {}
	var taskContext = null;
	
	factory.setTaskContext = function( value ){
		taskContext = value;
	};

	factory.getTaskContext = function(){
		return taskContext;
	};

	factory.initialiseActions = function( task, callback ){

		if( task.assignee.length > 1 ){
			callback( null, multiAssigneeAction );
		}else{
			if( task.status == vnTaskFactory.DECLINED ){
				callback( null, declineActions );
				return;
			}

			if( task.tasksubjects.actiontypeid == vnActionFactory.GENERAL ){
				callback( leftActions, actionlessAction );
				return;
			}

			if( task.status == vnTaskFactory.ACTIONED ){
				callback( leftActions, [ completeAction ] );
				return;
			}
			callback( leftActions, defaultAction );
		}
	};

	factory.markTaskAsActioned = function( task, callback ){
		task.status = vnTaskFactory.ACTIONED;
		task.updateType = vnTaskFactory.UPDATE_TYPE.STATUS_UPDATE;
		vnTaskFactory.updateTask( task, function( returnedTask ){
			if( callback != null ){
				callback( returnedTask );
			}
		});
	};

	factory.handleAction = function( action, task, callback ){

		if( action.id == CRDACN ){
			// Setting to true to remeber what screen we're on
			vnActionFactory.needHelpWith( task.tasksubjects.actiontypeid, [task], function(){
				if( callback != null ){
					callback();
				}
			},true, true);
		}else if( action.id == CRDCLM ){
			task.status = vnTaskFactory.ASSIGNED;
			task.assignee = [ $rootScope.user.id ];
			task.updateType = vnTaskFactory.UPDATE_TYPE.STATUS_UPDATE;
			vnTaskFactory.updateTask( task, function( returnedTask ){
				vnTrackingManagerFactory.taskStatusUpdated( returnedTask );
				if( callback != null ){
					callback();
				}
			});
		}else if( action.id == CRDCPT ){
			task.status = vnTaskFactory.COMPLETE;
			task.updateType = vnTaskFactory.UPDATE_TYPE.STATUS_UPDATE;
			vnTaskFactory.updateTask( task, function( returnedTask ){
				vnTrackingManagerFactory.taskStatusUpdated( returnedTask );
				if( vnActionFactory.getOrginalScreen() != null ){
					vnNavigationFactory.switchScreens( vnActionFactory.getOrginalScreen() );
					vnActionFactory.cancelAction()
				}
				if( callback != null ){
					callback();
				}
			});
		}else if( action.id == CRDREJ ){
			if( task.assignee.length > 1 ){
				var assigneeCopy = task.assignee.slice(0);
				angular.forEach( assigneeCopy, function( vAssignee, iAssignee ){
					if( vAssignee == $rootScope.user.id ){
						task.assignee.splice( iAssignee, 1 );
					}
				});
			} else {
				task.assignee = [ task.assigner.id ];
				//DCB
				task.status = vnTaskFactory.DECLINED;
				task.updateType = vnTaskFactory.UPDATE_TYPE.STATUS_UPDATE;
			}
			if( task.assignee.length < 2 && task.status != vnTaskFactory.DECLINED ){//DCB
				task.status = vnTaskFactory.ASSIGNED;
				task.updateType = vnTaskFactory.UPDATE_TYPE.STATUS_UPDATE;
			}
			vnTaskFactory.updateTask(task, function( returnedTask ){
				vnTrackingManagerFactory.taskStatusUpdated( returnedTask );
				if( callback != null ){
					callback();
				}
			});
		}else if( action.id == CRDSNZ ){
			
			if( callback != null ){
				callback();
			}
		}
	};

	factory.openSnooze = function( e, coords ){
		vnScreenManagementFactory.openMenu( ".vision-snooze" );
		var dialog = $( ".vision-snooze" );
		if( dialog.length > 0 ){
			vnScrollFactory.disableScrolling();
			var x;
			var y;
			if( e == null ){ // Assuming this is from the command bar (left)
				x = 10;
				y = $window.innerHeight;
			}else{
				if( e.clientX > 0 && e.clientY > 0 ){
					x = e.clientX + 10;
					y = e.clientY;
					if( y + dialog.height() > $window.innerHeight ){
						y = e.clientY - dialog.height();
					}
				}else{
					x = -e.offsetX - 10;
					y = -e.offsetY;
					if( y + dialog.height() > $window.innerHeight ){
						y = -e.offsetY - dialog.height();
					}
				}
			}
			
			
			dialog.css( 'left', x + 'px' );
			dialog.css( 'top', y + 'px' );
		}
	};
	return factory;
})
.factory('vnTaskFactory', function( 
	visionFactory,
	vnNotificationsFactory,
	vnActionFactory,
	
	$rootScope,
	$compile,
	$mdToast ){
	var factory = {};
	factory.TASK_UPDATED = "TASK_UPDATED";
	factory.ASSIGNED 	= 0;
	factory.CLAIMABLE 	= 1;
	factory.COMPLETE 	= 2;
	factory.DECLINED	= 3;
	factory.ACTIONED	= 4; //DCB

	factory.SENT = 0;
	factory.DONE = 1;
	factory.TODO = 2;
	factory.ALL = 3;

	factory.UPDATE_TYPE = {};
	factory.UPDATE_TYPE.STANDARD 			= 0;
	factory.UPDATE_TYPE.NEW 				= 1;
	factory.UPDATE_TYPE.STATUS_UPDATE 		= 2;
	factory.UPDATE_TYPE.COMMENTS_UPDATE 	= 3;

	factory.taskStatus = {};
	factory.taskStatus[ factory.ASSIGNED ] 	= "ASSIGNED";
	factory.taskStatus[ factory.CLAIMABLE ] = "CLAIMABLE";
	
	factory.actions = {};
	factory.actions[ factory.ASSIGNED ] = defaultAction;
	factory.actions[ factory.CLAIMABLE ] = multiAssigneeAction;
	factory.actions[ factory.COMPLETE ] = [ archiveAction ];
	factory.actions[ factory.ACTIONED ] = [ completeAction ];

	var commentsCount = 15;//Hard coded based on demo data

	chrome.runtime.onMessage.addListener(
	  function(response, sender, sendResponse) {
	  	if( response.task != null && $rootScope.user != null  ){
	  		taskEventBroadcast( factory.TASK_UPDATED, response.task );
	  		if( response.updateType == factory.UPDATE_TYPE.NEW ){
	  			angular.forEach( response.task.assignee, function( value, index ){
		 			if( $rootScope.user.id == value ){
		 				$mdToast.show($mdToast.simple().content('New task received').position("bottom right"));
		 			}
		 		});
	  		}
	  	}
	  	//taskEventBroadcast( factory.TASK_UPDATED, response.task );
	});

	var initCommentsCounter = function(){
		visionFactory.retrieveData( database[ TASK ].name, function( tasks ){
			commentsCount += tasks.length;
		} );
	};
	initCommentsCounter();

	

	factory.buildTask = function( assignees, subjectid, description, clinicaldocid, patientid, clinicaldoclocal, urgency, isAnnouncement, due, id ){
		var assigneeIds = [];
		var status = factory.ASSIGNED;
		
		if( urgency == null ){
			urgency = "Routine";
		}

		//Assuming that this is a lone task being sent
		if( id == null ){
			id = 0;
		}

		angular.forEach( assignees, function( value, index ){
			// If it's a group of users
			if( value.users != null  ){
				assigneeIds = assigneeIds.concat( value.users );
			}else{
				assigneeIds.push( value.id );
			}
		});

		// Remove duplicates
		var assigneeMap = {};
		angular.forEach( assigneeIds, function( value, index ){
			assigneeMap[ value ] = value;
		} );
		
		assigneeIds = [];

		for (var assigneeValue in assigneeMap) {
		    assigneeIds.push( assigneeMap[ assigneeValue ] );
		}
		

		if( assigneeIds != null && assigneeIds.length > 1 ){
			status = factory.CLAIMABLE;
		}
		
		//assigner: {id: $rootScope.user.id, displayname: $rootScope.user.shortlabel, displaynamelong: $rootScope.user.label},
		var task = { 
			id: id,	
			assignee: assigneeIds,
			assigneefull: assignees,
			assigner: $rootScope.user,
			clinicaldocid: clinicaldocid,
			clinicaldoc: clinicaldoclocal,
			description: description,
			due: due,
			image: "task_pad.svg",
			overduealert: "false",
			patientid: -1,
			priority: "2",
			private: "false",
			recurrence: "false",
			sent: new Date(),
			status: status,
			statusimage: "Did_not_arrive2.png",
			subject: null,
			subjectid: subjectid,
			urgency: urgency,
			announcement: isAnnouncement,
      		commentsid: commentsCount++
		};

		return task;
	};

	var taskEventBroadcast = function( eventName, task ){
		$rootScope.$broadcast( eventName, task );
	};

	factory.registerTaskEventListener = function( eventName, callback ){
		$rootScope.$on( eventName, callback)
	};

	factory.assembleTasks = function( tasks ){
		
		angular.forEach( tasks, function( value, index ){
			if( value.patient == null ){
				value.patientdisplay = null;
			}else{
				value.patientdisplay = value.patient.Surname.toUpperCase() + ", " + value.patient.Forename + " (" + value.patient.DOB + ")";
			}

			if( value.status == factory.CLAIMABLE ){

			}
		});
	}

	

	factory.updateTask = function( task, callback ){
		if( task.$$hashKey ){
			delete task.$$hashKey;	
		}

		var updateType = task.updateType; 
		delete task.updateType;
		if( updateType == null ){
			updateType = factory.UPDATE_TYPE.STANDARD;
		}
		visionFactory.updateData( database[ TASK ].name, task, function( returnedTask ){
			if( returnedTask ){
				taskEventBroadcast( factory.TASK_UPDATED, returnedTask );
				chrome.runtime.sendMessage( { task: returnedTask, updateType: updateType }, function() {});
				if( callback != null ){
					callback( returnedTask );
				}
			}
		});
	};

	factory.sendTask = function( task, callback, onSuccessShowToast, customMessage ){
		task.updateType = factory.UPDATE_TYPE.NEW;
		factory.updateTask( task, function( returnedTask ){
			if( callback != null ){
				callback( returnedTask );
			}
			
			if( onSuccessShowToast == null || onSuccessShowToast == true ){
				if( customMessage == null ){
					customMessage = 'Task sent successfully';
				}
				$mdToast.show( $mdToast.simple().content( customMessage ).position("bottom right") );
				
			}
			// Creating a notification for the other users
			returnedTask.tasksubjects = new DataStore().demoDataTaskSubjects[ returnedTask.subjectid - 1 ];
			if( $rootScope.user != null ){
				vnNotificationsFactory.addNotification( 
				{ label: "New task received", 
				status: 0, 
				relevantto: returnedTask.assignee,
				action: vnActionFactory.TASK_DETAIL,
				data: [ returnedTask ],
				sender: $rootScope.user.id,
				type: vnNotificationsFactory.TASK_TYPE } );
			}
			
		});
	};

	factory.retrieveTask = function( workflowId, taskId, callback ){
		retrieveTaskHelper( [ workflowId, taskId ], "by_workflowid_and_id", function( result ){
			if( callback != null ){
				callback( result[0] );
			}
		});
	};

	factory.retrieveTasksFor = function( assigneeId, callback, type ){
		if( type == null ){
			type = factory.TODO;
		}

		var index;
		
		if( type == factory.TODO ){
			index = "by_assignee";
		}else if( type == factory.SENT ){
			index = "by_assigner_id";
		}else if( type == factory.DONE ){
			index = "by_assignee";
		}else if( type == factory.ALL ){
			index = "by_id";
		}
		var item2 = {};
		item2.item = database[ TASK_SUBJECTS ].name;
		item2.count = 100;
		var returnTasks = [];

		retrieveTaskHelper( assigneeId, index, function( results ){
			results.forEach( function( resultsValue ){
				if( type == factory.DONE ){
					if( parseInt( resultsValue.status ) == factory.COMPLETE ){
						returnTasks.push( resultsValue );
					}
				}else if( type == factory.TODO ){
					if( parseInt( resultsValue.status ) != factory.COMPLETE ){
						returnTasks.push( resultsValue );
					}
				}else{
					returnTasks.push( resultsValue );
				}		
			});
			callback( returnTasks );
		});
	};


	var retrieveTaskHelper = function( id, index, callback ){
		

		var item1 = {};
		item1.item = database[ TASK ].name;
		item1.count = 100;
		item1.index = index;
		item1.bounds = {start: id, end: id };
		if( id == null ){
			item1.bounds = null;
		}

		var item2 = {};
		item2.item = database[ TASK_SUBJECTS ].name;
		item2.count = 100;

		visionFactory.retrieveDataWithJoin( [ item1, item2 ], ["subjectid", "id"], function( resultsWithSubject ){
			if( resultsWithSubject == null || resultsWithSubject.length < 1 ){
				callback( resultsWithSubject );
				return;
			}
			angular.forEach( resultsWithSubject, function( resultsWithSubjectValue, resultsWithSubjectIndex ){
				visionFactory.retrieveData( database[ TASK_WORKFLOW ].name, function( workflow, item, task ){
					workflow = workflow[0];
					task.attachments = workflow.attachments;	
					visionFactory.retrieveData( database[ COMMENTS ].name, function( comments, item, task ){
						comments = comments[0];
						task.commentscount = 0;
						if( comments != null ){
							task.commentscount = comments.comments.length;
						}

						if( ( resultsWithSubject.length - 1 ) == resultsWithSubjectIndex ){
							callback( resultsWithSubject );
						}
					}, null, { start: resultsWithSubjectValue.commentsid, end: resultsWithSubjectValue.commentsid }, null, null, resultsWithSubjectValue );
					
				}, "by_id", { start: resultsWithSubjectValue.workflowid, end: resultsWithSubjectValue.workflowid }, null, null, resultsWithSubjectValue);
			});

		});
	};
	return factory;
})
.directive('vnTask', function() {
    return {
      restrict: 'E',
      scope: {
      	patientspecific: '@vnPatientSpecific',
      	screenToWatch: '@vnWatch'
      },
      templateUrl: 'apps/components/tasks/vntask.html'
    };
  })
.directive('vnTaskNotification', function() {
    return {
      restrict: 'E',
      scope: {
      	model: '='
      },
      templateUrl: 'apps/components/tasks/notification/vntasknotification.html',
      controller: function( $scope ){
      	
      }
    };
  });