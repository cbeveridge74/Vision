(function(a) {
    a.fn.tinyTips = function(b, show) {
	      if( show == false ){
	      	$(".tinyTip").remove();
	      	a(this).unbind( 'mouseenter mouseleave' );
	        return;
	  	  }
        var c = '<div class="tinyTip error"><div class="content"></div><div class="bottom">&nbsp;</div></div>';
        var d = 300;
        var e;
        var f;
        a(this).hover(function() {
            a("body").append(c);
            e = a("div.tinyTip");
            e.hide();
            if (b === "title") {
                var g = a(this).attr("title")
            } else {
                if (b !== "title") {
                    var g = b
                }
            }
            a(".tinyTip .content").html(g);
            f = a(this).attr("title");
            a(this).attr("title", "");
            var j = e.height() + 17;
            var h = (((e.width() - 20) / 2)) - (a(this).width() / 2);
            var k = a(this).offset();
            var i = k;
            i.top = k.top - j;
            i.left = k.left - h;
            e.css("position", "absolute");
            e.css(i).fadeIn(d)
        }, function() {
            a(this).attr("title", f);
            a("div.tinyTip").fadeOut(d, function() {
                a(this).remove()
            })
        })
    }
})(jQuery);