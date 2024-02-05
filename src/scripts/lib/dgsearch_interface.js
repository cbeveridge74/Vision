/*
** INPS search support
**
** Written by D. Goddard 2015
*/

var Search = {

	state: 'IDLE',
	worker: {},
	resultsCallback: function(){console.log('no results handler installed');},


	initialise: function(ready){
		this.worker = new Worker('scripts/lib/dgsearch.js');

		this.worker.addEventListener('message', function(e){
			switch ( e.data.response ){
				case 'initialised':

					console.log('Worker is ready');
					this.state = 'READY';
					ready();
					break;

				case 'closed':
					console.log('Worker has stopped');
					break;

				case 'test':
					console.log(e.data);
					break;

				case 'suggestions':
					resultsCallback(e.data);
					break;

				case 'matches':
					resultsCallback(e.data);
					break;

				case 'linked':
					console.log('Linked results');
					break;
			}
		}, false);

		this.worker.postMessage({cmd: 'initialise'});
		console.log('created worker');

		this.worker.postMessage({cmd: 'test'});
	},

	/*
	** queryText is a piece of text with one or more tokens on it to search for.
	** resultLimit is the number of rows to return as a maximum.
	** callback(err,results) is a function that is to be called when the results are available.
	*/
	retrieve: function(queryText, resultLimit, callback){
		if ( this.state == 'BUSY' ){
			callback({id: 1, error:'System is busy', message: 'System is processing a previous request.'},null)
		} else {
			if ( this.state != 'READY' ) {
				console.log('Worker thread has not completed initialisation')
				callback({id: 2, error:'System not ready', message: 'System is still initialising. Please wait and try again'}, null)
			} else {
				this.state = 'BUSY';
				this.worker.postMessage({query: queryText, results: resultLimit})
			}
		}
	},

	saveState: function(){
		console.log('saveState');
	},

	close: function(){
		this.state = 'IDLE';
		this.worker.postMessage('close');
	},

	link: function(entered, chosen){
		console.log('link');
		if ( this.state != 'BUSY' ) {
			this.worker.postMessage({cmd:'link', entered: entered, chosen: chosen})
		}

	},

	suggest: function(queryText, previousChoices, resultLimit, callback){
		console.log('Get Suggestions', previousChoices);
		resultsCallback = function(result){
			callback(result.suggestions);
		}
		this.worker.postMessage({cmd:'suggest', text: queryText, previousChoices: previousChoices, limit: resultLimit});
	},

	find: function(queryText, previousChoices, group, resultLimit, callback){
		console.log('Find results', queryText, ' within group ', group);
		resultsCallback = function(result){
			callback(result.matches);
		}
		this.worker.postMessage({cmd:'find', text: queryText, previousChoices: previousChoices, group: group, limit: resultLimit});
	}
}


