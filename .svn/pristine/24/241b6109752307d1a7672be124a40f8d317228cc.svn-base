//
// Requires:
//   snomed_data.js - the raw data to index and use.
//
//
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

console.log('Installing Snomed DB')

const snomedDBName = "snomed";
const snomedTermStore = "terms"
const snomedPostingStore = "postings"

var SnomedDB = {}
SnomedDB.db = null;
SnomedDB.parser = new Parser()

SnomedDB.onerror = function(e) {
  console.log(e);
};

SnomedDB.reset = function() {
		// Delete the whole thing

		var req = indexedDB.deleteDatabase(snomedDBName);
		req.onsuccess = function () {
		    console.log("Deleted database successfully");
		};
		req.onerror = function () {
		    console.log("Couldn't delete database");
		};
		req.onblocked = function () {
		    console.log("Couldn't delete database due to the operation being blocked");
		};

}


//SnomedDB.reset();

SnomedDB.open = function() {
	console.log('Opening')
	var version = 1;
	var request = indexedDB.open(snomedDBName, version);

	// We can only create Object stores in a versionchange transaction.
	request.onupgradeneeded = function(e) {
		console.log('Upgrading')
		var db = e.target.result;

		// A versionchange transaction is started automatically.
		e.target.transaction.onerror = SnomedDB.onerror;

		if(db.objectStoreNames.contains(snomedTermStore)) {
		  db.deleteObjectStore(snomedTermStore);
		}

		if(db.objectStoreNames.contains(snomedPostingStore)) {
		  db.deleteObjectStore(snomedPostingStore);
		}

    	var tokenStore = db.createObjectStore( snomedPostingStore, { keyPath: "term" } );
		var termStore = db.createObjectStore( snomedTermStore, { keyPath: "id" });

		tokenStore.transaction.oncomplete = function(event) {
			console.log('Database 1 complete')
		}
		
		termStore.transaction.oncomplete = function(event) {
			console.log('Database 2 complete')
		}
  	

	  	var s = new Search();
		for (var i in snomedData) {
			var term = snomedData[i]
			s.IndexTerm(term.id, term.indexTerm, term.matchResult)
	  	}

		var data = s.DumpTermPostings() 
		for ( i in data) {
			tokenStore.add(data[i]);
		}
		console.log('Database for Token/Postings complete')

		data = s.DumpTerms()
		for ( i in data) {
			termStore.add(data[i]);
		}
		console.log('Database for Terms complete')




	}

	request.onsuccess = function(e) {
		console.log('Opened')
		SnomedDB.db = e.target.result;
		// Do some more stuff in a minute
	};

	request.onerror = SnomedDB.onerror;
};

function unique(x) {
  return x.filter(function(elem, index) { return x.indexOf(elem) === index; });
};
function union(x, y) {
	console.log('Union...')
  return unique(x.concat(y));
};


SnomedDB.simpleSearch = function(queryText, callbackFunction){
	console.log("Simple Search", queryText)

    var db = SnomedDB.db;
    var trans = db.transaction([snomedPostingStore], "readonly");
    var store = trans.objectStore(snomedPostingStore);	
    var matches = []
	var postings = []

	// Create a function to work through the list of function calls that will do 
	// the work on a token by token basis.

	function iterate(list,offset){
		offset = typeof offset !== 'undefined' ? offset : 0;
		if ( typeof list[offset] !== 'undefined' ) {
			list[offset].func(list[offset].params, function(){iterate(list,offset+1)})
		}
	}

	// This method does the actual query for postings for a given single token
	// This token is then expanded into a range so that the query returns a 'STARTS WITH' result

	function getPostings(search,callback) {
		console.log('Get Postings for', search)
	 	var keyRangeValue = IDBKeyRange.bound(search, search + String.fromCharCode(255));
		store.openCursor(keyRangeValue).onsuccess = function(event) {
			var cursor = event.target.result;
			if(cursor) {
				console.log('Result = ', cursor.key)
				matches.push(cursor.value)
				console.log(cursor.value)
				cursor.continue();
			} else {
				console.log('getPostings Entries all displayed.');
				callback()
			}
		}
	}


	// Parse the query into tokens using the same tokeniser as the original data was put 
	// together with

	var queryTokens = SnomedDB.parser.Tokenise(queryText)

	// For each token, create a dedicated function to evaluate it and add it into the list
	// of function calls to be made sequentially.

	var list = []
	queryTokens.forEach(function(search){
		list.push({func: function(search, callback){
			console.log('Postings fetch for', search)
			getPostings(search, callback)
		},params:search})
	})
	console.log(list)

	var resultList = []
	var results = []

	list.push({func: function(params, callback){
		console.log('Finished query')

	    var db = SnomedDB.db;
	    var trans = db.transaction([snomedTermStore], "readonly");
	    var store = trans.objectStore(snomedTermStore);	

		// Now expand the postings lists and lookup the actual term

		total = 0
		idx = 0
		while ( total < 50 && idx < matches.length ) {
			console.log('Fetching terms for', matches[idx])
			for ( i in matches[idx].postings) {
				if ( total < 50 ) {
					resultList.push({func: function(key, callback){
						var keyRangeValue = IDBKeyRange.bound(key, key);
						store.openCursor(keyRangeValue).onsuccess = function(event) {
							var cursor = event.target.result;
							if(cursor) {
								results.push(cursor.value)
								cursor.continue();
							} else {
								callback()
							}
						}
					}, params: "" + matches[idx].postings[i] + ""})
				}
				total++
			}
			idx++
		}
		callback()

	}, params:null})


	list.push({func: function(params, callback){
		console.log('Finished query steps')
		resultList.push({func: function(result, callback){
			callbackFunction(results)
			callback()
		}, params:null})
		iterate(resultList)
		callback()
	}, params:null})

	// Now do the hard work

	iterate(list)


}

