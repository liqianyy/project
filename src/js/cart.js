jQuery(function($){
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

    $.ajax({
        type:"post",
        url:"../api/cart.php",
        data:{
            user:user,
        },
        success:function(res){
            data = JSON.parse(res);
            render();
            num();
            sum();
            del();
            
        }
    })

    function num(){
        var $proNum =  $(".proNum");
        var $li = $proNum.closest("li");
        $proNum.on("input",function(){
            var id = $(this).parent().parent()[0].dataset["id"];
            var qty = $(this).val();
            $.ajax({
                type:"post",
                url:"../api/cartQty.php",
                data:{
                    id: id,
                    qty : qty
                },
                success:function(res){
                    if(res=="失败"){
                        alert(res);
                    }
                }
            })
            window.location.reload();
        })
    }
    function sum(){
        var sum = 0;
        for(var i=0;i<data.length;i++){
            price=data[i].price*data[i].qty;
            sum +=price;
        }
        var $finalPrice = $("#finalPrice");
        $finalPrice.html(sum.toFixed(2));
    }

    function render(){
        var ul = document.getElementById("product-list"); //获取ul
        var list = "";
        for (var i = 0; i < data.length; i++) {
            list +=`<li data-id="${data[i].id}">
                        <p class="shang">
                            <img src="${data[i].img}">
                            <span class="title">${data[i].title}</span>
                        </p>
                        <p class="price">￥ <span>${data[i].price}</span></p>
                        <p class="num">
                            <input type="number" min="1" value="${data[i].qty}" class="proNum"/>
                        </p>
                        <a class="del" href="javacript:void(0);">删除</a>
                    </li> `;
        }
        ul.innerHTML = list;
        
    }

    function del(){
        var $del =  $(".del");
        var $li = $del.closest("li");
        $del.on("click",function(){
            var id = $(this).parent()[0].dataset["id"];
            $.ajax({
                type:"post",
                url:"../api/cartDel.php",
                data:{
                    id: id,
                },
                success:function(res){
                    if(res=="成功"){
                        render();
                        window.location.reload();
                        alert("删除成功");
                    }else{
                        alert("删除失败,请重试");
                    }
                }
            })
        })
    }
})