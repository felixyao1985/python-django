(function($) {
    $.fn.filestyle = function(d) {
        var e = {
            width: 250
        };
        if (d) {
            $.extend(e, d)
        };
        return this.each(function() {
            var a = this;
            var b = $("<div>").css({
                "width": e.imagewidth + "px",
                "height": e.imageheight + "px",
                "background": "url(" + e.image + ") 0 0 no-repeat",
                "background-position": "right",
                "display": "inline",
                "position": "absolute",
				"cursor": "pointer",
                "overflow": "hidden"
            });
            var c = $('<input class="file">').addClass($(a).attr("class")).css({
                "display": "inline",
                "width": e.width + "px"
            });
            $(a).before(c);
            $(a).before(b);
			//"width": e.width + "24px",
            $(a).css({
                "position": "relative",
                "height": e.imageheight + "px",
                "width": "200px",
                "cursor": "pointer",
                "opacity": "0.0"
            });
            if ($.browser.mozilla) {
                if (/Win/.test(navigator.platform)) {
                    $(a).css("margin-left", "-120px")
                } else {
                    $(a).css("margin-left", "-120px")
                }
            } else {
                $(a).css("margin-left", e.imagewidth - e.width + "px")
            };
            $(a).bind("change",
            function() {
                c.val($(a).val())
            })
        })
    }
})(jQuery);
$(document).ready(function(){
	$('.fileupload > div').live('click',function()
	{
	
		$("#previewUpload").click();
		return false;
	});
});