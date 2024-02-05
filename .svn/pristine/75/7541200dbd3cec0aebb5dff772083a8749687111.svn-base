function DateComponentSettings(){
	
	var settings = new GenericComponentSettings();
		 
	this.initialise = function(){
		$( "#date" ).html( settings.createGenericFields( 'default today' )
				+ createDateValidations()
				+ createDateFormat()
		);
	};
	
	var createDateFormat = function(){
		return "<div class='form-item'><div class='settings-label'>Format</div>" +
		"<input id='format' type='text'></input></div>";
	};
	
	var createDateValidations = function(){
		return "<div class='form-item'><div class='settings-label'>" +
		"<label></label></div>" +
		"<input id='datenotbeforedob' type='checkbox'></input>not before date of birth&nbsp;&nbsp;&nbsp;&nbsp;" + 
		"<input id='datenotafterdod' type='checkbox'></input>not after date of death</div>";
	};
		
}