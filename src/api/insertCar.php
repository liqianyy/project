<?php
	include 'connect.php';
	//1.拿到前端传输过来的数据
	$id = isset($_POST["id"])? $_POST["id"] : "";
	$qty = isset($_POST["qty"])? $_POST["qty"] : "";
	$user = isset($_POST["user"])? $_POST["user"] : "";
	
	// 2.插入数据库
	// (1)执行sql语句
	$res = $conn->query("INSERT INTO car (goodsId,qty,user) VALUES ('".$id."','".$qty."','".$user."')");
	
	if($res){
		echo "成功";
    }else{
        echo "失败，请重试";
    }

	$conn->close();

?>