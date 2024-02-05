angular.module('vnDynamoModule')
.factory('vnField', function(){
	var factory = {};

	factory.TEXT 		= "TEXT";
	factory.TEXTAREA 	= "TEXTAREA";
	factory.CHECKBOX 	= "CHECKBOX";
	factory.COMBOBOX 	= "COMBOBOX";
	factory.DATE 		= "DATE";
	
	factory.instance = function(
		type,
		maxLength,
		minLength,
		maxValue,
		minValue,
		target,
		entityName,
		entityId,
		entityShortName,
		saveAs,
		label,
		labelWeight,
		componentSize,
		containerSize,
		horizontalAlignment,
		displayFormat,
		group,
		displayValue,
		dataSource,
		valueType,
		unit
	){
		var _self 		= this;
		

		_self.VALUE_TYPE_ALPHANUMERIC 	= 0;
		_self.VALUE_TYPE_NUMERIC 		= 1;
		_self.VALUE_TYPE_ALPHA 			= 2;

		_self.type = type;
		_self.maxLength = maxLength;
		_self.minLength = minLength;
		_self.maxValue = maxValue;
		_self.minValue = minValue;
		_self.target = target;
		_self.entityName = entityName;
		_self.entityId = entityId;
		_self.entityShortName = entityShortName;
		_self.saveAs = saveAs;
		_self.label = label;
		_self.labelWeight = labelWeight;
		_self.componentSize = componentSize;
		_self.containerSize = containerSize;
		_self.horizontalAlignment = horizontalAlignment;
		_self.displayFormat = displayFormat;
		_self.group = group;
		_self.displayValue = displayValue;
		_self.dataSource = dataSource;
		_self.valueType = valueType;
		_self.unit = unit;

	}
	return factory;
});
