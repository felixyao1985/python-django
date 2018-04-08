<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title>系统控制中心</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<![if (!IE)|(lt IE 9)]>
<link rel="shortcut icon" type="image/ico" href="{{Config.defPath}}/images/favicon.ico">
<![endif]>
<!--[if gte IE 9]>
<link rel="shortcut icon" type="image/ico" href="{{Config.defPath}}/images/favicon.ico">
<![endif]-->
<script>
var pathConfig = {
	path:'{{Config.defPath}}',
	Appjs:'{{Config.defPath}}/control/AppJS/',
	Appcss:'{{Config.defPath}}/control/AppCSS/',
}
</script>
<link rel="stylesheet" type="text/css" href="{{Config.defPath}}/css/style.css" />
<script language="javascript" type="text/javascript" src="{{Config.defPath}}/javascript/jquery.js"></script>
<script language="javascript" type="text/javascript" src="{{Config.defPath}}/javascript/dynamicLoading.js"></script>
{% for file in css %}
<link rel="stylesheet" type="text/css" href="{{Config.defPath}}/control/AppCSS/{{file}}" />
{% endfor %}
{% for file in api %}
<script language="javascript" type="text/javascript" src="{{file}}"></script>
{% endfor %}
{% for file in js %}
<script language="javascript" type="text/javascript" src="{{Config.defPath}}/control/AppJS/{{file}}"></script>
{% endfor %}



</head>
<body onselectstart="return false">
{% include optpl %}
</body>
</html>




