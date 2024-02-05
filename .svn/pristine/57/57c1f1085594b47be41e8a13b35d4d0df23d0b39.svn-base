function MacroQuestionnaireComponentSettings(){
	
	var settings = new GenericComponentSettings();
	
	this.initialise = function(){
		$( "#" + MacroFormBuilderState.QUESTIONNAIRE ).html( 
				"<div class='form-item'>" + settings.createUniqueName() + "</div>" +
				"<div class='form-item'>" + settings.createEnitySearchPlaceholder() + "</div>" +
				"<div class='form-item'>" + settings.createEnitySearchId() + "</div>" +
				"<div class='form-item'>" + settings.createEnitySearchName() + "</div>" +
				"<div class='form-item'>" + settings.createAttributeDropDown() + "</div>" +
				createExplanation() +
				createQuestions() +
				createOptionTitles() +
				createIncludeScorebar() +
				createShowBradenExample()
		);
	};
	
	var createExplanation = function(){
		return "<div class='form-item'><div class='settings-label'>Explanation</div>" +
		"<textarea id='explanation' type='text' cols='50' rows='5'></textarea></div>";
	};
	
	var createQuestions = function(){
		return "<div class='form-item'><div class='settings-label'>Questions</div>" +
		"<textarea id='questions' type='text' cols='50' rows='5'></textarea></div>";
	};
	
	var createOptionTitles = function(){
		return "<div class='form-item'><div class='settings-label'>Option titles</div>" +
		"<textarea id='optiontitles' type='text' cols='50' rows='5'></textarea></div>";
	};
	
	var createIncludeScorebar = function(){
		return "<div class='form-item'><div class='settings-label'></div><input id='includescorebar' type='checkbox'></input>include scorebar</div>";
	};
	
	var createShowBradenExample = function(){
		return "<div class='form-item'><div class='settings-label'></div><input id='showbradenexample' type='checkbox'></input>show Braden Scale (demo example)</div>";
	};
}