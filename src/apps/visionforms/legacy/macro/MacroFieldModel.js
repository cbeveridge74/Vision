function MacroFieldModel(){
	
	var self = this;
	
	var superGetFieldIds = FormBuilderState.fieldModel.getFieldIds;
	FormBuilderState.fieldModel.getFieldIds = function( includeImportedFields, includeOtherFields, forCurrentlySelectedFieldOnly ){
		if( includeOtherFields == null ){
			includeOtherFields = true;
		}
		if( includeImportedFields == null ){
			includeImportedFields = false;
		}
		if( forCurrentlySelectedFieldOnly == null ){
			forCurrentlySelectedFieldOnly = false;
		}
		if( includeImportedFields && includeOtherFields ){
			return superGetFieldIds.call( this );
		}else if( !includeImportedFields && includeOtherFields ){
			var fieldIdsWithoutImportedFields = new Array();
			var fieldIds = superGetFieldIds.call( this );
			$.each( fieldIds, function( index, fieldId ){		
				if( FormBuilderState.fieldModel.retrieveField( fieldId ).importedFormName == null ){
					fieldIdsWithoutImportedFields.push( fieldId );
				}
			});
			return fieldIdsWithoutImportedFields;
		}else if( includeImportedFields && !includeOtherFields ){
			var fieldIdsImportedOnly = new Array();
			var fieldIds = superGetFieldIds.call( this );
			$.each( fieldIds, function( index, fieldId ){		
				if( forCurrentlySelectedFieldOnly == true &&
					FormBuilderState.fieldModel.retrieveField( fieldId ).importedFormName != null &&
					FormBuilderState.fieldModel.retrieveField( fieldId ).importedFormName 
				== 	FormBuilderState.fieldModel.retrieveField( FormBuilderState.fieldModel.getCurrentFieldId() ).getSettings().formfragment ){
					fieldIdsImportedOnly.push( fieldId );
				}else if( forCurrentlySelectedFieldOnly == false && FormBuilderState.fieldModel.retrieveField( fieldId ).importedFormName != null ){
					fieldIdsImportedOnly.push( fieldId );
				}
			});
			return fieldIdsImportedOnly;
		}
		return null;
	};
	
}