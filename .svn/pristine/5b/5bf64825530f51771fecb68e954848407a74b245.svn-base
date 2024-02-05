angular.module('vnDynamoModule')
.factory('vnStateEngine', function(
    vnViewComponentFinderFactory,
    vnExceptionFactory,
    vnRuleBlock
    ){
    var factory = {};

    factory.instance = function(){
        
        var _self = this;
        var map = {};

        _self.addStateRules = function( stateRules ) {

            if( stateRules == null || stateRules.length < 1 ){
                vnExceptionFactory.raiseException( 
                    vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
                    "<stateRules> exception for <StateEngine>" );
                return;
            }

             //<String, List<StateRule>>

            angular.forEach( stateRules, function( stateRule, index ){
                if( stateRule.target == null ){
                    vnExceptionFactory.raiseException( 
                    vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
                    "<value.target> exception for <StateEngine>" );
                }

                if (map[ stateRule.target ] == null) {
                    map[ stateRule.target ] = new Array();
                } 

                map[stateRule.target].push( stateRule );
                var component = vnViewComponentFinderFactory.find( stateRule.target );
                if( component == null ){
                    vnExceptionFactory.raiseException( 
                    vnExceptionFactory.NO_SUCH_TARGET_EXCEPTION, 
                    "No target found for " + stateRule.target );
                    return;
                }

                if( !stateRule.runOnInitialiseOnly && !stateRule.runOnSaveOnly ){
                    if( !component.isListenerSet() ){
                        component.setOnChangeListener( _self );
                    }
                }
            });
            
            // Run the rules for rules flagged as 'run on initialise'
            _self.runStateRules( true, false );
            return true;
        };

        // Not yet implemented
        _self.removeStateRules = function( names ){};

        // Run the rules.
        _self.runStateRules = function( initialise, save ){

            if( map == null || map.length < 1 ){
                vnExceptionFactory.raiseException( 
                    vnExceptionFactory.STATE_RULES_NOT_INITIALISED_EXCEPTION, 
                    "<stateRules> not initialised <StateEngine>" );
            }

            angular.forEach( map, function( stateRules, stateRulesIndex ){
                angular.forEach( stateRules, function( stateRule, stateRuleIndex ){
                    if( ( stateRule.runOnInitialise || stateRule.runOnInitialiseOnly ) && initialise ){
                        run( stateRule );
                    } else if( ( stateRule.runOnSave || stateRule.runOnSaveOnly ) && save ){
                        run( stateRule );
                    }
                });
            });

            return true;
        };

        //Clears all the rules
        _self.removeAllStateRules = function(){};

        // Call back that's triggered by the relevant event on the form
        // Requires a tag which is a unique identifier that allows the
        // correct rules to be retrieved for this component
        _self.onChange = function( tag ){
            if( tag == null ){
                vnExceptionFactory.raiseException( 
                    vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
                    "<tag> exception for <StateEngine.onChange>" );
            }

            // SHouldn't really be calling this method directly
            if( map == null ){
                vnExceptionFactory.raiseException( 
                    vnExceptionFactory.DIRECT_INVOKE_EXCEPTION, 
                    "Can't directly invoke <StateEngine.onChange>" );
            }

            var stateRules;

            // Find the StateRule(s) for this target
            
            stateRules = map[ tag ];
            if( stateRules == null ){
                vnExceptionFactory.raiseException( 
                    vnExceptionFactory.NO_SUCH_TAG_EXCEPTION, 
                    "Can't find StateRule with tag " + tag );
            }
            
            if( stateRules != null ){
                // Run each of the state rules unless they are to be run on
                // save or initialise only
                angular.forEach( stateRules, function( stateRule, stateRuleIndex ){
                    if( !( stateRule.runOnInitialiseOnly ||
                           stateRule.runOnSaveOnly ) ){
                        run( stateRule );
                    }
                });
            }
        };

        //Extracts the rule blocks from the stateRule and runs them
        var run = function( stateRule ){
            console.log( "Running" );
            if (stateRule.ruleBlocks != null ) {
                var result = runStateRules(stateRule.ruleBlocks);
            }
        };

        // Recursive method that interprets the rules.
        var runStateRules = function( ruleBlocks ){
            console.log( "Running state rules" );
            console.log( ruleBlocks );
            var blockResults = new Array();

            for( var rbCount = 0;rbCount < ruleBlocks.length;rbCount++ ){
                var results = new Array();
                if (ruleBlocks[rbCount].ruleBlocks != null && ruleBlocks[rbCount].ruleBlocks.length > 0) {
                    results = runStateRules(ruleBlocks[rbCount].ruleBlocks);
                }

                var conditions = ruleBlocks[rbCount].conditions;
                if( conditions != null ){
                    for( var cCount = 0;cCount < conditions.length;cCount++ ){
                        if( conditions[cCount].operator == null ){
                            vnExceptionFactory.raiseException( 
                            vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
                            "<conditions[cCount].operator> == null <StateEngine.runStateRules>" );
                        }else if( conditions[cCount].target == null ){
                            vnExceptionFactory.raiseException( 
                            vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
                            "<conditions[cCount].target> == null <StateEngine.runStateRules>" );
                        }
                        // Keep a list of the result for each condition contained
                        // within this parent block
                        console.log( conditions[cCount].value.getValue() );
                        results.push( conditions[cCount].operator.execute(conditions[cCount].target, conditions[cCount].value.getValue()) );
                    }
                }

                //For all the results collected for this block, determine the overall actions to execute
                // and the over result for this parent block.
                for( var rsltCount = 0; rsltCount < results.length; rsltCount++){
                    if( ruleBlocks[rbCount].gate == null ){
                        vnExceptionFactory.raiseException( 
                            vnExceptionFactory.PARAMETER_REQUIRED_EXCEPTION, 
                            "<RuleBlock.gate> == null <StateEngine.runStateRules>" );
                    }
                    if (ruleBlocks[rbCount].gate == vnRuleBlock.OR && results[rsltCount] == true) {
                        executeActions( ruleBlocks[rbCount].trueActions );
                        blockResults.push( true );
                        break;
                    } else if ((ruleBlocks[rbCount].gate == vnRuleBlock.OR && results[rsltCount] == false) && (rsltCount == results.length - 1)) {
                        executeActions( ruleBlocks[rbCount].falseActions );
                        blockResults.push( false );
                        break;
                    } else if (ruleBlocks[rbCount].gate == vnRuleBlock.AND && results[rsltCount] == false) {
                        executeActions( ruleBlocks[rbCount].falseActions );
                        blockResults.push( false );
                        break;
                    } else if ((ruleBlocks[rbCount].gate == vnRuleBlock.AND && results[rsltCount] == true) && (rsltCount == results.length - 1)) {
                        executeActions( ruleBlocks[rbCount].trueActions );
                        blockResults.push( true );
                        break;
                    }
                }
            }
            return blockResults;
        };
        var executeActions = function( actions ){
            if (actions != null) {
                angular.forEach (actions, function( ruleAction, ruleActionIndex ){
                    ruleAction.execute();
                }) 
            }
        };
    }
    return factory;
});    



    