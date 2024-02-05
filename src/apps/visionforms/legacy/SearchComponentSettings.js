function SearchComponentSettings(){
	
	var settings = new GenericComponentSettings();
		 
	this.initialise = function(){
		/*$( "#search" ).html( 
				"<div class='form-item'>" + settings.createUniqueName() + "</div>" +
				"<div class='form-item'>" + settings.createEnitySearchPlaceholder() + "</div>" +
				"<div class='form-item'>" + settings.createEnitySearchId() + "</div>" +
				"<div class='form-item'>" + settings.createAttributeDropDown() + "</div>" +
				"<div class='form-item'>" + createEntitySearchDisplayAs() + "</div>"
				+ "<div class='form-item'>" +  settings.createLabel()
				+ settings.createRemoveLabel() + "</div>"
				+ "<div class='form-item'>" + settings.createBasicValidation( 'default' ) + "</div>"
				+ createSearchType()
				+ createMinChars() 
				+ "<div class='form-item'>" + settings.createComponentSize() + "</div>"
				+ "<div class='form-item'>" + settings.createContainerSize() + "</div>"
				+ createIgnoreUserInput() 
				+ createPlaceholder() );*/

		/*function init() {
		  SnomedDB.open();
		}

		function sortByKey(array, key) {
		    return array.sort(function(a, b) {
		        var x = a.term[key]; var y = b.term[key];
		        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		    });
		}

		var delay = (function(){
		  var timer = 0;
		  return function(callback, ms){
		    clearTimeout (timer);
		    timer = setTimeout(callback, ms);
		  };
		})();
		console.log('Ready')
		init();
		

		$(".searchFieldID").keyup(function( event ) {
			var value = $(event.currentTarget).val();
			console.log( value );
			var wait = value.length == 0 ? 0 : (4 - value.length) * 500
		    delay(function(){
			    searchText = value;
				var results = SnomedDB.simpleSearch(searchText, function(res){
					var sortedResults = sortByKey(res,"order")
					var html = "<table><thead><tr><th>Row</th><th>Sort Order</th><th>Preferred Term</th><th>Concept ID</th></tr></thead>"
					var row = 1
					for (i in sortedResults){
						html += '<tr><td>' + (row++) + '</td><td>' + sortedResults[i].term.order + '</td><td>' + sortedResults[i].term.preferredTerm + '</td><td>' + sortedResults[i].term.conceptid + '</td></tr>'
					}
					html += "</table>";
					$('#resultID').html(html)
				});
		    }, wait );
		});
*/

		$('.form.settings.typeahead').typeahead({
            hint: false,
            highlight: true,
            minLength: 1
          },
          {
            name: 'patients',
            displayKey: 'name',
            source: substringMatcher(new DataStore().demoEntityData)
          });
          $('.form.settings.typeahead').on( 'typeahead:selected', handleSelected );
	};

	var handleSelected = function(event, selected){
      
      $('.form.settings.typeahead').typeahead('val', '');
      var patientid = selected.id;
      console.log( patientid );
 	};

	var substringMatcher = function(strs) {






      return function findMatches(q, cb) {
        var matches, substrRegex;
     
        // an array that will be populated with substring matches
        matches = [];
     
        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');
     
        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str.CLASS_NAME)) {
            // the typeahead jQuery plugin expects suggestions to a
            // JavaScript object, refer to typeahead docs for more info
            matches.push({ id: str.Id, name: str.CLASS_NAME + " (" + str.HIGH_READ_CODE + ")" });
          }
        });
     
        cb(matches);
      };
    };
	
	/*var createEntitySearchDisplayAs = function(){
		var optionsString = "";
		$.each( FormBuilderState.entityModel.getEntity().getAttributes(), function( index, element ){
			optionsString += "<option>" + element.name + "</option>";
		});
		
		return  "<div class='settings-label'>Display as</div>" +
		"<select id='displayas'>" +
		"<option></option>" +
		optionsString +
		"</select>";
	};
	
	var createSearchType = function(){
		return "<div class='form-item'><div class='settings-label'>Search type</div>" +
		"<select id='searchtype'>" +
		"<option></option>" +
		"<option>drugSearchService</option>" +
		"<option>terminologySearchService</option>" +
		"<option>testSearchService</option>" +
		"</select></div>";
	};
	
	var createMinChars = function(){
		return "<div class='form-item'><div class='settings-label'>Min chars</div>" +
		"<input id='minchars' type='text'></input></div>";
	};
	
	var createIgnoreUserInput = function(){
		return "<div class='form-item'><div class='settings-label'>Ignore user input</div>" +
		"<input id='ignoreuserinputonsearching' type='checkbox'></input></div>";
	};
	
	var createPlaceholder = function(){
		return "<div class='form-item'><div class='settings-label'>Placeholder</div>" +
		"<input id='placeholder' type='text'></input></div>";
	};*/
	
}