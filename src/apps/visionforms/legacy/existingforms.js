function ExistingForms(){
	
	var self = this;
	var FORM_STRUCTURE_ELEMENT = 0;
	var TRIGGERED_BY_ELEMENT = 2;
	var UNIQUE_ID_ELEMENT = 4;
	this.formStructure;
	
	this.initialiseExistingFormsGrid = function(){
		$.get( '../formbuilder/getformnames', loadFormNames );
	};

	this.editItem = function( event ){
		var itemName = $( event.currentTarget ).parent().attr( 'name' );
		$( '#configurationDialog' ).dialog( "destroy" );
		$.get( '../formbuilder/getform/' + itemName, showForm );
	};
	
	this.deleteItem = function( event ){
		var itemName = $( event.currentTarget ).parent().attr( 'name' );
		if( confirm( 'Are you sure you wish to delete the form "' + itemName + '"?' ) ){
			$.post( '../formbuilder/deleteform', { formId: itemName }, handleDeleteSuccess );
		}
	};
	
	this.recreateForm = function( data ){
		//$( 'body' ).html( data );
		//$( '#entitySearch_searchField' ).val( FormBuilderState.entityModel.getEntity().getName() );

		var rows = XMLUtil.findRows( $( $.parseXML( self.formStructure ) ) );
		$.each( rows, function( index, element ){
			self.createRowComponent( self.createConfigurationObject( 'left', element ), self.createConfigurationObject( 'right', element ) );
		});
	};
	
	this.createRowComponent = function( configurationComponentLeft, configurationComponentRight ){
		FormBuilderState.mainScreenInstance.createRowComponent( configurationComponentLeft, configurationComponentRight );
	};
	
	var loadFormNames = function( data, status ){
		$( '#existingForms' ).empty();
		$.each( data, function( index, element ){
			var li = $('<li></li>');
			li.append( 	"<div name='" + element.id +"'>" +
							"<div class='element'>" + element.id + "</div>" +
							"<input type='button' value='Edit' onclick='FormBuilderState.existingFormsInstance.editItem( event );'></input>" +
							"<input type='button' value='Delete' onclick='FormBuilderState.existingFormsInstance.deleteItem( event );'></input>" +
						"</div>" );
			$( '#existingForms' ).append( li );
		} );
	};

	var showForm = function( data, status ){
		
		FormBuilderState.formModel.getFormObject().setFormTriggeredBy( data[ TRIGGERED_BY_ELEMENT ] );
		FormBuilderState.formModel.getFormObject().setFormUniqueId( data[ UNIQUE_ID_ELEMENT ] );
		$.each( data, function( index, element ){
			data[ index ] = $('<div />').html( JSON.stringify( element ) ).text();
		});
		self.formStructure = XMLUtil.XMLifyFormStructure( data[ FORM_STRUCTURE_ELEMENT ] );
		FormBuilderState.formModel.getFormObject().setFormTitle( XMLUtil.findFormTitle( self.formStructure ) );
		FormBuilderState.entityModel.getEntity().setName(  XMLUtil.findEntityName( self.formStructure ) );
		FormBuilderState.entityModel.getEntity().setId( XMLUtil.findFormId( self.formStructure ) );
		
		$.get( '../formbuilder/formbuilder', self.recreateForm );
	};
	
	this.createSettingsObjectForElement= function( element ){
		var settings = new Object();
		$.each( element.children( 'settings' ).children(), function( key, value ){
			settings[ value.nodeName ] = $( value ).text();
		});
		return settings;
	};
	
	this.createConfigurationObject = function( laterality, element ){
		var components = new Array();
		$.each( $( element ).find( laterality ), function( lateralityIndex, lateralityElement  ){
			var componentObject = new Object();
			componentObject.type = ComponentUtil.convertTypeToClassName ( $( lateralityElement ).find( 'type' ).text() );
			componentObject.settings = self.createSettingsObjectForElement( $( lateralityElement ) );
			componentObject.workflow = "";
			$.each( $( lateralityElement ).find( 'workflow' ), function( key, value ){
				var json = $.xml2json( value );
				convertElementToArray( json, "rules" );
				convertElementToArray( json, "tru" );
				convertElementToArray( json, "fal" );
				componentObject.workflow += JSON.stringify( json ) + ",";
			});
			if( componentObject.workflow.length > 0 ){
				componentObject.workflow = "[" + componentObject.workflow + "]"; 
			} 
			componentObject.workflow = componentObject.workflow.replace( /},]/g, "}]" );
			components.push( componentObject );
		});
		return components;
	};

	/** When we are converting from XML to JSON the converter is intelligently 
	 * deciding which elements should be arrays and which shouldn't.  Unfortunately, the form engine
	 * is always expecting arrays for certain fields, whether there be only one element or multiple */
	var convertElementToArray = function( json, elementName ){
		for ( var key in json ) {
			if( key == elementName ){
				if( Object.prototype.toString.call( json[ key ] ) != '[object Array]' ){
					json[ key ] = [ json[ key ] ];
				}
				convertElementToArray( json[ key ][0], elementName );
			}
			if( Object.prototype.toString.call( json[ key ] ) == '[object Array]' ){
				$.each( json[ key ], function( index, element ){
					convertElementToArray( element, elementName );
				});
			}else if( Object.prototype.toString.call( json[ key ] ) == '[object Object]' ){
				convertElementToArray( json[ key ], elementName );
			}
		}
		return;
	};

	var handleDeleteSuccess = function(){
		self.initialiseExistingFormsGrid();
	};
}

