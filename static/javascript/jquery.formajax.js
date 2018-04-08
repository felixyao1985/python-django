$(document).ready(function()
{
	$("form:not(.noajax)").submit(function()
	{
		$("form :submit").attr("disabled",true);
		$("form :button").attr("disabled",true);
		var url = $(this).attr('action') || window.location.href;
	
		var options = {
			beforeSubmit: showRequest,
			success: showResponse,
			type: 'post',
			error:showerror,
			dataType: 'html',
			clearForm: false,
			resetForm: false,
			url:url
		};
		
		$(this).ajaxSubmit(options);
		
		function showRequest(formData, jqForm, options)
		{
			$.blockUI({ 
				message: '<img id="img-blockUI-loading" src="'+__PUBLIC__+'/images/load.gif">', 
				css:{border:'none',background:'none',width:'77px', height:'80px',top:'45%',left:'50%',marginLeft:'-38px'}
			});
			return true;
		}
		
		function showerror(xhr, status, error)
		{
			jAlert("操作超时请重新操作","系统讯息", function(){window.parent.location.reload();});
			$.unblockUI();
		}		

		function showResponse(responseText, statusText)
		{
			var responseText = jQuery.parseJSON(responseText);
			
			if(responseText.js_Message != undefined)
			{
				var msg = responseText.js_Message;
				
				msg = msg.replace(/\&amp;/g,'&');
				msg = msg.replace(/\&lt;/g,'<');
				msg = msg.replace(/\&gt;/g,'>');
				msg = msg.replace(/\&quot;/g,'"');
				
				var FlagMessage = true;
			}
			
			if(responseText.js_gotoURL != undefined)
			{
				var gotoURL = responseText.js_gotoURL;
				
				gotoURL = gotoURL.replace(/\&amp;/g,'&');
				gotoURL = gotoURL.replace(/\&lt;/g,'<');
				gotoURL = gotoURL.replace(/\&gt;/g,'>');
				gotoURL = gotoURL.replace(/\&quot;/g,'"');
				
				var FlagURL = true;
			}
			
			
			if(responseText.js_Other != undefined)
			{
				var gotoOther = responseText.js_Other;
				
				gotoOther = gotoOther.replace(/\&amp;/g,'&');
				gotoOther = gotoOther.replace(/\&lt;/g,'<');
				gotoOther = gotoOther.replace(/\&gt;/g,'>');
				gotoOther = gotoOther.replace(/\&quot;/g,'"');
				
				var FlagOther = true;
			}
			
			if(responseText.js_gotoColorboxID != undefined)
			{
				var gotoColorboxID = responseText.js_gotoColorboxID;
				
				gotoColorboxID = gotoColorboxID.replace(/\&amp;/g,'&');
				gotoColorboxID = gotoColorboxID.replace(/\&lt;/g,'<');
				gotoColorboxID = gotoColorboxID.replace(/\&gt;/g,'>');
				gotoColorboxID = gotoColorboxID.replace(/\&quot;/g,'"');
				
				var FlagColorboxOpen = true;
			}
			
			if(responseText.js_Reload != undefined)
			{
				var FlagReload = true;
			}
			
			if(responseText.js_Close != undefined)
			{
				var FlagClose = true;
			}
			
			if(FlagMessage == true || FlagURL == true || FlagOther == true || FlagReload == true || FlagClose == true)
			{
				if(FlagURL == true)
				{
					if(FlagMessage == true)
					{
						jAlert(msg,"系统讯息", function(){location.href = gotoURL});
					}else{
						location.href = gotoURL;
					}
				}else if(FlagOther == true){
					
					if(FlagMessage == true)
					{
						jAlert(msg,"系统讯息", function(){parent.location.href = gotoOther});
					}else{
						parent.location.href = gotoOther;
					}
				}else if(FlagReload == true){
					
					if(FlagMessage == true)
					{
						jAlert(msg,"系统讯息", function(){window.parent.location.reload();});
					}else{
						window.parent.location.reload();
					}
				}else if(FlagClose == true){
					
					if(FlagMessage == true)
					{
						jAlert(msg,"系统讯息", function(){
							
					
							if(FlagColorboxOpen==true)
							{
								window.parent.window.$('#'+gotoColorboxID).click();
							}else{
								window.parent.window.$('.box-menu').colorbox.close();
							}
						});
					}else{
						window.parent.window.$('.box-menu').colorbox.close();
					}
					
				}else{
					if(FlagMessage == true)
					{
						jAlert(msg,"错误讯息");
					}else{
						//do nothing
					}
				}
			}
			
			$("form :submit").attr("disabled",false);
			$("form :button").attr("disabled",false);
			
			$.unblockUI();
		}
		
		return false;
	});
});