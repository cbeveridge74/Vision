/**
 * From the form structure, extract the first and last rows from each of the sections
 * 
 */
XMLUtil.findSectionSettingsAndFirstLastRows = function( formStructure ){
	
	var sections = formStructure.find( 'section' );
	var firstLastPairs = new Array();
	$.each( sections, function( index, sectionElement ){
		var children = $( sectionElement ).children();
		// Get the fieldId (the actual id when it's rendered for real) of the first component in the first 
		// and last rows 
		var firstRowId = children.filter( "row" ).filter( ":first" ).find( 'fieldid' ).filter( ':first' ).text();
		var lastRowId = children.filter( "row" ).filter( ":last" ).find( 'fieldid' ).filter( ':first' ).text();
		
		// Get all the fieldIds (ids as rendered in the form builder) of all the components that we currently have
		var allIds = FormBuilderState.fieldModel.getFieldIds();
		var firstLastPair = new Object;
		firstLastPair.settings = FormBuilderState.existingFormsInstance.createSettingsObjectForElement( $( sectionElement ) );
		// We now need to get the id of the component (as rendered in the form builder) and use it
		// to locate the correct first and last component in each section 
		$.each( allIds, function( index, element ){
			var field = FormBuilderState.fieldModel.retrieveField( element );
			if( field != null && field.getSettings().fieldid == firstRowId ){
				firstLastPair.firstRow = $( '#' + element ).closest( '.componentwrapper' ); 
			}
			if( field != null && field.getSettings().fieldid == lastRowId ){
				firstLastPair.lastRow = $( '#' + element ).closest( '.componentwrapper' ); 
			}
		});
		firstLastPairs.push( firstLastPair );
	});
	return firstLastPairs; 
};
