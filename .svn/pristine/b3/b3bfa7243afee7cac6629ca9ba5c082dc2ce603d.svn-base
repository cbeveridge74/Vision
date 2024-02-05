angular.module('vnScreenManagementModule', [],function () {})//'ngRoute', 'ngTouch', 'ngAnimate'
.factory('vnScreenManagementFactory',  function( 
	$rootScope, 
	$timeout, 
	vnScrollFactory ){
	var factory = {};
	var timeMilliseconds = new Date();
	$rootScope.screens = {};
	$rootScope.screens.VN_LOGIN = true;
	factory.overrideGeneralClick = false;

  	//factory.checkIfScrolling = function(){
	    //return false;//$rootScope.homeScroll.moved || $rootScope.scrolling;
	//};

	factory.GENERAL_CLICK = "GENERAL_CLICK";

	factory.openMenu = function( selector, overrideGeneralClick ){ 
		if( overrideGeneralClick != true ){
			factory.handleGeneralClick();
		}
		
		$timeout( function(){
			var element = $( selector );
			$( element ).effect("fade", { duration: 50, queue: false }, "easeOutCirc");
			$( element ).addClass( "open", 500, "easeOutCirc" );
		}, 1 );
	};

	factory.closeMenu = function( selector ){ 
		$timeout( function(){
			var element = $( selector );
			$( element ).effect("fade", { duration: 50, queue: false }, "easeOutCirc");
			$( element ).addClass( "open", 100, "easeOutCirc" );
		}, 1 );
	};

	factory.toggleBars = function( commandOnly ){
		$( ".command" ).toggleClass( "open", 300, "easeOutCirc" );
		if( !commandOnly || commandOnly == null ){
			$( ".navigation" ).toggleClass( "open", 300, "easeOutCirc" );
		}
		if( factory.isCommandBarOpen() ){
			$( "body" ).removeClass( "command-bar-open" );
		}
	};

	factory.openCommandBar = function(){
		$( ".command" ).addClass( "open", 300, "easeOutCirc" );
		$( "body" ).addClass( "command-bar-open" );
	};

	// Note, when calling this method, you're responsible for setting overrideGeneralClick
	// back to false as it's specific to your screen
	var selectedItems = [];

	factory.handleListItemRightClick = function( item, list, leftCommands, rightCommands ){
		if( item.selected == null ){
     		item.selected = false;
     	}

     	selectedItems.push( item );

     	item.selected = !item.selected;

     	var openTheCommandBar = false;
     	for( var i = 0; i < list.length; i++ ){
     		if( list[i].selected == true ){
     			openTheCommandBar = true
     			break;
     		}
     	}
     	if( openTheCommandBar ){
     		factory.initialiseMenuOptions( leftCommands, rightCommands );
     		factory.openCommandBar();
     	}else{
     		factory.toggleBars( true );
     	}
	};

	factory.closeBars = function(){
		$( ".command" ).removeClass( "open", 300, "easeOutCirc" );
		$( ".navigation" ).removeClass( "open", 300, "easeOutCirc" );
		$( ".category .selected" ).removeClass( "selected" );
		$( "body" ).removeClass( "command-bar-open" );
		
		selectedItems.forEach( function( value ){ 
			$timeout( function(){ value.selected = false; });
		});
		selectedItems = [];
	};

	factory.closeMenus = function(){
		$( ".menu:not('.task-simple, .create-view, .detail-view')" ).removeClass( "open" );
		$( ".menu:not('.task-simple, .create-view, .detail-view')" ).attr( "style", "" );
	};

	factory.initialiseMenuOptions = function( leftCommandValues, rightCommandsValues ){
		$rootScope.leftCommands = leftCommandValues;
  		$rootScope.rightCommands = rightCommandsValues;
	};	

	var isSpecialCase = function( event ){
		if( event != null ){
			if( $( event.target ).parents( ".md-select-menu-container" ).length > 0 ){
				return true;
			}
		}
		
		return false;
	};

	factory.handleGeneralClick = function( event ){

		if( isSpecialCase( event ) || factory.overrideGeneralClick ){
			return;
		}

		$rootScope.$broadcast( factory.GENERAL_CLICK, event );

		if( factory.isMenusOpen() ){
			factory.closeBars();
		    factory.closeMenus();
		    if( event != null ){
		      event.stopPropagation();
		    }
		}
	  };

	factory.isDoubleClick = function(){

		var timeMillisecondsClick = new Date(); 
		if(timeMillisecondsClick.getTime() > timeMilliseconds.getTime() + 500 ) { 
			timeMilliseconds = new Date();
			return false;
		}else{
			return true;
		}
	};

	factory.isMenusOpen = function(){
		return $( ".navigation, .command, .menu" ).hasClass( "open" );
	};

	factory.isCommandBarOpen = function(){
		return $( ".command" ).hasClass( "open" );
	};

	factory.handleItemClick = function( event, element, leftCommands, rightCommands, commandOnly ){
        if( vnScrollFactory.isScrolling() ){
	      return;
	    }
        if( !factory.isDoubleClick() ){
            if( !factory.isMenusOpen() ) {
              factory.initialiseMenuOptions(leftCommands, rightCommands);
              factory.toggleBars( commandOnly );
              $( event.currentTarget ).addClass( "selected" );
            }else{
              $( ".category .list-group-item.selected" ).removeClass( "selected" );
            }
        }
      };

    factory.initialiseAppBarIcons = function( topBarIcons ){
    	$rootScope.appBarIcons = topBarIcons;
    };

	$( "body" ).click( function( event ){
		factory.handleGeneralClick( event );
	});
	return factory;
});