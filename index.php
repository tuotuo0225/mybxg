<?php
	$path='index';
	$filename='index';
	if(array_key_exists('PATH_INFO', $_SERVER)){
		//var_dump($_SERVER);
		$url=$_SERVER['PATH_INFO'];
		$str=substr($url,1);
		$arr=explode('/',$str);
		if(count($arr)==2){
			$path=$arr[0];
			$filename=$arr[1];
		}
		//echo $url;
		//载入指定路径页面
	}else{
		$filename='login';
	}
	include('./views/'.$path.'/'.$filename.'.html');
	
?>