angular.module('vnDynamoModule')
.factory('vnFormDefinitionModel', function( 
	vnStateRule,
	vnRuleBlock,
	vnCondition,
	vnExceptionFactory,
	vnHeightDefinition,
	vnWeightDefinition,
	vnBloodPressureDefinition,
	vnDatabaseFactory,
	vnFormDefinition,
	vnField,
	vnValue,
	vnEquals,
	vnLessThan,
	vnGreaterThan,
	vnShowValidationMessage,
	vnClearValidationMessage ){
	var factory = {};

	factory.instance = function(){
		var _self = this;
		
		_self.retrieveFormDefinition = function( formId, callback ){
			//if( formId == "HEIGHT" ){
				vnDatabaseFactory.retrieveData( "dynamoforms", function( data ){
					var assembledForm = assembleFormDefinition( data[0].formdefinition );
					var assembledState = assembleFormState( data[0].formstate );
					callback( assembledForm, assembledState	 );
				}, "by_name", { start: formId, end: formId }, 1 );
				//return new vnHeightDefinition.retrieve();
			/*}else if( formId == "weight" ){
				return new vnWeightDefinition.retrieve();
			}else if( formId == "bloodpressure" ){
				return new vnBloodPressureDefinition.retrieve();
			} */
		};
	}

	var assembleFormState = function( formState ){
		console.log( formState );
		var stateRules = new Array();
		angular.forEach( formState, function( formStateValue, formStateIndex ){
			var stateRule = new vnStateRule.instance(
				formStateValue.name, 
				formStateValue.target, 
				formStateValue.runoninitialise,
				formStateValue.runoninitialiseonly,
				formStateValue.runonsave,
				formStateValue.runonsaveonly
			);
			stateRule.ruleBlocks = assembleRuleBlocks( formStateValue.ruleblocks );
			stateRules.push( stateRule );
		});

		return stateRules;
	};

	var assembleRuleBlocks = function( ruleBlocks ){
		var assembledRuleBlocks = new Array();
		angular.forEach( ruleBlocks, function( ruleBlockValue, ruleBlockIndex ){
			var ruleBlock = new vnRuleBlock.instance(
				assembleRuleBlocks( ruleBlockValue.ruleblocks ),
				assembleConditions( ruleBlockValue.conditions ),
				ruleBlockValue.gate,
				assembleActions( ruleBlockValue.trueactions ),
				assembleActions( ruleBlockValue.falseactions )
			);
			assembledRuleBlocks.push( ruleBlock );
		})
		return assembledRuleBlocks;
	};

	var assembleConditions = function( conditions ){
		var conditionsArray = new Array()
		angular.forEach( conditions, function( conditionValue, conditionIndex ){
			var condition = new vnCondition.instance(
				conditionValue.target,
				operationMap[ conditionValue.operator ],
				new vnValue.instance ( conditionValue.value.value, conditionValue.value.type) 
			);
			conditionsArray.push( condition );
		} );
		return conditionsArray;
	};

	var assembleActions = function( actions ){
		var actionsArray = new Array()
		angular.forEach( actions, function( actionValue, actionIndex ){
			actionsArray.push( mapAction( actionValue ) );
		} );
		return actionsArray;
	};

	var operationMap = {};
	operationMap["equals"] = new vnEquals.instance();
	operationMap["lessthan"] = new vnLessThan.instance();
	operationMap["greaterthan"] = new vnGreaterThan.instance();

	var mapAction = function( action ){
		if( action.name == "showvalidationmessage" ){
			return new vnShowValidationMessage.instance( [ action.target, action.message ] );
		}else if( action.name == "clearvalidationmessage" ){
			return new vnClearValidationMessage.instance( [ action.target ] );
		}
	};


	var assembleFormDefinition = function( formDefinition ){
		console.log( formDefinition );
		var assembledDefinition = new vnFormDefinition.instance();
		var fieldsArray = new Array();

		angular.forEach( formDefinition, function( value, index ){
			var field = new vnField.instance();
			field.type = value.type;
			field.label = value.label;
			field.target = value.target;
			field.unit = value.unit;
			field.dataSource = value.datasource;
			if( value.minvalue != null  )
				field.minValue = new vnValue.instance ( value.minvalue.value, value.minvalue.type).getValue();

			if( value.maxvalue != null  )
				field.maxValue = new vnValue.instance ( value.maxvalue.value, value.maxvalue.type).getValue();
			
			if( value.maxlength != null  )
				field.maxLength = new vnValue.instance ( value.maxlength.value, value.maxlength.type).getValue();

			if( value.minlength != null  )
				field.minLength = new vnValue.instance ( value.minlength.value, value.minlength.type).getValue();

			if( value.displayvalue != null  )
				field.displayValue = new vnValue.instance ( value.displayvalue.value, value.displayvalue.type).getValue();

			fieldsArray.push( field );
		});

		assembledDefinition.fields = fieldsArray;
		return assembledDefinition;

		/*var date = new vnField.instance();
		date.type = vnField.DATE;
		date.label = "Date";
		date.target = "date";
		date.minValue = DOBDerived.getValue().format( "YYYY-MM-DD" );*/
	};
	return factory;
});