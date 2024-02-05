var Parser = function Parser() {

	this.Parse = function(text) {

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
	},

	this.Tokenise = function(text) {
		var tokens = this.Parse(text).split(" ")
		var result = []

		// Remove all strings that are too short or start with a digit

		tokens.forEach(function(token){
			if ((!( token.substr(0,1) >= '0' && token.substr(0,1) <= '9' )) && token.length > 1 ) {
				result.push(token)
			}
		})
		
		return result
	}
	

}