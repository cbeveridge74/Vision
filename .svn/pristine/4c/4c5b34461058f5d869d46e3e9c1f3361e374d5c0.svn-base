angular.module('vnDynamoModule')
.factory('vnWeightState', function(
	vnRuleBlock,
	vnCondition,
	vnLessThan,
	vnGreaterThan,
	vnEquals,
	vnValue,
	vnShowValidationMessage,
	vnClearValidationMessage,
	vnStateRule
	){
	var factory = {};

	factory.retrieve = function(){
		var stateRules = new Array();

		var valueLogicMinMax = new vnRuleBlock.instance( 
					null, 
					[ 
					new vnCondition.instance( "weight", new vnLessThan.instance(), new vnValue.instance( 0.5 ) ),
					new vnCondition.instance( "weight", new vnGreaterThan.instance(), new vnValue.instance( 180 ) )], 
					vnRuleBlock.OR, 
					[ 
						new vnShowValidationMessage.instance( [ "weight", "Min 0.5kg, Max 180kg" ] )
					], 
					null );

		var valueLogicMandatory = 
				new vnRuleBlock.instance( 
					null, 
					[
					new vnCondition.instance( "weight", new vnEquals.instance(), new vnValue.instance( "" ) ) ], 
					vnRuleBlock.OR, 
					[ 
						new vnShowValidationMessage.instance( [ "weight", "Value is mandatory" ] )
					], 
					null );

		var joined = 

				new vnRuleBlock.instance( 
					[ valueLogicMandatory,
					  valueLogicMinMax], 
					null, 
					vnRuleBlock.OR, 
					null, 
					[ 
						new vnClearValidationMessage.instance( [ "weight" ] )
					] );




			return [ new vnStateRule.instance( null, "weight", false, false, true, false, 
				[ joined ] ) ];


		//return [ valueLogicMinMax ];
	};
	return factory;
});

