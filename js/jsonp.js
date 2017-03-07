angular.module('moviecatJsonpApp',[]).service('jsonpService',['$window',function($window){
	this.jsonp=function(url,data,fn){
		var callbackName= 'jsonp'+new Date().getTime() + Math.random().toString().substr(2);
		$window[callbackName]=function(data){
			fn(data);
			$window.document.body.removeChild(script);
		}
		
		for(var key in data){
			url+=key + '=' + data[key] + '&';
		}
		url+='callback='+callbackName;
		var script=document.createElement('script');
		script.src=url;
		$window.document.body.appendChild(script);
	}
	this.jsonp1=function(url,data,fn){		
		$window.MusicJsonCallback=function(data){
			fn(data);
			$window.document.body.removeChild(script);
		}
		url=url+'?';
		for(var key in data){
			url+=key + '=' + data[key] + '&';
		}		
		var script=document.createElement('script');
		script.src=url;
		$window.document.body.appendChild(script);
	}
	this.jsonp2=function(url,data,fn){
		var callbackName= 'jsonp'+new Date().getTime() + Math.random().toString().substr(2);
		var script=document.createElement('script');
		$window[callbackName]=function(data){
			fn(data);
			$window.document.body.removeChild(script);
		}
		script.src=url;
		url=url+'?';
		for(var key in data){
			url+=key + '=' + data[key] + '&';
		}
		url+='jsonpCallback='+callbackName;				
		$window.document.body.appendChild(script);
		
	}
	
	this.jsonp3= function (url,data,fn) {
        var callbackName = 'jsonp'+new Date().getTime()+Math.random().toString().substr(2);
        var script = document.createElement('script');
        script.src=url;
        data.jsonpCallback=callbackName;
        script.src=script.src+"&jsonpCallback="+data.jsonpCallback;
        $window.document.body.appendChild(script);
        $window[data.jsonpCallback]= function (data) {
            fn(data);
            $window.document.body.removeChild(script)
        };
    }
	this.jsonp4= function (url,data,fn) {
        //生成一个随机的函数名
        var callbackName = 'jsonp'+new Date().getTime()+Math.random().toString().substr(2);
        //有一个全局函数，函数名是：
        data.jsonpCallback=callbackName;
        $window[data.jsonpCallback]= function (data) {
            fn(data);
            $window.document.body.removeChild(script)
        };
        //生成请求地址：
        //http://www.baidu.com?page=1&pagesize=10&callback=callbackName;
        //url:http://www.baidu.com
        //data:{page:1,pagesize:10}
        var url = url+"?";
        for(var key in data){
            url+=key+"="+data[key]+"&"
        }
        url+="jsonpCallback="+callbackName;
        //新建一个script标签
        var script = document.createElement('script');
        script.src=url;
        //把新建的script标签插入body的末尾
        $window.document.body.appendChild(script);

    }
}])
