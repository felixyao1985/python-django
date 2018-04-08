$(document).ready(function(){
		
	//载入地图
	initMap();
	
	/* 预设地址 */
	var _o = $(window.parent.document);
	var hidLng 		= _o.find('#hidLng').val();
	var hidLat 		= _o.find('#hidLat').val();
	var city 		= _o.find('#CityID').find('option:selected').text();
	var address 	= _o.find('#txtAddress').val();
	
	if(address != '')
	{
		addAddress(city+address,city,hidLng,hidLat);
	}else{
		showCity();
	}
	/* 预设地址 */
	
	_o.find('#DistrictID').livequery('change',function()
	{
		SearchDistrict();
	});

	
	
	_o.find('#txtAddress').livequery('blur',function()
	{
		SearchMap();
	});
	
	_o.find('#btnMapSearch').livequery('click',function()
	{
		SearchMap();
	});
	
	function SearchMap()
	{
		var address = _o.find('#txtAddress').val();
		var city 	= _o.find('#CityID').find('option:selected').text();
		
		if(address != '')
		{
			addAddress(city+address,city);
		}else{
			SearchDistrict();
			jAlert("请输入地址 !","错误讯息");
		}
	}
	
	function SearchDistrict()
	{
		var DistrictID = window.parent.$('#DistrictID').val();
		var DistrictText = window.parent.$('#DistrictID').find("option:selected").text();
		
		if(DistrictID > 0)
		{
			showDistrict(DistrictText)
		}else{
			jAlert("请选择市辖区 !","错误讯息");
		}
	}
});

function initMap()
{	
	createMap();
	setMapEvent();
	addMapControl();
}

function createMap()
{
	var map 		= new BMap.Map("container");
	var city		= new BMap.LocalCity();
	var geocoder	= new BMap.Geocoder();
	var boundary 	= new BMap.Boundary();
	
	//city.get(function(r){map.centerAndZoom(r.center,10);});
	
	window.map 			= map;
	window.city 		= city;
	window.geocoder 	= geocoder;
	window.boundary 	= boundary;
}

function setMapEvent()
{
	map.enableDragging();
	map.enableScrollWheelZoom();
	map.enableDoubleClickZoom();
	map.enableKeyboard();
}

function addMapControl()
{
	map.addControl(new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE}));
	map.addControl(new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:0}));
}

function addAddress(address,city,lng,lat)
{
	if(lng != undefined && lat != undefined)
	{
		var point = new BMap.Point(lng, lat);
		showMarker(point,address);
	}else{
		geocoder.getPoint(address, function(point){ 
			
			if(point)
			{
				//增加周围50米随机数,防止重叠
				var maxLng = parseFloat(point.lng)+parseFloat(0.0005);
				var minLng = parseFloat(point.lng)-parseFloat(0.0005);
				var strLng = parseFloat(Math.random()*(maxLng-minLng)+minLng);
				
				var maxLat = parseFloat(point.lat)+parseFloat(0.0005);
				var minLat = parseFloat(point.lat)-parseFloat(0.0005);
				var strLat = parseFloat(Math.random()*(maxLat-minLat)+minLat);
				
				showMarker(new BMap.Point(strLng, strLat),address);
				
				window.parent.$('#hidLng').val(strLng);
				window.parent.$('#hidLat').val(strLat);
				
			}else{
				
				jAlert("该地址无法定位,请核实!","错误讯息");
			}
			
		}, city);
	}
}


/* 位置服务 */
function showMarker(point, address)
{
	var icon 		= new BMap.Icon(__PUBLIC__+"/images/green_dot.png", new BMap.Size(35, 35), { 
		offset: new BMap.Size(7, 7), 
		imageOffset: new BMap.Size(0, 0) 
	});
	
	var marker 		= new BMap.Marker(point, {icon: icon});
	var infoWindow 	= new BMap.InfoWindow(address);
	
	marker.enableDragging();

	//拖拽结束后出发此事件
	marker.addEventListener("dragend", function (e) {
		window.parent.$('#hidLng').val(e.point.lng);
		window.parent.$('#hidLat').val(e.point.lat);
	});
	
	map.clearOverlays();
	map.addOverlay(marker);
	map.centerAndZoom(point, 20);
}

function showCity()
{
	city.get(function(r){map.centerAndZoom(r.center,10);});
}

function showDistrict(district)
{
	boundary.get(district, function(rs){//获取行政区域
	
		var count = rs.boundaries.length; //行政区域的点有多少个
		
		for(var i = 0; i < count; i++)
		{
			var ply = new BMap.Polygon(rs.boundaries[i]); //建立多边形覆盖物
	
			ply.setStrokeOpacity(1);//设置透明度
			ply.setStrokeColor("#0000FF");//设置边线颜色
			//ply.setStrokeStyle("dashed");//设置边线类型
			ply.setStrokeWeight(2);//设置边线粗细  
			ply.setFillColor();//设置多边形的填充颜色  
			
			map.clearOverlays();
			map.addOverlay(ply);  //添加覆盖物
			map.setViewport(ply.getPath());//调整视野
		}   
					 
	});
}
/* 位置服务 */