requirejs.config({
    paths : {
        "jquery" : "../lib/jquery-3.0.0",
        "yanzheng" : "../lib/yanzheng",
        "login" : "../js/login"
    },
    shim : {
        "yanzheng" : {
            deps : ["jquery"]
        },
        "login" : {
            deps : ["yanzheng"]
        }
    }
})
requirejs(["jquery","login","yanzheng"],function(jq){

})