<?php
	include 'connect.php';
	//1.拿到前端传输过来的数据
	$user = isset($_POST["user"])? $_POST["user"] : "";
    $conn->set_charset('utf8');
    
	// 查询购物车
    $sql = "select a.title,a.img,a.price,b.goodsId,b.qty,b.id from goods as a inner join car as b on a.id=b.goodsId and user='".$user."'";

    $res = $conn->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
    //4.关闭查询结果集
    $res->close();
    //5.关闭数据库
    $conn->close();

?>