angular.module('vnDocumentModule', [], function(){})
.run( function( vnDocumentFactory ){
	//vnDocumentFactory.loadDocuments();
})
.factory('vnDocumentFactory', function( $rootScope, vnDatabaseFactory ){
		var factory = {};
		

		factory.retrieveDocuments = function(){

		};

		factory.retrieveDocument = function(){

		};

		return factory;
		/*chrome.runtime.getPackageDirectoryEntry( function (dirEntry) {
		//chrome.runtime.getURL("/apps/visiontasks/letters/Scan.jpg")

		var directoryReader = dirEntry.createReader();

    	directoryReader.readEntries( function( results ){
    		for( var resultCount = 0;resultCount < results.length; resultCount++){
    			if( results[ resultCount ].fullPath == "/crxfs/data" ){
    				var dataDirectoryReader = results[ resultCount ].createReader();
    				dataDirectoryReader.readEntries( function( dataResults ){
	    				for( var dataResultCount = 0; dataResultCount < dataResults.length; dataResultCount++){
	    					if( dataResults[ dataResultCount ].fullPath == "/crxfs/data/clinicaldocs" ){
	    						var docDirectoryReader = dataResults[ dataResultCount ].createReader();
	    						docDirectoryReader.readEntries( function( docResults ){
	    							for( var docCount = 0;docCount < docResults.length;docCount++ ){
	    								console.log( docResults[docCount].name );
	    							}
	    						});
	    						break;
	    					}
	    				}
	    			});
	    			break;
    			}
    		}

    		
    	});*/

    	/*angular.forEach( results, function( resultValue, resultIndex ){
    			console.log( resultValue );
    			if( resultValue.fullPath == "/crxfs/data" ){
    				console.log( "insde" );
    				var dataDirectoryReader = resultValue.createReader();
    				dataDirectoryReader.readEntries( function( dataResults ){
    					angular.forEach( dataResults, function( dataResultsValue, dataResultsIndex ){
    						console.log( dataResultsValue );
    					});
    				} );
    			}
    		});*/

	    /*dirEntry.getFile("apps/visiontasks/ocr.html", undefined, function (fileEntry) {
	    fileEntry.file(function (file) {
	            var reader = new FileReader();
	            reader.addEventListener("load", function (event) {
	                // data now in reader.result 
	                console.log(reader);                                                       
	                console.log(reader.result);
	            });
	            reader.readAsText(file);
	        });
	    }, function (e) {
	        console.log(e);
	    });
	});*/
});