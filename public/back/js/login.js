/**
 * Created by suning on 2018/1/11.
 */

//实在表单提交的时候校验，如果校验失败会帮我们阻止表单提交，如果成功就自动提交
$(function () {
    var $form = $('form');
    //初始化表单校验插件
    $form.bootstrapValidator({
        //配置校验规则
        fields:{
            username:{
                //可以配置name的校验规则
                validators:{
                    //非空校验
                    notEmpty:{
                        message:"用户名不能为空！"//提示信息
                    },
                    callback:{
                        message:"用户名错误！"
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空！"
                    },
                    //校验长度
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度必须是6~12位！"
                    },
                    callback:{
                        message:"密码错误！"
                    }
                }
            }
        },
        //配置校验时的显示图标
        feedbackIcons: {
            //校验成功的图标
            valid: 'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });
    //给表单注册一个表单校验成功事件
    $form.on('success.form.bv', function (e) {
        //阻止表单提交
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            type:'post',
            url:"/employee/employeeLogin",
            dataType:"json",
            data:$form.serialize(),
            success: function (info) {
                console.log(info);
                if(info.success){
                    location.href = 'index.html';
                }
                if(info.error==1000){
                    //alert(info.message);
                    $form.data('bootstrapValidator').updateStatus("username","INVALID","callback")
                }

                if(info.error==1001){
                    //alert(info.message);
                    $form.data('bootstrapValidator').updateStatus("password","INVALID","callback")
                }
            }
        })
    });

    $("[type='reset']").on('click', function () {
        $form.data('bootstrapValidator').resetForm();
    })
});
