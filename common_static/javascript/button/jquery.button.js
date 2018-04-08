$(document).ready(function()
{
	$('.block input.submit').each(function(){
		
		var strButton = $(this).val().replace(/\s+/g,'');
		
		if(strButton != '')
		{
			$(this).css('background','url("'+__PUBLIC__+'/javascript/button/images/btn_'+strButton+'.png") no-repeat scroll center top transparent');
			$(this).css('background-size',$(this).css('width')+' '+$(this).css('height'));
		}else{
			//do nothing	
		}
	});
	
	$('.block input.submit').hover(function(){
		
		window.ShowTitle = $(this).attr('title');
		$(this).attr("title",$(this).val());
		
	},function () {
		
		$(this).attr("title",window.ShowTitle);
	});
	
	$('.block input.submit').click( function(){ 
		
		if(window.ShowTitle != '')
		{
			$(this).attr("title",window.ShowTitle);
		}
	});
});