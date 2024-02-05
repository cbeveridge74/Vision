function DBBridge(){};

angular.module('vnFormsModule', [ 'vnValidationModule' ],function () {})
.controller('vnFormsController', function(){})
.run(function( 
		vnAppManagementFactory,
		visionFactory,
		vnDatabaseFactory,
		$rootScope){

DBBridge.updateData = vnDatabaseFactory.updateData;//function( item, data, callback )
DBBridge.retrieveData = vnDatabaseFactory.retrieveData;


var APP_ID 			= "VN_FORMS";
var LANDING 		= APP_ID + '__LANDING';
var OPN = APP_ID + "__OPEN_FORM";
	//$rootScope.init = function(){
		$rootScope.$on( "COMMAND_SELECTED", function( scope, command ){
			if( command.id == OPN ){
				visionFactory.retrieveData( database[ FORMS ].name, function( results ){
					showDialog( results, "Forms", 700, 500, function(){
						$.each( results, function( index, value ){
							var button = "<input type='button' class='formsButtons' value='" + value.name + "'>";
							$( "#formsDialog" ).append( button );
							
						});

						$( ".formsButtons" ).click( function( event ){
								visionFactory.retrieveData( database[ FORMS ].name, function( results ){
									var existingFormUtil = new ExistingForms();
									existingFormUtil.formStructure = results[0].xmlDefinition;
									existingFormUtil.recreateForm();
									$( "#formsDialog" ).dialog( 'close' );
									$( "#formsDialog" ).dialog( 'destroy' );
								},
								"by_name",
								{start: event.target.defaultValue, end: event.target.defaultValue},
								null);
							});
						
					}, "#formsDialog", function(){});
				}, 
		        null,
		        null
		        );
			}
		});
	//};

vnAppManagementFactory.registerApp( 
	{ id: APP_ID, 
	name: "Forms",
	icon: "apps/visionforms/images/appointments.png",
	screens: [
		LANDING
		]
	});

	var OPN = APP_ID + "__OPEN_FORM";
	console.log( "####" );
	$rootScope.$watch( "screens.VN_FORMS", function( value ){
		if( value ){
			defaultRightCommands = [{ id: OPN, label: "Open", icon: "hamburger.svg" }];
			defaultLeftCommands= [];
    	}
    });

	
})
.directive('vnForms', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visionforms/legacy/mainscreen.html'
    };
  })
.value('SCREENS',  { 
	LANDING: "VN_FORMS__LANDING"
});