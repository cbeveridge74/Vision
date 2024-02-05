angular.module('vnDynamoModule')
.factory('vnRuleBlock', function(){
	var factory = {};

	factory.OR 	= "OR";
	factory.AND = "AND";

	factory.instance = function( 
		ruleBlocks, 
		conditions, 
		gate,
		trueActions,
		falseActions ){
		var _self 			= this;

		

		_self.ruleBlocks 	= ruleBlocks;
		_self.conditions 	= conditions;
		_self.gate 			= gate;
		_self.trueActions 	= trueActions;
		_self.falseActions 	= falseActions;
	}
	return factory;
});