jQuery(function($){
    $('.brand').each(function () {//content-brand
        scrollFloorBrand($(this));
    });
    function scrollFloorBrand(obj) {
        var Bindex = 0,
            Bwidth = 188,
            timer = null,
            scrollA = $(obj).find('.scroll-A'),
            Blen = scrollA.length,
            oPrev = $(obj).children('.prev'),
            oNext = $(obj).children('.next');
        //console.log(oPrev);
        function NextBrand() {
            if (Bindex == Blen) {
                Bindex = 0;
            }
            scrollA.stop(true, false).animate({ left: -Bindex * Bwidth + "px" }, 600)
        }
        function PrevBrand() {
            if (Bindex == -1) {
                Bindex = Blen - 1;
            }
            scrollA.stop(true, false).animate({ left: -Bindex * Bwidth + "px" }, 600)
        }
        oPrev.click(function () {
            Bindex++;
            NextBrand();
            //console.log(Bindex);
        });
        oNext.click(function () {
            Bindex--;
            PrevBrand();
            //console.log(Bindex);
        });
    }

    function dibu(){
        var index = 0;
        var Swidth = 550;
        var timer = null;
        var Slen = $(".BD-wrap .scroll-brand").length;
        function NextPage() {
            if (index > Slen - 1) {
                index = 0;
            }
            $(".BD-wrap .scroll-brand").stop(true, false).animate({ left: -index * Swidth + "px" }, 600)
        }

        function PrevPage() {
            if (index < 0) {
                index = Slen - 1;
            }

            $(".BD-wrap .scroll-brand").stop(true, false).animate({ left: -index * Swidth + "px" }, 600)
        }

        $(".BD-cont .bd-next").click(function () {
            index++;
            NextPage();
        });

        $(".BD-cont .bd-prev").click(function () {
            index--;
            PrevPage();
        });
    }
    dibu();
    var data;
    $.ajax({
        url:"../api/index.php",
        success:function(res){
            data = JSON.parse(res);
            // console.log(data);
            hotSell();
        }
    })
    function hotSell() {
        var ul = document.getElementsByClassName("hot_cont")[0]; //获取ul
        var sell = "";
        for (var i = 0; i < data.length; i++) {
            sell +=`<li data-id="${data[i].id}">
                        <a href="#">
                            <img src="${data[i].img}">
                            <p class="timu">${data[i].title}</p>
                            <p class="price">￥ <span>${data[i].price}</span></p>
                        </a>
                    </li>`;
        }
        ul.innerHTML = sell;
    }
    

    var cookie = document.cookie.split("; "); 
    var $logBefore = $("#logBefore");
    var $logAfter = $("#logAfter");
    var $logName = $(".logName");
    function logOut(){
        alert(111);
        
    }
    if(cookie!=""){
        $logBefore.css("display","none");
        $logAfter.css("display","block");
        cookie.forEach(function(item){
            var arr = item.split("=");//["left","751"],["uname","lemon"]
            if(arr[0] == "uname"){
            $logName.text(arr[1]);
            }
        })
    }
       
})
