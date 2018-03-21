/**
 * Created by suning on 2018/1/11.
 */
//进度条功能
$(function () {
    //禁用进度环
    NProgress.configure({showSpinner: false});
    $(document).ajaxStart(function () {
        //开启进度条
        NProgress.start();
    });
    $(document).ajaxStop(function () {
        //结束进度条
        //本地接口，速度太快，加一个延时
        setTimeout(function () {
            NProgress.done();
        },1000)
    });

});

$(function () {
    //非登陆页面，判断当前用户是否是登录了，如果登录了，就继续，如果没登陆，需要跳转到登录页面。
    if(location.href.indexOf("login.html")==-1){
        $.ajax({
            type:"get",
            url:"/employee/checkRootLogin",
            success: function (info) {
                if(info.error === 400){
                    //说明没有登录，需要跳转到登录页面
                    location.href = "login.html";
                }
            }
        })
    }
    //点击menu，侧边栏显示/消失
    $('.icon_menu').on('click', function () {
        $('.lt_aside').toggleClass('now');
        $('.lt_main').toggleClass('now');
        $('.header').toggleClass('now');

    });
    //分类管理菜单点击事件
    $('.category').prev().on('click', function () {
        $(this).next().slideToggle();
        //$(this).parents('li').siblings().children('a').removeClass('now');
        //$(this).addClass('now')
    });
    //模态框
    $('.icon_logout').on('click', function () {
        $('#logoutModal').modal("show");
        //退出按钮注册事件，先off()解绑所有的事件
        $('.btn_logout').off().on('click', function () {
            $.ajax({
                type:"get",
                url:"/employee/employeeLogout",
                success: function (info) {
                    if(info.success){
                        location.href = "login.html";
                    }
                }
            })
        })
    })
});


