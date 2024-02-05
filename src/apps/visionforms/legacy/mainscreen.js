function MainScreen(){
	
	var self = this;
	var TYPE_ELEMENT = 0;
	var SETTINGS_ELEMENT = 1;
	var WORKFLOW_ELEMENT = 2;
	var attributeGrid;
	var CHECKBOX_COLUMN_INDEX  = 0;
	var ATTRIBUTE_COLUMN_INDEX  = 1;
	var FIELD_COLUMN_INDEX  = 2;
	this.DRAGGING_CONTAINER_HELPER_ID = "draggingContainer";
	this.counter = 0;


	$( document ).ready( function(){
		setTimeout( function(){
			FormBuilderState.mainScreenInstance.initialiseMainscreen();
		}, 3000 );
		
	});
	
	
	this.initialiseMainscreen = function () {
		$( FormBuilderState.componentClassNames ).draggable({
			 revert: 'invalid',
			 helper: 'clone'}
		);
		
		$( ".componentdock" ).droppable({
			accept: FormBuilderState.componentClassNames,
			hoverClass: "droppable-area-hover",
			tolerance: 'pointer',
			drop: self.handleDropZoneDrop
		});
		
		$( ".sidesection .tab-container" ).tabs();
		$( "#mainSaveButton" ).click( self.saveFormDefinition );

		
		// Forcing the button in the entity search component to be what I want
		// should really update the component itself to make in configurable
		setTimeout( function(){
			$( '#searchButtonentitySearch' ).button( "option", "icons", {primary:'inps_class_search_dropdown_icon'} );
		}, 500 );
		
		setUpGrid();
		
		$( '#formtitle' ).blur( handleFormTitleBlur );
		$( FormBuilderState.formModel.getFormObject() ).bind( FormObjectEvent.TITLE_UPDATE, updateTitle );
		updateTitle();
	};
	
	var updateTitle = function(){
		$( '#formtitle' ).val( FormBuilderState.formModel.getFormObject().getFormTitle() );
	};
	
	var handleFormTitleBlur = function( event ){
		FormBuilderState.formModel.getFormObject().setFormTitle( $( event.currentTarget ).val() );
	};
	
	this.entitySearchService = function( request, response, failureHandler ) {
		
		var thisFailureHandler = function(){ 
			if( failureHandler != null ){
				failureHandler();
			}
			searchFailure();
		};
		
		var fieldIds = self.getFieldModelFieldIds();
		var entitiesCurrentlyChosen = new Array();
		var tempObject = Object();
		
		$.each( fieldIds, function( index, fieldId ){
			if( FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings() != null ){
				var entityName = FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().entityname;
				var entityId = FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().entityid;
				var entityShortName = FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().entityshortname;
				var saveAs = FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().saveas;
			}
			
			if( entityName != null 
			 && entityName.length > 0 
			 && saveAs != null 
			 && saveAs.length > 0
			 && entityId != null
			 && entityShortName != null 
			 && entityShortName.length > 0 ){
				var obj = new Object();
				obj.entityName = entityName;
				obj.entityShortName = entityShortName;
				tempObject[ entityId ] = obj;// Simple way to avoid duplication
			}
		});
		
		$.each( tempObject, function( key, value ){
			entitiesCurrentlyChosen.push( { label: value.entityName, value: value.entityName, shortName: value.entityShortName, id: key, param: 'choice' } );
		});
		
		entitiesCurrentlyChosen = entitiesCurrentlyChosen.sort().reverse();
		
		AjaxHandler.ajax({
			         url: "../formbuilder/getentities",
					 dataType: "json",
			         delay: 1,
			         data: {
			         	// Only need s here
			             searchText: request.term                    
			         },
			         success: function(data) {
		        		
			        	 var entityOptions = $.map( data, function( item ) {
								        			return {
														label: item.description,
														value: item.description,
														id: item.id,
														shortName: item.name
								        			};
								        	 });
			        	 response( $.merge( entitiesCurrentlyChosen, entityOptions ) );
			         },
			        failure: thisFailureHandler
			  });
	};
	
	/**
	 * Global function that renders any read code search with the read code first, then the term.
	 * This was a late change brought in when it was realised that there are duplicate
	 * read term descriptions.
	 * @param ul The list to which items should be added
	 * @param item The item object containing all the relevant data.
	 * @returns String that is appended to the list.
	 */
	this.renderEntityResult = function( ul, item ) {
		
		var value = item.param;
		var labelClass = "";
		
		if( value != null && value == "choice"  ){
			labelClass = "entity-user-choices";
		}else{
			labelClass = "entity-choices";
		}
		
		return $( '<li></li>' )
			.data( 'item.autocomplete', item )
			.append( '<a><span class="' + labelClass + '">' + item.label + '</span></a>' )
			.appendTo( ul );
	};
	
	
	var setUpGrid = function (){
		attributeGrid = $( '#attributeListTableMapping' ).jqGrid({
			afterSaveCell: handleAfterSaveCell,
			altclass:'oddrow',
			altRows:true,
			cellurl: "nothing",
			cellEdit: true,
			cellsubmit: 'clientArray',
			colNames:['Attribute','Field'],
			colModel:[
			          {name:'shortName',editable:false, width:120},
			          {name:'fieldName', 
			        	  editable:true, 
			        	  edittype:'select',
			        	  formatter:'select', 
			        	  width:180 }
			          ],
			datatype: "local",
			height: "700",
			multiselect: true,
			onCellSelect: exposeFields,
			onSelectAll: handleOnSelectAll,
			scroll: true
		});
		$( FormBuilderState.entityModel.getEntity() ).bind( EntityObjectEvent.ENTITY_ATTRIBUTES_UPDATED, handleEntityAttributesUpdated );
	};
	
	var handleOnSelectAll = function( aRowids, status ){
		exposeFields();
	};
	
	/**
	 * Expsoes the fields that are selected in the entity grid
	 * @param rowid
	 * @param iCol
	 * @param cellcontent
	 * @param e
	 * @returns
	 */
	var exposeFields = function( rowid, iCol, cellcontent, e ){
		$.mask.close();
		var fieldsToBeExposed = "";
		
		var fieldIds = self.getFieldModelFieldIds();
		var selectedRows = jQuery("#attributeListTableMapping").getGridParam('selarrrow');
		$.each( fieldIds, function( index, fieldId ){			
			if( FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().entityid ==
				FormBuilderState.entityModel.getEntity().getId() ){
				$.each( selectedRows, function( selectedRowIndex, selectedRow ){
					if( FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().saveas ==
						$("#attributeListTableMapping").jqGrid( 'getCell', selectedRow, 'shortName' ) ){
						fieldsToBeExposed += self.getFieldToBeExposed( fieldId ) + ",";
					}
				});
			}
		});
		
		fieldsToBeExposed = fieldsToBeExposed.substring( 0, fieldsToBeExposed.length - 1 );
		
		if( fieldsToBeExposed.length > 0 ){
			$( fieldsToBeExposed ).closest( '.component-screen-part' ).expose({
				maskId: 'divMask',
				color: "#AAAAAA",
				loadSpeed: 0,
				closeSpeed: 0,
				onLoad: function(){ 
					$( '#divMask' ).css( {
						'width' : '110%'
					});
				},
				zIndex: 9000
			});
			$( '#divMask' ).click( handleDivMaskClick );
		}
	};
	
	this.getFieldToBeExposed = function( fieldId ){
		return "#" + fieldId;
	};
	
	var handleDivMaskClick = function(){
		$( '#divMask' ).unbind( 'click', handleDivMaskClick );
		$("#attributeListTableMapping").jqGrid( 'resetSelection' );
	};
	
	var handleAfterSaveCell = function( rowid, cellname, value, iRow, iCol ){
		var fieldIds = self.getFieldModelFieldIds();
		var rowIds = $("#attributeListTableMapping").jqGrid('getDataIDs');
		
		$.each( rowIds, function( index, rowId ){
			if( $("#attributeListTableMapping").jqGrid( 'getCell', rowId, 'fieldName' ) == value &&
				rowId != ( iRow - 1 ) ){
				$("#attributeListTableMapping").jqGrid( 'setCell', rowId, 'fieldName', null );
				return false;
			}
		});
		$.each( fieldIds, function( index, fieldId ){			
			if( FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().fieldid == value.substring( 1, value.length ) ){
				FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().saveas = $("#attributeListTableMapping").jqGrid( 'getCell', rowid, 'shortName' );
				FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().entityname = FormBuilderState.entityModel.getEntity().getName();
				FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().entityid = FormBuilderState.entityModel.getEntity().getId();
			}else if( FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().saveas == $("#attributeListTableMapping").jqGrid( 'getCell', rowid, 'shortName' ) ){
				FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().saveas = "";
			}
		});
	};
	
	var handleEntityAttributesUpdated = function( event, attributes ){
		populateGrid( attributes );
		populateFieldNames();
		mapFieldNamesToAttributes();
	};
	
	var mapFieldNamesToAttributes = function(){
		var rowIds = $("#attributeListTableMapping").jqGrid('getDataIDs');
		$.each( rowIds, function ( i, row ) {
			$("#attributeListTableMapping").jqGrid( 'setCell', row, 'fieldName', null, null, null, true );
		});
		
		var fieldIds = self.getFieldModelFieldIds();
		$.each( rowIds, function ( i, row ) {
			$.each( fieldIds, function( index, fieldId ){			
				if( FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().entityid !=
					FormBuilderState.entityModel.getEntity().getId() ){
				}else if( FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().saveas ==
					$("#attributeListTableMapping").jqGrid( 'getCell', row, 'shortName' ) ){
					$("#attributeListTableMapping").jqGrid( 'setCell', row, 'fieldName', 
							'#' + FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings().fieldid, null, null, true );
				}
			});
		});
	};
	
	var populateGrid = function( attributes ){
		$("#attributeListTableMapping").jqGrid( 'clearGridData' );
		$.each( attributes, function( index, element ){
			$("#attributeListTableMapping").jqGrid( 'addRowData', index, element);
		});
	};
	
	var populateFieldNames = function(){
		
		var fieldNameSelectString = self.createFieldNameList();
		
		var rowIds = $("#attributeListTableMapping").jqGrid('getDataIDs');
		$.each(rowIds, function ( i, row ) {
			var cm = $("#attributeListTableMapping").jqGrid( 'getColProp', 'fieldName' );
			cm.edittype = 'select';
			cm.editoptions = { value: fieldNameSelectString,
					dataEvents: [
			      		  {
			      			  type: 'change',
			      			  fn: function( e ){
			      				// Make the select box readonly once selection is made
			      				  $("#attributeListTableMapping").jqGrid("editCell", 0, 0, false);
			      				  exposeFields();
			      			  }
			      		  }
			      		  ]};
		});
		

	};
	
	this.createFieldNameList = function(){
		
		var fieldObjectsIds = FormBuilderState.configurationScreenInstance.buildUniqueNameObjects();
		var fieldNameSelectString = ":;";
		$.each( fieldObjectsIds, function (count, fieldObjectsIdElement ) {
			fieldNameSelectString += fieldObjectsIdElement.id + ":" + fieldObjectsIdElement.value + ";";
		});
		fieldNameSelectString = fieldNameSelectString.substring( 0, fieldNameSelectString.length - 1 );
		return fieldNameSelectString;
	};
	
	
	this.handleDropZoneDrop = function( event, ui ){

		var droppable = $(this);
		var leftComponent = new Object();
		var rightComponent = new Object();
		if( !droppable.hasClass( 'right' )  ){
			leftComponent.type = ui.draggable.prop( 'outerHTML' );
		}else{
			rightComponent.type = ui.draggable.prop( 'outerHTML' );
		}
		self.createRowComponent( [ leftComponent ], [ rightComponent ] );
		
		self.initialiseSortable();
			
		//);
		
	};
	
	self.initialiseSortable = function(){
		$( ".components" ).unbind( "sortbeforestop", self.handleSortBeforeStop );
		$( ".components" ).sortable( "option", "opacity", 0.3 ); 
		$( ".components" ).sortable( "option", "forcePlaceholderSize", true );
		$( ".components" ).sortable( "option", "axis", "y" );
		$( ".components" ).sortable( "option", "helper", self.createHelper);
	};
	
	// Helper function for when dragging more than one item.  Get all the selected items
	// and put them into a container with an id of DRAGGING_CONTAINER_HELPER_ID.
	self.createHelper = function( event, element ){
		var selected = $('.ui-selected');
		if (selected.length < 1) {
		  selected = element;
		  // Need this class as it's used if dropping the component into a 'section'
		  selected.addClass( 'ui-selected' );
		}
		var container = $('<div/>').attr('id', self.DRAGGING_CONTAINER_HELPER_ID);
		container.append( selected.clone() );
		return container; 
	};
	
	// If we're dragging more than one item then we don't want to sort
	self.handleSortBeforeStop = function( event, ui ){
		if( ui.helper.attr( 'id' ).indexOf( self.DRAGGING_CONTAINER_HELPER_ID ) > -1 && ui.helper.children().length > 1 ){
			$( this ).sortable( "cancel" );
		}else{
			// Need this to happen after the drop function (which occurs only if the 
			// component is dropped into a 'section') as the drop function is referencing components
			// via .ui-selected
			setTimeout( function(){ ui.item.removeClass( "ui-selected" ); }, 10 );
		}
	};
	
	this.createRowComponent = function( leftComponent, rightComponent ){
		var appendHTML = "<div class='componentwrapper'>" +
		"<div class='component-screen-part left-component'>";
		appendHTML += createComponents( leftComponent );
		appendHTML += "</div>" +
		"<div class='component-screen-part right-component'>";
		appendHTML += createComponents( rightComponent );
		appendHTML += "</div>" +
		"<div class='component-screen-part'>" +
		"<div class='form-part component-buttons'>" +
		"<div class='settings-image' onclick='FormBuilderState.mainScreenInstance.handleSettingsFormPartButtonClick( event );'></div>" +
		"<div class='delete-image' onclick='FormBuilderState.mainScreenInstance.handleDeleteFormPartButtonClick( event );'></div>" +
		"</div>" +
		"</div>" +
		"</div>";
		self.getComponentContainer().append( 
				$( appendHTML ) );
		
		self.getComponentContainer().sortable();
		
		$( '.component-screen-part.left-component, .component-screen-part.right-component' ).droppable({
			accept: FormBuilderState.componentClassNames,
			hoverClass: "droppable-area-hover",
			tolerance: 'pointer',
			drop: function(event, ui) {
				var droppable = $(this);
				droppable.append( 
						$( self.createWidgetHTML( $(ui.draggable).prop( 'outerHTML' ) ) ) );
			}});
	};
	
	this.getComponentContainer = function(){
		return $( '.components' );
	};
	
	this.handleEntitySearchSelect = function( event, ui ) {
		if(ui.item.value && ui.item.value < 0 ) {
			// An invalid item has been selected ('No search results found').
			// Do not continue.
			return;
		}
		
		FormBuilderState.entityModel.getEntity().setName( ui.item.value );
		FormBuilderState.entityModel.getEntity().setId( ui.item.id );
		
		return false;
	};
	
	this.saveFormDefinition = function( event ){
		console.log( "Saving form" );
		var formDefinition = self.createFormDefinition();
		
		$.post(	"apps/visionforms/legacy/savedialog.html", { 	 structure: 		formDefinition.structure, 
												 workflow: 			formDefinition.workflow,
												 formEntityName: 	FormBuilderState.entityModel.getEntity().getName(),
												 formEntityId: 		FormBuilderState.entityModel.getEntity().getId(),
												 formTriggeredBy: 	FormBuilderState.formModel.getFormObject().getFormTriggeredBy(),
												 formId: 			FormBuilderState.formModel.getFormObject().getFormUniqueId()},
												function( data ){
													showDialog( data, 'Save', 1024, 500, function(){
														console.log( $( ".save-label" ) );
														$( ".save-label" ).html( FormBuilderState.entityModel.getEntity().getName() + "(" + 
													 	FormBuilderState.entityModel.getEntity().getId() + ")");
													 	$( "#saveas" ).val( FormBuilderState.formModel.getFormObject().getFormUniqueId() );
													 	$( "#triggeredby" ).val( FormBuilderState.formModel.getFormObject().getFormTriggeredBy() );
													 	$( "#structure" ).val( formDefinition.structure );
													 	$( "#workflow" ).val( formDefinition.workflow );
													 	$( "#formSaveButton" ).click( FormBuilderState.saveScreenInstance.persistForm );


													}, '#saveDialog',
													function( event, ui ){
														$( "#saveDialog" ).dialog( 'destroy' );
													} );
												});
	};
	
	this.createPreview = function(){
		var formDefinition = self.createFormDefinition();
		formDefinition.workflow = convert2Dto1DArray( formDefinition.workflow );
		$.post(	"../formbuilder/preview", { config: formDefinition.structure, validation: formDefinition.workflow },
			function( data ){
				showDialog( data, 'Preview', 1024, 768, null );
			} );
	};
	
	this.handleSettingsComponentButtonClick = function( event ){//, widgetType, componentId ){
		
		var widgetType = event.currentTarget.attributes[1].value;
		var componentId = event.currentTarget.attributes[2].value;
		FormBuilderState.fieldModel.setCurrentFieldId( componentId );
		
		$.get(	"apps/visionforms/legacy/settings.html",
				function( data ){
			showDialog( data, 'Configuration', 800, 650, function(event, ui){

				var settings = FormBuilderState.fieldModel.retrieveField( FormBuilderState.fieldModel.getCurrentFieldId() ).getSettings();
				if( settings != null ){
					setTimeout( function(){ 
						self.populateSettings( settings, widgetType ); 

					}, 2000);
				}


			}, '#settingsDialog');
		});

		setTimeout( function(){
					FormBuilderState.settingsScreenInstance.initialiseSettings();
				}, 1000 );
	};
	
	this.populateSettings = function( settings, widgetType ){
		var inputs = $( '#' + widgetType ).find( ':input' );
		$.each( inputs, function( index, element ){
			var name = $( element ).attr( 'NAME' );
			var setting = settings[ $( element ).attr( 'NAME' ) ];
			if( settings[ $( element ).attr( 'NAME' ) ] != null ){
				$( element ).val( settings[ $( element ).attr( 'NAME' ) ] );
				if( $( element ).attr( 'type' ) == 'checkbox' ){
					if( settings[ $( element ).attr( 'NAME' ) ] == 'on' ){
						$( element ).attr( 'checked', 'checked' );
					}
				}
			}
		});
	};
	
	this.handleDeleteComponentButtonClick = function( event ){

			var children = $( event.currentTarget ).closest( '.componentwrapper' ).children();
			if( ( $( children[0] ).children().length > 0 && $( children[1] ).children().length > 0 ) ){
				$( event.currentTarget ).closest( '.component-buttons' ).prev().remove();
				$( event.currentTarget ).closest( '.component-buttons' ).remove();
			}else{
				$( event.currentTarget ).closest( '.componentwrapper' ).remove();
			}
		
	};
	
	this.handleSettingsFormPartButtonClick = function(){
		alert( 'Form part settings?' );
	};
	
	this.handleDeleteFormPartButtonClick = function( event ){
		if( confirm( 'Are you sure you wish to delete this form part?' ) ){
			$( event.currentTarget ).closest( '.componentwrapper' ).remove();
		}
	};
	
	this.handleCancelMainscreen = function(){
		$.get( '../formbuilder/landingscreen', function( data ){
			$( 'body' ).html( data );
		} );
	};
	
	/**
	 * Creates a field object and puts it onto the model 
	 * @param widgetType
	 * @param settings
	 * @param workflow
	 * @param counter This is required to give the field a unique id.
	 */
	this.createFieldObject = function( widgetType, settings, workflow, counter ){
		
		var fieldObject = new FieldObject();
		fieldObject.setType( widgetType );
		fieldObject.setSettings( settings );
		if( null != workflow && workflow != "undefined" && workflow.length > 0 ){
			fieldObject.setAdvancedWorkflow( JSON.parse( workflow ) );
		}
		$( fieldObject ).bind( FieldObjectEvent.SETTINGS_UPDATED, handleSettingsUpdated );
		FormBuilderState.fieldModel.addField( "component" + counter, fieldObject );
	};
	
	var handleSettingsUpdated = function( event, settings ){
		mapFieldNamesToAttributes();
	};
	
	var createComponents = function( components ){
		if( components == null ){
			return;
		}
		var returnString = "";
		$.each( components, function( index, element ){
			if( element.type ){
				returnString += self.createWidgetHTML( element.type, element.settings, element.workflow );
			}
		});
		return returnString;
	};
	
	this.createFormDefinition = function(){
		var positions = new Array();
		var fieldIds = self.getFieldModelFieldIds();
		var componentWrappers = $( '.componentwrapper' );
		$.each( componentWrappers, function( componentWrapperIndex, componentWrapper ){
			var positionObject = new Object();
			positionObject.left = new Array();
			positionObject.right = new Array();
			var fields = $( componentWrapper ).find( '.component-label' );
			
			$.each( fields, function( index, element ){
				var fieldId = $( element ).attr( 'id' );
				var componentConfiguration = new Object();
				console.log( fieldId );
				componentConfiguration.type = self.getFieldType( FormBuilderState.fieldModel.retrieveField( fieldId ) );
				componentConfiguration.settings = FormBuilderState.fieldModel.retrieveField( fieldId ).getSettings();
				var workflow = FormBuilderState.fieldModel.retrieveField( fieldId ).getAdvancedWorkflow();
				if( workflow && workflow != "undefined" ){
					componentConfiguration.workflow = workflow;
				}
				self.setConfigurationOntoPositionObject( positionObject, componentConfiguration, fieldId );
			});
			positions.push( positionObject );
		});
		var stringifiedParams = JSON.stringify( positions );
		stringifiedParams = replaceInvalidJSONParts( stringifiedParams );
		stringifiedParams = addRootRequiredForXMLConversion( stringifiedParams );
		var JSONatt = JSON.parse( stringifiedParams );
		var xml = json2xml( JSONatt, "" );
		xml = addXMLRootAttributes( xml );
		return createFormDefinitionObject( xml, getComponentWorkflows() );
	};
	
	this.getFieldType = function( fieldObject ){
		return fieldObject.getType();
	};
	
	this.setConfigurationOntoPositionObject = function( positionObject, componentConfiguration, element ){
		if( $( '#' + element ).parent().hasClass( 'left-component' ) ){
			positionObject.left.push( componentConfiguration );
		}else if( $( '#' + element ).parent().hasClass( 'right-component') ){
			positionObject.right.push( componentConfiguration );
		}
	};
	
	this.getFieldModelFieldIds = function(){
		return FormBuilderState.fieldModel.getFieldIds();
	};
	
	var createFormDefinitionObject = function( xml, workflows ){
		var formDefinition = new Object();
		formDefinition.structure = xml;
		formDefinition.workflow = workflows;
		return formDefinition; 
	};
	
	var getComponentWorkflows = function(){
		
		var formConfiguration = "";
		
		// Get all the workflow attributes
		var fieldIds = self.getFieldModelFieldIds();
		
		$.each( fieldIds, function( index, element ){
			var workflow = FormBuilderState.fieldModel.retrieveField( element ).getAdvancedWorkflow();
			if( workflow ){
				formConfiguration += JSON.stringify( FormBuilderState.fieldModel.retrieveField( element ).getAdvancedWorkflow() ) + ",";
			}
		});
		
		
		
		if( formConfiguration.length > 0 ){
			// Cut the trailing apostrophe
			formConfiguration = formConfiguration.substring( 0, formConfiguration.length - 1 );
			// Put them all into an array
			formConfiguration = "[" + formConfiguration + "]";
		}
		return formConfiguration;
	};
	
	var addXMLRootAttributes = function( xml ){
		return xml.replace( /<root>/g, "<root formid='" + FormBuilderState.entityModel.getEntity().getId() + "' formname='" 
				+ FormBuilderState.entityModel.getEntity().getName().replace( "&amp;", "&amp;amp;amp;" ) + "' formtitle='" + 
				FormBuilderState.formModel.getFormObject().getFormTitle() + "'>" );//Need to deal with &amp; otherwise it trips up the xml
	};
	
	var replaceInvalidJSONParts = function( stringifiedParams ){
		stringifiedParams = stringifiedParams.replace( /\\/g, "" );
		stringifiedParams = stringifiedParams.replace( /"{/g, "{" );
		stringifiedParams = stringifiedParams.replace( /}",/g, "}," );
		stringifiedParams = stringifiedParams.replace( /"\[{/g, "[{" );
		stringifiedParams = stringifiedParams.replace( /}\]"/g, "}]" );
		stringifiedParams = stringifiedParams.replace( /}"}/g, "}}" );
		return stringifiedParams;
	};
	
	var addRootRequiredForXMLConversion = function( stringifiedParams ){
		return '{ "root": { "row": ' + stringifiedParams + '} }';
	};
	
	// Converts the 2D array to a 1D array e.g. [[ {}, {} ],[ {}, {} ]] to [ {}, {}, {}, {} ] 
	var convert2Dto1DArray = function( workflow ){
		workflow = workflow.replace( /\],\[/g, "," );
		workflow = workflow.replace( /\[\[/g, "[" );
		workflow = workflow.replace( /\]\]/g, "]" );
		return workflow;
	};
	
	var thisFailureHandler = function( a, b, c ){
		
	};
	
	
	var findWidgetClassName = function( className ){
		var classNames = FormBuilderState.componentClassNames.replace( /\./g, "" ).split(",");
		var widgetName;
		$.each( classNames, function( index, element ){
			if( className.indexOf( element ) > -1 ){
				widgetName = element;
				return false;
			}
		});
		return widgetName;
	};
	
	this.convertClassNameToType = function( className ){
		var classNames = FormBuilderState.componentClassNames.replace( /\./g, "" ).replace( /component/g, "" ).split(",");
		var type;
		$.each( classNames, function( index, element ){
			if( className.indexOf( element ) > -1 ){
				type = element;
				return false;
			}
		});
		return type;
	};
	
	this.createWidgetHTML = function( type, settings, workflow ){
		var widgetClassName = findWidgetClassName( type );
		var widgetType = self.convertClassNameToType( type );
		
		self.createFieldObject( widgetType, settings, workflow, self.counter );
		
		var widget = $( "<div class='formcomponent " + widgetClassName + " ui-draggable component' />" );
		widget.wrap( "<div class='component-image'/>" );

		setTimeout( function(){
			$( ".settings-image" ).unbind( "click" );
			$( ".settings-image" ).click( FormBuilderState.mainScreenInstance.handleSettingsComponentButtonClick );

			$( ".delete-image" ).unbind( "click" );
			$( ".delete-image" ).click( FormBuilderState.mainScreenInstance.handleDeleteComponentButtonClick );

			
		}, 1000 );

		return "<div id='component" + self.counter + "' class='component-label'>" +
		$('<div>').append( widget.clone() ).remove().html()+
		"</div>" +
		"<div class='component-buttons'>" +
		"<div class='settings-image' widget-type='" + widgetType + "' component='component"+ self.counter +"'></div>" +
		"<div class='delete-image' widget-type='" + widgetType + "' component='component"+ self.counter++ +"'></div>" +
		"</div>";
		
		
		
		/*return "<div id='component" + self.counter + "' class='component-label'>" +
		$('<div>').append( widget.clone() ).remove().html()+
		"</div>" +
		"<div class='component-buttons'>" +
		"<div class='settings-image' onclick='FormBuilderState.mainScreenInstance.handleSettingsComponentButtonClick( event, \"" + widgetType + "\", \"component" + self.counter + "\" );'></div>" +
		"<div class='delete-image' onclick='FormBuilderState.mainScreenInstance.handleDeleteComponentButtonClick( event, \"" + widgetType + "\", \"component" + self.counter++ + "\" );'></div>" +
		"</div>";*/
	};
}

