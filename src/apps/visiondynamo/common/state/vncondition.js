angular.module('vnDynamoModule')
.factory('vnCondition', function(){
	var factory = {};

	factory.instance = function( target, operator, value ){ //args[0] = target
		var _self 		= this;
		_self.target 	= target;
		_self.operator 	= operator;
		_self.value 	= value;
	}
	return factory;
});
