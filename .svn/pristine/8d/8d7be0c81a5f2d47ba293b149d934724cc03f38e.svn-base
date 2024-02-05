function SaveScreen(){
	this.persistForm = function(){
		var url = "createform";
		var saveForm = true;
		/*$.get( '../formbuilder/getformnames', function( data ){
			$.each( data, function( index, element ){
				if( $.trim( $( '<div>' + element.id + '</div>' ).text() ) ==  $.trim( $( "#saveas" ).val() )){
					if( !confirm( "A form for " + $.trim( $( "#saveas" ).val() ) + " already exists, are you sure you want to overwrite it?" ) ){
						saveForm = false;
					}
					url = 'updateform';
					return false;
				}
			});*/
			if( saveForm ){
				var id;
				DBBridge.retrieveData( database[ FORMS ].name, function( results ){
					$.each( results, function( index, value ){
						if( value.name == $.trim( $( "#saveas" ).val() ) ){
							id = value.id;
						}
					});
					if( id == null ){
						id = results.length + 1;
					}

					var data = {
						id: id,
						name: $.trim( $( "#saveas" ).val() ),
						jsonValidation: $.trim( $( '#workflow' ).val() ),
						xmlDefinition: $.trim( $( '#structure' ).val() )}

					DBBridge.updateData( database[FORMS].name, data, function(){  
						console.log( "Bridge updated" );
					});
				}, 
		        null,
		        null
		        );

				
				
				/*$.post(	"../formbuilder/" + url, { 	  
					formId: FormBuilderState.formModel.getFormObject().getFormUniqueId(),
					entityName: $.trim( $( ".save-label" ).text() ),
					form: $.trim( $( '#structure' ).val() ),
					validation: $.trim( $( '#workflow' ).val() ),
					triggeredBy: FormBuilderState.formModel.getFormObject().getFormTriggeredBy()},
					function( data ){
						$( '#configurationDialog' ).dialog( "destroy" );
					});*/
			}
		//});
	};
}



