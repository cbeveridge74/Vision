function LandingScreen(){
	this.handleLozengeClick = function( event, form ){
		if( form == 'new' ){
			$.get(	"../formbuilder/formbuilder",
					function( data ){
				$( 'body' ).html( data );
			}
			);
		}else if( form == 'existing' ){
			$.get(	"../formbuilder/existing",
					function( data ){
				showDialog( data, 'Existing', 600, 400, null );
			}
			);
		}
	};
}