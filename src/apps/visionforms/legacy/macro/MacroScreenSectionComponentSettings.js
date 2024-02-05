function MacroScreenSectionComponentSettings(){
	
	var settings = new GenericComponentSettings();
	
	this.initialise = function(){
		$( "#" + MacroFormBuilderState.SCREEN_SECTION ).html( 
			"<div class='form-item'>" + settings.createUniqueName() + "</div>" +
			"<div class='form-item'>" + createTitle() + "</div>" +
			"<div class='form-item'>" + createCollapsable() + "</div>"
		);
	};
	
	var createCollapsable = function(){
		return 	"<div class='settings-label'></div>" +
				"<input id='sectioncollapsable' type='checkbox'></input>&nbsp;&nbsp;collapsable";
	};
	
	var createTitle = function(){
		return "<div class='settings-label'>Title</div>" +
		"<input id='sectiontitle' type='text'></input>";
	};
}