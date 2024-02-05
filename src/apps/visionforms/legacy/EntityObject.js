function EntityObjectEvent(){}

EntityObjectEvent.ENTITY_ATTRIBUTES_UPDATED = "entityattributesupdated";

function EntityObject(){
	
	var self = this;
	self.id = "";
	self.name = "";
	self.shortName = "";
	self.availableAttributes = new Array();
	
	self.setId = function( id ){
		self.id = id;
		retrieveEntityAttributes( id );
	};
	
	self.getId = function(){
		return self.id;
	};
	
	self.setName = function( name ){
		self.name = name;
	};
	
	self.getName = function(){
		return self.name;
	};
	
	self.setShortName = function( shortName ){
		self.shortName = shortName;
	};
	
	self.getShortName = function(){
		return self.shortName;
	};
	
	self.getAttributes = function(){
		return self.availableAttributes;
	};
	
	var retrieveEntityAttributes = function( entity ){
		AjaxHandler.ajax({
	         url: "../formbuilder/getentityattributes/" + entity,
			 dataType: "json",
	         delay: 1,
	         success: function(data) {
	        	 self.availableAttributes = new Array();
	        	 $.map( data, function( item ) {
	        		 self.availableAttributes.push( { id: item.id, name: item.description, shortName: item.name } );
	    		});
	    		$( self ).trigger( EntityObjectEvent.ENTITY_ATTRIBUTES_UPDATED, [ self.availableAttributes ] );
	         },
	        failure: thisFailureHandler
		});
	};
	
	var thisFailureHandler = function( a, b, c ){
		alert( "Unable to retrieve the Entities attributes" );
	};
	
	
}