function MacroFormBuilderState(){}

FormBuilderState.macroScreenBreakComponentSettingsInstance 			= new MacroScreenBreakComponentSettings();
FormBuilderState.macroScreenSectionComponentSettingsInstance 		= new MacroScreenSectionComponentSettings();
FormBuilderState.macroFormFragmentComponentSettingsInstance 		= new MacroFormFragmentComponentSettings();
FormBuilderState.macroQuestionnaireComponentSettingsInstance 		= new MacroQuestionnaireComponentSettings();

FormBuilderState.componentSettings.push( FormBuilderState.macroScreenBreakComponentSettingsInstance );
FormBuilderState.componentSettings.push( FormBuilderState.macroScreenSectionComponentSettingsInstance );
FormBuilderState.componentSettings.push( FormBuilderState.macroFormFragmentComponentSettingsInstance );
FormBuilderState.componentSettings.push( FormBuilderState.macroQuestionnaireComponentSettingsInstance );

MacroFormBuilderState.SCREEN_BREAK 			= "screenbreak";
MacroFormBuilderState.SCREEN_SECTION 		= "screensection";
MacroFormBuilderState.FORM_FRAGMENT 		= "formfragment";
MacroFormBuilderState.SECTION_FIRST_ROW 	= "sectionfirstrow";
MacroFormBuilderState.SECTION_LAST_ROW 		= "sectionlastrow";
MacroFormBuilderState.SECTION_NAME 			= "sectionname";
MacroFormBuilderState.QUESTIONNAIRE 		= "questionnaire";


FormBuilderState.componentClassNames += ",." + MacroFormBuilderState.SCREEN_BREAK + "component,." 
											 + MacroFormBuilderState.SCREEN_SECTION + "component,." 
											 + MacroFormBuilderState.FORM_FRAGMENT + "component,."
											 + MacroFormBuilderState.QUESTIONNAIRE + "component";

FormBuilderState.macroMainScreenInstance 				= new MacroMainScreen();
FormBuilderState.macroExistingFormsInstance 			= new MacroExistingForms();
FormBuilderState.macroSettingsScreenInstance 			= new MacroSettingsScreen();
FormBuilderState.macroConfigurationInstance 			= new MacroConfiguration();
FormBuilderState.macroFormFragmentFieldChoicesInstance	= new MacroFormFragmentFieldChoices();

FormBuilderState.macroFieldModel = new MacroFieldModel();
