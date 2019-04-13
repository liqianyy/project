<?php 
	include 'connect.php';
	$uname = isset($_POST["uname"])? $_POST["uname"] : "";
	// $uname = 'test';
	$conn->set_charset('utf8');

	$sql = "select * from user where uname='".$uname."'";
	$res = $conn->query($sql);
	$num = $res->num_rows;
	if ($num == 0) {
		echo "true";
	}else{
		echo "false";
	}

	$res->close();
	$conn->close();
 ?>