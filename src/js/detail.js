jQuery(function($){
    
    var id = location.search.slice(4,-1);
    $.ajax({
        type:"post",
        url:"../api/detail.php",
        data :{
            id:id
        },
        success:function(res){
            data = JSON.parse(res)
            render();
        }
    })

    var $title = $("#name");
    var $jdPrice = $("#jd-price");
    var $saleCounts = $("#saleCounts");
    var $stock = $("#stock");
    var $bContainer = $(".b_container");
    // 渲染数据
    function render(){
        $title.html("<h3>"+data[0].title+"</h3>");
        $jdPrice.html(data[0].price);
        $saleCounts.html(data[0].sales);
        $stock.html(data[0].stock);
        $bContainer.html(`<img src="${data[0].img1}" />
        <img src="${data[0].img2}" />
        <img src="${data[0].img3}" />
        <img src="${data[0].img4}" />`);

        //放大镜实现js
        $(".jqzoom").jqueryzoom({
            xzoom: 400, //放大图的宽度(默认是 200)
            yzoom: 400, //放大图的高度(默认是 200)
            offset: 100, //离原图的距离(默认是 10)
            position: "right", //放大图的定位(默认是 "right")
            preload: 1
        });

        //底部图片hover切换实现js
        $('.b_container img').hover(function(){
        $('.jqzoom img').attr('src',$(this).attr('src'));
        $('.jqzoom img').attr('jqimg',$(this).attr('src'));
        },function(){
        $.noop();
        });
   }

   var $reduceBtn = $(".btn-reduce");//减按钮
   var $addBtn = $(".btn-add");//加按钮
   var $initCartUrl = $("#InitCartUrl");//加入购物车按钮

   $addBtn.on("click",function(){
        var $buyNum = $("#buy-num").val();
        $("#buy-num").val($buyNum*1+1);
   })
   $reduceBtn.on("click",function(){
        var $buyNum = $("#buy-num").val();
        $("#buy-num").val($buyNum-1);
    })

    

    var cookie = document.cookie.split("; "); 
    var $logBefore = $("#logBefore");
    var $logAfter = $("#logAfter");
    var $logName = $(".logName");
    var user;
    function logOut(){
    }
    if(cookie!=""){
        $logBefore.css("display","none");
        $logAfter.css("display","block");
        cookie.forEach(function(item){
            var arr = item.split("=");
            if(arr[0] == "uname"){
                user = arr[1];
                $logName.text(arr[1]);
            }
        })
    }
    var $qty = $("#buy-num").val();
            console.log($qty,user,id)
    $initCartUrl.on("click",function(){
        if(cookie==""){
            location.href = "../html/login.html";
        }else{
            $.ajax({
                type:"post",
                url:"../api/insertCar.php",
                data:{
                    id:id,
                    qty:$qty,
                    user:user
                },
                success:function(res){
                    location.href = "../html/cart.html";
                }
            })
        }
        
        
    })
})