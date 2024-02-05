/* finds the intersection of 
 * two arrays in a simple fashion.  
 *
 * PARAMS
 *  a - first array, must already be sorted
 *  b - second array, must already be sorted
 *
 * NOTES
 *
 *  Should have O(n) operations, where n is 
 *    n = MIN(a.length(), b.length())
 */
function intersect_safe(a, b)
{
  var ai=0, bi=0;
  var result = new Array();

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}

var Search = function(){

	p = new Parser(),

	db = [],
	results = [],

	this.IndexTerm = function(id, term, result){
		results[id] = result
		var tokens = p.Tokenise(term)
		for (var i = 0; i < tokens.length; i++ ){
			if (!( tokens[i] in db )) {
				db[tokens[i]] = [id]				
			} else {
				if (( db[tokens[i]].indexOf(id) == -1)) {
					db[tokens[i]].push(id)
				}
			}
		}
	},

	this.DumpTermPostings = function(){
		var output = []
		Object.keys(db).forEach(function(entry){
			output.push( { term:entry, postings: db[entry] } )
		})
		return output
	},

	this.DumpTerms = function(){
		var output = []
		for ( i in results ) {
			output.push( { id:i, term: results[i] } )
		}
		return output
	},

	this.Dump = function(){
		var output = '['
		var sep = ''
		Object.keys(db).forEach(function(entry){
			output += sep + '{term:"' + entry + '", postings: [' + db[entry] + ']}'
			sep = ', '
		})
		output += ']'
		console.log(output)
	}

	this.Search = function(query) {
		var searchResult = []
		var result = {}
		console.log("Searching: ", query, " Database contains: ", Object.keys(db).length, " tokens and ", results.length, " terms")
		var queryTokens = p.Tokenise(query)
		var idx;
		queryTokens.forEach(function(search){

			idx = 0;
			var union = []

			Object.keys(db).forEach(function(entry){
				if ( search.length <= entry.length && entry.substr(0,search.length) == search ) {
					if ( idx == 0 ) {
						union = db[entry]
					} else {
						union = union.concat(db[entry])
					}
					idx++
				}
			})

			result[search] = union
			console.log(union)
		})

		idx = 0
		Object.keys(result).forEach(function(entry){
			if ( idx == 0 ) {
				intersect = result[entry]
			} else {
				intersect =intersect_safe(intersect, result[entry])
			}
			idx++
		})

		for ( var i = 0; i < intersect.length; i++ ){
			searchResult.push({term: results[intersect[i]]})
		}

		return searchResult

	}
}