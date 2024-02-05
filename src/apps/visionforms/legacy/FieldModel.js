function FieldModel(){
	
	var self = this;
	var fields;
	var currentFieldId;
	
	self.addField = function( id, field ){
		$( field ).bind( FieldObjectEvent.INTERNAL_UPDATE, manageEntityData );
		getFields()[ id ] = field;
	};
	
	self.removeField = function( id ){
		var field = getFields()[ id ];
		if( field ){
			$( field ).unbind( FieldObjectEvent.INTERNAL_UPDATE, manageEntityData );
			delete getFields()[ id ];
		}
	};
	
	self.retrieveField = function( value ){
		return getFields()[ value ];	
	};
	
	self.getCurrentFieldId = function(){
		return currentFieldId;
	};
	
	self.setCurrentFieldId = function( value ){
		currentFieldId = value;
	};
	
	self.getFieldIds = function(){
		var fieldIds = new Array();
		var fields = getFields();
		$.each( fields, function( index, element ){
			fieldIds.push( index );
		});
		return fieldIds;
	};
	
	var getFields = function(){
		if( fields == null ){
			fields = new Object();
		}
		return fields;
	};
	
	/**
	 * Need to manage the entity attribute and the 'saveas' property.  The relationship between an
	 * entity attribute and a field is 1 to 1.
	 */
	var manageEntityData = function( event, settings ){
		fieldId = settings.fieldid;
		fieldSaveAs = settings.saveas;
		fieldEntityName = settings.entityname;
		
		var fieldIds = self.getFieldIds();
		$.each( fieldIds, function( index, fieldIdElement ){
			var loopFieldSettings = self.retrieveField( fieldIdElement ).getSettings();
			if( loopFieldSettings.fieldid != fieldId ){
				if( loopFieldSettings.entityname == fieldEntityName &&
					loopFieldSettings.saveas == fieldSaveAs	){
					loopFieldSettings.saveas = '';
				}
			}
		});
	};
	
}