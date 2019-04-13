<?php
	include 'connect.php';
	//1.拿到前端传输过来的数据
	$id = isset($_POST["id"])? $_POST["id"] : "";
	$qty = isset($_POST["qty"])? $_POST["qty"] : "";
    $conn->set_charset('utf8');
    
	
    
    $sql = "UPDATE car set qty ='".$qty."' WHERE id = '".$id."'";

    $res = $conn->query($sql);
    if($res){
        echo "成功";
    }else{
        echo "失败";
    }
    $conn->close();


?>