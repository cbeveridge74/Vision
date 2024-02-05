function NumericComponentSettings(){
	
	var settings = new GenericComponentSettings();
		 
	this.initialise = function(){
		$( "#numeric" ).html( 
				settings.createGenericFields( 'default blank' )
				+ createIncrements()
				+ settings.createUnits()
				+ createMinMax() );
	};
	
	var createIncrements = function(){
		return "<div class='form-item'><div class='settings-label'>Increments</div>" +
		"<input id='increments' type='text' size='6'></input></div>";
	};
	
	var createMinMax = function(){
		return "<div class='form-item'><div class='settings-label'>Min</div>" +
		"<input id='min' type='text'></input></div>" +
		"<div class='form-item'><div class='settings-label'>Max</div>" +
		"<input id='max' type='text'></input></div>";
	};
	
}