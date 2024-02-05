function FieldObjectEvent(){}

FieldObjectEvent.INTERNAL_UPDATE = "internalupdate";
FieldObjectEvent.SETTINGS_UPDATED = "settingsupdated";

function FieldObject(){
	
	var self = this;
	var type;
	var id;
	var settings;
	var advancedWorkflow;
	
	this.setType = function( value ){
		type = value;
	};
	
	this.getType = function(){
		return type;
	};
	
	this.setId = function( value ){
		id = value;
	};
	
	this.getId = function(){
		return id;
	};
	
	this.setSettings = function( value ){
		settings = value;
		$( self ).trigger( FieldObjectEvent.INTERNAL_UPDATE, [ settings ] );
		$( self ).trigger( FieldObjectEvent.SETTINGS_UPDATED, [ settings ] );
	};
	
	this.getSettings = function(){
		return settings;
	};
	
	this.setAdvancedWorkflow = function( value ){
		advancedWorkflow = value;
	};
	
	this.getAdvancedWorkflow = function(){
		return advancedWorkflow;
	};
}