$(function () {
	
	// Preload images 图片轮换载入
	$.preloadCssImages();
	
	// CSS tweaks
	$('#header #nav li:last').addClass('nobg');
	$('.fromtable').each(function() { $(' > tbody > tr:last', this).addClass('noLine'); });
	$('.block_head ul').each(function() { $('li:first', this).addClass('nobg'); });
	$('.block table tr th.header').css('cursor', 'pointer');
		

	// Style file input
	$("input[type=file]:not(.basic)").filestyle({ 
	    image: __PUBLIC__+"/images/upload.jpg",
	    imageheight : 30,
	    imagewidth : 80,
	    width : 120
	});

		
	// IE6 PNG fix
	$(document).pngFix();
		
});