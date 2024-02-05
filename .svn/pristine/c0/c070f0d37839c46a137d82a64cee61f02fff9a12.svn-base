angular.module('vnDynamoModule')
.factory('vnBloodPressureState', function(
	vnRuleBlock,
	vnCondition,
	vnLessThan,
	vnGreaterThan,
	vnEquals,
	vnNotEquals,
	vnValue,
	vnShowValidationMessage,
	vnClearValidationMessage,
	vnStateRule
	){
	var factory = {};

	factory.retrieve = function(){

		var stateRules = new Array();
		var systolicLogicAllowed = 

			new vnRuleBlock.instance( 
				null, 
				[ 
					new vnCondition.instance( "systolic", new vnLessThan.instance(), new vnValue.instance( "diastolic", vnValue.TARGET ) ),
					new vnCondition.instance( "systolic", new vnEquals.instance(), new vnValue.instance( "diastolic", vnValue.TARGET ) )
				],
				vnRuleBlock.OR, 
				[ 
					new vnShowValidationMessage.instance( [ "systolic", "Systolic must be greater than diastolic" ] )
				], 
				null );

			var systolicLogicRemoveDiastolicMessage = 

				new vnRuleBlock.instance( 
					null, 
					[
						new vnCondition.instance( "systolic", new vnGreaterThan.instance(), new vnValue.instance( "diastolic", vnValue.TARGET ) ),
						new vnCondition.instance( "systolic", new vnNotEquals.instance(), new vnValue.instance( "diastolic", vnValue.TARGET ) ),
						new vnCondition.instance( "diastolic", new vnNotEquals.instance(), new vnValue.instance( "" ) )
					],
					vnRuleBlock.AND, 
					[ 
						new vnClearValidationMessage.instance( [ "diastolic" ]),
						new vnClearValidationMessage.instance( [ "systolic" ])
					], 
					null );

			var systolicLogicMandatory = 
				new vnRuleBlock.instance( 
					null, 
					[ new vnCondition.instance( "systolic", new vnEquals.instance(), new vnValue.instance( "" ) ) ], 
					vnRuleBlock.OR, 
					[ 
						new vnShowValidationMessage.instance( [ "systolic", "Systolic is mandatory" ] )
					], 
					null );

			var diastolicLogicAllowed = 

				new vnRuleBlock.instance( 
					null, 
					[ 
						new vnCondition.instance( "diastolic", new vnGreaterThan.instance(), new vnValue.instance( "systolic", vnValue.TARGET ) ),
						new vnCondition.instance( "diastolic", new vnEquals.instance(), new vnValue.instance( "systolic", vnValue.TARGET ) )
					],
					vnRuleBlock.OR, 
					[
						new vnShowValidationMessage.instance( [ "diastolic", "Diastolic must be less than systolic" ] )
					], 
					null );
			
			var diastolicLogicRemoveSystolicMessage = 

				new vnRuleBlock.instance( 
					null, 
					[ 
						new vnCondition.instance( "diastolic", new vnLessThan.instance(), new vnValue.instance( "systolic", vnValue.TARGET ) ),
						new vnCondition.instance( "diastolic", new vnNotEquals.instance(), new vnValue.instance( "systolic", vnValue.TARGET ) ),
						new vnCondition.instance( "systolic", new vnNotEquals.instance(), new vnValue.instance( "" ) )
					],
					vnRuleBlock.AND, 
					[ 
						new vnClearValidationMessage.instance( [ "systolic" ]),
						new vnClearValidationMessage.instance( [ "diastolic" ])
					], 
					 null );
				
			var diastolicLogicMandatory = 
				new vnRuleBlock.instance( 
					null, 
					[ new vnCondition.instance( "diastolic", new vnEquals.instance(), new vnValue.instance( "" ) ) ], 
					vnRuleBlock.OR, 
					[
						new vnShowValidationMessage.instance( [ "diastolic", "Diastolic is mandatory" ] )
					], 
					null );
				/*
			stateRules.Add( new StateRule( null, BloodPressureFormDefinition.SYSTOLIC, false, false, true, false, 
				new List<RuleBlock>{ systolicLogicAllowed, systolicLogicMandatory, systolicLogicRemoveDiastolicMessage } ) );

			stateRules.Add( new StateRule( null, BloodPressureFormDefinition.DIASTOLIC, false, false, true, false, 
				new List<RuleBlock>{ diastolicLogicAllowed, diastolicLogicMandatory, diastolicLogicRemoveSystolicMessage } ) );*/


			


			return [ new vnStateRule.instance( null, "systolic", false, false, true, false, [ systolicLogicAllowed, systolicLogicMandatory, systolicLogicRemoveDiastolicMessage ] ),
					 new vnStateRule.instance( null, "diastolic", false, false, true, false, [ diastolicLogicAllowed, diastolicLogicMandatory, diastolicLogicRemoveSystolicMessage ] ) ];


	};
	return factory;
});

