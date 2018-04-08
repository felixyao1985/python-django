
$(document).ready(function()
{
	var optSelect = function(select){
		let $select = $(select)
		$select.click( function () {
			//$(select + ":not(.selected)").removeClass("selected");
			$(this).toggleClass("selected click");
			$select.not(".click").removeClass("selected");
			$(this).removeClass("click");
		});
	}

	var seekMap = {
		maxNum:1,//迭代次数
		map:'',
		city:'',
		geocoder:'',
		transit:'',
		points:{},
		markers:[],
		setmaxNum(num){
			this.maxNum = num;
		},
		createMap:function(mapid){
			let _this		= this;
			_this.map 		= new BMap.Map(mapid),
			_this.city		= new BMap.LocalCity(),
			_this.geocoder	= new BMap.Geocoder(),
			_this.transit 	= new BMap.TransitRoute(),

			_this.map.enableDragging();
			_this.map.enableScrollWheelZoom();
			_this.map.enableDoubleClickZoom();
			_this.map.enableKeyboard();
			let ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
			_this.map.addControl(ctrl_nav);
			let ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:0});
			_this.map.addControl(ctrl_ove);
			_this.city.get(function(r){_this.map.centerAndZoom(r.center,10);});
			_this.map.addControl(new BMap.NavigationControl());

		},
		clear:function()
		{
			let map = this.map;
			map.clearOverlays();
			map.closeInfoWindow();
		},
		findCenter:function (eLng,eLat,wLng,wLat,nLng,nLat,sLng,sLat)
		{
			
			let map = this.map;
			let city = this.city;
			/* 中心点坐标 */
			if(eLng == 0)
			{
				city.get(function(r){map.centerAndZoom(r.center,10);});
			}else{
				/* 各级数参考值 */
				let thisLevel 	= 18;
				let thisScale 	= 25;
				let winLevelX 	= new Array;
				let winLevelY 	= new Array;
				let winLengthX 	= new Array;
				let winLengthY 	= new Array;
				
				for(let i=0;i<18;i++)
				{
					if(thisScale == 200 || thisScale == 2000 || thisScale == 20000 || thisScale == 200000 || thisScale == 2000000)
					{
						if(thisScale == 20000)
						{
							thisScale = 25000;
						}else{
							thisScale = (thisScale+(thisScale/4))*2;
						}
					}else{
						thisScale = (thisScale)*2;
					}
					
					winLevelY[i]		= thisLevel;
					winLevelX[i]		= thisLevel;
					winLengthY[i]		= parseInt(thisScale)*parseInt(6);
					winLengthX[i]		= parseInt(thisScale)*parseInt(10);
					
					thisLevel--;
				}
				/* 各级数参考值 */
				
				let pointA 		= new BMap.Point(eLng,eLat);//最东 Lng最大
				let pointB 		= new BMap.Point(wLng,wLat);//最西 Lng最小
				let pointC 		= new BMap.Point(nLng,nLat);//最北 Lat最大
				let pointD 		= new BMap.Point(sLng,sLat);//最南 Lat最小
				
				let ewLength 	= map.getDistance(pointA,pointB);
				let nsLength 	= map.getDistance(pointC,pointD);
				let LengthY		= null;
				let LengthX		= null;
				let LevelY      = null;
				let LevelX      = null;
				let point		= null;
				if(ewLength >= nsLength)
				{
					/* 中心点 */
					let rLng = (parseFloat(eLng)+parseFloat(wLng))/2
					let rLat = (parseFloat(eLat)+parseFloat(wLat))/2
					
					point = new BMap.Point(rLng, rLat);
					/* 中心点 */
					
					/* 用于计算长和宽 */
					let pointE 		= new BMap.Point(eLng,wLat);
					/* 用于计算长和宽 */
					
					/* 用于计算两条边 */
					LengthY 	= map.getDistance(pointA,pointE);//y轴的边
					LengthX 	= map.getDistance(pointB,pointE);//x轴的边
					/* 用于计算两条边 */
				}else{
					/* 中心点 */
					let rLng = (parseFloat(nLng)+parseFloat(sLng))/2
					let rLat = (parseFloat(nLat)+parseFloat(sLat))/2
					
					point = new BMap.Point(rLng, rLat);
					/* 中心点 */
					
					/* 用于计算长和宽 */
					let pointE 		= new BMap.Point(nLng,sLat);
					/* 用于计算长和宽 */
					
					/* 用于计算两条边 */
					LengthY 	= map.getDistance(pointC,pointE);//y
					LengthX 	= map.getDistance(pointD,pointE);//x
					/* 用于计算两条边 */
				}
				
				/* 计算缩放等级 */
				for(let i=0;i<winLevelY.length;i++)
				{
					if(LengthY < winLengthY[i])
					{
						LevelY = winLevelY[i];
						break;
					}else{
						//do nothing	
					}
				}
				
				for(let i=0;i<winLevelX.length;i++)
				{
					if(LengthX < winLengthX[i])
					{
						LevelX = winLevelX[i];
						break;
					}else{
						//do nothing	
					}
				}
				
				if(LevelY < LevelX)
				{
					map.centerAndZoom(point, LevelY);
				}else{
					map.centerAndZoom(point, LevelX);
				}	
				/* 计算缩放等级 */
			}
			/* 中心点坐标 */
		},
		addMarker:function(point,data)
		{
			let _this = this;
			let map = this.map;
			let icon = new BMap.Icon("http://t2.icloudcare.com/izhaohu/Public/thumb/MHome2/images/ic_site.png", new BMap.Size(32,32));
			let opts = {
			  width : 330,     // 信息口宽度
			  height: 180,     // 信息窗口高度
			  title : null  // 信息窗口标题
			}
			content = "";
			content+= '<div class="winpotin">';
			content+= '<h2 class="title">'+data.displayName+'</h2>';
			content+= '<p>'+data.address+'</p>';
			if(data.tel!=undefined)content+= '<p>'+data.tel+'</p>';
			content+= '<a href="http://t2.icloudcare.com/thumb/ibook/ibed.html?job=result&page=0&domainId='+data.id+'" class="bg_btn">预订床位</a>';
			content+= '</div>';


			let marker 		= new BMap.Marker(point, {icon: icon});
			let infoWindow 	= new BMap.InfoWindow(content,opts);
			map.addOverlay(marker);
			_this.markers.push(marker);
			marker.addEventListener("click", function()
			{          
				//ic_site highlight.png ic_site being decorated  highlight

			 
			   for (let i in _this.markers){
					let _icon = _this.markers[i].getIcon();
					let _imageUrl = _icon.imageUrl;
					let icon = new BMap.Icon("http://t2.icloudcare.com/izhaohu/Public/thumb/MHome2/images/ic_site.png", new BMap.Size(32,32));
					_this.markers[i].setIcon(icon);
			   }	
			   
				let _icon = this.getIcon();
				let _imageUrl = _icon.imageUrl;
				let icon = new BMap.Icon("http://t2.icloudcare.com/izhaohu/Public/thumb/MHome2/images/ic_site highlight.png", new BMap.Size(32,32));
				this.setIcon(icon);


			   map.closeInfoWindow();
			   this.openInfoWindow(infoWindow);
				
			});
			infoWindow.addEventListener("close", function()
			{          
			   for (let i in _this.markers){
					let _icon = _this.markers[i].getIcon();
					let _imageUrl = _icon.imageUrl;
					let icon = new BMap.Icon("http://t2.icloudcare.com/izhaohu/Public/thumb/MHome2/images/ic_site.png", new BMap.Size(32,32));
					_this.markers[i].setIcon(icon);
			   }	
				
			});			
		},
		CenterPromise:{
			_parent:null,
			eLng:0,
			eLat:0,
			wLng:0,
			wLat:0,
			nLat:0,
			nLng:0,
			sLng:0,
			sLat:0,
			length:0,
			n:0,
			init:function(_this,length){
				this._parent=_this;
				this.eLng=0;
				this.eLat=0;
				this.wLng=0;
				this.wLat=0;
				this.nLat=0;
				this.nLng=0;
				this.sLng=0;
				this.sLat=0;
				this.length=length;
				this.n=0;
			},
			Calculation:function(point){
				this.n++;
				//计算东南西北最远的坐标
				let strLng = point.lng;
				let strLat = point.lat
				if(strLng > this.eLng || this.eLng == 0)
				{
					this.eLng = strLng;
					this.eLat = strLat;
					
				}else{
					//do nothing
				}

				if(strLng < this.wLng || this.wLng == 0)
				{
					this.wLng = strLng;
					this.wLat = strLat;
				}else{
					//do nothing
				}

				if(strLat > this.nLat || this.nLat == 0)
				{
					this.nLng = strLng;
					this.nLat = strLat;
				}else{
					//do nothing
				}

				if(strLat < this.sLat || this.sLat == 0)
				{
					this.sLng = strLng;
					this.sLat = strLat;
				}else{
					//do nothing
				}
			
				if(this.length==this.n)
				{
					/*判断并表示坐标*/
					
					this._parent.findCenter(this.eLng,this.eLat,this.wLng,this.wLat,this.nLng,this.nLat,this.sLng,this.sLat);	
				}
			}
		},
		getPointByAddress:function(item){
			let _this    = this;
			let city     = _this.city;
			let geocoder = _this.geocoder;
			
			geocoder.getPoint(item.address, function(point){ 
				if(point)
				{
					
					_this.addMarker(point,item);
					_this.CenterPromise.Calculation(point);
				}else{
				}
				
			}, city);		
		},
		seek:function(params,cb)
		{
			let _this    = this;
			let city     = _this.city;
			let geocoder = _this.geocoder;
			
			_this.getJson(params,cb,_this.maxNum);
			


		},
		getJson:function(params,cb,maxNum)
		{
			if(maxNum > 0)
			{
				let _this    = this;
				_this.clear();
				ajaxPromise({
					type: "GET",
					url: "/main/manage/",
					dataType: 'json',
					data: {
						City: "上海市",
						District: "普陀区",
						job: "json"
					},
					async: false
				}).then(function(json) {
				  if( cb ) cb(json);
				  maxNum--;
				}, function(error) {
				  
				}).then(function(){
					setTimeout(function() {_this.getJson(params,cb,maxNum)},5000);
				});
			}else{
			}
		},
	}


	var btnMapSubmit = function(select){
		let $btn = $(select)
		$btn.click( function () {
			seekMap.setmaxNum($("#txtmaxNum").val());
			seekMap.seek({'City':"上海市",'District':"普陀区"},function(BASEDATA){
				if (BASEDATA.length>0) {
					seekMap.CenterPromise.init(seekMap,BASEDATA.length);
					/*判断并表示坐标*/
					for(var i = 0; i < BASEDATA.length; i++){
						seekMap.getPointByAddress(BASEDATA[i]);
					}
				}else{
				}				
			});
		});
	}


	optSelect('.form ul.givePriority li.opt');
	btnMapSubmit('#btnMapSubmit');

	var $seek_map = $("#datamap");
	if($seek_map.size()>0)
	{
		seekMap.createMap('datamap');
	}else{
	}

	
});

