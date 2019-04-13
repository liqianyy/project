jQuery(function($){
    var $uname = $("#loginname");
    var $upwd = $("#password");
    var $txt = $(".input-val");
    var $canvas = $("#canvas");
    var $loginBtn = $(".login-btn");
    var $autoLogin = $("#autoLogin");
    var $canvasVal = $canvas.attr("data-num");
    var d = new Date();
    d.setDate(d.getDate()+7);
    // console.log($canvas[0].dataset.num);
    $loginBtn.on("click",function(){
        $canvasVal = $canvas.attr("data-num");
        if($uname.val()!="" && $upwd.val() != ""){
            if($txt.val() == ""){
                alert('请输入验证码！');
            }else if($canvasVal == $txt.val()){
                $.ajax({
                    type:"post",
                    url:"../api/login.php",
                    data:{
                        uname:$uname.val(),
                        upwd:$upwd.val()
                    },
                    success:function(res){
                        if(res == "true"){
                            document.cookie = "uname=" + $uname.val()+"; expires="+d.toUTCString()+"; path="+"/";
                            if($autoLogin.is(':checked')){
                                document.cookie = "uname=" + $uname.val()+"; expires="+d.toUTCString()+"; path="+"/";
                            }
                            location.href = "../index.html";
                        }else{
                            alert("用户名密码错误");
                        }
                    }
                })
            }else{
                alert('验证码错误！请重新输入！');
            }
        }else{
            alert("请填写用户名和密码")
        }
        
    })

})