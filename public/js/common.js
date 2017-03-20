
define(['jquery','cookie'],function($){
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	var pathname=location.pathname;
	var flag=$.cookie('PHPSESSID');
	if(!flag && pathname.indexOf('login')==-1){
		//没有登录--跳转到登录页
		location.href='/login';
	}
	//登录功能
	$("#loginForm").submit(function(){
		//alert(123);
		var formData=$(this).serialize();
		console.log(formData);
		$.ajax({
			type:'post',
			url:'/api/login',
			data:formData,
			dataType:'json',
			success:function(data){
				console.log(data);
				if(data.code==200){
					console.log(data.result);
					//cookie 存的是字符串---将对象转换成字符串
					var logInfo=JSON.stringify(data.result);
					//设置cookie--设置到根目录
					$.cookie('logInfo',logInfo,{path:'/'});
					location.href='/index/index';
				}
			},
			error:function(data){
				console.log(data);
			}
		});
		return false; //阻止表单提交默认行为
	});

	//退出功能
	$("#logout").click(function(){
		$.ajax({
			type:"post",
			url:"/api/logout",
			dataType:"json",
			success:function(data){
				if(data.code==200){
					location.href="/login";
				}
			}
		});
	});
	//console.log($.cookie('logInfo'));
	var obj=JSON.parse($.cookie('logInfo'));
	//console.log(obj.tc_name);
	//console.log(obj.tc_avatar);
	$(".aside .profile img").attr("src",obj.tc_avatar);
	$(".aside .profile h4").html(obj.tc_name);

});
	