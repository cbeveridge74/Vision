angular.module('vnDynamoModule')
.factory('vnValue', function( 
	vnViewComponentFinderFactory,
	vnDerivedValuesModel ){
	var factory = {};
	factory.DEFAULT 	= "DEFAULT";
	factory.DERIVED 	= "DERIVED";
	factory.TARGET 		= "TARGET";

	factory.instance = function( value, type ){ //args[0] = target
		

		var type 		= type;

		if( type == null ){
			type = factory.DEFAULT;
		}

		var value 	= value;
		

		this.getValue = function(){
			if( type == factory.DEFAULT ){
				return value;
			}else if( type == factory.TARGET ){
				return vnViewComponentFinderFactory.find( value ).getValue();
			}else if( type == factory.DERIVED ){
				return vnDerivedValuesModel.retrieveValue( value );
			}
		};
	}
	return factory;
});


/*public class Value {

		private Value(){}
		private String parameterValue;
		private int type;

		public Value( String value ){
			Type = DEFAULT;
			ParameterValue = value;
		}

		public Value( String value, int type ){
			Type = type;
			ParameterValue = value;
		}

		public const int DEFAULT = 0;
		public const int DERIVED = 1;
		public const int TARGET = 2;

		public int Type{ 
			get{ 
				return type;
			} 
			private set{
				if (value < DEFAULT || value > TARGET) {
					type = DEFAULT;
				} else {
					type = value;
				}
			}
		}

		public String ParameterValue{ 
			get {
				if( Type.Equals( TARGET ) ){
					INPSComponent component = InjectionFactory.ViewComponentFinder.find( parameterValue );
					if( component == null ){
						throw new NoSuchTargetException( parameterValue );
					}
					return component.getValue();
				}else if( Type.Equals( DERIVED ) ){
					if( InjectionFactory.DerivedValuesModel == null ){
						throw new InjectionImplementationException ( "DerivedValuesModel" );
					}

					if (!InjectionFactory.DerivedValuesModel.containsKey(parameterValue)) {
						throw new DerivedValueMissingException( parameterValue );
					}
					return InjectionFactory.DerivedValuesModel.retrieveValue( parameterValue );
				}
				return parameterValue;
			} 
			set{ 
				if (value == null) {
					parameterValue = "";
				}
				else {
					parameterValue = value;
				}
			} 
		}*/