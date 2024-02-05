function ConfigurationScreen(){
	
	var self = this;
	var RUN_ON_PARAMETER_NAMES = [ "runoninitialise", "runonsave", "runoninitialiseonly", "runonsaveonly" ];
	var selectedCondition;
	var FIELD 		= 0;
	var CONDITION 	= 1;
	var VALUE 		= 2;
	var ID_VALUE 	= 3;
	
	var FIELDS  = [{ id: "NONE_MARKER", value: "Field..." }];
	
	var CONDITION_ALPHA  = [{ id: "NONE_MARKER", 		name: "NONE_MARKER", 	value: "Condition..." },
	                         { id: "equal", 			name: "equal", 			value: "is equal to" },
	                         { id: "not-equal", 		name: "not-equal", 		value: "is not equal to" },
	                         { id: "contains", 			name: "contains", 		value: "contains" },
	                         { id: "doesnt-contain", 	name: "doesnt-contain", value: "does not contain" },
	                         { id: "starts-with", 		name: "starts-with", 	value: "starts with" },
	                         { id: "ends-with", 		name: "ends-with", 		value: "ends with" },
	                         { id: "disabled", 			name: "disabled", 		value: "is disabled" },
	                         { id: "not-disabled", 		name: "not-disabled", 	value: "is not disabled" }];
	
	var CONDITION_NUMERIC  = [{ id: "NONE_MARKER", 		name: "NONE_MARKER", 	value: "Condition..." },
	                         { id: "equal", 			name: "equal", 			value: "is equal to" },
	                         { id: "not-equal", 		name: "not-equal", 		value: "is not equal to" },
	                         { id: "contains", 			name: "contains", 		value: "contains" },
	                         { id: "doesnt-contain", 	name: "doesnt-contain", value: "does not contain" },
	                         { id: "starts-with", 		name: "starts-with", 	value: "starts with" },
	                         { id: "ends-with", 		name: "ends-with", 		value: "ends with" },
	                         { id: "disabled", 			name: "disabled", 		value: "is disabled" },
	                         { id: "not-disabled", 		name: "not-disabled", 	value: "is not disabled" },
	                         { id: "greater-than", 		name: "greater-than", 	value: "is greater than" },
	                         { id: "less-than", 		name: "less-than", 		value: "is less than" }];
	
	var VALUE_NUMERIC  = [{ id: "NONE_MARKER", 	name: "alpha", value: "Value..." },
		                         { id: "alpha", name: "alpha", value: "VALUE" },
		                         { id: "alpha", name: "alpha", value: "DATE" },
		                         { id: "alpha", name: "alpha", value: "DOB" },
		                         { id: "alpha", name: "alpha", value: "DOD" },
		                         { id: "alpha", name: "alpha", value: "TODAY" },
		                         { id: "alpha", name: "alpha", value: "CONSTANT" },
		                         { id: "alpha", name: "alpha", value: "ID" }];
	
	this.initialiseConfiguration = function(){
		$( '.validation-message' ).hide();
		$( '.set-value-options' ).hide();
		$( '.field-to-set-with' ).hide();
		$( '.dropdown-value-option' ).hide();
		$( '.date-value-option' ).hide();
		populatePicklists();
		$( '.actions select' ).bind( 'change', handleActionSelectChange );
		$( '.set-value-options select' ).bind( 'change', handleValueOptionsSelectChange );
		$( '.field-to-set-with select' ).bind( 'change', handleFieldToSetWithSelectChange );
		
		//onclick="FormBuilderState.configurationScreenInstance.handleActionComponentClick( event );" 
		$( ".action-component-button" ).click( self.handleActionComponentClick );
		$( '#workflowDesigner' ).formConditions({
			conditions: getWorkflowConditions()
		});
		initialiseDoneButton();
		self.initialiseExistingConfigurationForComponent();
		initialiseConfigurationSaveButton();
		initialiseTrash();
	};
	
	this.handleActionComponentClick = function( event ){
		if( $( event.currentTarget ).val() == 'Done' ){
			var actionComponent = $( event.currentTarget ).closest( '.action-component' );
			var clone = actionComponent.clone();
			clone.bind( 'change', handleActionSelectChange );
			clone.bind( 'change', handleValueOptionsSelectChange );
			clone.bind( 'change', handleFieldToSetWithSelectChange );
			clone.children( '.validation-message' ).hide();
			clone.children( '.set-value-options' ).hide();
			clone.children( '.field-to-set-with' ).hide();
			clone.children( '.dropdown-value-option' ).hide();
			clone.children( '.date-value-option' ).hide();
			$( event.currentTarget ).closest( '.actions-wrapper' ).append( clone );
			$( event.currentTarget ).val( 'Delete' );
		}else{
			if( confirm( 'Are you sure you wish to remove this item?' ) ){
				$( event.currentTarget ).closest( '.action-component' ).remove();
			}
		}
	};
	
	this.getFieldNames = function(){
		return self.buildUniqueNameObjects();
	};
	
	this.buildUniqueNameObjects = function(){
		var fieldUniqueNamesSelectObjects = new Array();
		var fieldIds = self.getFieldModelFieldIds();
		$.each( fieldIds, function( index, element ){
			if( FormBuilderState.fieldModel.retrieveField( element ).getSettings() != null ){
				fieldUniqueNamesSelectObjects.push( { name: "numeric", 
					id: "#" + FormBuilderState.fieldModel.retrieveField( element ).getSettings().fieldid, 
					value: "#" + FormBuilderState.fieldModel.retrieveField( element ).getSettings().fieldid } );
			} 
		});
		return fieldUniqueNamesSelectObjects;
	};
	
	this.getFieldModelFieldIds = function(){
		return FormBuilderState.fieldModel.getFieldIds();
	};
	
	var populatePicklists = function(){
		var fieldUniqueNamesSelectObjects;
		fieldUniqueNamesSelectObjects = self.getFieldNames();
		fieldUniqueNamesSelectObjects = FIELDS.concat( fieldUniqueNamesSelectObjects );
		
		createSelectInput ( 'fields', fieldUniqueNamesSelectObjects );
		createSelectInput ( 'fal', fieldUniqueNamesSelectObjects );
		createSelectInput ( 'tru', fieldUniqueNamesSelectObjects );
		createSelectInput ( 'truFieldToSetWith', fieldUniqueNamesSelectObjects );
		createSelectInput ( 'falFieldToSetWith', fieldUniqueNamesSelectObjects );
		
	};
	
	var initialiseDoneButton = function(){
		$( '#done' ).click( function( event ){
			appendCreateAndInitialise( 	$( '#fields :selected').val(), 
										$( '#condition :selected').attr( 'id' ),
										$( '#value :selected').val(),
										$( '#constant :selected').val(),
										$( '#textInput').val(),
										true,
										$( '#dateInput').val(),
										$( '#picklist :selected').text() + "@o@" + $( '#picklist :selected').val() );
			appendAndInitialise( createConditionLozenge( true, "OR" ) );
			$( '.wrappee' ).appendTo( $( '.conditionalWrapper' ) );
			prependActionBackground( $( '.conditionalWrapper' ) );
			$( '.conditionalWrapper' ).removeClass( 'conditionalWrapper' );
			$( '.wrappee' ).removeClass( 'wrappee' );
			// clear up any extra condition lozenges
			setTimeout( clearUpOrphanedLozenges, 10 );
			resetLozenge();
			populatePicklists();
		} );
	};
	
	this.initialiseExistingConfigurationForComponent = function(){
		
		var conditions = FormBuilderState.fieldModel.retrieveField( FormBuilderState.fieldModel.getCurrentFieldId() ).getAdvancedWorkflow();
		if( conditions != null ){
			$.each( conditions, function( index, condition ){
				recreateConfiguration( condition.rules );
				if( $( '.conditionalWrapper' ).parent().hasClass( 'lozengePark' ) ){
					$( '.conditionalWrapper' ).append( "<input name='runoninitialise' type='hidden' value='" + condition.runoninitialise + "'></input>" );
					$( '.conditionalWrapper' ).append( "<input name='runonsave' type='hidden' value='" + condition.runonsave + "'></input>" );
					$( '.conditionalWrapper' ).append( "<input name='runonsaveonly' type='hidden' value='" + condition.runonsaveonly + "'></input>" );
					$( '.conditionalWrapper' ).append( "<input name='runoninitialiseonly' type='hidden' value='" + condition.runoninitialiseonly + "'></input>" );
				}
				$( '.conditionalWrapper' ).removeClass( 'conditionalWrapper' );
				$( '.wrappee' ).removeClass( 'wrappee' );
			} );
			setTimeout( clearUpOrphanedLozenges, 10 );
		}
	};
	
	var initialiseConfigurationSaveButton = function(){
		$( '.conditions-save-button' ).click( handleConfigurationSaveButtonClick );
	};
	
	var initialiseTrash = function(){
		$( ".rubbish" ).droppable({
			accept: ".draggable",
			greedy: true,
			tolerance: 'pointer',
			drop: function(event, ui) {
				var draggable = $( ui.draggable );
				var droppable = $(this);
				draggable.remove();
				setTimeout( clearUpOrphanedLozenges, 10 );
			}	
		});
	};
	
	/**
	 * 
	 * @param rules The rules for this component
	 * @param appendToComponent Used for nesting components.  If this is null then it's assumed that it's
	 * that the component will be rendered directly onto the 'desktop'
	 * @returns
	 */
	var recreateConfiguration = function( rules, appendToComponent ){
		if( appendToComponent == null ){
			appendToComponent = createTopLevelConditionalComponent( rules[ 0 ].conditiontype, rules[ 0 ].actions );
		}
		$.each( rules, function( index, element ){
			$.each( element.rules, function( ruleIndex, ruleElement ){
				if( ruleElement.conditiontype == null ){
					appendToComponent.append( createQueryLozenge( ruleElement.selector, ruleElement.operator, ruleElement.value, null, null, true ) );
				}else{
					appendToComponent.append( createConditionLozenge( true, ruleElement.conditiontype ) );
					prependActionBackground( appendToComponent.children( ':last-child' ) );
					appendToComponent.children( ':last-child' ).append( "<input name='actions' type='hidden' value='" + JSON.stringify( ruleElement.actions ) + "'></input>" );
					recreateConfiguration( [ ruleElement ], appendToComponent.children( ':last-child' ) );
				}
			});
		});
		initialiseDragAndDrop();
		bindConditionClick();
	};
	
	var createTopLevelConditionalComponent = function( conditionType, actions ){
		appendToScreen( createConditionLozenge( true, conditionType ) );
		var appendToComponent = $( '.conditionalWrapper' );
		prependActionBackground( appendToComponent );
		appendToComponent.append( "<input name='actions' type='hidden' value='" + JSON.stringify( actions ) + "'></input>" );
		return appendToComponent;
	};
	
	var handleConfigurationSaveButtonClick = function( event ){
		var allComponents = $( '.lozengePark' ).children( '.condition' );
		var JSONString = '';
		if( allComponents.length > 0 ){
			JSONString = '[';
		}
		
		$.each( allComponents, function( index, element ){
			JSONString += '{' +
			'"name": "somename",' +
			'"triggeredby": "#' + FormBuilderState.fieldModel.retrieveField( FormBuilderState.fieldModel.getCurrentFieldId() ).getSettings().fieldid + '",' +
			'"runoninitialise": "' + $( element ).find( '[name=runoninitialise]' ).val() + '",' +
			'"runonsave": "' + $( element ).find( '[name=runonsave]' ).val() + '",' +
			'"runonsaveonly": "' + $( element ).find( '[name=runonsaveonly]' ).val() + '",' +
			'"runoninitialiseonly": "' + $( element ).find( '[name=runoninitialiseonly]' ).val() + '",' +
			'"message": "General validation message - OVERRIDE",' +
			'"rules": [{';
			JSONString += JSONifyConditions( $( element ) );
			JSONString += "}]},";
		} );
		
		// Just get rid of some minor syntax issues, ahem
		if( allComponents.length > 0 ){
			JSONString = JSONString.substring( 0, JSONString.length - 1 );
			JSONString = JSONString.replace( /,,/g, "," );
			JSONString = JSONString.replace( /},]/g, "}]" );
			JSONString += "]";
		}
		
		if( JSONString != null & JSONString.length > 0 ){
			JSONString = JSON.parse( JSONString );
		}else{
			JSONString = "";
		}
		FormBuilderState.fieldModel.retrieveField( FormBuilderState.fieldModel.getCurrentFieldId() ).setAdvancedWorkflow( JSONString );
		try{
			$( '#configurationDialog' ).dialog( 'close' );
			//$( '#configurationDialog' ).dialog( 'destroy' );
		}catch( e ){
			console.log( e );
		}
		
	};
	
	var JSONifyConditions = function( component ){
		var JSONString = "";
		if( component.hasClass( 'condition' ) ){
			JSONString += getConditionType( component ) + ",";
			JSONString += '"rules": [' + getComponents( component ) + '],';
			JSONString += getActions( component );
		}
		return JSONString;
	};
	
	var getComponents = function( conditionWrapper ){
		var children = conditionWrapper.children();
		var JSONString = "";
		$.each( children, function( index, element ){
			if( $( element ).hasClass( 'query' ) ){
				var childElements 		= $( element ).children();
				var component = new Object();
				component.selector 		= '#' + $.trim( $( childElements[ FIELD ] ).text() );
				component.operator 		= $.trim( $( childElements[ CONDITION ] ).text() );
				component.value 		= $.trim( $( childElements[ VALUE ] ).text() );
				if( childElements.length > 3 ){
					component.option = true;
					component.attr = "value";
					component.value = $.trim( $( childElements[ ID_VALUE ] ).val() );
				}
				JSONString += JSON.stringify( component ) + ","; 
			}else if( $( element ).hasClass( 'condition' ) ){
				JSONString += "{" + JSONifyConditions( $( element ) ) + "},";
			}
		});
		return JSONString;
	};
	
	var getActions = function( conditionWrapper ){
		var actions;
		if( conditionWrapper.children( '[name=actions]' ) != null ){
			actions = conditionWrapper.children( '[name=actions]' ).val();
		}
		
		if( actions == undefined ){
			actions = '""';
		}
		return '"actions" : ' + actions;
	};
	
	var getConditionType = function( conditionWrapper ){ 
		var conditionType;
		if( conditionWrapper.hasClass( 'and' ) ){
			conditionType = 'AND';
		}else{
			conditionType = 'OR';
		}
		return '"conditiontype" :  "' + conditionType + '"'; 
	};
	
	var handleActionSelectChange = function( event ){
		configureDisplayOnActionSelectChange( $( event.target ) );
	};
	
	var handleValueOptionsSelectChange = function( event ){
		configureDisplayOnValueOptionSelectChange( $( event.target ) );
	};
	
	var handleFieldToSetWithSelectChange = function( event ){
		configureDisplayOnFieldToSetWithSelectChange( $( event.target ) );
	};
	
	var configureDisplayOnFieldToSetWithSelectChange = function( fieldOption ){
		$.each( fieldOption, function( index, element ){
			var fieldIds = self.getFieldModelFieldIds();
    		var choice = $( element ).val();
    		$.each( fieldIds, function( fieldIdIndex, fieldIdElement ){
    			var settingsObject = FormBuilderState.fieldModel.retrieveField( fieldIdElement ).getSettings();
    			if( settingsObject.fieldid == choice.substring( 1 ) ){
    				if( FormBuilderState.fieldModel.retrieveField( fieldIdElement ).getType() == 'dropdown' ){
    					$( element ).parent().parent().children( '.dropdown-value-option' ).show();
    					return false;
    				}else if( FormBuilderState.fieldModel.retrieveField( fieldIdElement ).getType() == 'date' ){
    					$( element ).parent().parent().children( '.date-value-option' ).show();
    					return false;
    				}
    			}else{
					$( element ).parent().parent().children( '.dropdown-value-option' ).hide();
					$( element ).parent().parent().children( '.date-value-option' ).hide();
				}
    		});
		});
	};
	
	var configureDisplayOnValueOptionSelectChange = function( valueOption ){
		$.each( valueOption, function( index, element ){
			if( $( element ).val().indexOf( 'with value' ) > -1 ){
				$( element ).parent().parent().children( '.set-value' ).show();
			}else{
				$( element ).parent().parent().children( '.set-value' ).hide();
			}
			
			if( $( element ).val().indexOf( 'with field' ) > -1 ){
				$( element ).parent().parent().children( '.field-to-set-with' ).show();
			}else{
				$( element ).parent().parent().children( '.field-to-set-with' ).hide();
			}
		});
		
	};
	
	var configureDisplayOnActionSelectChange = function( actionSelectElement ){
		$.each( actionSelectElement, function( index, element ){
			if( $( element ).val().indexOf( 'display validation message' ) > -1 ){
				$( element ).parent().parent().children( '.validation-message' ).show();
			}else{
				$( element ).parent().parent().children( '.validation-message' ).hide();
			}
			
			if( $( element ).val().indexOf( 'set field' ) > -1 ){
				//$( element ).parent().parent().children( '.set-value' ).show();
				$( element ).parent().parent().children( '.set-value-options' ).show();
			}else{
				//$( element ).parent().parent().children( '.set-value' ).hide();
				$( element ).parent().parent().children( '.set-value-options' ).hide();
			}
		});
	};
	
	var resetLozenge = function(){
		$( 'option :not( .actions select option )' ).remove();
		$( '#conditionContainer, #valueContainer, #attributeContainer, #buttonContainer' ).hide();
	};
	
	var createConditionLozenge = function( forWrap, type ){
		var wrapClass = "";
		if( forWrap ){
			wrapClass = "conditionalWrapper";
		}
		if( type == null ){
			type = 'and';
		}
		
		return "<div class='workflow-component moveable draggable droppable condition " + type.toLowerCase() + " " + wrapClass + "'/>";
	};
	
	var appendCreateAndInitialise = function( field, condition, value, constant, text, forWrapping, date, picklist ){
		appendAndInitialise( createQueryLozenge( field, condition, value, constant, text, forWrapping, date, picklist ) );
	};
	
	var appendToScreen = function( html ){
		$( '.lozengePark' ).append( html );
	};
	
	var appendAndInitialise = function( html ){
		appendToScreen( html );
		initialiseDragAndDrop();
	};
	
	var initialiseDragAndDrop = function(){
		intialiseDroppable();
		intialiseDraggable();
	};
	
	var createQueryLozenge = function( field, condition, value, constant, text, forWrapping, date, picklist ){
		var wrappingClass = "";
		if( forWrapping ){
			wrappingClass = "wrappee";
		}
		
		var lozengeHtml = "<div class='workflow-component moveable draggable droppable query " + wrappingClass + "'>" +
		"<div class='workflow-query-part emphasise field'>" + 
		field.replace( "#", "" ) +
		"&nbsp;&nbsp;</div>" +
		"<div class='workflow-query-part non-emphasise'>" + 
		condition +
		"&nbsp;&nbsp;</div>";
		
		
		if( constant != undefined ){
			lozengeHtml += 
			"<div class='workflow-query-part emphasise'>" + 
			constant +
	 		"&nbsp;&nbsp;</div>";
		}else if( text != undefined ){
			lozengeHtml += 
			"<div class='workflow-query-part emphasise'>" + 
			text +
	 		"&nbsp;&nbsp;</div>";
		}else if( date != undefined ){
			lozengeHtml += 
				"<div class='workflow-query-part emphasise'>" + 
				date +
		 		"&nbsp;&nbsp;</div>";
		}else if( picklist != null && picklist.length > 3 ){
			picklist = picklist.split( '@o@' );
			lozengeHtml += 
				"<div class='workflow-query-part emphasise'>" + 
				picklist[0] + " (" + picklist[1] + ")" +
				"&nbsp;&nbsp;</div><input type='hidden' value='" + picklist[1] + "'><!-- asdasda --></input>";
			
		}else{
			if( value == "Value..." ){
				value = "";
			}
			lozengeHtml += "<div class='workflow-query-part emphasise'>" + 
			value +
	 		"&nbsp;&nbsp;</div>";
		}
		return lozengeHtml += "</div>";
	};
	
	var prependActionBackground = function( jqueryElement ){
		jqueryElement.find( '.message' ).remove();
		jqueryElement.prepend( "<div class='message'><!--dasasda--></div>" );
		jqueryElement.children( '.message' ).click( handleActionsShow );
	};
	
	var handleActionsShow = function( event ){
		$( '#workflowDesigner' ).slideUp( 500 );
		$( '.actions-container' ).slideDown( 500 );
		$( '.action-save-button' ).show();
		$( '.conditions-save-button' ).hide();
		
		$( '.action-save-button' ).click( function( event ){
			$( '#workflowDesigner' ).slideDown( 500 );
			$( '.actions-container' ).slideUp( 500 );
			$( '.action-save-button' ).hide();
			$( '.conditions-save-button' ).show();
			
			handleActionsSaveClick( event );
			$( '.action-save-button' ).unbind( 'click' );
		});
		selectedCondition = $( event.target ).parent();
		if( selectedCondition.parent().hasClass( 'lozengePark' ) ){
			$( "#runOnParamters" ).show();
			intialiseRunOnParameters();
		}else{
			$( "#runOnParamters" ).hide();
		}
		var conditionActions = selectedCondition.children( '[name=actions]' );
		if( conditionActions.length > 0 ){
			recreateSavedActionsFor( conditionActions.val(), "tru" );
			recreateSavedActionsFor( conditionActions.val(), "fal" );
		}else{
			recreateSavedActionsFor( null, "tru" );
			recreateSavedActionsFor( null, "fal" );
		}
		event.stopPropagation();
	};
	
	var intialiseRunOnParameters = function(){
		
		$.each( RUN_ON_PARAMETER_NAMES, function( index, element ){
			if( selectedCondition.find( '[name=' + element + ']' ).val() == "true" ){
				$( "#" + element ).attr( "checked", "checked" );
			}else{
				$( "#" + element ).removeAttr( "checked" );
			}
		});
	};
	
	var recreateSavedActionsFor = function( conditionActions, actionType ){
		$( '.actions-wrapper.' + actionType + ' .action-component' ).filter( ':not(:first)' ).remove();
		if( conditionActions != null ){
			conditionActions = JSON.parse ( conditionActions );
			if( conditionActions[ actionType] != null ){
				for( var i = 0;i < conditionActions[ actionType].length;i++ ){
					var clone = $( '.actions-wrapper.' + actionType + ' :first' ).clone();
					$( '.actions-wrapper.' + actionType ).append( clone );
					clone.find( '.actions select option[id=' + conditionActions[ actionType ][i].action + ']' ).attr( 'selected', true );
					clone.find( '.actions-target select option[id=' + conditionActions[ actionType ][i].selector + ']' ).attr( 'selected', true );
					if( conditionActions[ actionType  ][i].actionmessage != null ){
						clone.children( '.validation-message' ).show();
						clone.children( '.validation-message' ).children( 'input' ).val( conditionActions[ actionType  ][i].actionmessage );	
					}else{
						clone.children( '.validation-message' ).hide();
						clone.children( '.validation-message' ).children( 'input' ).val( '' );
					}
					
					if( conditionActions[ actionType  ][i].actionset != null ){
						clone.children( '.set-value' ).show();
						clone.children( '.set-value' ).children( 'input' ).val( conditionActions[ actionType  ][i].actionset );	
					}else{
						clone.children( '.set-value' ).hide();
						clone.children( '.set-value' ).children( 'input' ).val( '' );
					}
					
					// Just hiding this as not saving enough config to recreate
					// If you want to reset then need to reset the other dropdowns to trigger
					// show on it

					if( conditionActions[ actionType  ][i].fieldtosetwith != null ){
						clone.children( '.field-to-set-with' ).show();
						clone.children( '.field-to-set-with' ).find( 'option' ).filter( function(){
							return $(this).val() == conditionActions[ actionType  ][i].fieldtosetwith;
						}).attr( 'selected', 'selected' );	
					}else{
						clone.children( '.field-to-set-with' ).hide();
						clone.children( '.field-to-set-with' ).children( 'input' ).val( '' );
					}
					
					if( conditionActions[ actionType  ][i].useid != null ){
						clone.children( '.dropdown-value-option' ).show();
						if( conditionActions[ actionType  ][i].useid == "true" ){
							clone.children( '.dropdown-value-option' ).children( 'input' ).attr( "checked", "checked" );
						}else{
							clone.children( '.dropdown-value-option' ).children( 'input' ).attr( "checked", "" );
						}
							
					}else{
						clone.children( '.dropdown-value-option' ).hide();
						clone.children( '.dropdown-value-option' ).children( 'input' ).attr( "checked", "" );
					}
					
					if( conditionActions[ actionType  ][i].dateformat != null ){
						clone.children( '.date-value-option' ).show();
						clone.children( '.date-value-option' ).children( 'input' ).val( conditionActions[ actionType  ][i].dateformat );	
					}else{
						clone.children( '.date-value-option' ).hide();
						clone.children( '.date-value-option' ).children( 'input' ).val( 'd-M-yy' );
					}
					
					if( conditionActions[ actionType  ][i].fieldtosetwith != null ){
						clone.children( '.set-value-options' ).find( 'option' ).filter( function(){
							return $(this).attr("id") == "withField";
						}).attr( 'selected', 'selected' );
					}
					
					clone.children( ':button' ).val( 'Delete' );
					clone.find( '.actions select' ).bind( 'change', handleActionSelectChange );
					clone.find( '.set-value-options select' ).bind( 'change', handleValueOptionsSelectChange );
					clone.find( '.field-to-set-with select' ).bind( 'change', handleFieldToSetWithSelectChange );
					
				}
			}
		}
		var newAction = $( $( '.actions-wrapper.' + actionType ).children()[0] );
		newAction.find( '.actions select' ).val( 'Show' );
		newAction.find( '.actions select' ).bind( 'change', handleActionSelectChange );
		newAction.find( '.set-value-options select' ).bind( 'change', handleValueOptionsSelectChange );
		newAction.find( '.field-to-set-with select' ).bind( 'change', handleFieldToSetWithSelectChange );
		newAction.find( '.action-target option[id=NONE_MARKER]' ).attr( 'selected', true );
		newAction.children( '.validation-message' ).hide();
		newAction.children( '.set-value-options' ).hide();
		newAction.children( '.field-to-set-with' ).hide();
		newAction.children( '.dropdown-value-option' ).hide();
		newAction.children( '.date-value-option' ).hide();
		
		newAction.children( '.validation-message' ).children( 'input' ).val( '' );
		newAction.children( ':button' ).val( 'Done' );
		newAction.appendTo( $( '.actions-wrapper.' + actionType ) );
		configureDisplayOnActionSelectChange( $( '.actions select' ) );
		configureDisplayOnValueOptionSelectChange( $( '.set-value-options select' ) );
		configureDisplayOnFieldToSetWithSelectChange( $( '.field-to-set-with select' ) );
	};
	
	var intialiseDroppable = function(){
		
	 	$( ".droppable" ).droppable({
			accept: ".draggable",
			hoverClass: "droppable-area-hover",
			greedy: true,
			tolerance: 'pointer',
			drop: function(event, ui) {
				var draggable = $( ui.draggable );
				var droppable = $(this);
				
				if( droppable.hasClass( 'query' ) ){
					var siblings = droppable.siblings();
					if( siblings.length == 1 ){
						if( $( siblings ).parent().hasClass( 'condition' )
						 && $( siblings ).parent()[0] === draggable.parent()[0] ){
							return false;
						}
					}
					droppable.wrap( createConditionLozenge() );
					draggable.appendTo( droppable.parent() );
					prependActionBackground( draggable.parent() );
					draggable.attr( 'style', '' );
					
					intialiseDroppable();
					intialiseDraggable();
				}else{
					draggable.appendTo( droppable );
					draggable.attr( 'style', '' );
				}
				
				bindConditionClick();
				
				// clear up any extra condition lozenges
				setTimeout( clearUpOrphanedLozenges, 10 );
		    }
		});
	};
	
	var bindConditionClick = function(){
		$( '.condition' ).unbind( 'click' );
		$( '.condition' ).click( function( event ){  
			$( this ).toggleClass( 'and or' );
			event.stopPropagation();
		} );
	};
	
	var clearUpOrphanedLozenges = function(){
		var conditions = $( '.condition' );
		$.each( conditions, function( index, element ){
			var children = $( element ).children(); 
			var hiddenInputOffset = 0;
			// Once the config has been saved and is recreated, there will be a hidden inputs
			// that need to be considered
			
			if( $( element ).children( '[name=actions]' ).length > 0 ){
				hiddenInputOffset += 1;
			}
			$.each( RUN_ON_PARAMETER_NAMES, function( runOnindex, runOnElement ){
				if( $( element ).children( '[name=' + runOnElement + ']' ).length > 0 ){
					hiddenInputOffset += 1;
				}
			});
			if( children.length < 2 + hiddenInputOffset ){
				$( element ).children( '.message' ).remove();
				$( element ).children().unwrap();
				$( element ).remove();
			}else if( children.length < 3 + hiddenInputOffset ){
				if( $( element ).children( '.condition' ).length > 0 ){
					$( element ).children( '.message' ).remove();
					$( element ).children().unwrap();
					$( element ).remove();
				}else{
					$( element ).removeClass( 'condition-background-image' );
				}
			}else{
				if( !$( element ).hasClass( 'condition-background-image' ) ){
					$( element ).addClass( 'condition-background-image' );
				}
			}
		});
	};
	
	var intialiseDraggable = function(){
		$( ".draggable" ).draggable({
			revert: 'invalid',
			delay: 100
		});
	};
	
	var createActionObjects = function( trueActions ){
		var actionType = "fal";
		if( trueActions ){
			actionType = "tru";
		}
		var actions = $( '.actions-wrapper.' + actionType ).children();
		var returnObjects = new Array();
		$.each( actions, function( index, element ){
			if( $( element ).find( ':button' ).val() != "Done" ){
				var obj = new Object();
				obj.action 			= $( element ).find( '.actions select :selected' ).attr( 'id' );
				obj.selector 		= $( element ).find( '.actions-target select :selected' ).attr( 'id' );
				obj.actionmessage 	= $( element ).find( '.validation-message' ).children( 'input' ).val();
				obj.actionset 		= $( element ).find( '.set-value' ).children( 'input' ).val();
				if( $( element ).find( '.field-to-set-with select:visible' ).length > 0 ){
					obj.fieldtosetwith 	= $( element ).find( '.field-to-set-with select :selected' ).attr( 'id' );
					obj.useid 			= $( element ).find( '.dropdown-value-option :checked' ).val();
				}
				if( $( element ).find( '.date-value-option:visible' ).length > 0 ){
					console.log( $( element ).find( '.date-value-option input' ).val() );
					obj.dateformat 	= $( element ).find( '.date-value-option input' ).val();
				}
				returnObjects.push( obj );
			}
		});
		return returnObjects;
	};
	
	var handleActionsSaveClick = function( event ){
		var allActions = new Object();
		allActions.tru = createActionObjects( true );
		allActions.fal = createActionObjects( false );
		allActions = JSON.stringify( allActions );
		selectedCondition.children( '[name=actions]' ).remove();
		selectedCondition.append( "<input name='actions' type='hidden' value='" + allActions + "'></input>" ); 
		
		if( selectedCondition.parent().hasClass( 'lozengePark' ) ){
			populateActionHiddenInputs();
		}
	};
	
	var populateActionHiddenInputs = function(){
		$.each( RUN_ON_PARAMETER_NAMES, function( index, element ){
			if( selectedCondition.find( '[name=' + element + ']' ).length < 1 ){
				selectedCondition.append( "<input name='" + element + "' type='hidden' value='" + $( '#' + element )[0].checked + "'></input>" );
			}else{
				selectedCondition.find( '[name=' + element + ']' ).val( $( '#' + element )[0].checked );
			}
		});
	};
	
	var createSelectInput = function( id, data ){
		var optionsString = "";
		$.each( data, function( index, element ){
			optionsString += "<option name='" + element.name + "' id='" + element.id + "'>" + element.value + "</option>";
		});
		$( '#'+id ).html( optionsString );
	};
	
	var getWorkflowConditions = function(){
		
		return [{
		    name: 'ON_ALL_VALUES_SET',
		    triggeredby: 'value, condition, fields',
		    runoninitialise: false,
		    message: 'General validation message - OVERRIDE',
		    rules: [
				 {
					conditiontype: 'AND',
					rules: [
					 {
					     selector: '#condition',
					     option: true,
					     attr: 'id',
					     operator: 'not-equal',
					     value: 'disabled'
					 },
					{
					     selector: '#condition',
					     option: true,
					     attr: 'id',
					     operator: 'not-equal',
					     value: 'not-disabled'
					 },
			          {
				        conditiontype: 'OR',
				        rules: [{
					            selector: '#value',
					            option: true,
					            attr: 'id',
					            operator: 'contains',
					            value: 'NONE_MARKER'
					        },
					       {
					            selector: '#condition',
					            option: true,
					            attr: 'id',
					            operator: 'contains',
					            value: 'NONE_MARKER'
					        },
					       {
					            selector: '#fields',
					            option: true,
					            attr: 'id',
					            operator: 'contains',
					            value: 'NONE_MARKER'
					        },
					        {
					        	conditiontype: 'AND',
					        	rules: [{
				 		            selector: '#value',
				 		            option: true,
				 		            operator: 'equal',
				 		            value: 'CONSTANT'
				 		        },
				 		       {
				 		            selector: '#constant',
				 		            option: true,
				 		            attr: 'id',
				 		            operator: 'equal',
				 		            value: 'NONE_MARKER'
				 		        },
				 		        {
				 		            selector: '#condition',
				 		            option: true,
				 		            attr: 'id',
				 		            operator: 'not-equal',
				 		            value: 'disabled'
				 		        },
				 		       {
				 		            selector: '#condition',
				 		            option: true,
				 		            attr: 'id',
				 		            operator: 'not-equal',
				 		            value: 'not-disabled'
				 		        }]
					        }
	 		       ]
		        }
		        
		        ],
		        actions: {
				    tru: [{
				        selector: '#done',
				        action: 'hide'
				    }],
				    fal: [{
				        selector: '#done',
				        action: 'show'
				    }]
			    }
		    }]
		},
		        {
		    name: 'CHANGE_OF_INITIAL_COMPONENT_NUMERIC',
		    triggeredby: 'fields',
		    runoninitialise: false,
		    message: 'General validation message - OVERRIDE',
		    rules: [{
		        conditiontype: 'AND',
		        rules: [{
		            selector: '#fields',
		            attr: 'name',
		            option: true,
		            operator: 'equal',
		            value: 'numeric'
		        }],
		        actions: {
				    tru: [{
				        selector: '#condition',
				        action: 'show'
				    }, {
				        selector: '#conditionContainer',
				        action: function () {
				            createSelectInput('condition', CONDITION_NUMERIC);
				        }
				    }],
				    fal: []
			    }
		    }]
		    
		}, {
		    name: 'CHANGE_OF_INITIAL_COMPONENT_ALPHA',
		    triggeredby: 'fields',
		    runoninitialise: false,
		    message: 'General validation message - OVERRIDE',
		    rules: [{
		        conditiontype: 'AND',
		        rules: [{
		            selector: '#fields',
		            attr: 'name',
		            option: true,
		            operator: 'equal',
		            value: 'alpha'
		        }],
		        actions: {
				    tru: [{
				        selector: '#condition',
				        action: 'show'
				    }, {
				        selector: '#conditionContainer',
				        action: function () {
				            createSelectInput('condition', CONDITION_ALPHA);
				        }
				    }],
				    fal: []
			    }
		    }]
		}, {
		    name: 'CHANGE_OF_INITIAL_COMPONENT_NONE',
		    triggeredby: 'fields',
		    runoninitialise: false,
		    message: 'General validation message - OVERRIDE',
		    rules: [{
		        conditiontype: 'AND',
		        rules: [{
		            selector: '#fields',
		            option: true,
		            attr: 'id',
		            operator: 'contains',
		            value: 'NONE_MARKER'
		        }],
		        actions: {
				    tru: [{
				        selector: '#condition',
				        action: 'hide'
				    }],
				    fal: []
			    }
		    }]
		}, {
		    name: 'CHANGE_OF_CONDITION_NONE_SELECTED',
		    triggeredby: 'condition, fields',
		    runoninitialise: false,
		    message: 'General validation message - OVERRIDE',
		    rules: [{
		        conditiontype: 'OR',
		        rules: [{
		            selector: '#condition',
		            option: true,
		            attr: 'id',
		            operator: 'contains',
		            value: 'NONE_MARKER'
		        },
		       {
		            selector: '#condition',
		            option: true,
		            operator: 'contains',
		            value: 'disabled'
		        }],
		        actions: {
				    tru: [{
				        selector: '#value',
				        action: 'hide'
				    }],
				    fal: [{
				        selector: '#value',
				        action: 'show'
				    }
				    ,
				   {
				        selector: '#value',
				        action: function () {
				        	if( $( '#fields :selected' ).attr( 'name' ) == 'alpha' ){
				        		createSelectInput('value', valueAll);
				        	}else if( $( '#fields :selected' ).attr( 'name' ) == 'numeric' ){
				        		var fieldUniqueNamesSelectObjects;
				        		fieldUniqueNamesSelectObjects = self.getFieldNames();
				        		var concatArray = VALUE_NUMERIC.concat( fieldUniqueNamesSelectObjects );
				        		createSelectInput('value', concatArray );
				        	}
				        }
				    }]
			    }
		    }]
		},
		{
		    name: 'CHANGE_OF_VALUE_VALUE',
		    triggeredby: 'value',
		    runoninitialise: false,
		    message: 'General validation message - OVERRIDE',
		    rules: [{
		        conditiontype: 'AND',
		        rules: [{
		            selector: '#value',
		            option: true,
		            attr: 'id',
		            operator: 'contains',
		            value: 'NONE_MARKER'
		        }],
		        actions: {
				    tru: [{
				        selector: '#constant',
				        action: 'hide'
				    }],
				    fal: [{
				        selector: '#constant',
				        action: 'show'
				    },{
				        selector: '#value',
				        action: function () {
				        	if( $( '#value :selected' ).val() == 'VALUE'){
				        		$( '#textInput' ).remove();
				        		$( '#attributeContainer' ).append( "<input id='textInput' type='text' />" );
				        		$( '#constant' ).hide();
				        		$( '#dateInput' ).datepicker( 'destroy' );
				        		$( '#dateInput' ).remove();
				        		$( '#picklistContainer' ).hide();
				        	}else if( $( '#value :selected' ).val() == 'CONSTANT' ){
				        		$( '#textInput' ).remove();
				        		$( '#constant' ).show();
				        		$( '#dateInput' ).datepicker( 'destroy' );
				        		$( '#dateInput' ).remove();
				        		
				        		var fieldUniqueNamesSelectObjects;
				        		fieldUniqueNamesSelectObjects = self.getFieldNames();
				        		var concatArray = VALUE_NUMERIC.concat( fieldUniqueNamesSelectObjects );
				        		createSelectInput('constant', concatArray );
				        		$( '.picklistContainer' ).hide();
				        	}else if( $( '#value :selected' ).val() == 'DATE'){
				        		$( '#textInput' ).remove();
				        		$( '#attributeContainer' ).append( "<input id='dateInput' type='text' />" );
				        		$( '#dateInput' ).datepicker({
				        			showOn: "button",
				        			buttonImageOnly: true
				        		});
				        		$( '#constant' ).hide();
				        		$( '#picklistContainer' ).hide();
				        	}else if( $( '#value :selected' ).val() == 'ID'){
				        		$( '#constant' ).hide();
				        		$( '#textInput' ).remove();
				        		$( '#dateInput' ).datepicker( 'destroy' );
				        		$( '#dateInput' ).remove();
				        		$( '#picklistContainer' ).show();
				        		
				        		var fieldIds = self.getFieldModelFieldIds();
				        		
				        		$.each( fieldIds, function( index, element ){
				        			var settingsObject = FormBuilderState.fieldModel.retrieveField( element ).getSettings();
				        			var selectField = $.trim( $( '#fields :selected' ).text() );
				        			if( selectField.indexOf( settingsObject.fieldid ) > -1 ){
				        				$.get( '../formbuilder/picklist', { pickListName: settingsObject.referencedata }, function( data ){
						        			var jqueryData = $( data );
						        			$.each( jqueryData, function( index, element ){
						        				if( $( element ).attr( 'id' ) == 'picklistItems' ){
						        					var picklist = $( element );
						        					$( '#picklist' ).children( 'option:not(:first)' ).remove();
						        					$( '#picklist' ).append( picklist.attr( 'innerHTML' ) );
						        					return false;
						        				}
						        			});
						        		});
				        			}
				        		});
				        		
				        		
				        		//$( '#picklistContainer select option' ).remove();
				        		//var options = $( '#fields' ).children().clone();
				        		//$( '#picklistContainer select' ).append( options );
				        		
				        	}else{
				        		$( '#constant' ).hide();
				        		$( '#textInput' ).remove();
				        		$( '#dateInput' ).datepicker( 'destroy' );
				        		$( '#dateInput' ).remove();
				        		$( '#picklistContainer' ).hide();
				        	}
				        }
				    }]
			    }
		    }]
		}];
	};
}