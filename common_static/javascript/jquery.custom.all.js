$(function () {
	/*
	
	<link rel="stylesheet" type="text/css" href="{$__PUBLIC__}/css/style-wysiwyg.css" />
	<link rel="stylesheet" type="text/css" href="{$__PUBLIC__}/css/style-facebox.css" />
	<link rel="stylesheet" type="text/css" href="{$__PUBLIC__}/css/style-visualize.css" />
	<link rel="stylesheet" type="text/css" href="{$__PUBLIC__}/css/style-date_input.css" />	
	*/
	// Preload images
	$.preloadCssImages();
	
	// CSS tweaks
	$('#header #nav li:last').addClass('nobg');
	$('.fromtable').each(function() { $(' > tbody > tr:last', this).addClass('noLine'); });
	$('.block_head ul').each(function() { $('li:first', this).addClass('nobg'); });
	$('.block form input[type=file]').addClass('file');
	
	// Web stats
	//折线图
	//jquery.visualize.js jquery.visualize.tooltip.js
	$('table.stats').each(function() {
		
		if($(this).attr('rel')) {
			var statsType = $(this).attr('rel');
		} else {
			var statsType = 'area';
		}
		
		var chart_width = ($(this).parent('div').width()) - 60;
		
		if(statsType == 'line' || statsType == 'pie') {		
			$(this).hide().visualize({
				type: statsType,	// 'bar', 'area', 'pie', 'line'
				width: chart_width,
				height: '320px',
				colors: ['#6fb9e8', '#ec8526', '#9dc453', '#ddd74c'],
				
				lineDots: 'double',
				interaction: true,
				multiHover: 5,
				tooltip: true,
				tooltiphtml: function(data) {
					var html ='';
					for(var i=0; i<data.point.length; i++){
						html += '<p class="chart_tooltip"><strong>'+data.point[i].value+'</strong> '+data.point[i].yLabels[0]+'</p>';
					}	
					return html;
				}
			});
		} else {
			$(this).hide().visualize({
				type: statsType,	// 'bar', 'area', 'pie', 'line'
				width: chart_width,
				height: '320px',
				colors: ['#6fb9e8', '#ec8526', '#9dc453', '#ddd74c']
			});
		}
	});
	
	
	
	// Sort table
	/*
	$("table.sortable").tablesorter({
		headers: { 0: { sorter: false} },		// Disabled on the 1st and 6th columns
		widgets: ['zebra']
	});
	*/
	
	$('.block table tr th.header').css('cursor', 'pointer');
		
	
	
	// Check / uncheck all checkboxes
	$('.check_all').click(function() {
		$(this).parents('form').find('input:checkbox').attr('checked', $(this).is(':checked'));   
	});
	
	
	// Set WYSIWYG editor 编辑框
	// jquery.wysiwyg.js
	$('.wysiwyg').wysiwyg({css: __PUBLIC__+"/css/wysiwyg.css", brIE: false, height: $('#wysiwyg-height').val()});
	
	
	// Modal boxes - to all links with rel="facebox"
	//点击看大图
	//jquery.facebox.js
	$('a[rel*=facebox]').facebox();
	
	
	
	// Messages
	$('.block .message').hide().append('<span class="close" title="Dismiss"></span>').fadeIn('slow');
	$('.block .message .close').hover(
		function() { $(this).addClass('hover'); },
		function() { $(this).removeClass('hover'); }
	);
		
	$('.block .message .close').click(function() {
		$(this).parent().fadeOut('slow', function() { $(this).remove(); });
	});
	
	
	// Form select styling
	//$("form select.styled").select_skin();
	
	
	// Tabs
	$(".tab_content").hide();
	$("ul.tabs li:first-child").addClass("active").show();
	$(".block").find(".tab_content:first").show();

	$("ul.tabs li").click(function() {
		$(this).parent().find('li').removeClass("active");
		$(this).addClass("active");
		$(this).parents('.block').find(".tab_content").hide();
			
		var activeTab = $(this).find("a").attr("href");
		$(activeTab).show();
		
		// refresh visualize for IE
		$(activeTab).find('.visualize').trigger('visualizeRefresh');
		
		return false;
	});
	
	
	
	// Sidebar Tabs //标签卡
	//
	//$(".sidebar_content").hide();
	
	if(window.location.hash && window.location.hash.match('sb')) {
	
		$("ul.sidemenu li a[href="+window.location.hash+"]").parent().addClass("active").show();
		$(".block .block_content .sidebar_content#"+window.location.hash).show();
		
	} else {
	
		$("ul.sidemenu li:first-child").addClass("active").show();
		$(".block .sidebar_content:first").show();
	}

	$("ul.sidemenu li").click(function() {
	
		var activeTab = $(this).find("a").attr("href");
		window.location.hash = activeTab;
	
		$(this).parent().find('li').removeClass("active");
		$(this).addClass("active");
		$(this).parents('.block').find(".sidebar_content").hide();			
		$(activeTab).show();
		return false;
	});	
	
	
	
	// Block search
	$('.block .block_head form .text').bind('click', function() { $(this).attr('value', ''); });
	
	
	// Style file input
	$("input[type=file]").filestyle({ 
	    image: __PUBLIC__+"/images/upload.gif",
	    imageheight : 30,
	    imagewidth : 80,
	    width : 120
	});
		
		
	//日期选择 jquery.date_input.pack.js
	// Date picker
	$('input.date_picker').date_input({
		month_names: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		short_month_names: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
		short_day_names: ["日", "一", "二", "三", "四", "五", "六"],
		start_of_week: 1,
		stringToDate: function(string) {
			var matches;
			if (matches = string.match(/^(\d{4,4})-(\d{2,2})-(\d{2,2})$/))
			{
				return new Date(matches[1], matches[2] - 1, matches[3]);
			} else {
				return null;
			};
		},
		dateToString: function(date) {
			var month = (date.getMonth() + 1).toString();
			var dom = date.getDate().toString();
			if (month.length == 1) month = "0" + month;
			if (dom.length == 1) dom = "0" + dom;
			return date.getFullYear() + "-" + month + "-" + dom;
		}
	});
	


	// Navigation dropdown fix for IE6
	if(jQuery.browser.version.substr(0,1) < 7) {
		$('#header #nav li').hover(
			function() { $(this).addClass('iehover'); },
			function() { $(this).removeClass('iehover'); }
		);
	}
	
	
	// IE6 PNG fix
	$(document).pngFix();
		
});