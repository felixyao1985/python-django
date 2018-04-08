$(document).ready(function()
{
	$("form").submit(function()
	{
		$("form :submit").attr("disabled",true);
		$("form :button").attr("disabled",true);
		
		var options = {
			beforeSubmit: showRequest,
			success: showResponse,
			type: 'post',
			dataType: 'json',
			clearForm: false,
			resetForm: false
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
		
		function showResponse(responseText, statusText)
		{
			if(responseText.js_Message != undefined)
			{
				var msg = responseText.js_Message;
				
				msg = msg.replace(/\&amp;/g,'&');
				msg = msg.replace(/\&lt;/g,'<');
				msg = msg.replace(/\&gt;/g,'>');
				msg = msg.replace(/\&quot;/g,'"');
				
				var FlagMessage = true;
			}
			
			if(responseText.js_Return != undefined)
			{
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
			
			if(FlagMessage == true || FlagURL == true || FlagOther == true)
			{
				if(FlagURL == true)
				{
					if(FlagMessage == true)
					{
						jAlert(msg,"系统讯息", function(){window.parent.window.$('.colorbox-formclose').colorbox.close();});
					}else{
						window.parent.window.$('.colorbox-formclose').colorbox.close();
					}
				}else if(FlagOther == true){
					
					if(FlagMessage == true)
					{
						jAlert(msg,"系统讯息", function(){parent.location.href = gotoOther});
					}else{
						parent.location.href = gotoOther;
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