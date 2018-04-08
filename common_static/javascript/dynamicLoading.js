//动态加载JS
var dynamicLoading = {
    css: function(path,type){
		var _type = arguments[1] ? arguments[1] : 'syn';//设置参数type的默认值为syn 

		if(!path || path.length === 0){
			throw new Error('argument "path" is required !');
		}
		if(_type=='syn')
		{
			//同步
			document.write("<link href='"+path+"' rel='stylesheet' media='screen' />");
		}else if(_type=='asy'){
			//异步
			var head = document.getElementsByTagName('head')[0];
			var link = document.createElement('link');
			link.href = path;
			link.rel = 'stylesheet';
			link.type = 'text/css';
			head.appendChild(link);
		}
    },
    js: function(path,type){
		
		var _type = arguments[1] ? arguments[1] : 'syn';//设置参数type的默认值为syn 
		if(!path || path.length === 0){
			throw new Error('argument "path" is required !');
		}
		if(_type=='syn')
		{
			//同步
			document.write("<script src='"+path+"'><\/script>");
		}else if(_type=='asy'){
			//异步
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.src = path;
			script.type = 'text/javascript';
			head.appendChild(script);
		}
		

    }
}