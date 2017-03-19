
	NProgress.start();

	NProgress.done();

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	var pathname=location.pathname;
	var flag=$.cookie('PHPSESSID');
	if(!flag && pathname.indexOf('login')==-1){
		//没有登录--跳转到登录页
		location.href='/index/login';
	}