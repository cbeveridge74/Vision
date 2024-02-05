function XMLUtil(){}

XMLUtil.findEntityName = function( formStructure ){
	return formStructure.find( 'root' ).attr( 'formname' );
};

XMLUtil.findFormId = function( formStructure ){
	return formStructure.find( 'root' ).attr( 'formid' );
};

XMLUtil.findFormTitle = function( formStructure ){
	return formStructure.find( 'root' ).attr( 'formtitle' );
};

XMLUtil.findRows = function( formStructure ){
	return formStructure.find( 'row' );
};

XMLUtil.XMLifyFormStructure = function( formStructure ){
	// Get rid of the start and end quotes
	formStructure = $.trim( formStructure ).substring( 1, $.trim( formStructure ).length - 1 );
	formStructure = $.parseXML( formStructure );
	return $( formStructure );
};