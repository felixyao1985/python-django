var tab = null;
var accordion = null;
var tree = null;

$(document).ready(function()
{
	$('#content').ligerLayout({ leftWidth: 190, height: '100%',heightDiff:-5,space:4, onHeightChanged: f_heightChanged });
	$('#content-tab').ligerTab({ height: $('.l-layout-center').height() });
	$('#content-accordion').ligerAccordion({ height: $('.l-layout-center').height() - 24, speed: 'normal' });
	
	$('.l-link').hover(function (){	$(this).addClass('l-link-over');}, function (){	$(this).removeClass('l-link-over');	});
	
	$('.content-tree').ligerTree({
		checkbox: false,
		slide: false,
		nodeWidth: 142,
		attribute: ['nodename', 'url'],
		onClick: function (node)
		{
			$(node.target).children('div').addClass('l-selected');
			
			if (!node.data.url) return;
            var tabid = $(node.target).attr('tabid');
			if (!tabid)
			{
				tabid = new Date().getTime();
				$(node.target).attr('tabid', tabid)
			}
			
			f_addTab(tabid, node.data.text, node.data.url);
		}
	});

	tab 		= $('#content-tab').ligerGetTabManager();
	accordion 	= $('#content-accordion').ligerGetAccordionManager();
	tree 		= $('#content-tree').ligerGetTreeManager();
	
	$('#pageloading').hide();
	$('#spanDatetime').jclock({format: '%Y-%m-%d %H:%M:%S'});
});

function f_heightChanged(options)
{
	if (tab)
		tab.addHeight(options.diff);
	if (accordion && options.middleHeight - 24 > 0)
		accordion.setHeight(options.middleHeight - 24);
}

function f_addTab(tabid,text, url)
{ 
	tab.addTabItem({ tabid : tabid,text: text, url: url });
} 
 