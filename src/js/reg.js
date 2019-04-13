jQuery(function($){
    var $uname = $("#uname");
    var $upwd = $("#upwd");
    var $upwdConfim = $("#upwdConfim");
    var $regBtn = $("#regBtn");
    var $readme = $("#readme");
    var $checkAgree = $("#checkAgreement_error");
    var $unameStatus = false;
    var $upwdStatus = false;
    var $upwdConfimStates = false;
    var $readmeStatu = false;
    // 判断用户名
    function panUname(){
        var _uname = $uname.val();
        if (/^[\D\S][\S]{3,11}$/.test(_uname)) {
            $.ajax({
                type:"post",
                url:"../api/reg.php",
                data:{
                    uname : _uname,
                },
                success:function(res){
                    if(res=="true"){
                        $uname.next().html("√");
                        $uname.next().css("color","#58bc58");
                        $unameStatus = true;
                    }else{
                        $uname.next().html("用户名太抢手了,请换一个");
                        $uname.next().css("color","red");
                        $unameStatus = false;
                    }
                }
            })
        }else{
            $uname.next().html("用户名为4-12位字符组成");
            $uname.next().css("color","red");
            $unameStatus = false;
        }
    }
    // 密码格式判断
    function panUpwd(){
        if (/^[a-z]\w{5,17}$/.test(upwd.value)) {
            $upwd.next().html("√");
            $upwd.next().css("color","#58bc58");
            $upwdStatus = true;
        }else{
            $upwd.next().html("密码应为小写字母开头的6-18位字符");
            $upwd.next().css("color","red");
            $upwdStatus = false;
        }
    }
    // 两次密码是否相同
    function panUpwdConfim(){
        if($upwd.val()!=""){
            if($upwd.val() == $upwdConfim.val()){
                $upwdConfim.next().html("√");
                $upwdConfim.next().css("color","#58bc58");
                $upwdConfimStates = true;
            }else{
                $upwdConfim.next().html("两次密码输入不一致");
                $upwdConfim.next().css("color","red");
                $upwdConfimStates = false;
            }
        }else{
            $upwdConfim.next().html("密码不能为空");
            $upwdConfim.next().css("color","red");
            $upwdConfimStates = false;
        }
    }
    function panCheck() {
        if($readme.is(':checked')){
            $readmeStatu=true;
            $checkAgree.css("display","none")
        }else{
            $checkAgree.css("display","block")
            $readmeStatu=false;
        }
    }
    //1.当用户名失去焦点时，当用户名满足要求(不能为空，不能以数字开头，限制6-12位)
    //2.发送请求到php，将用户名传过去，php去数据库进行查找
    $uname.on("blur",function(){
        panUname();
    })

    $upwd.on("blur",function(){
        panUpwd();
    })
    $upwdConfim.on("blur",function(){
        panUpwdConfim();
    })
    
    $regBtn.on("click",function(){
        $readmeStatus = $readme.is(':checked');
        if ($unameStatus&&$upwdStatus&&$upwdConfimStates&&$readmeStatus) {
            $.ajax({
                type:"post",
                url:"../api/reg2.php",
                data:{
                    uname:$uname.val(),
                    upwd:$upwd.val()
                },
                success:function(res){
                    if(res == "注册成功"){
                        location.href = "../html/login.html"
                    }else{
                        alert(res);
                    }
                }
            })
        }else{
            panUname();
            panUpwd();
            panUpwdConfim();
            panCheck();
        }
    })
})