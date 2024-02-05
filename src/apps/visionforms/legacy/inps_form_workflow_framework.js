/**
 * File used for any smoking form related JavaScript logic.
 */
function FormWorkflow() {}

/**
 * Validates all fields on the smoking form.  Does not validate any common fields
 * which are part of any other forms (e.g. clinicaldataentryform.jspx).
 * 
 * @param formId The unique identifier of the form - typically the row ID.
 * @returns {Boolean} Whether this form is valid.
 */
FormWorkflow.validateForm = function( form, validationConditionNames ) {
	var isFormInvalid = form.formConditions( 'runConditions', validationConditionNames ); 
	return isFormInvalid;
};

FormWorkflow.setUpConditions = function( form, conditions ) {
	form.formConditions({
	    conditions: conditions
	});
};


