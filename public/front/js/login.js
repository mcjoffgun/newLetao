/**
 * Created by suning on 2018/1/17.
 */
;(function () {
  //mui('.mui-input-row input').input();
  $('.btn-login').on('click', function (e) {
    e.preventDefault();
    var userName = $('.mui-input-clear').val();
    var password = $('.mui-input-password').val();
    if(!userName){
      mui.toast('用户名不能为空');
      return
    }
    if(!password){
      mui.toast('密码不能为空');
      return
    }
    $.ajax({
      type:'post',
      url:'/user/login',
      data:{
        username:userName,
        password:password
      },
      success: function (info) {
        if(info.error == 400){
          mui.toast(info.message);
        }
        if(info.success){

        }
      }
    })

  })
})();

