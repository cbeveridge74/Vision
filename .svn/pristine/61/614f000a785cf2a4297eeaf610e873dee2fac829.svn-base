function TextComponentSettings(){
	
	var settings = new GenericComponentSettings();
		 
	this.initialise = function(){
		$( "#textinput" ).html(
				settings.createGenericFields( 'default blank' )
				+ createTimeInput()
				+ createRestrictions()
				+ createReadonly()
				+ settings.createHiddenValue()
				+ settings.createUnits() );
	};
	
	var createRestrictions = function(){
		return  "<div class='form-item'><div class='settings-label'>Restrictions</div>" +
		"<select id='restrictions'>" +
		"<option></option>" +
		"<option>alphanumeric</option>" +
		"<option>alpha only</option>" +
		"<option>numeric only</option>" +
		"</select></div>" +
		"<div class='form-item'><div class='settings-label'>" +
		"" +
		"</div>Min chars<input id='minchars' type='text' size='6'>" +
		"Max chars<input id='maxChars' type='text' size='6'></div>";
	};
	
	var createReadonly = function(){
		return "<div class='form-item'><div class='settings-label'>Read only</div>" +
		"<input id='readonly' type='checkbox'></input></div>";
	};
	
	var createTimeInput = function(){
		return "<div class='form-item'><div class='settings-label'>Time input</div>" +
		"<input id='timeinput' type='checkbox'></input></div>";
	};
}