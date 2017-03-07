//搜索页
amApp.controller('searchController',['$scope','jsonpService','$http',function($scope,jsonpService,$http){
	jsonpService.jsonp4('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?_=1488032351775',{},function(d){
    	console.log(d);
    	$scope.$apply();
    })
		
	navSwipe(".am_search_nav");
	
	function addTransition(obj){
		obj.style.transition = "all 0.5s";
		obj.style.webkitTransition = "all 0.5s";
	}
	//移除过渡
	function removeTransition(obj){
		obj.style.transition = "";
		obj.style.webkitTransition = "";
	}
	//移动图片
	function setTransform(obj,distance){
		obj.style.transform = "translateX("+distance+"px)";
		obj.style.webkitTransform = "translateX("+distance+"px)";
	}
	//1、可以滑动  （touch  Y   改造setTransform）
	    //2、往下滑动如果超出一定距离，不能滑动
	    //3、往上滑动如果超出一定距离，不能滑动
	    //4、当滑动大于最大定位区间，定位回去
	    //5、当滑动小于最小定位区间，定位回去
	    //6、点击ul的时候，改变当前li的样式（now）
	    //7、点击的时候，被点击的li滑动到最顶端，如果滑动到最顶端超出定位区间，保持原位
	    
	function navSwipe(obj){
		var parentBox = document.querySelector(obj);
		var childBox = parentBox.querySelector('ul');
		var parentBoxWidth = parentBox.offsetWidth;
		var childBoxWidth = childBox.offsetWidth;
		
	//	缓冲距离
		var distance = 100;
	//	最大定位距离
		var maxPosition = 0;
	//	最小定位距离
		var minPosition = parentBoxWidth - childBoxWidth;
	//	最大滑动距离
		var maxSwipe = maxPosition + distance;
	//	最小滑动距离
		var minSwipe = minPosition - distance;
	//	其他
	    var start = 0;
	    var move = 0;
	    var moveX = 0;
	    var currX = 0;
	    var isMove = false;
		
		childBox.addEventListener('touchstart',function(){
			start = event.touches[0].pageX;		
		});
		childBox.addEventListener('touchmove',function(){
			isMove = true;
			move = event.touches[0].pageX;
			moveX = move - start;
			if(moveX+currX<maxSwipe&&moveX+currX>minSwipe){
				removeTransition(childBox);
				setTransform(childBox,moveX+currX);
			}
		});
		childBox.addEventListener('touchend',function(){
			if(isMove){
				if(moveX+currX>maxPosition){
					currX = maxPosition;
				}else if(moveX+currX<minPosition){
					currX = minPosition;
				}else{
					currX = moveX+currX;
				}
			}
			addTransition(childBox);
			setTransform(childBox,currX);
		});
	}
    
    
}]);