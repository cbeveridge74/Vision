angular.module('vnDataEntryModule', [ 'vnValidationModule' ],function () {})
.controller('vnDataEntryController', function( $scope, $rootScope, visionFactory ){

	var APP_ID 		= "VN_DATA_ENTRY";
	var OPN = APP_ID + "__OPEN_FORM";
	var picklist = {};
	picklist.smokerTypeList = Picklists.SMOKER;
	picklist.severityTypeList = Picklists.SEVERITY;
	picklist.reactionTypeList = Picklists.REACTION;
	picklist.preventionTypeList = Picklists.PREVENTION;
	picklist.drinkerTypeList = Picklists.ALCOHOL;
	picklist.certaintyTypeList = Picklists.CERTAINTY;

	$scope.getPicklist = function( id ){
		return picklist[ id ];
	};

	

	$rootScope.$on( "COMMAND_SELECTED", function( scope, value ){
			if( value == OPN ){
				visionFactory.retrieveData( database[ FORMS ].name, function( results ){
					showDialog( results, "Forms", 700, 500, function(){
						$.each( results, function( index, value ){
							var button = "<input type='button' class='formsButtons' value='" + value.name + "'>";
							$( "#formsDialog" ).append( button );
							
						});

						$( ".formsButtons" ).click( function( event ){
								visionFactory.retrieveData( database[ FORMS ].name, function( results ){

									
									var json = $.xml2json( results[0].xmlDefinition, true );
									//console.log( JSON.stringify( json ) );  

									$scope.$apply( function(){
										$scope.formData = json;
									});

									$( '.dateinput').datepicker({
										onSelect: function (unused, unused){},
										showOn: 'button',
										changeMonth: true,
										changeYear: true,
										yearRange: '-120:+99',
										showOtherMonths: true,
										firstDay: 1,
										beforeShow: function (unused, unused){},
										dateFormat: 'dd-M-yy'});
									
									
									var conditions = results[0].jsonValidation;
									if( conditions != null && conditions.length > 0 ){
										//conditions = conditions.substring(1, validation.length - 1);
										conditions = JSON.stringify( conditions );
										conditions = conditions.replace( /\\n/g, "" );
										conditions = conditions.replace( /\],\[/g, "," );
										conditions = conditions.replace( /\[\[/g, "[" );
										conditions = conditions.replace( /\]\]/g, "]" );
										conditions = conditions.replace( /\\/g, "" );
										conditions = conditions.replace( /"{/g, "{" );
										conditions = conditions.replace( /}",/g, "}," );
										conditions = conditions.replace( /"\[{/g, "[{" );
										conditions = conditions.replace( /}\]"/g, "}]" );
										conditions = conditions.replace( /}"}/g, "}}" );
										
										var jsonConditions = JSON.parse( conditions );
										$( '#previewForm' ).formConditions({
							   		    	conditions: jsonConditions
							   			});
									}

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


		var retrieveForm = function(){

			
		};

})
.run(function( vnAppManagementFactory, visionFactory, $rootScope ){
	var APP_ID 			= "VN_DATA_ENTRY";
	var MAIN 		= APP_ID + '__MAIN';

	vnAppManagementFactory.registerApp( 
		{ id: APP_ID, 
		name: "Data Entry",
		icon: "apps/visiondataentry/images/appointments.png",
		screens: [
			MAIN
			]
		});

	var OPN = APP_ID + "__OPEN_FORM";

	$rootScope.$watch( "screens.VN_DATA_ENTRY", function( value ){
		if( value ){
			defaultRightCommands = [{ id: OPN, label: "Open", icon: "hamburger.svg" }];
			defaultLeftCommands= [];
    	}
    });

	
})
.directive('vnDataEntry', function() {
    return {
      restrict: 'E',
      templateUrl: 'apps/visiondataentry/vndataentry.html'
    };
  })
.value('SCREENS',  { 
	MAIN: "VN_DATA_ENTRY__MAIN"
});