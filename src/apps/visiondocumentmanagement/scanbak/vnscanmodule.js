angular.module('vnScanModule', [],function () {})
.factory( 'vnScanFactory', function( 
	$rootScope ){
	var factory = {};
	var model;

	factory.setModel = function( value ){
		model = value;
		$rootScope.$broadcast( "SCAN_DOCUMENT_UPDATED" );
	};

	factory.getModel = function(){
		return model;
	};

	factory.clearModel = function(){
		factory.setModel({ 
			id: null,
			name: null
		});
	};
	factory.clearModel();

	return factory;
})
.controller('vnScanController', function(
		$rootScope,
		$scope,
		$timeout,
		vnScanFactory,
		vnVisionDocumentManagementFactory
	){
	var img ;
	var displayImg;
	var iframe;
	var canvas;
	var verboseInfo;
	var words = {};

	$scope.processingComplete = null;
	$scope.docScanCommands = docScanCommands;


	// Section
	$scope.DATE 		= 0;
	$scope.PATIENT 		= 1;
	$scope.FOLDER 		= 2;
	$scope.CLINICIAN 	= 3;
	$scope.ORG 			= 4;
	$scope.DEPT 		= 5;
	$scope.READ 		= 6;
	$scope.COMMENT 		= 7;

	$scope.SCANTEXT = "SCANTEXT";
	$scope.NAV_UP 	= "NAV_UP";
	$scope.NAV_DOWN = "NAV_DOWN";

	var count = 0;
	var demoData = new DataStore();
	

	$scope.imageVersion = true;
	$scope.PN 	= 4;
	$scope.DOB 	= 3;
	$scope.SN 	= 2;
	$scope.FN 	= 1;

	$scope.$watch( "processingComplete", function( nValue ){
		if( nValue == true ){
			$scope.docScanCommands[ 0 ].show = true
		}
	} ); 

	var checkPreviousAndNext = function( doc ){
		vnVisionDocumentManagementFactory.getNext( 
			vnVisionDocumentManagementFactory.UNPROCESSED,
			doc,
			function( nextDoc ){
				$scope.previousDocAvailable = (nextDoc == null);
			});

		vnVisionDocumentManagementFactory.getPrevious( 
			vnVisionDocumentManagementFactory.UNPROCESSED,
			doc,
			function( prevDoc ){
				$scope.nextDocAvailable = (prevDoc == null);
			});
	};

	$scope.handleItemClick = function(){
		var dis = this;
		this.section.data.forEach( function( data ){
			if( data != dis.item ){
				data.selected = false;
			}
		});
		dis.item.selected = !this.item.selected;
	};
	$rootScope.$on( "SCAN_DOCUMENT_UPDATED", function(){ 
		showScan(); 
		resetScreen();
		checkPreviousAndNext( vnScanFactory.getModel() );
	});

	var resetScreen = function(){

		$scope.generateMessage = "Click to generate tags..."
		img = $( "#processing-version" );
		displayImg = $( "#display-version" );
		iframe = $("#theFrame");
		canvas = $( '#myCanvas' );
		$timeout( function(){
			calculateScreenRatio();
		} );
		
		initialiseSections();
		words = {};
		$scope.imageVersion = true;
		$scope.processingComplete = null;
		$scope.docScanCommands = docScanCommands;
	};

	var calculateScreenRatio = function(){
		$timeout( function(){
			if( displayImg != null && img != null ){
				$scope.screenRatio = displayImg.width() / img.width();
			}
		}, 1 );
	};

	var supportedDateFormats = [{
		string: 'DD.MM.YYYY',
		regex: /[0-9]{2}\.[0-9]{2}\.[0-9]{4}/gm
	},
	{
		string: 'DD/MM/YYYY',
		regex: /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/gm
	}];

	var supportedOrganisations = [
		{ 
			id: 0, 
			name: "Edinburgh Royal Infirmary" },
		{ 
			id: 1, 
			name: "Bruntsfield Health Centre" 
		}
	];

	var supportedDepartments = [
		{ 
			id: 0, 
			name: "Respiratory Department",
			read: "Seen in respiratory department",
			folder: "Respiratory"
		},
		{ 
			id: 1, 
			name: "Ear, Nose and Throat",
			read: "Seen in ENT department",
			folder: "ENT"
		}
	];

	$scope.handleTagEnter = function(){
		
		
		switch( this.section.id ){
			case $scope.DATE :
				var date = this.item;
				var dates = [];
				supportedDateFormats.forEach( function( supportedDateFormat ){
					dates.push( moment( date ).format( supportedDateFormat.string ) );
				});
				highlight( dates );
				break;
			case $scope.PATIENT :
				var patient = this.item;
				var highlightArray = [ 
					patient.Surname, 
					patient.Forename,
					patient.PatientNumber ];
				var dateWords = [];
				supportedDateFormats.forEach( function( supportedDateFormat ){
					dateWords.push( moment( patient.DOB, "DD-MMM-YYYY" ).format( supportedDateFormat.string ) );
				});
				highlightArray = highlightArray.concat( dateWords );
				highlight( highlightArray );
				break;
			case $scope.FOLDER :
				var dept = this.item;
				var highlightArray = [ dept.name ];
				highlight( highlightArray );
				break;
			case $scope.CLINICIAN :
				var clinician = this.item;
				var highlightArray = [ 
					clinician.surname ];
				highlight( highlightArray );
				break;
			case $scope.ORG :
				var org = this.item;
				var highlightArray = [ org.name ];
				highlight( highlightArray );
				break;
			case $scope.DEPT :
				var dept = this.item;
				var highlightArray = [ dept.name ];
				highlight( highlightArray );
				break;
			case $scope.READ :
				var dept = this.item;
				var highlightArray = [ dept.name ];
				highlight( highlightArray );
				break;
			case $scope.COMMENT :
				break;
		}
	};

	$scope.handleTagLeave = function(){
		highlight( null );
	};

	var highlight = function( items ){
		if( items == null ){
			$scope.wordsToHighlight = null;
			var text = $scope.text;
			text = text.replace( /(<span class='text-highlight'>)/g, "" );
			text = text.replace( /(<\/span>)/g, "" );
			$scope.text = text;
			return;
		}

		if( !$scope.imageVersion ){
			items.forEach( function( item ){
				var text = $scope.text.replace( item, "<span class='text-highlight'>" + item + "</span>" );
				if( text.indexOf( "<span class='text-highlight'>" ) < 0 && item.indexOf( " " ) > -1 ){
					var splitItems = item.split( " " );
					splitItems.forEach( function( splitItem ){
						text = $scope.text.replace( splitItem, "<span class='text-highlight'>" + splitItem + "</span>" );
						$scope.text = text;
					});
				}else{
					$scope.text = text;
				}
			});
			return;
		}
		
		var wordsToHighlight = [];
		items.forEach( function( item ){
			if( item.indexOf(' ') > -1 ){
				separatedWords = item.split( ' ' );
				separatedWords.forEach( function( separatedWord ){
					wordsToHighlight.push( words[ separatedWord ] );
				});
			}else{
				wordsToHighlight.push( words[ item ] );
			}
			
		} );
		$scope.wordsToHighlight = wordsToHighlight;
	};

	var handleResize = function(){
		displayImg = $( "#display-version" );
		calculateScreenRatio();
	};
	

	$( window ).resize(function() {
        handleResize();
      });

	$rootScope.$watch( 
  	"screens.VN_DOCMAN__DOCUMENT_SCAN", function( value ){
  		if( value ){
  			handleShow();
  		}
  	});

	var handleShow = function(){
		resetScreen();
	};





	var initialiseSections = function(){
		$scope.sections = [
			{ id: $scope.DATE , title: "Date", data: [] },
			{ id: $scope.PATIENT, title: "Patient", data: [] },
			{ id: $scope.FOLDER, title: "Folder", data: [] },
			{ id: $scope.CLINICIAN, title: "Clinician", data: [] },
			{ id: $scope.ORG, title: "Organisation", data: [] },
			{ id: $scope.DEPT, title: "Department", data: [] },
			{ id: $scope.READ , title: "Read code", data: [] },
			{ id: $scope.COMMENT, title: "Comments", data: [] }
		];
	};

	var showScan = function(){
		$scope.scan = "data/clinicaldocs/" + vnScanFactory.getModel().name;
	};

	

	$scope.handleButtonClick = function( buttonCommand ){
		if( buttonCommand == $scope.SCANTEXT ){
	      	toggleText();
	    }else if( buttonCommand == $scope.NAV_UP ){
	    	vnVisionDocumentManagementFactory.getPrevious( 
	    		vnVisionDocumentManagementFactory.UNPROCESSED, 
	    		vnScanFactory.getModel(), 
	    		function( doc ){
	    			vnScanFactory.setModel( doc );

	    		});
	    }else if( buttonCommand == $scope.NAV_DOWN ){
	    	vnVisionDocumentManagementFactory.getNext( 
	    		vnVisionDocumentManagementFactory.UNPROCESSED, 
	    		vnScanFactory.getModel(), 
	    		function( doc ){
	    			vnScanFactory.setModel( doc );
	    		});
	    }
	};

	$scope.handleGenerateClick = function(){ 
		$scope.generateMessage = "Generating tags...";
		handleProcessClick();
	};

	$rootScope.$on( "INFORM_COMMAND_SELECTED", function( scope, value, event ){
    	if( value.id == SCANCOMPLETE ){
          
      	}
    });

	var toggleText = function(){
		$scope.imageVersion = !$scope.imageVersion;
	};

	var removeStopWords = function( text ){
		text = text.replace( demoData.stopwordsregex, " " );
		return text;
	};

	var removeNewlines = function( text ){
		var re = /(\\n)+/gm;
		text = text.replace(re ," ");
		return text;
	};

	var removeMultiSpaces = function( text ){
		var re = /( )+/gm;
		text = text.replace(re ," ");
		return text;
	};

	var removeCommas = function( text ){
		var re = /(,)+/gm;
		text = text.replace(re ,"");
		return text;
	};

	

	var convertDates = function( dates, format ){
		dates.forEach( function( date, index ){
			date = new Date( moment( date, format ) );
			dates[ index ] = date;
		});
	};

	var findDates = function( text ){
		
		var dates = [];
		supportedDateFormats.forEach( function( supportedDateFormat ){
			var temp = text.match( supportedDateFormat.regex );
			convertDates( temp, supportedDateFormat.string );
			dates = dates.concat( temp );
		});
	    dates.sort(function(a,b){
		  return b - a;
		});
	    return dates;
	};

	var findItem = function( text, item ){
		var match = text.match( new RegExp( '\\b' + item + '\\b' ) );
		if( match != null && match.length > 0 ){
			return true;
		}
		return false;
	};
	

	var findSurname = function( text, patient ){
		return findItem( text, patient.Surname );
	};

	var findClinicianSurname = function( text, clinician ){
		return findItem( text, clinician.surname );
	};

	var findDOB = function( text, patient, dates ){
		var isPresent = false;
		dates.forEach( function( date ){
			if( moment( date ).format( 'DD-MMM-YYYY' ) == patient.DOB ){
				isPresent = true;
			}
		});
		return isPresent;
	};

	var findForename = function( text, patient ){
		return findItem( text, patient.Forename );
	};

	var findPatientNumber = function( text, patient ){
		return findItem( text, patient.PatientNumber );
	};

	

	var findPatients = function( text, dates ){
		var patients = {};
		var demoPatients = JSON.parse( JSON.stringify( demoData.patients ) );
		demoPatients.forEach( function( patient ){
			if( findPatientNumber( text, patient ) ){
				updateMatchCriteria( patient, $scope.PN );
				patients[ patient.Id ] = patient;
			}
			if( findDOB( text, patient, dates ) ){
				updateMatchCriteria( patient, $scope.DOB );
				patients[ patient.Id ] = patient;
			}
			if( findSurname( text, patient ) ){
				updateMatchCriteria( patient, $scope.SN );
				patients[ patient.Id ] = patient;
			}
			if( findForename( text, patient ) ){
				updateMatchCriteria( patient, $scope.FN );
				patients[ patient.Id ] = patient;
			}
		});
		patients = convertObjectToArray( patients );
		patients.sort(function(a,b){
		  return b.score - a.score;
		});
		return patients;
	};

	var convertObjectToArray = function( obj ){
		return Object.keys(obj).map(function(k) { return obj[k] });
	};

	var findClinians = function( text ){
		var clinicians = {};
		var demoClinicians = JSON.parse( JSON.stringify( demoData.demoDataPersons ) );
		demoClinicians.forEach( function( clinician ){
			
			if( findClinicianSurname( text, clinician ) ){
				updateMatchCriteria( clinician, $scope.SN );
				clinicians[ clinician.id ] = clinician;
			}
			
		});
		clinicians = convertObjectToArray( clinicians );
		clinicians.sort(function(a,b){
		  return b.score - a.score;
		});
		return clinicians;
	};

	var findSpaceSeparatedStrings = function( text, supportedStrings ){
		var strings = {};
		var supportedStringsLocal = JSON.parse( JSON.stringify( supportedStrings ));
		supportedStringsLocal.forEach( function( supportedStringLocal ){
			if( findItem( text, supportedStringLocal.name )){
				strings[ supportedStringLocal.id ] = supportedStringLocal;
				strings[ supportedStringLocal.id ].score = 2; //Full points for a full find
			}

			if( strings[ supportedStringLocal.id ] == null ){
				//Check for partials
				if( supportedStringLocal.name.indexOf( ' ' ) > -1 ){
					var stringParts = supportedStringLocal.name.split( ' ' );
					stringParts.forEach( function( stringPart ){
						if( findItem( text, stringPart ) ){
							strings[ supportedStringLocal.id ] = supportedStringLocal;
							strings[ supportedStringLocal.id ].score = 1;//Half points for partial
						}
					});
					
				}
			}
		});
		strings = convertObjectToArray( strings );
		strings.sort(function(a,b){
		  return b.score - a.score;
		});
		return strings;
	};

	var updateMatchCriteria = function( item, criteria ){
		if( item.match ==  null ){
			item.match = [];
		}
		if( item.score ==  null ){
			item.score = 0;
		}
		item.score += criteria;
		item.match.push( criteria );
	};

	var addWordInfo = function( word ){
		if( words[ word.name ] == null ){
			words[ word.name ] = [ word.obj ];
		}else{
			words[ word.name ].push( word.obj );
		}
		
	};

	var createEmptyWord = function(){
		var word = {};
		word.name = "";
		word.obj = [];
		return word;
	};

	var createWordInfoAndText = function( verboseInfo ){
		var text = "";
		var currentLine = -1;
		var word = createEmptyWord();
		verboseInfo.lines.forEach( function( line, lineIndex ){
			line.letters.forEach( function( letter, letterIndex ){
				var character = letter.matches[0].letter;
				text += character;
				if( character.match( / /gmi ) != null ){
					addWordInfo( word );
					word = createEmptyWord();
				}else if( currentLine != lineIndex ){
					addWordInfo( word );
					word = createEmptyWord();
					if( character != "," ){
						word.obj.push( letter );
						word.name += character;
					}
				}else{
					if( character != "," ){
						word.obj.push( letter );
						word.name += character;
					}
				}
				currentLine = lineIndex;
				if( ( currentLine == verboseInfo.lines.length - 1 ) &&
				 	( letterIndex == line.letters.length - 1 ) ){
				 	addWordInfo( word );
				}
			});
			text += "\\n";
		});
		return text;
	};

	

	
	var handleProcessClick = function( callback ){
		$scope.processingComplete = false;
		
		// Hard coded to the Scan image
		$timeout( function(){
			
			
			canvas[0].width = img.width();
			canvas[0].height = img.height();
			
			var context = canvas[0].getContext('2d');
			context.drawImage(img[0], 0, 0);
		    var data = context.getImageData(0, 0, canvas.width(), canvas.height());
			iframe[0].contentWindow.postMessage({ sResponseText: data}, '*');
			if( count++ == 0 ){
				window.addEventListener("message", function (event) {
					verboseInfo = JSON.parse( event.data.data );
					var text = "";
					text = createWordInfoAndText( verboseInfo );
					$scope.text = text.replace(/\\n/g, '<br />');
				    text = removeNewlines( text );
				    text = removeStopWords( text );
				    text = removeMultiSpaces( text );
				    text = removeCommas( text );
				   
				    var dates = findDates( text );
				    var patients = findPatients( text, dates );
				    var clinicians = findClinians( text );
				    var organisationsFound = findSpaceSeparatedStrings( text, supportedOrganisations );
				    var departmentsFound = findSpaceSeparatedStrings( text, supportedDepartments );


				    $timeout( function(){
				    	$scope.sections[ $scope.DATE ].data 		= dates;
				    	$scope.sections[ $scope.PATIENT ].data 		= patients;
				    	$scope.sections[ $scope.CLINICIAN ].data 	= clinicians;
				    	$scope.sections[ $scope.ORG ].data 			= organisationsFound;
				    	$scope.sections[ $scope.DEPT ].data 		= departmentsFound;
				    	$scope.sections[ $scope.READ ].data 		= departmentsFound;
				    	$scope.sections[ $scope.FOLDER ].data 		= departmentsFound;
				    	$scope.words = words;
				    	$scope.processingComplete = true;
				    	if( callback != null ){
				    		callback();
				    	}
				    } );
				});
			}
		} );
	};
})
.directive('vnScan', function() {
  return {
    restrict: 'E',
    templateUrl: 'apps/visiondocumentmanagement/scan/vnscan.html'
  };
});


