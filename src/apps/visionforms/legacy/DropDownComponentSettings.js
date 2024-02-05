function DropDownComponentSettings(){
	
	var settings = new GenericComponentSettings();
		 
	this.initialise = function(){
		$( "#dropdown" ).html( settings.createGenericFields( 'default blank' )
				+ createReferenceData() );
	};
	
	var createReferenceData = function(){
		return "<div class='form-item'><div class='settings-label'>Reference data</div>" +
		"<select id='referencedata'>" +
		"<option></option>" +
		"<option>severityTypeList</option>" +
		"<option>certaintyTypeList</option>" +
		"<option>preventionTypeList</option>" +
		"<option>consultationTypeList</option>" +
		"<option>smokerTypeList</option>" +
		"<option>drinkerTypeList</option>" +
		"</select></div>";
	};
	
}