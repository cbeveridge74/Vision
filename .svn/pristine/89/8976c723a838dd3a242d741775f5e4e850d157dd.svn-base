/*
** Search demonstration code
**
** Written by D. Goddard 2015
*/

// The following are all indexed by the same integer
var words = [];
var scores = [];
var terms = [];

/*
******************************************************************************************************************************
** UTILITIES
******************************************************************************************************************************
*/

var parse = function(text) {

	// convert to upper case

	var str = text.toUpperCase()

	// translate greek characters to their names
	var greek = [
				"\u0391", 'ALPHA',
				"\u0392", 'BETA',
				"\u0393", 'GAMMA',
				"\u0394", 'DELTA',
				"\u0395", 'EPSILON',
				"\u0396", 'ZETA',
				"\u0397", 'ETA',
				"\u0398", 'THETA',
				"\u0399", 'IOTA',
				"\u039A", 'KAPPA',
				"\u039B", 'LAMBDA',
				"\u039C", 'MU',
				"\u039D", 'NU',
				"\u039E", 'XI',
				"\u039F", 'OMICRON',
				"\u03A0", 'PI',
				"\u03A1", 'RHO',
				"\u03A3", 'SIGMA',
				"\u03A4", 'TAU',
				"\u03A5", 'UPSILON',
				"\u03D2", 'UPSIH',
				"\u03A6", 'PHI',
				"\u03A7", 'CHI',
				"\u03A8", 'PSI',
				"\u03A9", 'OMEGA',
				"\u03B1", 'ALPHA',
				"\u03B2", 'BETA',
				"\u03B3", 'GAMMA',
				"\u03B4", 'DELTA',
				"\u03B5", 'EPSILON',
				"\u03B6", 'ZETA',
				"\u03B7", 'ETA',
				"\u03B8", 'THETA',
				"\u03D1", 'THETASYM',
				"\u03B9", 'IOTA',
				"\u03BA", 'KAPPA',
				"\u03BB", 'LAMBDA',
				"\u03BC", 'MU',
				"\u03BD", 'NU',
				"\u03BE", 'XI',
				"\u03BF", 'OMICRON',
				"\u03C0", 'PI',
				"\u03D6", 'PIV',
				"\u03C1", 'RHO',
				"\u03C2", 'SIGMAF',
				"\u03C3", 'SIGMA',
				"\u03C4", 'TAU',
				"\u03C5", 'UPSILON',
				"\u03C6", 'PHI',
				"\u03C7", 'CHI',
				"\u03C8", 'PSI',
				"\u03C9", 'OMEGA',
				"\u03D1", 'THETASYM',
				"\u03D2", 'UPSIH',
				"\u03D6", 'PIV']

	for ( var i = 0; i < greek.length/2; i = i + 2 ) {
		var re = new RegExp(greek[i],"g");
		str = str.replace(re, greek[i+1])
	}


	// turn simple separators into spaces

	str = str.replace(/(\s+|[\,\;\:\!\?\(\)\[\]\{\}\<\>\"])/g, ' ')

	// Periods

	str = str.replace(/(([A-Z]\.){1,})/g,' [$1] ').replace(/ \[([A-Z])\.\]/g, '$1::').replace(/[\[\]\.]/g,'').replace(/::/g,' ').replace(/  /g,' ')

	// Hyphens

	str = str.replace(/([A-Z0-9]+)-([A-Z0-9]+)/g,'$2 $1$2').replace(/-/g, '')

	// Slash

	str = str.replace(/([A-Z0-9]+)\/([A-Z0-9]+)/g,'$2 $1::$2').replace(/\//g, '').replace(/::/g,'\/')

	// Ampersand and plus

	str = str.replace(/\&/g, '+').replace(/([A-Z0-9]{2,}) *\+ *([A-Z0-9]{2,})/g, '$1::$2').replace(/([A-Z ]) *\+ *([A-Z ])/g, ' $1+$2 ').replace(/::/g,' ')

	// All other special chars

	str = str.replace(/[\#\$\%\'\*\=\@\\\^\|\~]/g, '').replace(/ +/g, ' ')

	return str
}


var tokenise = function(text) {
	var tokens = parse(text).split(" ")
	var result = []

	// Remove all strings that are too short or start with a digit

	tokens.forEach(function(token){
		if ((!( token.substr(0,1) >= '0' && token.substr(0,1) <= '9' )) && token.length > 0 ) {
			result.push(token)
		}
	})
	
	return result
}


var binarySearch = function (items, value){

    var startIndex  = 0,
        stopIndex   = items.length - 1,
        middle      = Math.floor((stopIndex + startIndex)/2);

    while(items[middle] != value && startIndex < stopIndex){
        //adjust search area
        if (value < items[middle]){
            stopIndex = middle - 1;
        } else if (value > items[middle]){
            startIndex = middle + 1;
        }

        //recalculate middle
        middle = Math.floor((stopIndex + startIndex)/2);
    }

    return middle;
}

/*
******************************************************************************************************************************
**  MAIN INTERFACES
******************************************************************************************************************************
*/

/*
** Suggest
**    This method when called with no previous selections simply finds words that start with the entered text.
**    The results will include the highest scored matches whether from previous selections or simply from text overlap.
**    When a user makes a selection the app must keep the 'suggestion' object and add to the next 'suggest' call as previous selections.
**    The may choose a word which has no groups associated with it in which case the system will attempt to match the text they 
**    have just entered with terms that contain the previous word as well. 
**      If no matches are found, the results will indicate that the suggestions are un-related to the previous word and that as a 
**      combination no results will be found.
**    If they choose a word with a particular group the system will match the text entered with words as before but only return 
**    terms that have the given grouping.
**    
** Algorithm
**    Split entered text into tokens.
**    Find terms that contain all tokens (including previous choices)
**    Reverse engineer list of words that match the entered tokens that occur in those terms.
**    Rank the words found in descending order
**    return array of suggested word and its terms plus a distinct list of the groups they correspond to plus a count of matches.
** 
** Input: 
**    current entered text - everything user has entered SINCE last selection. Note if they enter multiple words before
**       making any choices, this method will attempt to find combined word matches.
**    previous selections - array of objects containing data about words user has been prompted to select
**                             array objects contain a 'wordId' attribute.
**    limit - maximum number of suggestions to find
**
** Output:
**    array of objects in ranked descending order.
**    each object contains a word and possibly a list of groups
** 
*/
var suggest = function ( entered, previousChoices, limit, callback ) {

	// See if there is just a single character to work on

	var bits = entered.split(/ /);
	console.log(bits);
	var token = bits.pop();
	console.log('So last part = ', token, bits.length)
	if ( bits.length == 0 && token.length < 2 ) {
		console.log('Nothing useful to search on', token)

		// Create a list of words only.

		// locate the first matching word
		var i = binarySearch(this.words, token);

		// skip forward in case the match position was just before a real word.
		while ( this.words[i] != undefined && this.words[i].substring(0,token.length) != token ) {
			i++;
		}

		var suggestions = [];

		// Now iterate over matches until no more match the given string length. (i.e. match = STARTS WITH)
		while ( this.words[i] != undefined && this.words[i].substring(0,token.length) == token ) {
			suggestions.push(i);
			i++;
		}

		// Sort and return
		var result = {};
		result[token] = [];
		suggestions.sort(function(a,b){
			if ( self.scores[a] < self.scores[b] ) return 1;
			if ( self.scores[a] > self.scores[b] ) return -1;
			if ( self.words[a].length > self.words[b].length ) return 1;
			if ( self.words[a].length < self.words[b].length ) return -1;
			if ( self.words[a] > self.words[b] ) return 1;
			if ( self.words[a] < self.words[b] ) return -1;
			return 0;
		}).some(function(wordId){
				if ( self.words[wordId].length >= 4 ){
					result[token].push({wordId: wordId, word: self.words[wordId]});
				}
			return ( result[token].length >= limit)
		});
		console.log('Processed ',  result)
		callback(result);

	} else {

		var results  = {};

		function onlyUnique(value, index, self) { 
		    return self.indexOf(value) === index;
		}

		// Put previousChoices back in the result pot.

		var findTokens = 0;
		previousChoices.forEach(function(choice){
			findTokens++;
			var id = choice.wordId;
			console.log('Previous word ' + self.words[id]);
			self.terms[id].forEach(function(termIdx){
				if ( typeof(results[termIdx]) == 'undefined' ) {
					results[termIdx] = {};
				}
				results[termIdx][findTokens] = 1;
			})			
		});

		// Results now contains the DESCRIPTION ID for all terms containing the previously selected words.

		console.log('Previous words = ' + previousChoices.length + ' produced list of ' + Object.keys(results).length + ' descriptions');

		// Now find words that match the entered text

		this.tokenise(entered).filter( onlyUnique ).forEach(function(token){
			findTokens++;

			// locate the first matching word
			var i = binarySearch(this.words, token);

			// skip forward in case the match position was just before a real word.
			while ( this.words[i] != undefined && this.words[i].substring(0,token.length) != token ) {
				i++;
			}

			// Now iterate over matches until no more match the given string length. (i.e. match = STARTS WITH)
			while ( this.words[i] != undefined && this.words[i].substring(0,token.length) == token ) {
				self.terms[i].forEach(function(termIdx){
					if ( typeof(results[termIdx]) == 'undefined' ) {
						results[termIdx] = {};
					}
					results[termIdx][findTokens] = 1;
				})			
				i++;
			}
		});

		// Now results contains terms that match all required tokens
		// Need to find the best ones.

		var bestTerms = {};
		Object.keys(results).forEach(function(termId){
			if ( Object.keys(results[termId]).length == findTokens ) {
				bestTerms[termId] = 1;
			}
		})

		console.log('Found ' + Object.keys(bestTerms).length + ' terms containing all terms. Original list = ' + Object.keys(results).length)


		// Now go through all the words again for each one scan the word's term list to see if the result contains that term.

		var suggestions = {};
		var tokenId = 0;
		this.tokenise(entered).filter( onlyUnique ).forEach(function(token){
			tokenId++;

			// locate the first matching word
			var i = binarySearch(this.words, token);

			// skip forward in case the match position was just before a real word.
			while ( this.words[i] != undefined && this.words[i].substring(0,token.length) != token ) {
				i++;
			}

			// Now iterate over matches until no more match the given string length. (i.e. match = STARTS WITH)
			while ( this.words[i] != undefined && this.words[i].substring(0,token.length) == token ) {

				// See if there is an interesect with this word's terms and the result set.

				self.terms[i].some(function(termIdx){
					if ( typeof(bestTerms[termIdx]) != 'undefined' ) {
						if ( typeof(suggestions[token]) == 'undefined' ) {
							suggestions[token] = [];
						}
						suggestions[token].push(i);
						return true;
					} else {
						return false;
					}
				})			
				i++;
			}
		});

		// Suggestions should now be an object with the entered tokens as keys and arrays of real word IDs
		// Create a result set that is ordered by the real word's scores.

		var result = {};
		Object.keys(suggestions).forEach(function(entered){
			result[entered] = [];
			suggestions[entered].sort(function(a,b){
				if ( self.scores[a] > self.scores[b] ) return -1;
				if ( self.scores[a] < self.scores[b] ) return 1;
				if ( self.words[a].length > self.words[b].length ) return 1;
				if ( self.words[a].length < self.words[b].length ) return -1;
				if ( self.words[a] > self.words[b] ) return 1;
				if ( self.words[a] < self.words[b] ) return -1;
				return 0;
			}).some(function(wordId){
				if ( self.words[wordId].length >= 4 ){
					result[entered].push({wordId: wordId, word: self.words[wordId]});
				}
				return ( result[entered].length >= limit)
			});
		});
		console.log('Processed ',  result)
		callback(result);
	}
}

var find = function ( query, previousChoices, group, limit, callback ){
	var results  = {};
	var findTokens = 0;

	// Put previousChoices back in the result pot.

	var findTokens = 0;
	previousChoices.forEach(function(choice){
		findTokens++;
		var id = choice.wordId;
		this.scores[id]++;
		console.log('Previous word ' + self.words[id]);
		self.terms[id].forEach(function(termIdx){
			if ( typeof(results[termIdx]) == 'undefined' ) {
				results[termIdx] = {};
			}
			results[termIdx][findTokens] = 1;
		})			
	});

	// Results now contains the DESCRIPTION ID for all terms containing the previously selected words.

	console.log('Previous words = ' + previousChoices.length + ' produced list of ' + Object.keys(results).length + ' descriptions');

	this.tokenise(query).forEach(function(token){
		findTokens++;
		var i = binarySearch(this.words, token);

		while ( ( this.words[i] != undefined ) && ( this.words[i].substring(0,token.length) != token ) ) {
			i++;
		}

		while ( ( this.words[i] != undefined ) && ( this.words[i].substring(0,token.length) == token ) ) {
			self.terms[i].forEach(function(termIdx){
				if ( typeof(results[termIdx]) == 'undefined' ) {
					results[termIdx] = {};
				}
				results[termIdx][findTokens] = 1;
			})			
			i++;
		}

	});

	var matches = [];

	Object.keys(results).forEach(function(m){
		if ( ( Object.keys(results[m]).length == findTokens ) && ((group == '') || (db.descriptions[m].g == group) ) ) {
			var term = db.descriptions[m];
			matches.push({group: term.g, term: term.d, read_code: term.r, drug_code: term.c});
		}
	})

	matches.sort(function(a,b){
		if ( a.term.length > b.term.length ) return 1; 
		if ( b.term.length > a.term.length ) return -1; 
		if ( a.term > b.term ) return 1;
		if ( b.term > a.term ) return -1;
		return 0;
	});

	var finalResult = [];
	finalResult = matches.slice(0,limit);


	callback({total: matches.length, data: finalResult});
}


var loadDB = function(){

	importScripts('../../search/data/search_db_data.json');
	self.words = self.sourceData.w;
	self.terms = self.sourceData.t;
	self.scores = self.sourceData.s;
	self.db = {descriptions: self.sourceData.d};

}

/*
******************************************************************************************************************************
** BINDINGS TO SEARCH_INTERFACE
******************************************************************************************************************************
*/


self.addEventListener('message', function(e) {
	switch ( e.data.cmd ){

		case 'initialise':
			console.log('initialise called');

			self.loadDB();			

			self.postMessage({response: 'test', data: {word: self.words[6123], term: db.descriptions[self.terms[6123][0]]}});
			self.postMessage({response:'initialised'});
			break;

		case 'close':
			console.log('close called')
			self.postMessage({response: 'closed'});
			self.close();
			break;

		case 'test':
			console.log('Returning', words[12324]);
			self.postMessage({response: 'test', data: words[12324]});
			break;

		case 'suggest':
			console.log('Getting suggestions', e.data);
			self.suggest(e.data.text, e.data.previousChoices, e.data.limit, function(result){
				self.postMessage({response: 'suggestions', suggestions: result});
			});
			break;

		case 'find':
			console.log('Find actual results');
			self.find(e.data.text, e.data.previousChoices, e.data.group, e.data.limit, function(result){
				self.postMessage({response: 'matches', matches: result});
			});
			break;

		case 'link':
			console.log('Linking');
			self.link(e.data.entered, e.data.chosen, function(){
				self.postMessage({response:'linked'})
			});
			break;
	}
}, false);

