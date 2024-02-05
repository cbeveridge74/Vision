function HiddenComponentSettings(){
	
	var settings = new GenericComponentSettings();
		 
	this.initialise = function(){
		$( "#hidden" ).html( 
				"<div class='form-item'>" + settings.createUniqueName() + "</div>" +
				"<div class='form-item'>" + settings.createEnitySearchPlaceholder() + "</div>" +
				"<div class='form-item'>" + settings.createEnitySearchId() + "</div>" +
				"<div class='form-item'>" + settings.createEnitySearchName() + "</div>" +
				"<div class='form-item'>" + settings.createAttributeDropDown() + "</div>" +
				settings.createHiddenValue() );
	};
	
}