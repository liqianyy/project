<?php
	include 'connect.php';
	//1.拿到前端传输过来的数据
	$id = isset($_POST["id"])? $_POST["id"] : "";
	
	// 2.插入数据库
	// (1)执行sql语句
	$res = $conn->query("delete from car where id='".$id."'");
	
	if($res){
		echo "成功";
    }else{
        echo "失败，请重试";
    }

	$conn->close();




?>