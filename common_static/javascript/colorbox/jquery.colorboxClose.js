$(document).ready(function(){

	window.parent.window.$('.colorbox-close').colorbox.close();
	
	if($('#js_gotoURL').val() != undefined)
	{
		window.parent.location.href = $('#js_gotoURL').val();
	}else{
		//do nothing	
	}
});