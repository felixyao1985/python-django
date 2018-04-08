/*按F5失效*/
$(document).keydown(function(event){

	if ((event.altKey) && ((event.keyCode == 37)||(event.keyCode == 39)))
	{
	   event.returnValue=false;   
	   return false;  
	}
	
	if(event.keyCode == 116)
	{
		return false;
	}
	
	if((event.ctrlKey) && (event.keyCode==82))
	{
		return false; 
	}  
});  
