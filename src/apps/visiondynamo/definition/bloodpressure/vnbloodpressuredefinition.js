angular.module('vnDynamoModule')
.factory('vnBloodPressureDefinition', function(
		vnField,
		vnValue,
		vnFormDefinition,
		vnBloodPressureState
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

		var systolic = new vnField.instance();
		systolic.type = vnField.TEXT;
		systolic.label = "Systolic";
		systolic.target = "systolic";
		systolic.unit = "mmHg";
		systolic.valueType = vnField.VALUE_TYPE_NUMERIC;

		var diastolic = new vnField.instance();
		diastolic.type = vnField.TEXT;
		diastolic.label = "Diastolic";
		diastolic.target = "diastolic";
		diastolic.unit = "mmHg";
		diastolic.valueType = vnField.VALUE_TYPE_NUMERIC;

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
		factory.formDefinition.fields = [ systolic, diastolic, freeText, date, clinician ];

		// SHOULD COME FROM THE STATERULES MODEL
		factory.formDefinition.stateRules = vnBloodPressureState.retrieve();


		return factory.formDefinition;
	};
	return factory;
});