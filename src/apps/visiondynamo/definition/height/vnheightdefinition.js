angular.module('vnDynamoModule')
.factory('vnHeightDefinition', function(
		vnField,
		vnValue,
		vnFormDefinition,
		vnHeightState
	){
	var factory = {};

	factory.retrieve = function(){
		var DOBDerived = new vnValue.instance ( "DOB", vnValue.DERIVED);
		var clinicianDerived = new vnValue.instance ( "DEFAULT_CLINICIAN", vnValue.DERIVED);

		var date = new vnField.instance();
		date.type = vnField.DATE;
		date.label = "Date";
		date.target = "date";
		date.minValue = DOBDerived.getValue().format( "YYYY-MM-DD" );


		var freeText = new vnField.instance();
		freeText.type = vnField.TEXTAREA;
		freeText.label = "Comment";
		freeText.target = "comment";
		freeText.maxLength = 600;


		var field = new vnField.instance();
		field.type = vnField.TEXT;
		field.label = "Height";
		field.target = "height";
		field.unit = "m";
		field.valueType = field.VALUE_TYPE_NUMERIC;

		var clinician = new vnField.instance();
		clinician.type = vnField.COMBOBOX;
		clinician.label = "Clinician";
		clinician.target = "clinician";
		clinician.dataSource = "clinicians";
		clinician.displayValue = clinicianDerived.getValue();

		/*comboData[ CLINICIAN ] = new String[] {   
					"Miss Julia McDermott",
					"Dr Rebecca Keys",
					"Dr Reg Doctor"
				};*/
		
		
		factory.formDefinition = new vnFormDefinition.instance();
		factory.formDefinition.fields = [ field, freeText, date, clinician ];

		// SHOULD COME FROM THE STATERULES MODEL
		factory.formDefinition.stateRules = vnHeightState.retrieve();


		return factory.formDefinition;
	};
	return factory;
});