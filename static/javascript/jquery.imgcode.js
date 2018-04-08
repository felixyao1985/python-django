$(document).ready(function()
{
	window.url = $("#imgCode").attr('src');
		 
	$("#imgCode").click(function()
	{
		 var img 	= 	$("#imgCode");
		 
		 img.attr("src", chgUrl(url));
		 
		 function chgUrl(url)
		 {
			var timestamp = (new Date()).valueOf();
			
			urlurl = url.substring(0, 17);
			
			if ((url.indexOf("?") >= 0))
			{
				urlurl = url + "&ts2=" + timestamp;
			} else {
				urlurl = url + "?ts2=" + timestamp;
			}
			
			return urlurl;
		 }
	 });
});