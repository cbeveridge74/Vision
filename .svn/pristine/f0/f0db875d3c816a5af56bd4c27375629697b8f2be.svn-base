angular.module('vnDynamoModule')
.factory('vnHeightState', function(
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
					new vnCondition.instance( "height", new vnLessThan.instance(), new vnValue.instance( 0.4 ) ),
					new vnCondition.instance( "height", new vnGreaterThan.instance(), new vnValue.instance( 2.3 ) )], 
					vnRuleBlock.OR, 
					[ 
						new vnShowValidationMessage.instance( [ "height", "Min 0.4m, Max 2.3m" ] )
					], 
					null );

		var valueLogicMandatory = 
				new vnRuleBlock.instance( 
					null, 
					[
					new vnCondition.instance( "height", new vnEquals.instance(), new vnValue.instance( "" ) ) ], 
					vnRuleBlock.OR, 
					[ 
						new vnShowValidationMessage.instance( [ "height", "Value is mandatory" ] )
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
						new vnClearValidationMessage.instance( [ "height" ] )
					] );




			return [ new vnStateRule.instance( null, "height", false, false, true, false, 
				[ joined ] ) ];


		//return [ valueLogicMinMax ];
	};
	return factory;
});

