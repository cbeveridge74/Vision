function terminologySearchService( request, response, failureHandler ) {
			
			var thisFailureHandler = function(){ 
				if( failureHandler != null ){
					failureHandler();
				}
				searchFailure();
			};
			
			AjaxHandler.ajax( 
				{
					url: "../terminology/termSearch",
					dataType: "json",
					delay: 1,
					data: {
						// Only need s here
					    searchText: request.term                    
					},
					success: function(data) {
						response( $.map( data.results, function( item ) {
							
							if( item.concept != null ){
								
								return {
									label: item.concept.description,
									value: item.concept.code,
									formId: item.entityClassName,
									entityClassType: item.entityClassType
								};
							}
						}));
					},
		        	failure: thisFailureHandler
			});
		}

/**
 * Global function that renders any therapy search displaying onlyl the drug name but also a message if too many results are found.
 * This was a late change brought in when it was realised that there was no feedback to the user that there were more results
 * @param ul The list to which items should be added
 * @param item The item object containing all the relevant data.
 * @returns String that is appended to the list.
 */
function renderTherapyResult( ul, item ){
	var value = item.value;
	var valueClass = "inps_dataentry_class_search_code";
	var labelClass = "inps_dataentry_class_search_term";
	
	if( item.value == "-2" ){
		value = "";
		labelClass = "inps_dataentry_class_search_code_more_results"  + classStringAppend;
	}
	
	return $( '<li></li>' )
		.data( 'item.autocomplete', item )
		.append( '<a><span class="' + labelClass + '">' + item.label + '</span></a>' )
		.appendTo( ul );
}


/**
 * Global function that renders any read code search with the read code first, then the term.
 * This was a late change brought in when it was realised that there are duplicate
 * read term descriptions.
 * @param ul The list to which items should be added
 * @param item The item object containing all the relevant data.
 * @returns String that is appended to the list.
 */
function renderTermResult( ul, item ) {
	
	var value = item.value;
	var valueClass = "inps_dataentry_class_search_code";
	var labelClass = "inps_dataentry_class_search_term";
	
	if( value == "-1" ){
		value = "";
		valueClass = "inps_dataentry_class_search_code_no_results" + classStringAppend;
	}
	
	if( value == "-2" ){
		value = "";
		labelClass = "inps_dataentry_class_search_code_more_results" + classStringAppend;
		valueClass = "inps_dataentry_class_search_code_no_results"  + classStringAppend;
	}
	
	return $( '<li></li>' )
		.data( 'item.autocomplete', item )
		.append( '<a><span class="' + valueClass + '">' + value + '</span><span class="' + labelClass + '">' + item.label + '</span></a>' )
		.appendTo( ul );
}
	 
	 function drugSearchService( request, response, failureHandler ) {
			
			var thisFailureHandler = function(){ 
				if( failureHandler != null ){
					failureHandler();
				}
				searchFailure();
			};

			AjaxHandler.ajax( 
				  {
				         url: "../drug/nameSearch",
						 dataType: "json",
				         delay: 1,
				         data: {
				         	// Only need s here
				             searchText: request.term                    
				         },
				         success: function(data) {
				        	
			        		response( $.map( data.results, function( item ) {
			        			
			        			return {
			        				label: item.drugItem.name,
			        				value: item.drugItem.code,
			        				formId: item.entityClassName,
			        				entityClassType: item.entityClassType
			        			};
			        		}));
			        	},
			        	failure: thisFailureHandler
				  });
		}
	 
	 function testSearchService( request, response, failureHandler ) {
			
			var thisFailureHandler = function(){ 
				if( failureHandler != null ){
					failureHandler();
				}
				searchFailure();
			};
			
			AjaxHandler.ajax( 
				  {
				         url: "../terminology/testSearch",
						 dataType: "json",
				         delay: 1,
				         data: {
				         	// Only need s here
				             searchText: request.term                    
				         },
				         success: function(data) {
			        		response( $.map( data.results, function( item ) {
			        			
			        			return {
									label: item.concept.description,
									value: item.concept.code,
									formId: item.entityClassName,
									entityClassType: item.entityClassType
			        			};
			        		}));
				         },
				        failure: thisFailureHandler
				  });
		}
	 
	 function showDialog( data, title, width, height, openCallback, selector, closeCallback ){
	 	
//$( '#configurationDialog' ).dialog( "destroy" );
	 	 if( selector == null ){
	 	 	selector = '#configurationDialog';
	 	 }
			
			
		$( selector ).html( data );
		$( selector ).attr('title', title);
		$( selector ).dialog(
				{ modal: true,
					autoOpen: false,
					minHeight: height,
					minWidth: width,
					resizable: false,
					zIndex: 9001,
					close: closeCallback,
					create: openCallback }
		);
		
		$( selector ).dialog('open');
	}