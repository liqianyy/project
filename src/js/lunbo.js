///轮播
jQuery(function($) {
   var t;
    var index = 0;
    /////自动播放
        t = setInterval(play, 2000)
    function play() {
        index++;
        if (index > 4) {
            index = 0;
        }
        $(".big-banner .dian span").eq(index).addClass("cur").siblings().removeClass("cur");

        $(".lunbo a").eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
    };

    ///点击鼠标 图片切换
    $(".big-banner .dian span").hover(function() {

        //添加 移除样式
        $(this).addClass("cur").siblings().removeClass("cur");
        var index = $(this).index(); //获取索引 图片索引与按钮的索引是一一对应的

        $(".lunbo a").eq(index).stop().fadeIn(1000).siblings().stop().fadeOut(1000); // siblings  找到 兄弟节点(不包括自己）
    });


    //鼠标移进  移出
    $(".big-banner .dian,.lunbo a").hover(
        function() {
            clearInterval(t);
        },
        //鼠标移开
        function() {
            t = setInterval(play, 2000);
            function play() {
                index++;
                if (index > 4) {
                    index = 0;
                }
                $(".big-banner .dian span").eq(index).addClass("cur").siblings().removeClass("cur");
                $(".lunbo a").eq(index).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
            };
    })
})

