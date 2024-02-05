angular.module('vnValidationModule', [],function () {})
.factory('vnValidationFactory', function(){
	var factory= {}

	factory.isDisabled = function( fieldId ){
		var isDisabled = false;
		if( $(fieldId).hasClass( 'hasDatepicker' ) ){
			isDisabled = $( fieldId ).datepicker( 'isDisabled' );
		}else{
			isDisabled = $( fieldId ).attr( 'disabled' );
		}
		return isDisabled;
	};

	factory.compareDates = function( dateField1, dateField2 ){
		var date1 = $( dateField1 ).val();
		var date2 = $( dateField2 ).val();
		if( !date1 || date1.length < 1 ){
			return 0;
		}
		if( !date2 || date2.length < 1 ){
			return 0;
		}
		date1 = Date.parseExact( date1, "dd-MMM-yyyy" );
		date2 = Date.parseExact( date2, "dd-MMM-yyyy" );
		return Date.compare( date1, date2 );
	};

	return factory;
}).run(function( vnValidationFactory, vnAppManagementFactory ){


	(function($){
			$.widget('jb.formConditions',{

			defaults: {
			    conditions: []
			},
			ruleDefaults: {
			    selector:'',//relative to element that widget is run on 
			    operator: '',//string equal to value or function
			    value: ''
			},
			outcomeDefaults: {
			    action: 'hide',//string or function
			    selector: ''
			},
			/*
			 * build in outcome actions
			 * to add your own use this code
			 * $.extend($.jb.formConditons.prototype.outcomeActions,{
			 * 	'youractionname': function(){}
			 * })
			 */
			outcomeActions: {
				show: function( form, element, params ){
					element.parent().show();
				},
				
				hide: function( form, element, params ){
					element.parent().hide();
				},
				disable: function( form, element, params ){
					if( element.hasClass( 'inps_class_numeric_stepper' ) ){
						element.numeric( "disable" );
					}else if( element.hasClass( 'hasDatepicker' ) ){
						element.datepicker( "disable" );
					}else{
						element.attr( 'disabled', 'disabled' );
					}
				},
				enable: function( form, element, params ){
					if( element.hasClass( 'inps_class_numeric_stepper' ) ){
						element.numeric( "enable" );
					}else if( element.hasClass( 'hasDatepicker' ) ){
						element.datepicker( "enable" );
						//element.datepicker( "setDate", null );
					}else{
						element.prop( 'disabled', '' );
					}
				},
				reset: function( form, element, params ){
					if( element.hasClass( 'hasDatepicker' ) ){
						element.datepicker( "setDate", null );
					}
				},
				showValidationMessage: function( form, element, params ){
					console.log( "show error" );
					if( element.selector.indexOf( '_searchField' ) > -1 ){
						//showInputErrorText( element.parent().attr( 'id' ), params.message );
					}else{
						$("#" + element.attr( 'id' )).tinyTips(params.message, true);
						$("#" + element.attr( 'id' )).addClass( 'error' );
						//$(".tinyTip").addClass( 'error' );

						
						//showInputErrorText( element.attr( 'id' ), params.message );
					}
				},
				clearValidationMessage: function( form, element, params ){
					if( element.selector.indexOf( '_searchField' ) > -1 ){
						//clearInputErrorHighlight( element.parent().attr( 'id' ) );
					}else{
						$("#" + element.attr( 'id' )).tinyTips('', false);
						$("#" + element.attr( 'id' )).removeClass( 'error' );
						//$(".tinyTip").removeClass( 'error' );
						//clearInputErrorHighlight( element.attr( 'id' ) );
					}
				},
				setField: function( form, element, params ){
					if( params.param.valueToSet ){
						if( element.hasClass( 'hasDatepicker' ) ){
							if( params.param.valueToSet == "null" || $.trim( params.param.valueToSet ) == "" ){
								element.datepicker( "setDate" ,null );
							}else{
								element.datepicker( "setDate" ,params.param.valueToSet );
							}
						}else{
							element.val( params.param.valueToSet );
						}
					}else if( params.fieldtosetwith ){
						if( $( params.fieldtosetwith ).children( 'option' ).length > 0 ){
							if( params.useid ){
								element.val( $( params.fieldtosetwith ).val() );
							}else{
								element.val( $( params.fieldtosetwith ).children( 'option:selected' ).text().trim() );
							}
						}else if( $( params.fieldtosetwith ).hasClass( 'hasDatepicker' ) ){
							var value;
							if( params.dateformat != null && params.dateformat.length > 0 ){
								value = $.datepicker.formatDate( params.dateformat, $( params.fieldtosetwith ).datepicker( "getDate" ) );
							}else{
								value = $( params.fieldtosetwith ).datepicker( "getDate" );
							}
							element.val( value );
						}
						
						
					}else if( params.param.fieldValue ){
						element.val( $( params.param.fieldValue ).val() );
					}else if( params.param.fieldLabel ){// Used for drop downs when we want the label rather than the code
						element.val( $( params.param.fieldLabel ).text().trim() );
					}
				},
				setFocus: function( form, element, params ){
					element.focus();
				}
			},
			_create: function(){
			    var self = this,
			    element = self.element,
			    options = self.options,
			    //#
			    conditions = options.conditions,
			    
			    cLen = conditions.length;
			    
			    //cache the last result of a rule
			    self.rulesLastResult = {};
			    
			    
			    //#### bind on change, add option to change this event lister
			    //like keup
			    element.delegate(':input:not(:radio)','change keyup',function( event ){
			        self._processor( $( event.target ).attr( 'id' ) );
			    });
			    
			    //TODO Need to bind checkboxes, radios separately ( see JQuery.change() )
			    // 20/06/2012 - DCB - Updated as was overwriting the current onSelect handler.
			    var datePickers = $( '.hasDatepicker' );
			    $.each( datePickers, function( index, datePicker ){
			    	var currentOnSelectFunction = $( datePicker ).datepicker( "option", 'onSelect' );
			    	$( datePicker ).datepicker( "option", 'onSelect', function( dateText, inst ){
				    	self._processor( $( inst ).attr( 'id' ) );
				    	currentOnSelectFunction.call( this, dateText, inst );
				    	}
				    );
			    });
			    
			   self._processor( "INITIAL_RUN" );
			},
			/*
			 * this is where the magic happends
			 */
			_processor: function( triggerString ){
				var self = this,
			    conditions = self.options.conditions,
			    ccLen = conditions.length,
			    lastResults = self.rulesLastResult,
				rulesResult,
				validationIssueHasOccurred = false;
				
			    while( ccLen-- ){
			    	var condition = conditions[ ccLen ];
			    	if( condition.triggeredby.indexOf( triggerString ) > -1 
			    	|| triggerString.indexOf( "INITIAL_RUN" ) > -1 
			    	|| triggerString.indexOf( "RUN_ON_SAVE" ) > -1 
			    	|| triggerString.indexOf( condition.name ) > -1){
				    	if( condition.runoninitialise == 'false' && condition.runoninitialiseonly == 'false' ){
				    		condition.runoninitialise = true;
				    		continue;
				    	}
				    	if( triggerString.indexOf( "INITIAL_RUN" ) < 0 && condition.runoninitialiseonly == 'true' ){
				    		continue;
				    	}
				    	if( triggerString.indexOf( "RUN_ON_SAVE" ) > -1 && ( condition.runonsave == 'false' && condition.runonsaveonly == 'false' ) ){
				    		continue;
				    	}
				    	if( triggerString.indexOf( "RUN_ON_SAVE" ) < 0 && condition.runonsaveonly == 'true' ){
				    		continue;
				    	}
				    	
				    	var params = new Object();
				    	if( condition.message ){
				    		params.message = condition.message;
				    	}
				    	var rulesResult = self._checkRules( conditions[ ccLen ].rules, params );
				    	
				    	if( rulesResult ){
				    		validationIssueHasOccurred = true;
				    	}
				    	
				       	if( rulesResult && condition['tru'] != undefined ){
				           	self._processOutcomes( condition['tru'], params );
				        }else if( rulesResult == false && condition['fal'] != undefined ){
				           	self._processOutcomes( condition['fal'], params );
				        }
			    	}
			    }
			    return validationIssueHasOccurred;
			},

			_processOutcomes: function( outcomes, params ){
				if( outcomes == null ){
					return;
				}
				var i = outcomes.length;
			    element = this.element;
			    
			    while( i-- ){
			        var outcome = outcomes[ i ],
			        type = typeof outcome.action;
			        
			        var target = ( outcome.selector ) ? element.find(outcome.selector) : undefined;
			    	
			        if( params == null ){
			        	params = new Object();
			        }
			        params.param = new Object();
			        params.message = outcome.actionmessage;
			        params.param.valueToSet = outcome.actionset;
			        params.useid = outcome.useid;
			        params.fieldtosetwith = outcome.fieldtosetwith;
			        params.dateformat = outcome.dateformat;
			        
			        if( type == 'string' ){
			        	this.outcomeActions[ outcome.action ].apply(this,[ element, target, params ]);
			        }else if( type == 'function'){
			        	outcome.action.apply(this,[ element, target, params ]);
			        }
			     
			    }
			    
			},
			_isConditionTrue: function( val, rule ){
				var ret;	
				switch(rule.operator){
					//convert the value to string so we dont get type errors for ints
				    case 'equal':
				        ret = ( String.prototype.toLowerCase.apply( $.trim( val ) ) == String.prototype.toLowerCase.apply( $.trim( rule.value ) ) ) ? true : false;
				        break;
				    case 'not-equal':
				        ret = ( String.prototype.toLowerCase.apply( $.trim( val ) ) != String.prototype.toLowerCase.apply( $.trim( rule.value ) ) ) ? true : false;
				        break;
				    case 'checked':
				        ret = $( rule.selector ).is(':checked');
				        break;
				    case 'not-checked':
				        ret = $( rule.selector ).is(':not(:checked)');
				        break;
				    case 'contains':
				    	var regEx = new RegExp( '('+ rule.value +')' ,'gi');
				    	ret = regEx.test( $.trim( val ) );
				        break;
				    case 'doesnt-contain':
				   		var regEx = new RegExp( '('+ rule.value +')','gi');
				    	ret = !(regEx.test( $.trim( val ) ));
				        break;
				    case 'starts-with':
				        break;
				    case 'ends-with':
				        break;
				    case 'disabled':
				    	ret = vnValidationFactory.isDisabled( rule.selector );
				        break;
				    case 'not-disabled':
				    	ret = !vnValidationFactory.isDisabled( rule.selector );
				        break;
				    case 'isNaN':
				    	var value = parseInt( $( rule.selector ).attr('value'), 10 );
				    	ret = isNaN( value ); 
				        break;
				    case 'greater-than':
				    	if( $( rule.selector ).hasClass( 'hasDatepicker' ) ){
				    		if( rule.value == 'DOB' ){
				    			ret = vnValidationFactory.compareDates( rule.selector, '#inps_patientdateofbirth' ) > 0;
				    			break;
				    		}else if( rule.value == 'DOD' ){
				    			ret = vnValidationFactory.compareDates( rule.selector, '#inps_patientdateofdeath' ) > 0;
				    			break;
				    		}else if( rule.value == 'TODAY' ){
				    			ret = vnValidationFactory.compareDates( rule.selector, '#inps_systemdate' ) > 0;
				    			break;
				    		}
				    		ret = vnValidationFactory.compareDates( rule.selector, rule.value ) > 0;
				    	}else if( $( rule.selector ).val().length > 0 ){
				    		ret = parseInt( $( rule.selector ).val() ) > parseInt( rule.value );
				    	}else{
				    		ret = false;
				    	}
				    	break;
				    case 'less-than':
				    	if( $( rule.selector ).hasClass( 'hasDatepicker' ) ){
				    		if( rule.value == 'DOB' ){
				    			ret = vnValidationFactory.compareDates( rule.selector, '#inps_patientdateofbirth' ) < 0;
				    			break;
				    		}else if( rule.value == 'DOD' ){
				    			ret = vnValidationFactory.compareDates( rule.selector, '#inps_patientdateofdeath' ) < 0;
				    			break;
				    		}else if( rule.value == 'TODAY' ){
				    			ret = vnValidationFactory.compareDates( rule.selector, '#inps_systemdate' ) < 0;
				    			break;
				    		}
				    		ret = vnValidationFactory.compareDates( rule.selector, rule.value ) < 0;
				    	}else if( $( rule.selector ).val().length > 0 ){

				    		ret = parseInt( $( rule.selector ).val() ) < parseInt( rule.value );
				    	}else{
				    		/* Caution: Assuming this is true if it doesn't fit the others */
				    		ret = true;
				    	}
				    	break;
				}
				return ret;
			},
			_checkRules: function( rules, params ){
			    var i = rules.length,
			    $elem = this.element,
			    self = this,
			    returnValue = false;
			    while( i-- ){
			    	var rule = rules[ i ];
			        var outerCondition = rule.conditiontype;
			        var actions = rule.actions;
			        if( rule.message ){
			        	params.message = rule.message;
			        }
			        if( outerCondition ){
						var y = rule.rules.length;
						while( y-- ){
							var ret = false;
							var innerRule = rule.rules[y];
							if( innerRule.conditiontype ){
								ret = self._checkRules.call( this, rule.rules, params );
							}else{
								var target = $elem.find( innerRule.selector ), val;
								if( !innerRule.option ) {
									if( innerRule.attr != null ){
									    // it was an input
										val = target.attr( innerRule.attr );
									}else{
										val = target.val();
									}
								}else{
									if( innerRule.attr != null ){
										val = $( target.selector + ' :selected' ).attr( innerRule.attr );
									}else{
										val = $( target.selector + ' :selected' ).val();
									}
								}
								ret = self._isConditionTrue.call( this, val, innerRule );
							}
							if( outerCondition == 'OR' && ret ){
								if( actions != null ){
									this._processOutcomes( actions.tru );
								}
								return true;
							}else if( outerCondition == 'OR' && !ret && y < 1 ){
								if( actions != null ){
									this._processOutcomes( actions.fal );
								}
								returnValue = false;
								break;
							}
							if( outerCondition == 'AND' && !ret ){
								if( actions != null ){
									this._processOutcomes( actions.fal );
								}
								returnValue = false;
								break;
							}else if( outerCondition == 'AND' && ret && y < 1 ){
								if( actions != null ){
									this._processOutcomes( actions.tru );
								}
								return true;
							}
						}
			        }
			    }
			    return returnValue;
			},
			addCondition: function( c ){
			    //run condition before we push it on to the stack
			    if( this._checkRules( c.rules ) ){
			    	var params = new Object();
			    	if( c.message ){
			    		params.message = c.message;
			    	}
			        this._processOutcomes( c.outcomes, params );
			    }
			    
			    this.options.conditions.push( c );
			   
			},
			removeCondition: function( name ){
			    var conditions = this.options.conditions,
			    i = conditions.length;
			    
			    while( i-- ){
			        if( conditions[ i ].name == name && typeof conditions[ i ].name != undefined){
			            this.options.conditions = conditions.slice( i,1 );
			        }
			    }
			},
			runConditions: function( conditionNames ){
				console.log( 'running ' + conditionNames );
				return this._processor( conditionNames );
			},

			destroy: function(){
				this.element = null;
				this.options = null;
				this.rulesLastResult = null;
			}    
			});

			})(jQuery);
});







	
