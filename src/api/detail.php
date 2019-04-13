<?php
    include 'connect.php';
    $id = isset($_POST["id"])? $_POST["id"] : "";
    $conn->set_charset('utf8');
    $sql = "select * from goods where id='".$id."'";
    
    $res = $conn->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
    //4.关闭查询结果集
    $res->close();
    //5.关闭数据库
    $conn->close();

?>