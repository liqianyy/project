<?php
	include 'connect.php';
    $conn->set_charset('utf8');
    $sql = "select  * from goods order by sales DESC limit 0,10";
    //2. 执行sql语句  $conn->query()
    //  （1）若是增删改语句，返回值为布尔值
    //   (2) 若为查找语句，为查询结果集

    //3.若是查询语句，使用查询结果集 
    //  * $res->fetch_all(MYSQLI_ASSOC) 使用查询结果集的所有数据
    $res = $conn->query($sql);
    // var_dump($res->num_rows);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    // var_dump($data);
    // echo json_encode($data);
    // var_dump(json_encode($data)) ;
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
    //4.关闭查询结果集
    $res->close();
    //5.关闭数据库
    $conn->close();
   

?>
