angular.module('vnDynamoModule')
.factory('vnStateRule', function(){
	var factory = {};

	factory.instance = function( 
		name, 
		target, 
		runOnInitialise,
		runOnInitialiseOnly,
		runOnSave,
		runOnSaveOnly,
		ruleBlocks ){
		
		var _self 					= this;

		_self.name 					= name;
		_self.target 				= target;
		_self.runOnInitialise 		= runOnInitialise;
		_self.runOnInitialiseOnly 	= runOnInitialiseOnly;
		_self.runOnSave 			= runOnSave;
		_self.runOnSaveOnly 		= runOnSaveOnly;
		_self.ruleBlocks 			= ruleBlocks;
	}
	return factory;
});
