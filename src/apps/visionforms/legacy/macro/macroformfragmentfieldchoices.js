function MacroFormFragmentFieldChoicesEvent(){};

MacroFormFragmentFieldChoicesEvent.MACRO_FORM_FRAGMENT_FIELD_SELECTED = "MACRO_FORM_FRAGMENT_FIELD_SELECTED";
MacroFormFragmentFieldChoicesEvent.MACRO_FORM_FRAGMENT_FIELD_CANCELLED = "MACRO_FORM_FRAGMENT_FIELD_CANCELLED";

function MacroFormFragmentFieldChoices(){
	
	var importedFieldIds;
	var self = this;
	
	this.initialise = function(){
		
		importedFieldIds = FormBuilderState.fieldModel.getFieldIds( true, false, true );
		$( '#macroFormFragmentFieldChoices' ).append(  
				"<OPTION value=''></OPTION>"
			);
		$.each( importedFieldIds, function( index, element ){
			var field = FormBuilderState.fieldModel.retrieveField( element );
			if( field != null && field.getSettings() != null ){
				$( '#macroFormFragmentFieldChoices' ).append(  
					"<OPTION value='" + field.getSettings().fieldid + "'>" + field.getSettings().fieldid + "</OPTION>"
				);
			}
		});
		
		$( '#macroFormFragmentFieldChoices' ).change( handleSelectChange );
		$( '#macroFormFragmentFieldChoicesCancel' ).click( handleCancelClick );
		$( '#macroFormFragmentFieldChoicesOK' ).click( handleOKClick );
		disabledOKButton( true );
	};
	
	var handleCancelClick = function(){
		$( '#macroFormFragmentFieldChoicesCancel' ).unbind( 'click' );
		$('#configurationDialog').dialog('close');
		$('#configurationDialog').dialog('destroy');
		$( self ).trigger( MacroFormFragmentFieldChoicesEvent.MACRO_FORM_FRAGMENT_FIELD_CANCELLED );
	};
	
	var handleOKClick = function(){
		$( '#macroFormFragmentFieldChoicesOK' ).unbind( 'click' );
		var selectedFieldValue = $( '#macroFormFragmentFieldChoices' ).children( ':selected' ).val();
		var fieldIds = FormBuilderState.fieldModel.getFieldIds( true, false );
		$.each( fieldIds, function( index, element ){
			var field = FormBuilderState.fieldModel.retrieveField( element );
			if( field != null && field.getSettings().fieldid == selectedFieldValue ){
				FormBuilderState.fieldModel.setCurrentFieldId( element );
				return false;
			}
		});
		$('#configurationDialog').dialog('close');
		$('#configurationDialog').dialog('destroy');
		$( self ).trigger( MacroFormFragmentFieldChoicesEvent.MACRO_FORM_FRAGMENT_FIELD_SELECTED );
	};
	
	var handleSelectChange = function(){
		var choice = $( '#macroFormFragmentFieldChoices' ).children( ':selected' ).val();
		if( choice != null && choice.length > 0 ){
			disabledOKButton( false );
		}else{
			disabledOKButton( true );
		}
	};
	
	var disabledOKButton = function( disable ){
		if( disable ){
			$( '#macroFormFragmentFieldChoicesOK' ).attr( "disabled", "disabled" );
		}else{
			$( '#macroFormFragmentFieldChoicesOK' ).attr( "disabled", "" );
		}
	};
}



