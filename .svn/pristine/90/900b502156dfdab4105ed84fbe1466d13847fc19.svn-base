angular.module('vnVisionMailModule', [ 'vnScanModule' ],function () {})
.run(function( vnAppManagementFactory ){
	var APP_ID 			= "VN_MAIL";
	var DOCUMENT_INBOX = APP_ID + '__MAIL_HOME';
    var SCAN = APP_ID + '__SCAN';
    var TRENDS = APP_ID + '__TRENDS';

	vnAppManagementFactory.registerApp( 
		{ id: APP_ID, 
		name: "Vision Mail",
		icon: "fa fa-envelope",
		screens: [
			DOCUMENT_INBOX,
      SCAN,
      TRENDS
		]});
})
.factory( 'vnVisionMailFactory', function(){
    var factory = {};
    return factory;
})
.controller('vnVisionMailController', function( 
  $scope,
  $rootScope,
  $timeout,
  $mdToast,
  $http,
  $filter,
  vnScanFactory,
  vnBarFactory,
  visionFactory,
  vnActionFactory,
  vnTaskCreateFactory,
  vnCreateViewFactory,
  vnNavigationFactory,
  vnScreenManagementFactory,
  vnActionFactory,
  VN_MAIL_SCREENS ){

  var self = this;
  var patients = {};
  var dataStore = new DataStore();
  var filterCategories = dataStore.filterCategories;
  var mailTypes = dataStore.mailType;
  $scope.currentFilter = [];
  $scope.childModel = {};
  $scope.childModel.showOnly = "all";
  $scope.childModel.dateOnly = "all";
  $scope.user = 0;
  $scope.currentMailItem = null;
  $scope.viewLandscape = false;
  self.filteredMailItems = [];
  $scope.masterAreaHeight = 30;
  $scope.search = '';
  $scope.bannerModel = {};
  
  var filterToast;

  $scope.TASKREF = "TASKREF";
  $scope.TASKAPP = "TASKAPP";
  $scope.TASKNONE = "TASKNONE";
  $scope.TASKNEW = "TASKNEW";
  $scope.haemData = [[ "23-Jul-2005", 1 ], [ "02-Jan-2007", 2 ], [ "14-Apr-2008", 5 ], [ "15-Apr-2008", 4 ], [ "30-Nov-2014", 6 ]];
  $scope.bloodData = [[ "23-Jul-2005", 12 ], [ "02-Jan-2007", 14 ], [ "14-Apr-2008", 3 ], [ "15-Apr-2008", 4 ], [ "30-Nov-2014", 7 ]];
  $scope.mcvData = [[ "30-Nov-2014", 4 ], [ "01-Dec-2014", 7 ], [ "02-Dec-2014", 8 ], [ "03-Dec-2014", 2 ], [ "04-Dec-2014", 8 ]];

  

  $scope.sort = {};
  $scope.sort.DATE = 0;
  $scope.sort.PATIENT = 1;
  $scope.sort.CLINICIAN = 2;
  $scope.sortMenu = [{
    id: $scope.sort.PATIENT,
    label: "Patient"
  },
  {
    id: $scope.sort.CLINICIAN,
    label: "Clinician"
  },
  {
    id: $scope.sort.DATE,
    label: "Date"
  }];

  var sortList = function(){
    console.log( "JUST IMPLEMENTED THIS SORTING, STILL NEEDS WORK" );
    $timeout( function(){
      $scope.mailItems.sort(function(a,b){
      if(b.patient == null) return -1;
      if(a.patient == null) return 1;
      if(a.patient.Surname < b.patient.Surname) return -1;
      if(a.patient.Surname > b.patient.Surname) return 1;
      return 0;
      });
    });
    
  };

  $scope.handleChartClick = function(){
    vnNavigationFactory.switchScreens( VN_MAIL_SCREENS.TRENDS );
  };

  $scope.handleSortClick = function(){
    console.log( this.item );
    sortList();
  };

  $rootScope.$on( vnBarFactory.APPBAR_COMMAND_SELECTED, function( event, icon ){
    if( icon == null ){
      return;
    }
    if( icon.id == HMB ){
      setDefaultFilters();
    }
  });
  
  $scope.xFunction = function(){
    return temp;
  };

  var temp = function(d){
    return moment( d[0], "DD-MMM-YYYY" );
  };
  
  $scope.yFunction = function(){
    return function(d){
      return d[1];
    };
  };

 $scope.xAxisTickFormat = function() 
{
    return function(d){
        return d3.format(',f')(d);
    }
};

$scope.handleBackButtonClick = function(){
  vnNavigationFactory.switchScreens( vnNavigationFactory.retrieveScreenFromHistory( vnNavigationFactory.SCREEN_PREVIOUS ) );
};


    /*function defaultChartConfig(containerId, data) {
        nv.addGraph(function() {
            var chart = nv.models.sparklinePlus();
            chart.margin({left:70})
                .x(function(d,i) { return i })
                .xTickFormat(function(d) {
                    return d3.time.format('%x')(new Date(data[d].x))
                });
            d3.select(containerId)
                    .datum(data)
                    .call(chart);
            return chart;
        });
    }

    function sine() {
        var sin = [];
        var now =+new Date();
        for (var i = 0; i < 100; i++) {
            sin.push({x: now + i * 1000 * 60 * 60 * 24, y: Math.sin(i/10)});
        }
        return $scope.haemData;
    }*/







  var displayMailItem = function( data, callback ){
    vnNavigationFactory.switchScreens( VN_MAIL_SCREENS.DOCUMENT_INBOX );
    console.log( data );
    if( callback != null ){
      callback();
    }
  };

  $scope.handleSelectAll = function(){

    var mailRightCommandsCopy = JSON.parse( JSON.stringify( mailRightCommands ) );
    angular.forEach( self.filteredMailItems, function( item ){
      vnScreenManagementFactory.handleListItemRightClick( item, self.filteredMailItems, mailLeftCommands, mailRightCommandsCopy );
    });
    initialiseCommands( mailRightCommandsCopy );
  };

  vnActionFactory.canHelpWith( vnActionFactory.MAIL_ITEM_DISPLAY, displayMailItem );

  $scope.getSelectedItems = function(){
    if( self.filteredMailItems == null ){
      return;
    }
    var selectedItems = [];
    self.filteredMailItems.forEach( function( item, itemindex ){
      if( item.selected == true ){
        selectedItems.push( item );
      }
    });
    return selectedItems;
  };

  var taskTemplate = {
    recipients : {
      groupids: [ new DataStore().personGroup.RECEPTIONISTS ],
      userid: []
    },
    subjectid: 3,
    description: "Please make appointments"
  };

  $scope.handleTaskCreateClicked = function( e ){
    
    if( this.item.id == $scope.TASKAPP ){
      
      buildTask( taskTemplate );
      $scope.template = "apps/visionmail/parts/tasksnippet.html";
      
    }else if( this.item.id == $scope.TASKNEW ){
      $scope.template = null;
      $( '#vnmailtasksnippet' ).remove();
      buildTask();
    }
  };

  var sendTask_functioncopy = vnCreateViewFactory.sendTask;

  var buildTask = function( template ){
    
    var selectedItems = $scope.getSelectedItems();
    var selectedAttachments = [];
    var selectedPatients = [];
        
    selectedItems.forEach( function( item, itemindex ){
      
      selectedAttachments.push( buildDocumentAttachment( item ) );
      selectedPatients.push( { id: item.patient.Id, 
                      thumbnailUrl: "", 
                      title: item.patient.Surname.toUpperCase() + ", " + item.patient.Forename, 
                      subtitle: item.patient.DOB, 
                      active: false
                    });
    });

    // Taking care of the screen management myself here
    vnScreenManagementFactory.openMenu( ".vision-mail .vision-tasks-create", true );
    vnScreenManagementFactory.toggleBars( true );
    vnScreenManagementFactory.closeMenu( ".vision-mail .task-menu.menu" );
    

    if( template != null ){
      buildRecipients( template.recipients.groupids[0], function( recipients ){
        vnTaskCreateFactory.clearModel();
        var model = vnTaskCreateFactory.getModel();
        //model.documentCollection = selectedAttachments;
        model.selectedSubjects = template.subjectid;
        model.description = template.description;
        model.selectedRecipients = recipients;
        vnTaskCreateFactory.setModel( model );
      });
    }
    
    // Overriding the default send task behaviour
    vnCreateViewFactory.sendTask = function(){
      //Send all tasks separately
      sendTaskRecursor( selectedAttachments, selectedPatients );
      //Restore the default behaviour
      vnCreateViewFactory.sendTask = sendTask_functioncopy;
      vnScreenManagementFactory.closeMenu( ".vision-mail .vision-tasks-create" );
      var taskString = "task";
      if( selectedAttachments.length > 1 ){
        taskString = "tasks";
      }
      $mdToast.show( $mdToast.simple().content( selectedAttachments.length + " " + taskString + " sent successfully" ).position("bottom right") );
      clearSelectedItems();
    };

    addGeneralCLickListener( function(){
      vnCreateViewFactory.sendTask = sendTask_functioncopy;
      removeGeneralClickListener();
    });
  };

  var sendTaskRecursor = function( selectedAttachments, selectedPatients ){
    var model = vnTaskCreateFactory.getModel();
    model.documentCollection = [ selectedAttachments[ 0 ] ];
    model.patientCollection = [ selectedPatients[ 0 ] ];
    vnTaskCreateFactory.setModel( model );
    sendTask_functioncopy( true, function(){
      selectedAttachments.splice( 0, 1 );
      if( selectedAttachments.length > 0 ){
        selectedPatients.splice( 0, 1 ); // DCB this may cause issue as there would need to be 1 to 1 mapping of docs to patient.
        sendTaskRecursor( selectedAttachments, selectedPatients );
      }
    }, true);
  };

  var clearSelectedItems = function(){
    angular.forEach( $scope.getSelectedItems(), function( item ){
      item.selected = false;
    }); 
    setDefaultFilters();
  };


  var buildRecipients = function( recipientGroupId, callback ){
    visionFactory.retrieveData( database[ PERSON_GROUPS ].name, function( groupResult ){
      var recipients = [];
      groupResult.forEach( function( value, index ){
        if( value.id == recipientGroupId ){
          recipients.push({
            id: value.id,
            thumbnailUrl: '',
            title: value.label,
            subtitle: value.description,
            users: value.users
          });
        }
      });
      if( callback != null ){
        callback( recipients );
      }
    });
  };

  var buildDocumentAttachment = function( item ){
    var docObject = {
      id: item.id,
      type: new DataStore().docType.MAIL_MANAGER,
      title: item.type.displayname,
      label: item.type.displayname
    };
      
    if( item.patient != null ){
      docObject.subtitle = item.patient.Surname + ", " + item.patient.Forename + " (" + item.patient.DOB + ")";
    }else{
      docObject.subtitle = "No patient";
    }
    return docObject;
  };

  var resetFilters = function(){
    $scope.bannerModel.localPatientId = null;
    //$rootScope.patientid = null;
    setMainFilter( $scope.INBOX );
    $scope.childModel.showOnly = "all";
    $scope.childModel.dateOnly = "all";
  };

  $scope.$watch(function () {
       return self.filteredMailItems;
  },function(value){
    if( value != null ){
      handleFilterUpdate( value );  
    }
  }, true);

  var handleFilterUpdate = function( value ){

    var toaster = $( '.vision-parent-module md-toast.md-left.md-bottom' );
    initialisePatients();

    if( ( value != null && $scope.mailItems != null ) 
      && value.length < $scope.mailItems.length
      && toaster.length < 1 ){
      filterToast = $mdToast.simple()
        .action('CLEAR FILTERS')
        .hideDelay(0)
        .highlightAction(false)
        .position('bottom left');

      $mdToast.show(filterToast).then( function( response ) {
        resetFilters();
      });
      $timeout( function(){
        // Having to do this as no other way to get unique reference to this particular toast
        $( '.vision-parent-module md-toast.md-left.md-bottom' ).addClass( 'visionmailtoaster' );
      });
      
    } else if( ( value != null && $scope.mailItems != null ) 
      && value.length == $scope.mailItems.length
      && toaster.length > 0 ) {
      $mdToast.hide();
    }
    if( self.filteredMailItems != null && $scope.currentMailItem != null ){
      var currentItemValid = false;
      self.filteredMailItems.forEach( function( filteredItem ){

        if( $scope.currentMailItem.id == filteredItem.id ){
          currentItemValid = true;
        }
      } );
      if( currentItemValid == false  ){
        $scope.currentMailItem = null;
        if( self.filteredMailItems != null 
          && self.filteredMailItems.length == 1 ){
          $scope.currentMailItem = self.filteredMailItems[0];
        }
      }else{

      }
    }
  };

  $scope.handleMailItemClick = function(){ 
    var dis = this;
    visionFactory.retrieveData( database[ MAIL_ITEM_ORDER ].name, function( results ){
      //$timeout( function(){//DCB put timeout in the dbmodule instead
        $scope.currentMailItem = dis.item;
        $scope.orderMailItemResults( results );
        $scope.currentMailItem.results = $filter('orderBy')($scope.currentMailItem.results, 'index');
      //});
      if( dis.item.typeid == mailTypes.SCAN ){
        vnScanFactory.setModel( { id: dis.item.id, name: dis.item.file } );
        
      }else {
        
      }
    }, null, { start: this.item.type.displayname, end: this.item.type.displayname } );
  };

  $scope.orderMailItemResults = function( results ){
    if( results == null || results[0] == null){
      return;
    }
    angular.forEach( $scope.currentMailItem.results, function( result ){
      if( results[0].order[ result.testid ] != null ){
        result.index = results[0].order[ result.testid ].index;
      }
      
    });
  };

  $scope.handleScanClick = function(){
    vnNavigationFactory.switchScreens( VN_MAIL_SCREENS.SCAN );
  };

  var convertObjectToArray = function( obj ){
    return Object.keys(obj).map(function(k) { return obj[k] });
  };

  var initialisePatients = function(){
    patients = [];
    if( $scope.mailItems == null ){
      return;
    }
    $scope.mailItems.forEach( function( fMailItem ){
      if( fMailItem.patient != null ){
        patients[ fMailItem.patient.Id ] = fMailItem.patient;
      }
    });
    patients = convertObjectToArray( patients );
    patients.sort(function(a,b){
      if(a.Surname < b.Surname) return -1;
      if(a.Surname > b.Surname) return 1;
      return 0;
    });
    $scope.names = patients;
  };

  $scope.handleViewChangeClick = function(){
    $scope.viewLandscape = !$scope.viewLandscape;
  };

  $scope.handlePatientClick = function(){
    $scope.bannerModel.localPatientId = this.name.Id;
    //$rootScope.patientid = this.name.Id;
    $scope.search = '';
  };
  $scope.filterMailItems = function( value, index, array ){
    var returnValue = false;
    if( $scope.currentFilter.length < 1 ){
      returnValue = true;
    }
    
    $scope.currentFilter.forEach( function( filter ){
      if( filter.id == value.category ){
        returnValue = true;
      }

      if( filter.id  == filterCategories.NEEDS_ATTENTION
        && ( value.patientid == null
        || value.userid < 0
        || value.uom == null )){
        returnValue = true;
      }

      if( filter.id  == filterCategories.SCANS
        && ( value.file != null )){
        returnValue = true;
      }
    });


    if( $scope.childModel.showOnly == "flagged" && value.flagged == false || 
        $scope.childModel.showOnly == "unread" && value.read == true){
      returnValue = false;
    }

    var datereceived = moment( value.datereceived );

    if( $scope.childModel.dateOnly == "1d" ){
      if( datereceived.format( "DD-MMM-YYYY" ) != moment().format( "DD-MMM-YYYY" ) ){
        returnValue = false;
      }
    }else if( $scope.childModel.dateOnly == "2d" ){
      if( datereceived.format( "DD-MMM-YYYY" ) != moment().format( "DD-MMM-YYYY" ) &&
          datereceived.format( "DD-MMM-YYYY" ) != moment().subtract(1, 'days').format( "DD-MMM-YYYY" )){
        returnValue = false;
      }
    }else if( $scope.childModel.dateOnly == "1w" ){
      if( datereceived.isBefore( moment().subtract( 7, 'days' ) ) ){
        returnValue = false;
      }
    }else if( $scope.childModel.dateOnly == "2w" ){
      if( datereceived.isBefore( moment().subtract( 14, 'days' ) ) ){
        returnValue = false;
      }
    }else if( $scope.childModel.dateOnly == "1m" ){
      if( datereceived.isBefore( moment().subtract( 31, 'days' ) ) ){
        returnValue = false;
      }
    }

    if( $scope.bannerModel.localPatientId != null && $scope.bannerModel.localPatientId != value.patientid ){
      returnValue = false;
    }
    return returnValue;
  };

  $scope.handleSearchFocus = function( event ){
    vnScreenManagementFactory.openMenu( ".vision-mail .search-results.menu" );
  };

  $scope.$watch("screens." + VN_MAIL_SCREENS.DOCUMENT_INBOX, function( value ){
   
      var toaster = $( '.vision-parent-module md-toast.md-left.md-bottom.visionmailtoaster' );

      if( value ){
        handleShow();
        toaster.removeClass( 'hide' );
      }else{
        toaster.addClass( 'hide' );
      }
  });


  $scope.handleRightClick = function( event, element ){
    
    var mailRightCommandsCopy = JSON.parse( JSON.stringify( mailRightCommands ) );
    
    var dis = this;
    vnScreenManagementFactory.handleListItemRightClick( dis.item, dis.filteredMailItems, mailLeftCommands, mailRightCommandsCopy );
    initialiseCommands( mailRightCommandsCopy );
  };

  var initialiseCommands = function( commands ){

    var needsFixed = true;
    var singlePatient = true;
    var numPatientsSelected = 0;

    self.filteredMailItems.forEach( function( item ){
      
      if( item.selected == true ){
        if( item.patientid != null && item.userid > -1 && item.uom != null ){
          needsFixed = false;
        }
        if( item.patientid != null ){
          numPatientsSelected++;
        }
      }
    });
    
    commands.forEach( function( item, index ){

      if( item.id == VMFIX ){
        if( needsFixed ){
          item.hide = false;
        }else{
          item.hide = true;
        }
      }

      if( item.id == VMPSB || item.id == VMAPT){
        if( numPatientsSelected == 1 ){
          item.hide = false;
        }else{
          item.hide = true;
        }
      }

      /*if( hasStaffId == true && item.id == VMSTF){
        item.hide = true;
      }else if( hasPatientId == true && item.id == VMPAT){
        item.hide = true;
      }else if( hasUOMId == true && item.id == VMUOM){
        item.hide = true;
      }*/
    });
  };


  $rootScope.$on( "COMMAND_SELECTED", function( name, command ){

    if( command.id == VMSRT ){
      vnScreenManagementFactory.openMenu( ".vision-mail .sort-menu.menu", true );
    }else if( command.id == VMTASK ){
      vnScreenManagementFactory.openMenu( ".vision-mail .task-menu.menu", true );
    }else if( command.id == VMPSB ){
      self.filteredMailItems.forEach( function( item ){
        if( item.selected == true && item.patientid != null ){
          vnActionFactory.needHelpWith( vnActionFactory.PRESCRIBING, [ item.patientid ], function(){

          });
        }
      });
    }else if( command.id == VMAPT ){
      self.filteredMailItems.forEach( function( item ){
        if( item.selected == true && item.patientid != null ){
          vnActionFactory.needHelpWith( vnActionFactory.BOOK_SLOT, [ null, item.patientid ], function(){

          }, true, true );
        }
      });
    }
  });

  $scope.hasRole = function( filter ){

    if( filter.roles == null ){
      return true;
    }

    var returnValue = false;

    filter.roles.forEach( function( filterRole ){
      $rootScope.user.roleid.forEach( function( userRole ){
        if( userRole == filterRole ){
          returnValue = true;
        }
      });
    });
    return returnValue;
  };

  $scope.$watch( 'usermodel', function( nValue, oValue ){
    if( nValue != null && ( nValue != oValue ) ){
      $scope.currentUser =  JSON.parse( nValue );
      retrieveMailItems( $scope.currentUser.id );
    }
  }, true);

   var createListeners = function(){
    removeFilterDataListener = $scope.$watch( 'filterData', function( nValue, oValue ){
      if( nValue != null && ( nValue != oValue ) ){
        var highlightedItem = findHighlightedItem();
        var label = highlightedItem.label;
        initialiseCurrentFilter( highlightedItem );
        $scope.contentTitle = label;
        visionFactory.updateData( database[ MAIL_FILTERS ].name, $scope.filterData, function( data ){})
      }
    }, true);
  };
  createListeners();


  var initialiseCurrentFilter = function( highlightedItem ){
    if( highlightedItem.id == filterCategories.INBOX ){
      $scope.currentFilter = [];
      return;
    }else if( highlightedItem.id == filterCategories.FAVS ){
      $scope.filterData.filters.forEach( function( topfilter ){
        if( topfilter.id == filterCategories.FAVS ){
          topfilter.filters.forEach( function( middlefilter ){
            middlefilter.filter.forEach( function( innerfilter ){
              if( innerfilter.favourite == true ){
                $scope.currentFilter.push( innerfilter );
              }
            });
          });
        }
      });
    }else{
      $scope.currentFilter = [ highlightedItem ];
    }
  };

  $rootScope.$on( "MAIL_MESSAGES_LOADED", function(){
      initialiseMessages();
  });

  var handleShow = function(){
    initialiseMessages();
    setDefaultFilters();
  };

  var setDefaultFilters = function(){
    vnScreenManagementFactory.initialiseMenuOptions( mailLeftCommands, null );
  };
  setDefaultFilters();

  var initialiseMessages = function(){
    if( $scope.currentUser == null ){
      $scope.currentUser = $rootScope.user;
    }
    retrieveMailFilters();
    retrieveMailItems( $scope.currentUser.id, function(){
      $timeout( function(){
        if( self.filteredMailItems != null && self.filteredMailItems.length > 0 ){
          $scope.currentMailItem = self.filteredMailItems[0]; 
        }
        initialisePatients();
      }, 1000 );
    });
   
  };

  var retrieveMailFilters = function(){
   visionFactory.retrieveData( database[ MAIL_FILTERS ].name, function( results ){
      retrieveMailFiltersHandler( results );
    }, "by_userid", { start: $rootScope.user.id, end: $rootScope.user.id });
  };

  var retrieveMailItems = function( userid, callback ){
    var request = { start: userid, end: userid };
    if( userid < -1 ){
      request = null;
    }
    visionFactory.retrieveData( database[ MAIL_ITEMS ].name, function( results ){
      retrieveMailItemsHandler( results );
      if( callback != null ){
        callback();
      }
    }, "by_userid", request);
  };


  var retrieveMailFiltersHandler = function( results ){
    $scope.filterData = results[0];
    //handleFilterUpdate( self.filteredMailItems );
  };

  var retrieveMailItemsHandler = function( results ){
    $scope.mailItems = results;
  };

  $scope.handleFilterClick = function( e ){
    this.item.favourite = !this.item.favourite;
    e.stopPropagation();
  };

  $scope.contentTitle = "Inbox";

  var removeGeneralClickListener;
  var removeFilterDataListener;

  $scope.INBOX          = filterCategories.INBOX;
  $scope.FAVS           = filterCategories.FAVS;
  $scope.CLINICIAN_RQD  = filterCategories.CLINICIAN_RQD;
  $scope.FOLDER         = filterCategories.FOLDER;

  var populateUsers = function(){
    visionFactory.retrieveData( database[ PERSON ].name, function( results ){
      retrieveUsersHandler( results );
    });
  };
  populateUsers();

  var retrieveUsersHandler = function( results ){
    var anyUser = {
      id: -2,
      label: "All"
    };
    results.unshift( anyUser );

    visionFactory.retrieveData( database[ PERSON_GROUPS ].name, function( groupResult ){
      angular.forEach( groupResult, function( value, index ){
        results.push({
          id: value.id,
          label: value.label,
        });
      });
      $scope.users = results;
    });
  };

  // isMoreClicked is for if the 'More...' option in the Filters
  $scope.handlePluginOptionClick = function( event, isMoreClicked ){
    if( !( this.item.moreoption && $scope.isFiltersSelected( this.item.id ) ) ){
      if( this.item.moreoption != null ){
        var dis = this;
        if(  $scope.chosenFilters != null && (  $scope.chosenFilters.tag != this.item.id ) ){
          $timeout(function(){
            handlePluginOptionClickHelper( dis, event );
          }, 350);
        }else{
          handlePluginOptionClickHelper( dis, event );
        }
      }
    }
    
    /*if( this.item.selected == false ){
      var currentHighlightedItem = findHighlightedItem();
      var dis = this;
      dis.item.highlighted = true;

      //If this is a subchoice and it's not chosen as a favourite then highlight it's parent
      // Need to remove listeners to avoid title changes etc
      
      dis.item.highlighted = false;
      currentHighlightedItem.highlighted = true;
      $timeout( function(){
        //removeFilterDataListener();
        //setMainFilter( $scope.FAVS );
        //createListeners();
      }, 500);
    }else{*/
      unhighlightAll();
      this.item.highlighted = true;
    //}
  };

  $scope.handleMoreClick = function( e ){
    handlePluginOptionClickHelper( this.$parent.$parent, e );
  };

  $scope.isFiltersSelected = function( favItemId ){
    var thereIsAFilterSelected = false;
    $scope.filterData.filters.forEach( function( value ){
      if( value.id == favItemId ){
        value.filters.forEach( function( filterItem ){
          filterItem.filter.forEach( function( filterItem ){
            if( filterItem.favourite ){
               thereIsAFilterSelected = true;
            }
          });
        });
      }
    });
    return thereIsAFilterSelected;
  };

  var unhighlightAll = function(){
    $scope.filterData.filters.forEach( function( value ){
      value.highlighted = false;
      value.filters.forEach( function( filterItem ){
        filterItem.filter.forEach( function( filterValue ){
          filterValue.highlighted = false;
        });
      });
    }); 
  };

  var findHighlightedItem = function(){
    var returnValue;
    $scope.filterData.filters.forEach( function( value ){
      if( value.highlighted ){
        returnValue = value;
      }
      value.filters.forEach( function( filterItem ){
        filterItem.filter.forEach( function( filterValue ){
          if( filterValue.highlighted ){
             returnValue = filterValue;
          }
        });
      });
    });
    
    return returnValue;
  };

  var setMainFilter = function( itemId ){
    unhighlightAll();
    angular.forEach( $scope.filterData.filters, function( filter ){
      if( filter.id == itemId ){
        filter.highlighted = true;
      }
    });
  };

  var handlePluginOptionClickHelper = function( context, event ){
    $scope.chosenFilters = context.item.filters;
    $scope.chosenFilters.tag = context.item.id;
    openFlyout( ".vision-mail .flyout" );
    event.stopPropagation();
  };

  var openFlyout = function( selector ){
      var element = $( selector );
      if( $( element ).hasClass( "open" ) ){
        closeFlyout( selector );
        return;
      }
      $( element ).addClass( "open", 300, "easeOutCirc" );
      addGeneralCLickListener( function(){
        closeFlyout( ".vision-mail .flyout" );
      });
  };

  var closeFlyout = function( selector ){
      var highlightedItem = findHighlightedItem();
      if( highlightedItem.label == null 
        || highlightedItem.label.length < 1
        || highlightedItem.id == $scope.FOLDER ){
        setMainFilter( $scope.INBOX );
      }
      var element = $( selector );
      $( element ).removeClass( "open", 300, "easeOutCirc" );
      $scope.chosenFilters = null;
      removeGeneralClickListener();
  };

  var addGeneralCLickListener = function( callback ){
    removeGeneralClickListener = $rootScope.$on( vnScreenManagementFactory.GENERAL_CLICK, function(){
      if( callback != null ){
        callback();
      }
    });
  };

  $( window ).resize(function() {
    handleResize();
  });

  var handleResize = function(){
      
  };
})
.directive( 'vnDetailPart', function(){
  return {
      restrict: 'E',
      templateUrl: 'apps/visionmail/parts/detailpart.html',
      controller: function( 
        $scope, 
        $timeout, 
        visionFactory,
        vnScreenManagementFactory ){
        $scope.parseFloat = parseFloat;
        $scope.sortableOptions = {
          start: function(event, ui){
             
          },
          stop: function(event, ui){
            var orderObject = { id: $scope.currentMailItem.type.displayname, order: {} };
            $scope.currentMailItem.results.forEach( function( result, resultIndex ){
              orderObject.order[result.testid] = {
                index: resultIndex
              };
              
            });
            visionFactory.updateData( database[ MAIL_ITEM_ORDER ].name, orderObject, function( data ){
              $timeout( function(){
                $scope.orderMailItemResults( [ data ] );
              });
            });
          },
        };

        $scope.handleInformationClick = function(){
          vnScreenManagementFactory.openMenu( '.detail-container .meta.menu' );
        };
      }
    };
} )
.directive( 'vnMasterPart', function(){
  return {
      restrict: 'E',
      templateUrl: 'apps/visionmail/parts/masterpart.html',
      controller: function( $scope ){
        
      }
    };
} )
.directive('vnVisionMail', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionmail/vnvisionmail.html'
    };
  })
.directive('vnTrends', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionmail/parts/vntrends.html',
      controller: function( $scope, vnNavigationFactory ){

        $scope.exampleData = [
            {
                "key" : "Quantity" ,
                "bar": true,
                "values" : [ [ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
            },
            {
                "key" : "Price" ,
                "values" : [ [ 1136005200000 , 71.89] , [ 1138683600000 , 75.51] , [ 1141102800000 , 68.49] , [ 1143781200000 , 62.72] , [ 1146369600000 , 70.39] , [ 1149048000000 , 59.77] , [ 1151640000000 , 57.27] , [ 1154318400000 , 67.96] , [ 1156996800000 , 67.85] , [ 1159588800000 , 76.98] , [ 1162270800000 , 81.08] , [ 1164862800000 , 91.66] , [ 1167541200000 , 84.84] , [ 1170219600000 , 85.73] , [ 1172638800000 , 84.61] , [ 1175313600000 , 92.91] , [ 1177905600000 , 99.8] , [ 1180584000000 , 121.191] , [ 1183176000000 , 122.04] , [ 1185854400000 , 131.76] , [ 1188532800000 , 138.48] , [ 1191124800000 , 153.47] , [ 1193803200000 , 189.95] , [ 1196398800000 , 182.22] , [ 1199077200000 , 198.08] , [ 1201755600000 , 135.36] , [ 1204261200000 , 125.02] , [ 1206936000000 , 143.5] , [ 1209528000000 , 173.95] , [ 1212206400000 , 188.75] , [ 1214798400000 , 167.44] , [ 1217476800000 , 158.95] , [ 1220155200000 , 169.53] , [ 1222747200000 , 113.66] , [ 1225425600000 , 107.59] , [ 1228021200000 , 92.67] , [ 1230699600000 , 85.35] , [ 1233378000000 , 90.13] , [ 1235797200000 , 89.31] , [ 1238472000000 , 105.12] , [ 1241064000000 , 125.83] , [ 1243742400000 , 135.81] , [ 1246334400000 , 142.43] , [ 1249012800000 , 163.39] , [ 1251691200000 , 168.21] , [ 1254283200000 , 185.35] , [ 1256961600000 , 188.5] , [ 1259557200000 , 199.91] , [ 1262235600000 , 210.732] , [ 1264914000000 , 192.063] , [ 1267333200000 , 204.62] , [ 1270008000000 , 235.0] , [ 1272600000000 , 261.09] , [ 1275278400000 , 256.88] , [ 1277870400000 , 251.53] , [ 1280548800000 , 257.25] , [ 1283227200000 , 243.1] , [ 1285819200000 , 283.75] , [ 1288497600000 , 300.98] , [ 1291093200000 , 311.15] , [ 1293771600000 , 322.56] , [ 1296450000000 , 339.32] , [ 1298869200000 , 353.21] , [ 1301544000000 , 348.5075] , [ 1304136000000 , 350.13] , [ 1306814400000 , 347.83] , [ 1309406400000 , 335.67] , [ 1312084800000 , 390.48] , [ 1314763200000 , 384.83] , [ 1317355200000 , 381.32] , [ 1320033600000 , 404.78] , [ 1322629200000 , 382.2] , [ 1325307600000 , 405.0] , [ 1327986000000 , 456.48] , [ 1330491600000 , 542.44] , [ 1333166400000 , 599.55] , [ 1335758400000 , 583.98] ]
            }
        ];

        /*$scope.exampleData = [
            {
                "key" : "Quantity" ,
                "bar": true,
                "values" : [ [ "23-Jul-2005", 1 ], [ "02-Jan-2007", 2 ], [ "14-Apr-2008", 5 ], [ "15-Apr-2008", 4 ], [ "30-Nov-2014", 6 ]]
            },
            {
                "key" : "Price" ,
                "values" : [ [ "23-Jul-2005", 1 ], [ "02-Jan-2007", 2 ], [ "14-Apr-2008", 5 ], [ "15-Apr-2008", 4 ], [ "30-Nov-2014", 6 ] ]
            }
        ];*/


        $scope.handleBackButtonClick = function(){
          vnNavigationFactory.switchScreens( vnNavigationFactory.retrieveScreenFromHistory( vnNavigationFactory.SCREEN_PREVIOUS ) );
        };
      }
    };
  })
.directive('vnVisionMailTaskMenu', function(){
  return {
    restrict: 'EA',
    templateUrl: 'apps/visionmail/parts/vnmailtaskmenu.html',
    controller: function( $scope ){

      $scope.INDIVIDUAL = "INDIVIDUAL";
      $scope.BULK = "BULK";
      
      $scope.task = {};
      $scope.task.option = $scope.INDIVIDUAL;

      $scope.taskMenu = [{
        id: $scope.TASKREF,
        label: "Create referral"
      },{
        id: $scope.TASKAPP,
        label: "Make appointment"
      },{
        id: $scope.TASKNONE,
        label: "No task required"
      },{
        id: $scope.TASKNEW,
        label: "New"
      }];
    }
  };
})
.value('VN_MAIL_SCREENS',  { 
	DOCUMENT_INBOX: "VN_MAIL__MAIL_HOME",
  SCAN: "VN_MAIL__SCAN",
  TRENDS: "VN_MAIL__TRENDS"
});


