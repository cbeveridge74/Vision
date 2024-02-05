function MacroConfiguration(){
	
	FormBuilderState.configurationScreenInstance.getFieldModelFieldIds = function(){
		return FormBuilderState.fieldModel.getFieldIds( true );
	};
	
	var superConfigurationScreenInstance = FormBuilderState.configurationScreenInstance.initialiseExistingConfigurationForComponent;
	FormBuilderState.configurationScreenInstance.initialiseExistingConfigurationForComponent = function(){
			superConfigurationScreenInstance.call( this );
	};
	
	var superBuildUniqueNameObjects = FormBuilderState.configurationScreenInstance.buildUniqueNameObjects;
	FormBuilderState.configurationScreenInstance.buildUniqueNameObjects = function( includeFormFragmentNames ){
		if( includeFormFragmentNames == null || includeFormFragmentNames == true ){
			return superBuildUniqueNameObjects.call( this );
		} else {
			var fieldUniqueNamesSelectObjects = new Array();
			var fieldIds = FormBuilderState.configurationScreenInstance.getFieldModelFieldIds();
			$.each( fieldIds, function( index, element ){
				if( FormBuilderState.fieldModel.retrieveField( element ).getSettings() != null &&
						FormBuilderState.fieldModel.retrieveField( element ).getSettings().formfragment == null ){
					fieldUniqueNamesSelectObjects.push( { name: "numeric", 
						id: "#" + FormBuilderState.fieldModel.retrieveField( element ).getSettings().fieldid, 
						value: "#" + FormBuilderState.fieldModel.retrieveField( element ).getSettings().fieldid } );
				} 
			});
			return fieldUniqueNamesSelectObjects;
		}
	};
	
	var superGetFieldNames = FormBuilderState.configurationScreenInstance.getFieldNames;
	FormBuilderState.configurationScreenInstance.getFieldNames = function(){
		return FormBuilderState.configurationScreenInstance.buildUniqueNameObjects.call( this, false );
	};
	
	
}

