jQuery(function($){
    var data;
    var orderNum = document.getElementsByClassName("order-num")[0];
    var proPrice =document.getElementsByClassName("pro-price")[0];
    var proTime = document.getElementsByClassName("pro-time")[0];
    var $order = $(".order");
    $.ajax({
        url:"../api/proList.php",
        success:function(res){
            data = JSON.parse(res);
            draw();
            zhuan();
        }
    })
    function draw(){
        var ul = document.getElementsByClassName("list-h")[0]; //获取ul
        var list = "";
        for (var i = 0; i < data.length; i++) {
            list +=`<li data-id="${data[i].id}">
                            <a target="_blank">
                                <img src="${data[i].img}">
                                <p class="price">￥ <span>${data[i].price}</span></p>
                                <p class="jname">${data[i].title}</p>
                                <p class="jiao">成交<span>${data[i].sales}</span>笔</p>
                            </a>
                        </li>
                    `;
        }
        ul.innerHTML = list;
    }


    var orderNumFlag = true; //成交量排序标识
    var proPriceFlag = true; //价格排序标识
    var proTimeFlag = true;
    //点击按成交量排序
    orderNum.onclick = function() {
        if (orderNumFlag) { //true，从小到大排序
            data.sort(function(a,b){
                return a.sales-b.sales;
            })
        } else if (!orderNumFlag) { //false，从大到小排序
            data.sort(function(a,b){
                return b.sales-a.sales;
        })
        }
        draw();
        orderNumFlag = !orderNumFlag;
        zhuan();
    }

   
    //点击按价格排序
    proPrice.onclick = function() {
        if (proPriceFlag) { //true，从小到大排序
            data.sort(function(a,b){
                return a.price-b.price;
            })
        } else if (!proPriceFlag) { //false，从大到小排序
            data.sort(function(a,b){
                return b.price-a.price;
        })
        }
        draw();
        proPriceFlag = !proPriceFlag;
        zhuan();
    }
    //上架时间排序
    proTime.onclick = function() {
        if (proTimeFlag) { //true，从小到大排序
            data.sort(function(a,b){
            var date1 = new Date(a.time);
            var date2 = new Date(b.time);
            return date1.getTime()-date2.getTime();
                
            })
        } else if (!proTimeFlag) { //false，从大到小排序
            data.sort(function(a,b){
            var date1 = new Date(a.time);
            var date2 = new Date(b.time);

            // console.log(date1.getTime())
            return date2.getTime()-date1.getTime();
        })
        }
        draw();
        proTimeFlag = !proTimeFlag;
        zhuan();
    }
    $order.on("click",function(e){
        $order.find("a").removeClass("curr");
        $(e.target).addClass("curr");
    })

//点击商品列表中商品，跳转到商品详情页，并传递数据到url
    function zhuan(){
        var shangList = document.getElementsByClassName("list-h")[0].children; //获取商品li
        for (i = 0; i < shangList.length; i++) {
            shangList[i].onclick = function() {
                var id = this.dataset["id"]; //拿到点击商品项id
                location.href="../html/detail.html?id="+id+"&";
            
            }
        }
    }

    var cookie = document.cookie.split("; "); 
    var $logBefore = $("#logBefore");
    var $logAfter = $("#logAfter");
    var $logName = $(".logName");
    function logOut(){
    }
    if(cookie!=""){
        $logBefore.css("display","none");
        $logAfter.css("display","block");
        cookie.forEach(function(item){
            var arr = item.split("=");
            if(arr[0] == "uname"){
            $logName.text(arr[1]);
            }
        })
    }
})

function page(){
    if (arr.code) {
        goodsRender(arr.list);
        var totalPage = '';
        for (var i = 0; i < arr.sum / arr.qty; i++) {
            totalPage += `<a href="javascript:;">${i+1}</a>`;
        }
        $(".anniu").html(totalPage);
        $(".anniu").children().eq(arr.page - 1).attr('class', 'a1');
        //下一页
        $("#main .anniu  a").on("click", function() {
            $(this).css({ 'background-color': ' #EF2635', 'color': '#fff' });
            $(this).siblings().css({ 'background-color': ' #fff', 'color': '#000' });
            var page = $(this).html();
            console.log(page);
            goodsShow(page, 12, sortType, sortOrder);

        });

    }
}
