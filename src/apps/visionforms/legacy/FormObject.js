function FormObjectEvent(){}

FormObjectEvent.TITLE_UPDATE = "FormObjectEvent_titleupdate";

function FormObject(){
	var self = this;
	var formTriggeredBy;
	var formUniqueId;
	var formTitle;
	
	self.getFormTriggeredBy = function(){
		return formTriggeredBy;
	};
	
	self.setFormTriggeredBy = function( value ){
		formTriggeredBy = value;
	};
	
	self.getFormUniqueId = function(){
		return formUniqueId;
	};
	
	self.setFormUniqueId = function( value ){
		formUniqueId = value;
	};
	
	self.getFormTitle = function(){
		return formTitle;
	};
	
	self.setFormTitle = function( value ){
		formTitle = value;
		$( self ).trigger( FormObjectEvent.TITLE_UPDATE, [ value ] );
	};
}