<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title>系统控制中心</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="shortcut icon" type="image/ico" href="{{Config.defPath}}/images/favicon.ico">
<link href="{{Config.defPath}}/javascript/ui/lib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
<link href="{{Config.defPath}}/css/frame.css" rel="stylesheet" type="text/css" />

<script language="javascript" type="text/javascript" src="{{Config.defPath}}/javascript/jquery.js"></script>
<script language="javascript" type="text/javascript" src="{{Config.defPath}}/javascript/jquery.livequery.js"></script>
<script language="javascript" type="text/javascript" src="{{Config.defPath}}/javascript/jquery.disableF5Key.js"></script>
<script language="javascript" type="text/javascript" src="{{Config.defPath}}/javascript/jquery.jclock.js"></script>
<script language="javascript" type="text/javascript" src="{{Config.defPath}}/javascript/ui/lib/ligerUI/js/core/base.js"></script>
<script language="javascript" type="text/javascript" src="{{Config.defPath}}/javascript/ui/lib/ligerUI/js/ligerui.min.js"></script>
<script language="javascript" type="text/javascript" src="{{Config.defPath}}/control/AppJS/mainFrame.js"></script>
</head>
<body>

<div id="__PUBLIC__" title="{$__PUBLIC__}"></div>

<div id="pageloading"></div>

<div id="header" class="l-header">
    <div class="l-header-logo">系统控制中心</div>
    <div class="l-header-welcome">
		 您好，现在时间是 <span id="spanDatetime"></span> <span class="space">|</span>
       	<a href="javascript:document.location.reload();" id="alinkReload">刷新</a>
	</div>
</div>
<div id="content">
	<div position="left" title="&nbsp;" id="content-accordion">
		{{treeMenu|safe}}
	</div>
	<div position="center" id="content-tab" style="-moz-user-select: none;" onselectstart="return false">
		<div tabid="home" title="欢迎光临" style="height:300px" >
			<iframe frameborder="0" name="home" id="home" src="/main/manage?job=index"></iframe>
		</div>
	</div>
</div>
<!--<div id="footer">Copyright © 2011-2012 上海伟赛智能科技有限公司</div>-->
<div style="display:none"></div>
</body>
</html>
