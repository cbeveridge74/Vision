addValidation();

function addValidation(){
	$( '#fieldid' ).on( "keyup", checkForDuplicateNames );
};

function checkForDuplicateNames( event ){
	var fieldValue = $( event.currentTarget ).val();
	var fieldObjectsIds = FormBuilderState.configurationScreenInstance.buildUniqueNameObjects();
	
	$.each( fieldObjectsIds, function( index, element ){
		if( FormBuilderState.fieldModel.getCurrentFieldId() != null && 
			FormBuilderState.fieldModel.retrieveField( FormBuilderState.fieldModel.getCurrentFieldId() ).getSettings() != null &&
			( element.id != "#" + FormBuilderState.fieldModel.retrieveField( FormBuilderState.fieldModel.getCurrentFieldId() ).getSettings().fieldid  ) 
		 && ( element.id == "#" + fieldValue ) ){
			showValidationMessage( $( event.currentTarget ), "'" + fieldValue + "' already exists on this form." );
			return false;
		}else{
			hideValidationMessage( $( event.currentTarget ) );
		}
	});
};

function showValidationMessage( targetElement, message ){
	$( targetElement ).css( "border-color", "red" );
	$( targetElement ).qtip({
		   content: message,
		   style: { 
			      name: 'red',
			      tip: 'leftMiddle'
			   },
		   position: {
			   corner: {
				   target: 'middleRight',
			       tooltip: 'middleLeft'
			   }
		   }
		});
	$( targetElement ).qtip("show");
}

function hideValidationMessage( targetElement ){
	if( 'object' === typeof $( targetElement ).data('qtip') ){
		$( targetElement ).css( "border-color", "" );
		$( targetElement ).qtip( "destroy" );
	}
}

function GenericComponentSettings(){
	var self = this;
	
	this.createGenericFields = function( defaultLabel ){
		return "<div class='form-item'>" + self.createUniqueName() + "</div>" +
		"<div class='form-item'>" + self.createEnitySearchPlaceholder() + "</div>" +
		"<div class='form-item'>" + self.createEnitySearchId() + "</div>" +
		"<div class='form-item'>" + self.createEnitySearchName() + "</div>" +
		"<div class='form-item'>" + self.createAttributeDropDown() + "</div>" +
		"<div class='form-item'>" +  self.createLabel()
		+ self.createRemoveLabel() + "</div>"
		+ "<div class='form-item'>" + createLabelWeight() + "</div>"
		+ "<div class='form-item'>" + self.createComponentSize() + "</div>"
		+ "<div class='form-item'>" + self.createContainerSize() + "</div>"
		+ "<div class='form-item'>" + self.createBasicValidation( defaultLabel ) + "</div>"
		+ "<div class='form-item'>" + createHorizontalAlignment() + "</div>";
	};
	
	this.createHiddenValue = function(){
		return "<div class='form-item'><div class='settings-label'>Value</div><input id='hiddenvalue' type='text'></input></div>";
	};
	
	this.createUnits = function(){
		return "<div class='form-item'><div class='settings-label'>Units</div>" +
		"<input id='units' type='text'></input></div>";
	};
	
	this.createEnitySearchPlaceholder = function(){
		/*return "<div class='settings-label'>Entity</div>" +
		"<div class='entity-placeholder'></div>";*/

		//return "<label>Search Text: <input type='text' name='searchField' class='searchFieldID'/></label><div id='resultID'></div>";
		return "<input class='form settings typeahead' type='text' placeholder='Read term...'>"
	};
	
	this.createEnitySearchId = function(){
		return "<div class='settings-label'>Entity Id</div>" +
		"<input id='entityid' type='text' readonly='readonly'></input>";
	};
	
	this.createEnitySearchName = function(){
		return "<div class='settings-label'>Entity short name</div>" +
		"<input id='entityshortname' type='text' readonly='readonly'></input>";
	};
	
	this.createUniqueName = function(){
		return "<div class='settings-label'>Unique ID</div>" +
		"<input id='fieldid' type='text'></input>";
	};
	
	this.createAttributeDropDown = function(){
		
		return  "<div class='settings-label'>Save as</div>" +
		"<select id='saveas' style='min-width: 9em;'>" +
		"<option></option>" +
		"</select>";
	};
	
	this.createLabel = function(){
		return  "<div class='settings-label'>Label</div>" +
		"<input id='label' type='text'></input>";
	};
	
	this.createRemoveLabel = function(){
		return  "<input id='removelabel' type='checkbox'></input>remove label area";
	};

	this.createComponentSize = function(){
		return "<div class='settings-label'>Component size</div>" +
		"<select id='componentsize'>" +
		"<option></option>" +
		"<option>small</option>" +
		"<option>medium</option>" +
		"<option>large</option>" +
		"</select>";
	};
	
	this.createContainerSize = function(){
		return "<div class='settings-label'>Container size</div>" +
		"<select id='containersize'>" +
		"<option></option>" +
		"<option>small</option>" +
		"<option>medium</option>" +
		"<option>large</option>" +
		"</select>";
	};
	
	var createLabelWeight = function(){
		return "<div class='form-item'><div class='settings-label'>Label weight</div>" +
		"<select id='labelweight'>" +
			"<option></option>" +
			"<option>normal</option>" +
			"<option>bold</option>" +
		"</select></div>";
	};
	
	
	this.createBasicValidation = function( defaultLabel ){
		var returnHtml = "<div class='settings-label'>Validation</div>" +
		"<input id='required' type='checkbox'></input>required &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + self.createAdvancedButton();
		
		if( defaultLabel ){
			returnHtml += "<div class='form-item'><div class='settings-label'>" +
			"</div>" +
			"<input id='defaultvalue' type='checkbox'></input>" + defaultLabel + "</div>";
		}
		return returnHtml;
		
	};
	
	this.createAdvancedButton = function(){
		return "<input type='button' class='advanced-button' value='Advanced'/>";
	};
	
	var createHorizontalAlignment = function(){
		return "<div class='settings-label'>Horizontal alignment</div>" +
		"<select id='horizontalalignment'>" +
		"<option></option>" +
		"<option>left-aligned</option>" +
		"<option>center-aligned</option>" +
		"<option>right-aligned</option>" +
		"</select>";
	};
	
}