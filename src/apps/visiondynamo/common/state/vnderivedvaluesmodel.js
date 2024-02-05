angular.module('vnDynamoModule')
.factory('vnDerivedValuesModel', function( vnExceptionFactory ){
	var factory = {};

	var valueHash = {};

	factory.insertValue = function(key, value){
		valueHash[ key ] = value;
	};

	factory.retrieveValue = function( key ){
		return valueHash[ key ];
	};

	factory.containsKey = function( key ){
		return valueHash[ key ] != null;
	};

	factory.removeAll = function(){
		valueHash = {};
	};
	return factory;
});