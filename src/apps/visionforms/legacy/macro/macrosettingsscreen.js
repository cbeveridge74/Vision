function MacroSettingsScreen(){
	
	var superInitialiseSettings = FormBuilderState.settingsScreenInstance.initialiseSettings;
	FormBuilderState.settingsScreenInstance.initialiseSettings = function(){
		$( "#tabs ul" ).append( '<li><a href="#' + MacroFormBuilderState.SCREEN_BREAK + '">Screen break</a></li>' +
								'<li><a href="#' + MacroFormBuilderState.SCREEN_SECTION + '">Screen section</a></li>' + 
								'<li><a href="#' + MacroFormBuilderState.FORM_FRAGMENT + '">Form fragment</a></li>' +
								'<li><a href="#' + MacroFormBuilderState.QUESTIONNAIRE + '">Questionnaire</a></li>');
		$( "#settingsForm" ).append( '<div id="' + MacroFormBuilderState.SCREEN_BREAK + '"><!-- REQUIRED --></div>' +
									 '<div id="' + MacroFormBuilderState.SCREEN_SECTION + '"><!-- REQUIRED --></div>' +
									 '<div id="' + MacroFormBuilderState.FORM_FRAGMENT + '"><!-- REQUIRED --></div>' +
									 '<div id="' + MacroFormBuilderState.QUESTIONNAIRE + '"><!-- REQUIRED --></div>');
		superInitialiseSettings.call( this );
	};
	
	var superJSONifyFields = FormBuilderState.settingsScreenInstance.JSONifyFields;
	FormBuilderState.settingsScreenInstance.JSONifyFields = function(){
		var json = superJSONifyFields.call( this );
		var questions = json.questions;
		var optiontitles = json.optiontitles;
		
		if( questions != null && !$.isArray( questions ) ){
			var arraySettings = questions.split(/\n/);
			json.questions = new Object();
			json.questions.question = new Array();
			$.each( arraySettings, function( index, element ){
				element = $.trim( element );
				if( element.length > 0 ){
					json.questions.question.push( element );
				}
			});
		}
		
		if( optiontitles != null && !$.isArray( optiontitles ) ){
			var arraySettings = optiontitles.split(/\n/);
			json.optiontitles = new Object();
			json.optiontitles.optiontitle = new Array();
			$.each( arraySettings, function( index, element ){
				element = $.trim( element );
				if( element.length > 0 ){
					json.optiontitles.optiontitle.push( element );
				}
			});
		}
		return json;
	};
	
	
	
	var superOpenConfiguration = FormBuilderState.settingsScreenInstance.openConfiguration;
	FormBuilderState.settingsScreenInstance.openConfiguration = function(event) {
		if( FormBuilderState.fieldModel.retrieveField( FormBuilderState.fieldModel.getCurrentFieldId() ).getType() == "formfragment" ){
			$( FormBuilderState.macroFormFragmentFieldChoicesInstance ).bind( MacroFormFragmentFieldChoicesEvent.MACRO_FORM_FRAGMENT_FIELD_SELECTED, handleChoiceSelected );
			$( FormBuilderState.macroFormFragmentFieldChoicesInstance ).bind( MacroFormFragmentFieldChoicesEvent.MACRO_FORM_FRAGMENT_FIELD_CANCELLED, handleChoiceCancelled );
			
			$('#configurationDialog').dialog('close');
			$('#configurationDialog').dialog('destroy');
			
			$.get("../formbuilder/formfragmentfieldchoices", {
			}, function(data) {
				showDialog(data, 'Field Fragment', 300, 300);
			});
		}else{
			superOpenConfiguration.call( this );
		}
	};
	
	var handleChoiceSelected = function(){
		superOpenConfiguration.call( this );
		$( FormBuilderState.macroFormFragmentFieldChoicesInstance ).unbind( MacroFormFragmentFieldChoicesEvent.MACRO_FORM_FRAGMENT_FIELD_SELECTED, handleChoiceSelected );
		$( FormBuilderState.macroFormFragmentFieldChoicesInstance ).unbind( MacroFormFragmentFieldChoicesEvent.MACRO_FORM_FRAGMENT_FIELD_CANCELLED, handleChoiceCancelled );
	};
	
	var handleChoiceCancelled = function(){
		$( FormBuilderState.macroFormFragmentFieldChoicesInstance ).unbind( MacroFormFragmentFieldChoicesEvent.MACRO_FORM_FRAGMENT_FIELD_SELECTED, handleChoiceSelected );
		$( FormBuilderState.macroFormFragmentFieldChoicesInstance ).unbind( MacroFormFragmentFieldChoicesEvent.MACRO_FORM_FRAGMENT_FIELD_CANCELLED, handleChoiceCancelled );
	};
}

