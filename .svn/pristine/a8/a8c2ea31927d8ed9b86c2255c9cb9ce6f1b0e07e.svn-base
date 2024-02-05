function SettingsScreenEvent() {
}

SettingsScreenEvent.SETTINGS_SCREEN_ENTITY_ATTRIBUTES_UPDATED = "settingsscreenentityattributesupdated";


function SettingsScreen() {

	

	var tabs = {};
	tabs[ "textinput" ] = 0;
	tabs[ "dropdown" ] = 1;
	tabs[ "numeric" ] = 2;
	tabs[ "search" ] = 3;
	tabs[ "date" ] = 4;
	tabs[ "hidden" ] = 5;

	var _self = this;
	var ENTITY_NAME = 'entityname';
	var MARKUP_PATTERN = "@@##@@";

	_self.availableAttributes;

	this.initialiseSettings = function() {
		// There's no reason why this is in tabs, just the way I started to do
		// it...
		try{
			$( "#tabs" ).tabs( "destroy" );
		}catch( e ){

		}
		


		$("#tabs").tabs({
			show : handleShow
		}).addClass('ui-tabs-vertical ui-helper-clearfix');
		$("#tabs li").removeClass('ui-corner-top').addClass('ui-corner-left');
		$("#tabs ul").removeClass('ui-widget-header');
		$("#tabs .ui-tabs-nav").css('display', 'none');

		initialiseAllSettingScreens();
		openCorrectTab();
		initialiseComponentNameEqualId();
		initialiseSaveAndApplyButtons();
		initialiseCancelButton();
		$(_self).bind(
				SettingsScreenEvent.SETTINGS_SCREEN_ENTITY_ATTRIBUTES_UPDATED,
				handleSettingsAttributesUpdated);
		
	};


	var handleShow = function(event, ui) {
		var settings = FormBuilderState.fieldModel.retrieveField(
				FormBuilderState.fieldModel.getCurrentFieldId()).getSettings();

		setTimeout(
				function() {
					$('#settingsEntitySearch_searchField').closest(
							'.inps_class_hint_fieldset').appendTo(
							$(ui.panel).find('.entity-placeholder'));
					$('#settingsEntitySearch_searchField').attr('name',
							'entityname');
					if (settings != null && settings.entityname != null) {
						retrieveEntityAttributesFor(FormBuilderState.fieldModel
								.retrieveField(
										FormBuilderState.fieldModel
												.getCurrentFieldId())
								.getSettings().entityid);
					}
				}, 250);

		setTimeout(
				function() {
					var saveAsElement = $('select[name="saveas"]').filter(":visible");
					saveAsElement.jec();
					setSaveAsValue();
					markUpFirstElementSelection( saveAsElement );
					saveAsElement.unbind( 'change keyup' );
					saveAsElement.bind( 'change keyup', handleSaveAsClick );
				}, 1000);

	};
	
	var setSaveAsValue = function(){
		var settings = FormBuilderState.fieldModel.retrieveField(
				FormBuilderState.fieldModel.getCurrentFieldId()).getSettings();
		
		var saveAsElement = $('select[name="saveas"]').filter(":visible");
		
		if (settings != null
				&& settings.saveas != null
				&& settings.saveas.indexOf( MARKUP_PATTERN ) > -1 ) {
			saveAsElement.jecValue(
					settings.saveas );
			markUpFirstElementSelection( saveAsElement );
		}
		
	};
	
	var handleSaveAsClick = function( event ){
		markUpFirstElementSelection( $( event.currentTarget ) );
	};
	
	var markUpFirstElementSelection = function( selectElement ){
		var selectedFirstElement = selectElement.children( ':first:selected' );
		if( selectedFirstElement.length > 0 ){
			selectedFirstElement.val( selectedFirstElement.val().replace( MARKUP_PATTERN, "" ) );
			selectedFirstElement.val( MARKUP_PATTERN + selectedFirstElement.val() );
			selectedFirstElement.text( $.trim( selectedFirstElement.text().replace( MARKUP_PATTERN, '' ) ) );
		}
	};

	var handleSettingsAttributesUpdated = function(event, attributes) {
		var saveAsSelectElement = $('select[name="saveas"]').filter(":visible");
		saveAsSelectElement.children().remove();
		var optionsString = "<OPTION></OPTION>";
		$.each(attributes, function(index, element) {
			var option;
			if (FormBuilderState.fieldModel.getCurrentFieldId() != null
					&& FormBuilderState.fieldModel.retrieveField(
							FormBuilderState.fieldModel.getCurrentFieldId())
							.getSettings() != null
					&& FormBuilderState.fieldModel.retrieveField(
							FormBuilderState.fieldModel.getCurrentFieldId())
							.getSettings().saveas == element.name) {
				option = "<OPTION selected>";
			} else {
				option = "<OPTION>";
			}
			optionsString += option + element.name + "</OPTION>";
		});
		saveAsSelectElement.append(optionsString);
		saveAsSelectElement.jecOff();
		saveAsSelectElement.jecOn();
		setSaveAsValue();
		markUpFirstElementSelection( saveAsSelectElement );
	};

	this.handleEntitySearchSelect = function(event, data) {
		$("input[name='entityname']").filter(":visible").val(data.item.value);
		$("input[name='entityshortname']").filter(":visible").val(data.item.shortName);
		$("input[name='entityid']").filter(":visible").val(data.item.id);
		retrieveEntityAttributesFor(data.item.id);
	};

	var retrieveEntityAttributesFor = function(entityId) {

		if (entityId == null || entityId.length < 1) {
			return;
		}
		AjaxHandler
				.ajax({
					url : "../formbuilder/getentityattributes/" + entityId,
					dataType : "json",
					delay : 1,
					success : function(data) {
						_self.availableAttributes = new Array();
						$.map(data, function(item) {
							_self.availableAttributes.push({
								id : item.id,
								name : item.name
							});
						});
						$(_self)
								.trigger(
										SettingsScreenEvent.SETTINGS_SCREEN_ENTITY_ATTRIBUTES_UPDATED,
										[ _self.availableAttributes ]);
					},
					failure : thisFailureHandler
				});

	};

	var thisFailureHandler = function(a, b, c) {
		alert("Unable to retrieve the Entities attributes");
	};

	this.JSONifyFields = function() {
		var jsonSettings = $("#settingsForm :visible").serializeArray();
		var json = {};
		for (i in jsonSettings) {
			json[jsonSettings[i].name] = jsonSettings[i].value;
		}
		return json;
	};

	this.openConfiguration = function(event) {
		//$('#configurationDialog').dialog('close');
		//$('#configurationDialog').dialog('destroy');

		var pickList = $('#referencedata').val();
		$.get("apps/visionforms/legacy/configuration.html", {
			pickListName : pickList
		}, function(data) {
			showDialog(data, 'Configuration', 1300, 700);
			setTimeout( function(){
				FormBuilderState.configurationScreenInstance.initialiseConfiguration();
			}, 1000 );
 			

		});
	};

	var initialiseAllSettingScreens = function() {
		$.each(FormBuilderState.componentSettings, function(index, element) {
			element.initialise();
		});

		
		$( '.advanced-button' ).click( _self.openConfiguration );

		//onclick='FormBuilderState.settingsScreenInstance.openConfiguration( event );'
	};

	var initialiseCancelButton = function() {
		$("#settingsCancelButton").click(function() {
			$('#configurationDialog').dialog('close');
		});
	};

	var initialiseSaveAndApplyButtons = function() {
		console.log( "#settingsSaveButton" );
		$("#settingsSaveButton, #settingsApplyButton").click(function(event) {
			var jsonSettings = _self.JSONifyFields();
			appendSettings(jsonSettings);
		});
	};

	var appendSettings = function(jsonSettings) {

		FormBuilderState.fieldModel.retrieveField(
				FormBuilderState.fieldModel.getCurrentFieldId()).setSettings(
				jsonSettings);

		if ($(event.currentTarget).val() == 'Save') {
			$('#settingsDialog').dialog('close');
			$('#settingsDialog').dialog('destroy');
			$('#settingsDialog').html('');
		}
	};

	var initialiseComponentNameEqualId = function() {
		$.each($('#settingsForm :input'), function(index, element) {
			$(element).attr('name', $(element).attr('id'));
		});
	};

	var openCorrectTab = function() {
		$( "#tabs" ).tabs( "option", "active", tabs[ FormBuilderState.fieldModel.retrieveField(
										FormBuilderState.fieldModel
												.getCurrentFieldId()).getType() ] );

		
		

		/*console.log( FormBuilderState.fieldModel.retrieveField(
										FormBuilderState.fieldModel
												.getCurrentFieldId()).getType() );
		
			$( '#' + FormBuilderState.fieldModel.retrieveField(
										FormBuilderState.fieldModel
												.getCurrentFieldId()).getType() ).tabs( "option", "show", { effect: "blind", duration: 800 });*/
		
		

		/*$("#tabs") 
				.tabs(
						"select",
						'#'
								+ FormBuilderState.fieldModel.retrieveField(
										FormBuilderState.fieldModel
												.getCurrentFieldId()).getType());*/
	};
}