function MacroFormFragmentComponentSettings(){
	
	var FORM_STRUCTURE_ELEMENT = 0;
	var TRIGGERED_BY_ELEMENT = 2;
	var UNIQUE_ID_ELEMENT = 4;
	var importedFieldsInitialised = false;
	var settings = new GenericComponentSettings();
	
	this.initialise = function(){
		// Making a synchronous call here as there were timing issues otherwise...
		$.ajax(  { url: '../formbuilder/getformnames', success: handleFormNamesRetrieved, async: false } );
		initialiseImportedFields();
		$( "#" + MacroFormBuilderState.FORM_FRAGMENT ).append( "<div class='form-item advanced-settings'><div class='settings-label'>Validation</div>" + settings.createAdvancedButton() + "</div>" );
	};
	
	var initialiseImportedFields = function(){
		if( importedFieldsInitialised == false ){
			var fieldIds = FormBuilderState.fieldModel.getFieldIds();
			$.each( fieldIds, function( index, fieldId ){		
				if( FormBuilderState.fieldModel.retrieveField( fieldId ).getType() == "formfragment"
					&& FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings() != null
					&& ( FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().importfieldnames == true 
							|| FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().importfieldnames == "on" ) ){
					addImportedFieldsForForm( FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().formfragment );
				}
			});
			importedFieldsInitialised = true;
		}
	};
	
	var handleFormNamesRetrieved = function( data ){
		var select = '<select id="formfragment">';
		$.each( data, function( index, element ){
			select += "<option value='" + element.id + "'>" + element.id + "</option>";
		});
		select += "</select>";
		$( "#" + MacroFormBuilderState.FORM_FRAGMENT ).html( 
			$( settings.createUniqueName() + "<div class='form-item'><div class='settings-label'>Form</div>" + select + "&nbsp;&nbsp;&nbsp;" + createImportUniqueNames() + "</div>" ) 
		);
		
		$( "#settingsSaveButton, #settingsApplyButton" ).click( manageImportedFieldNames );
		$( "#importfieldnames" ).click( handleImportedFieldNamesClick );
		
	};
	
	var handleImportedFieldNamesClick = function(){
		var checkbox = $( '#importfieldnames' );
		if( checkbox.filter( ':checked' ).length > 0 ){
			$( '.advanced-settings' ).show();
		}else{
			$( '.advanced-settings' ).hide();
		}
		
	};
	
	var createImportUniqueNames = function(){
		return  "<input id='importfieldnames' type='checkbox'></input>import field names";
	};
	
	var manageImportedFieldNames = function( event ){
		if( !$( '#formfragment').hasClass( 'ui-tabs-hide' ) ){
			var checkbox = $( '#importfieldnames' );
			var formName = $( '#formfragment option:selected' ).val();
			removeImportFieldsForForm( formName );
			if( checkbox.filter( ':checked' ).length > 0 ){
				if( formName ){
					addImportedFieldsForForm( formName );
				}
			}
		}
	};
	
	var addImportedFieldsForForm = function( formName ){
		$.ajax(  { url: '../formbuilder/getform/' + formName, success: handleFormRetrieved( formName ), async: false } );
	};
	
	var removeImportFieldsForForm = function( formName ){
		var fieldIds = FormBuilderState.fieldModel.getFieldIds( true );
		$.each( fieldIds, function( index, fieldId ){		
			if( FormBuilderState.fieldModel.retrieveField( fieldId ).importedFormName != null && 
				FormBuilderState.fieldModel.retrieveField( fieldId ).importedFormName == formName ){
				FormBuilderState.fieldModel.removeField( fieldId );
				$( '#' + fieldId ).remove();
			}
		});
	};
	
	var handleFormRetrieved = function( formName ){
			return function( data ){ 
				$.each( data, function( index, element ){
					data[ index ] = $('<div />').html( JSON.stringify( element ) ).text();
				});
				var formStructure = XMLUtil.XMLifyFormStructure( data[ FORM_STRUCTURE_ELEMENT ] );
				var rows = XMLUtil.findRows( formStructure ); 
				$.each( rows, function( index, element ){
					createImportedComponents( FormBuilderState.existingFormsInstance.createConfigurationObject( 'left', element ), formName );
					createImportedComponents( FormBuilderState.existingFormsInstance.createConfigurationObject( 'right', element ), formName );
				});
				
		};
	};
	
	var createImportedComponents = function( configObjects, formName ){
		
		var isAlreadyAddedToModel = false;
		$.each( configObjects, function( index, configObject ){
			
			if( configObject.type == "formfragmentcomponent" ){
				return false;
			}
			var fieldIds = FormBuilderState.fieldModel.getFieldIds( true, false, false );
			$.each( fieldIds, function( index, fieldId ){		
				if( configObject.settings.fieldid != null && 
					FormBuilderState.fieldModel.retrieveField( fieldId ) != null &&
					FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings() != null &&
					( FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().fieldid ==
					configObject.settings.fieldid ) ){
					isAlreadyAddedToModel = true;
					return false;
				}
			});
			if( !isAlreadyAddedToModel ){
				configObject.workflow = null;
				FormBuilderState.mainScreenInstance.createRowComponent( [ configObject ], null, formName );
			}
		});
	};
}