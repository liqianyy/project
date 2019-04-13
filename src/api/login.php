<?php 
	include 'connect.php';
	$uname = isset($_POST["uname"])? $_POST["uname"] : "";
	$upwd = isset($_POST["upwd"])? $_POST["upwd"] : "";
	// $uname = 'test';
	$conn->set_charset('utf8');

	$sql = "select * from user where uname='".$uname."' and upwd='".$upwd."'";
	$res = $conn->query($sql);
	$num = $res->num_rows;
	if ($num == 0) {
		echo "false";
	}else{
		echo "true";
	}

	$res->close();
	$conn->close();
 ?>