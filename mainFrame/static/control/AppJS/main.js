$(document).ready(function()
{
	//$.preloadCssImages();
	$('.num').live('blur',function()
	{
		var num = $(this).val();
		
		if(!isNaN(num) && num >= 0)
		{
			//do nothing
		}else{
			$(this).attr('value',1);
			jAlert('请正确填写数字 !','错误讯息');	
		}
	});
	$('.num2').keypress(function(event){  
		var keycode = (event.keyCode ? event.keyCode : event.which);  
		
        if (!$.browser.mozilla) { 
            if (event.keyCode && (event.keyCode < 48 || event.keyCode > 57) && event.keyCode != 46) { 
                event.preventDefault(); 
				return false;
            } 
        } else { 
        if (event.charCode && (event.charCode < 48 || event.charCode > 57) && event.keyCode != 46) {
                event.preventDefault(); 
				return false;
            } 
        } 
	});  	
	$("input[type='text'],textarea").live('keyup',function()
	{
		CheckSpecial($(this));
		RepeatMsg($(this));
	});
	
	$("input[type='text'],textarea").live('blur',function()
	{
		CheckSpecial($(this));
		RepeatMsg($(this));
	});
	
	function CheckSpecial(obj)
	{
		//var str = ['#', '$', '%', '^', '&', '*', '<', '>'];
		var str = ['#', '$', '%', '^', '*', '<', '>'];
		var flag = false;
		var regexp = '';
		
        for (var i = 0; i < str.length; i++)
		{
			if(obj.val().indexOf(str[i]) >= 0)
			{
				flag = str[i];
				obj.val(obj.val().replace(/[#$%^&*<>]/gm, ''));
			}else{
				//do nothing	
			}
		}
		
		if(flag)
		{
			jAlert("输入内容不可包含： '" + flag + "' 字符",'错误讯息');
		}else{
			//do nothing
		}
    }
	
	function RepeatMsg(obj)
	{
        if(/(\S+)\1{8,}/ig.test(obj.val()))
		{
			obj.val(obj.val().replace(/(\S+)\1{8,}/gm, ''));
			jAlert("请勿连续输入相同内容",'错误讯息');
        }else{
			//do nothing
		}
    }
});