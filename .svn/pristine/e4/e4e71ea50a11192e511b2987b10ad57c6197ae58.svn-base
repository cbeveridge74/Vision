(function($){

	$.widget('dcb.formbuilder',{
		defaults: {
		    conditions: []
		},
		_create: function(){
			var self = this;
			$.get(	"http://inpsespc123.is.inps.co.uk:8000/formbuilder/mainscreen.html", 
			function( data ){
				$( self.element ).append( data );
			} );
		}
	});

})(jQuery);


