//var view = map.getView();
//var zoom = view.getZoom();
//view.setZoom(zoom + 1);

window.onload=function(){ 
	var OLMap = function(){
		let projection	= ol.proj.get("EPSG:3857");
		let resolutions = [];
		let _this		= this;
		let tilegrid	= null;
		let styles		= null;
		let baidu_layer = null;

		let _init_ = function() {
			for(let i=0; i<19; i++){
				resolutions[i] = Math.pow(2, 18-i);
			}

			tilegrid  = new ol.tilegrid.TileGrid({
				origin: [0,0],
				resolutions: resolutions
			});

			styles = {
				route: new ol.style.Style({
					fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
						color: 'rgba(255, 255, 255, 0.6)'
					}),
					stroke: new ol.style.Stroke({ //边界样式
						color: '#319FD3',
						width: 1
					}),
					text: new ol.style.Text({ //文本样式
						font: '12px Calibri,sans-serif',
						fill: new ol.style.Fill({
							color: '#000'
						})
					}),
				}),
				icon: new ol.style.Style({
					image: new ol.style.Icon({
						anchor: [0.5, 1],
						src: 'https://openlayers.org/en/v3.19.1/examples/data/icon.png'
					})
				}),
				geoMarker: new ol.style.Style({
					image: new ol.style.Circle({
						radius: 7,
						snapToPixel: false,
						fill: new ol.style.Fill({color: 'black'}),
						stroke: new ol.style.Stroke({
							color: 'white', width: 2
						})
					})
				})
			};

			let baidu_source = new ol.source.TileImage({
				projection: projection,
				tileGrid: tilegrid,
				tileUrlFunction: function(tileCoord, pixelRatio, proj){
					if(!tileCoord){
						return "";
					}
					let z = tileCoord[0];
					let x = tileCoord[1];
					let y = tileCoord[2];

					if(x<0){
						x = "M"+(-x);
					}
					if(y<0){
						y = "M"+(-y);
					}

					return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&udt=20151021&scaler=1&p=1";
				}
			});

			baidu_layer = new ol.layer.Tile({
				source: baidu_source
			});
		}
		
		let setMarker = function(point) {
			//point = new ol.geom.Point(routeCoords[0]);
			return  new ol.Feature({
				type: 'icon',
				geometry: point
			});
		}
		 	
		let setVectorLayer = function(features) {
			let locate = setMarker(new ol.geom.Point(ol.proj.transform([121.502099,31.278243], 'EPSG:4326', 'EPSG:3857')));
			let Marker   = setMarker(new ol.geom.Point([121.502099,31.278243]));
			let _features = []
			_features.push(Marker);
			_features.push(locate);
			return  new ol.layer.Vector({
				source: new ol.source.Vector({
					features: _features
				}),
				style: function(feature) {
					// hide geoMarker if animation is active
					if (feature.get('type') === 'geoMarker') {return null;}
					return styles[feature.get('type')];
				}
			});

		}


		
		
		let start = function() {
			_init_();
			let map = new ol.Map({
				layers: [baidu_layer,setVectorLayer()],
				target: 'map',
				controls: ol.control.defaults({
				  attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
					collapsible: false
				  })
				}),
				view: new ol.View({
				  center: ol.proj.transform([121.502099,31.2782433], 'EPSG:4326', 'EPSG:3857'),
				  zoom: 12
				})
			});

			return map;
		}

		return {
			run:function(){return start()},
			setVectorLayer:function(features){return setVectorLayer(features)},
			setMarker:function(point){return getMarker(point)},
		}
	}

	var OLMap = new OLMap();
	OLMap.run();
	//OLMap.setVectorLayer(null);
} 

