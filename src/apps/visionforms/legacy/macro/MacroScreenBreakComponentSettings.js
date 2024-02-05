function MacroScreenBreakComponentSettings(){
	
	var settings = new GenericComponentSettings();
		 
	this.initialise = function(){
		$( "#" + MacroFormBuilderState.SCREEN_BREAK ).html( settings.createGenericFields( 'default blank' ) );
	};
}