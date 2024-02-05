function MacroMainScreen(){
	
	var self = this;
	var superInitialiseMainscreen = FormBuilderState.mainScreenInstance.initialiseMainscreen; 
	
	FormBuilderState.mainScreenInstance.initialiseMainscreen = function(){
		$( '#widgets' ).append( '<div class="formcomponent ' + MacroFormBuilderState.SCREEN_BREAK + 'component"><!-- REQUIRED --></div>' +
									'<div class="formcomponent ' + MacroFormBuilderState.SCREEN_SECTION + 'component"><!-- REQUIRED --></div>' +
									'<div class="formcomponent ' + MacroFormBuilderState.FORM_FRAGMENT + 'component"><!-- REQUIRED --></div>' +
									'<div class="formcomponent ' + MacroFormBuilderState.QUESTIONNAIRE + 'component"><!-- REQUIRED --></div>');
		superInitialiseMainscreen.call( this );
		$( '.whole-screen' ).selectable({
			filter: ".componentwrapper",
			delay: 100
		});
		
		// Set the opacity because when dragging a section user can't really see what's happening.
		// Timeout used since it wasn't working without.
		//setTimeout( function(){ 
			//FormBuilderState.mainScreenInstance.initialiseSortable();
		//}, 100 );
		
	};
	
//	var initialiseSortable = function(){
//		$( ".components" ).unbind( "sortbeforestop", handleSortBeforeStop );
//		$( ".components" ).sortable( "option", "opacity", 0.3 ); 
//		$( ".components" ).sortable( "option", "forcePlaceholderSize", true );
//		$( ".components" ).sortable( "option", "axis", "y" );
//		$( ".components" ).sortable( "option", "helper", createHelper);
//	};
	
	var superGetFieldToBeExposed = FormBuilderState.mainScreenInstance.getFieldToBeExposed;
	FormBuilderState.mainScreenInstance.getFieldToBeExposed = function( fieldId ){
		var hashField = superGetFieldToBeExposed.call( this, fieldId );
		if( $( hashField ).is( ':not( :visible )' ) ){
			var field = FormBuilderState.fieldModel.retrieveField( fieldId );
			if( field != null 
			 && field.getSettings() != null
			 && field.getSettings().formname != null){
				var fieldIds = FormBuilderState.mainScreenInstance.getFieldModelFieldIds();
				$.each( fieldIds, function( index, element ){
					if( FormBuilderState.fieldModel.retrieveField( element ).getSettings().formfragment == field.getSettings().formname ){
						hashField = "#" + element;
						return false;
					}
				});
			}
		}
		return hashField;
	};
	
	FormBuilderState.mainScreenInstance.getFieldModelFieldIds = function(){
		return FormBuilderState.fieldModel.getFieldIds( true, true );
	};
	
	this.updateSectionNames = function(){
		var sections = $( ".section-container" );
		$.each( sections, function( index, element ){
			var spacer = $( element ).find( '.section-spacer' );
			spacer.text( FormBuilderState.fieldModel.retrieveField( $( element ).attr( 'id' ) ).getSettings().sectiontitle );
		});
	};
	
	
	
	this.handleDeleteSectionButtonClick = function( event ){
		if( confirm( 'Are you sure you wish to delete this section and all of its child components?' ) ){
			$( event.currentTarget ).closest( '.section-container' ).remove();
		}
	};
	
	this.createSection = function( settings, workflow ){
		var section = $( "<div id='component" + FormBuilderState.mainScreenInstance.counter + "' class='section-container'>" +
				"<div class='sectionDockContainer'></div>" +
				"<div class='form-part component-buttons section-buttons'>" +
					"<div class='settings-image' " +
					"onclick='FormBuilderState.mainScreenInstance.handleSettingsComponentButtonClick( event, \"" + MacroFormBuilderState.SCREEN_SECTION + "\"," +
																								  " \"component" + FormBuilderState.mainScreenInstance.counter + "\" );'></div>" +
					"<div class='delete-image' onclick='FormBuilderState.macroMainScreenInstance.handleDeleteSectionButtonClick( event );'></div>" +
				"</div></div>" );
		
		section.find( '.sectionDockContainer' ).removeClass( 'sectionDockContainer' ).addClass( 'section-spacer' );
		
		var listener = new Object();
		listener.eventName = FieldObjectEvent.SETTINGS_UPDATED;
		listener.callback = function( event, settings ){
			self.updateSectionNames();
		};
		FormBuilderState.mainScreenInstance.createFieldObject( 	MacroFormBuilderState.SCREEN_SECTION, 
																settings, 
																workflow, 
																FormBuilderState.mainScreenInstance.counter++,
																listener
																);
		return section;
	};
	
	FormBuilderState.mainScreenInstance.createFieldNameList = function(){
		var fieldObjectsIds = FormBuilderState.configurationScreenInstance.buildUniqueNameObjects();
		
		fieldObjectsIds = removeUnwantedElements( fieldObjectsIds );
		
		var fieldNameSelectString = ":;";
		$.each( fieldObjectsIds, function (count, fieldObjectsIdElement ) {
			fieldNameSelectString += fieldObjectsIdElement.id + ":" + fieldObjectsIdElement.value + ";";
		});
		fieldNameSelectString = fieldNameSelectString.substring( 0, fieldNameSelectString.length - 1 );
		return fieldNameSelectString;
	};
	
	var removeUnwantedElements = function( fieldObjectsIds ){
		var fieldIds = FormBuilderState.fieldModel.getFieldIds();
		var unwantedFieldIds = new Array();
		$.each( fieldIds, function( index, fieldId ){		
			var type = FormBuilderState.fieldModel.retrieveField( fieldId ).getType();
			if( type == MacroFormBuilderState.SCREEN_BREAK || 
				type == MacroFormBuilderState.SCREEN_SECTION || 
				type == MacroFormBuilderState.FORM_FRAGMENT){
				unwantedFieldIds.push( "#" + FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().fieldid );
			}
		});
		
		var wantedElements = $.grep( fieldObjectsIds, function( element, index ){
			var isWanted = false;
			$.each( unwantedFieldIds, function( unwantedIndex, unwantedElement ){
				if( element.id != unwantedElement ){
					isWanted = true;
				}else{
					isWanted = false;
					return false;
				}
			});
			return isWanted;
		});
		return wantedElements;
	};
	
	var superCreateFieldObject = FormBuilderState.mainScreenInstance.createFieldObject;
	FormBuilderState.mainScreenInstance.createFieldObject = function( widgetType, settings, workflow, counter, listener, importedFormName ){
		superCreateFieldObject.call( this, widgetType, settings, workflow, counter );
		if( listener != null ){
			var fieldObject = FormBuilderState.fieldModel.retrieveField( "component" + counter );
			$( fieldObject ).bind( listener.eventName, listener.callback );
		}
		if( importedFormName != null ){
			var fieldObject = FormBuilderState.fieldModel.retrieveField( "component" + counter );
			fieldObject.importedFormName = importedFormName;
		}
	};
	
	var superPopulateSettings = FormBuilderState.mainScreenInstance.populateSettings;
	FormBuilderState.mainScreenInstance.populateSettings = function( settings, widgetType ){
		superPopulateSettings.call( this, settings, widgetType );
		var inputs = $( '#' + widgetType ).find( ':input' );
		$.each( inputs, function( index, element ){
			var name = $( element ).attr( 'NAME' );
			var setting = settings[ $( element ).attr( 'NAME' ) ];
			if( setting != null ){
				if( $.isPlainObject( setting ) ){
					var valueString = "";
					$.each( setting, function( settingKey, settingValue ){
						$.each( settingValue, function( arrayIndex, arrayElement ){
							if( arrayElement.length > 0 ){
								valueString += arrayElement + "\n";
							}
						});
					});
					$( element ).val( valueString );
				} else{
					$( element ).val( settings[ $( element ).attr( 'NAME' ) ] );
				}
			}
		});
	};
	
	this.makeSectionDroppableAndSortable = function( section ){
		
		section.droppable({
			accept: ".componentwrapper",
			hoverClass: "droppable-area-hover",
			tolerance: 'pointer',
			greedy: false,
			drop: function( event, ui ){ 
				var dropComponent = $( this );
				// Timeout here since the items that are being dealt with will then be 
				// acted on by the sortable functionality in JQuery (e.g they'll move).  Need to
				// wait until the sorting has finished then do our functionlity
				setTimeout( function(){ 
					// Don't want do drop into the section if it's already there
					if( ui.draggable.parent()[ 0 ] != dropComponent[ 0 ] ){
						if( ui.helper.attr( 'id' ).indexOf( FormBuilderState.mainScreenInstance.DRAGGING_CONTAINER_HELPER_ID ) > -1  ){
							ui.helper.children().removeClass( 'ui-selected' );
							ui.helper.children().appendTo( dropComponent );
							if( $( '.ui-selected' ).length > 0 ){
								$( '.ui-selected' ).remove();
							}
						}
					}
				}, 1 );
			}
		});
		
		// Make the components sortable inside the section and link with the component list
		// outwith the section
		section.sortable({
			connectWith: ".components",
			tolerance: "pointer",
			items: ".componentwrapper",
			helper: FormBuilderState.mainScreenInstance.createHelper,
			beforeStop: FormBuilderState.mainScreenInstance.handleSortBeforeStop,
			opacity: 0.5,
			axis: "y"
		});
	};
	
	var superHandleDropZoneDrop = FormBuilderState.mainScreenInstance.handleDropZoneDrop;
	FormBuilderState.mainScreenInstance.handleDropZoneDrop = function(  event, ui  ){
		
		
		// If we're dealing with a screen section then set it up
		if( ui.draggable.prop( 'outerHTML' ).indexOf( MacroFormBuilderState.SCREEN_SECTION ) > -1 ){
			//New therefore had no settings/workflow
			var section = self.createSection( "", "" );
			$( '.components' ).append( section );
			self.makeSectionDroppableAndSortable( $( "#" + section.attr( 'id' ) ) );
		}else{
			superHandleDropZoneDrop.call( this, event, ui );
		}
		
	};
	
	var superGetFieldType = FormBuilderState.mainScreenInstance.getFieldType;
	FormBuilderState.mainScreenInstance.getFieldType = function(  fieldObject  ){
		if( fieldObject.importedFormName != null ){
			return fieldObject.getType() + "fragmentfield";
		}
		return superGetFieldType.call( this, fieldObject );
	};
	
	var superCreateRowComponent = FormBuilderState.mainScreenInstance.createRowComponent;
	FormBuilderState.mainScreenInstance.createRowComponent = function( leftComponent, rightComponent, formName  ){
		var fieldIds = FormBuilderState.fieldModel.getFieldIds( true, true );
		superCreateRowComponent.call( this, leftComponent, rightComponent );
		fieldIds = FormBuilderState.fieldModel.getFieldIds( true, true );
		var mostRecentlyAddedFieldId = fieldIds[ fieldIds.length - 1 ];
		var mostRecentlyAddedField = FormBuilderState.fieldModel.retrieveField( mostRecentlyAddedFieldId );
		var settings = mostRecentlyAddedField.getSettings();

		if( formName != null ){
			mostRecentlyAddedField.importedFormName = formName;
			if( settings != null ){
				settings.formname = formName;
			}
			$( '#' + mostRecentlyAddedFieldId ).closest( '.componentwrapper' ).addClass( 'form-fragment-field' );
		}else if( settings != null && settings.formname != null ){
			mostRecentlyAddedField.importedFormName = settings.formname; 
			$( '#' + mostRecentlyAddedFieldId ).closest( '.componentwrapper' ).addClass( 'form-fragment-field' );
		}
	};
	
	
	var superGetComponentContainer = FormBuilderState.mainScreenInstance.getComponentContainer;
	FormBuilderState.mainScreenInstance.getComponentContainer = function(){
		return superGetComponentContainer.call( this );
	};
	
	
	var superSetConfigurationOntoPositionObject = FormBuilderState.mainScreenInstance.setConfigurationOntoPositionObject;
	FormBuilderState.mainScreenInstance.setConfigurationOntoPositionObject = function( positionObject, componentConfiguration, element ){
		superSetConfigurationOntoPositionObject.call( this, positionObject, componentConfiguration, element );
	};
	
	
	
	var superCreateFormDefinition = FormBuilderState.mainScreenInstance.createFormDefinition;
	FormBuilderState.mainScreenInstance.createFormDefinition = function(  event, ui  ){
		var formDefinition = superCreateFormDefinition.call( this, event, ui );
		var sections = $( '.section-container' );
		var formXML = -1;
		$.each( sections, function( index, element ){
			var settings = FormBuilderState.fieldModel.retrieveField( $( element ).attr( 'id' ) ).getSettings();
			var firstComponentWrapperFieldId = $( element ).find( '.componentwrapper:first .component-label' ).attr( 'id' );
			var lastComponentWrapperFieldId = $( element ).find( '.componentwrapper:last .component-label' ).attr( 'id' );
			if( formXML == -1 ){
				formXML = $.parseXML( formDefinition.structure );// Could use simple $() now that there is no reliance on
																 // case sensitivity (I *was* using camelCase attributes in XML)
			}
			var xmlRows = $( formXML ).find( 'row' );
			$.each( xmlRows, function( xmlRowIndex, xmlRowElement ){
				var fieldIds = $( xmlRowElement ).find( 'fieldid' );
				$.each( fieldIds, function( fieldIdIndex, fieldIdElement ){
					var firstFieldSettings = FormBuilderState.fieldModel.retrieveField( firstComponentWrapperFieldId ).getSettings();
					var lastFieldSettings = FormBuilderState.fieldModel.retrieveField( lastComponentWrapperFieldId ).getSettings();
					if( firstFieldSettings != null && 
						$( fieldIdElement ).text() == firstFieldSettings.fieldid ){
						settings = json2xml( settings, "" );
						$( xmlRowElement ).before( "@@first@@" );
						if( settings.length > 0 ){
							settings = $( "<settings>" + settings + "</settings>" );
							$( xmlRowElement ).before( settings );
						}
					}
					if( lastFieldSettings != null &&
						$( fieldIdElement ).text() == lastFieldSettings.fieldid ){
						$( xmlRowElement ).after( "@@last@@" );
						return false;
					}
				});
			});
		});
		if( formXML != -1 ){
			
			var XMLString = (new XMLSerializer()).serializeToString( formXML );
			XMLString = XMLString.replace( /@@first@@/g, "<section>" );
			XMLString = XMLString.replace( /@@last@@/g, "</section>" );
			XMLString = XMLString.replace( /\sxmlns[^"]+"[^"]+"/g, "" ); //Remove unwanted xmlns attributes
			
			formDefinition.structure = XMLString; //;
		}
		// Above won't work in IE use...
		/*
		 if (window.ActiveXObject) {
		    var str = t.xml;
		 }
		 */
		return formDefinition;
	};
}