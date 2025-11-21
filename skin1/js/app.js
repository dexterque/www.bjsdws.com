$(function () {
    banner();
    share();
    rightFix();
    prophoto();
    ncase();
    
    $(".returnTop").click(function() {
		$("body, html").stop().animate({
			"scrollTop": 0
		});
	});
	$("#addFavo").click(function() {
		var fm = $("title").html();
		AddFavorite(fm, location.href, '');
	});
	$("#setHome").click(function(){
        SetHome($('title').html(), location.href, '');
	});
	// map_ul
	$(".map_ul > li").each(function() {
		if (!$(this).find("li").length) {
			$(this).find("ul").remove();
		}
	});
});

function rightFix(){
    $('#toolbar dd').bind({
		'mouseenter': function(){
			if($(this).children('.box').length){
				var _this = $(this).children('.box');
				_this.show().animate({'right': 65}, 200);
			}
		},
		'mouseleave': function(){
			if($(this).children('.box').length){
				var _this = $(this).children('.box');
				_this.hide().animate({'right': 90}, 200);
			}
		}
	});
	$(".return-top").click(function () {
        $("body, html").stop().animate({ "scrollTop": 0 });
    });
}
// banner焦点图
function banner(){
	if (!$("#banner").length || $("#banner .list li").length <= 1) {	return false; }
	var _this = $("#banner"),
		me = $("#banner .list"),
		tip = $("#banner .tip"),
		prev = _this.find(".prev"),
		next = _this.find(".next"),
		t, interval = 4500,
		speed = 1000,
		speed2 = 700,
		n = 0,
		N = me.children("li").length;
		me.find("li:gt(0)").hide();
	if ($("#banner .tip").length) {
		var htmlTip = "";
		for (var i = 0; i < N; i++) {
			if (i == 0) {
				htmlTip += "<span class='cur'></span>";
			} else {
				htmlTip += "<span></span>";
			}
		}
		tip.append(htmlTip);
	}
	var func = function() {
		if (n >= N - 1) {
			n = 0;
		} else {
			n++;
		}
		me.children("li").eq(n).css({
			"z-index": 2
		}).stop().fadeIn(speed).siblings("li").css({
			"z-index": 1
		}).stop().fadeOut(speed2);
		if ($("#banner .tip").length) {
			tip.children("span").eq(n).addClass("cur").siblings("span").removeClass("cur");
		}
	}
	next.bind("click", function(){
		clearInterval(t);
		func();
	});
	prev.bind("click", function(){
		clearInterval(t);
		n -= 2;
		n < -1 ? n = N-2 : n ;
		func();
	});
	tip.children("span").mouseover(function() {
		clearInterval(t);
		n = $(this).index() - 1;
		func();
	});
	t = setInterval(func, interval);
	_this.hover(function(){
		clearInterval(t);
	},function(){
		t = setInterval(func, interval);
	});
}
// n-case-list
function ncase(){ 
	if($("#n-case-list .item").length < 4){ return false; }
	var interval = 50, 
		speed = 1,
		_this = $("#n-case-list .list"),
		clone = _this.html(),
		t;
		_this.append(clone);
		var len = _this.find(".item").length;
		var wid = _this.find(".item").height()+28;
		_this.css({"width":len*wid*2});  // ul宽度
		var func = function(){
			var f = parseInt(_this.css("margin-left"));
			if(f <= (-len*wid/2)){
				_this.css({"margin-left":0});
			}else{
				_this.css({"margin-left":(f-speed)});
			}
		}
		t = setInterval(func, interval);
		_this.mouseenter(function(){
			clearInterval(t);
		}).mouseleave(function(){
			t = setInterval(func, interval);
		});
}
//prophoto
function prophoto(){
	if(!$("#prophoto").length){ return false;}
	$("#prophoto .listcon").find("a").eq(0).addClass("hover");
	var time=5000, tim=800,speed = 1000,speed2 = 500,n = 0;
    var $simg=$("#prophoto .listcon");
  	var len = $("#prophoto .listcon").find("a").length;
    var len=Math.ceil(len/2);
    var xwid=$("#prophoto .listcon a").width()+7;
	var func = function(index){
		if(n < len-1){
			n++;
		}else{
			n = 0;
		}
        $simg.stop().animate({"margin-left":-n*xwid}, speed2);
	}
	var func2 = function(){
		if(n > 0){
			n--;
           $simg.stop().animate({"margin-left":-n*xwid}, speed2);
		}else{
            $simg.stop().animate({"margin-left":-(len-1)*xwid}, speed2);
			n = len-1;
           
		}
	}
    var func3 = function(index){
        $simg.stop().animate({"margin-left":-index*xwid}, speed2);
        n=index;
	}
	// 绑定按钮事件
	$("#prophoto .prev").click(function(){
		func2();
	});
	$("#prophoto .next").click(function(){
		func();
	});
	$simg.find("img").on("mouseover",function(){
		$(this).parent().addClass("hover").siblings().removeClass("hover");
		$("#bigImg").attr("src", $(this).attr("bigimg"));
		$("#bigImg").attr("jqimg",$(this).attr("bigimg"));
	})  
	$(".jqzoom").jqueryzoom({
        xzoom: 400, //放大图的宽度(默认是 200)
        yzoom: 405, //放大图的高度(默认是 200)
        offset: 10, //离原图的距离(默认是 10)
        position: "right", //放大图的定位(默认是 "right")
        preload: 1
    });
}
//layout
function layout(u){
	var $obj = $('<div class="dialog-layout"></div>');
	if(u == 0){
		$('.dialog-layout').remove();
	}else{
		if(!$('.dialog-layout').length){
			$obj.appendTo('body').show();
		}
	}
}
function share(){
	window._bd_share_config = {
    "common": {
        "bdSnsKey": {},
        "bdText": "",
        "bdMini": "2",
        "bdMiniList": false,
        "bdPic": "",
        "bdStyle": "0",
        "bdSize": "16"
    },
    "share": {},
    "slide": { // 跟图标式的代码相比，这里是添加了浮窗式 slide 属性配置
        "type": "slide",
        "bdImg": "6",
        "bdPos": "left",
        "bdTop": "100"
    }
};
	window._bd_share_config = {
		share : [{
			"bdSize" : 16
		}],
	}
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
}

function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    } catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        } catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
function SetHome(obj,url){
	try{
		obj.style.behavior='url(#default#homepage)';
		obj.setHomePage(url);
   }catch(e){
	   if(window.netscape){
		  try{
			  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		 }catch(e){
			  alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
		  }
	   }else{
		alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
	   }
  }
}