/**
 * Created by suning on 2018/1/13.
 */
;(function () {
    var page = 1;
    var pageSize = 3;
    var render = function () {
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function (info) {
                console.log(info);
                $('tbody').html(template('tpl',info));
                //渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked: function (a,b,c,p) {
                        page = p;
                        render();
                    }
                })
            }
        })
    };
    render();
    $('.btn_add').on('click', function () {
        $('#addModal').modal('show');
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success: function (info) {
                console.log(info);
                $('.dropdown-menu').html(template('menuTpl',info));
            }
        })
    });
    //下拉菜单点击事件
    $('.dropdown-menu').on('click','a', function () {
        $('.dropdown-text').text($(this).text());
        $('[type="hidden"]').val($(this).data('id'));
        //手动把categoryId设置为VALID状态
        $form.data('bootstrapValidator').updateStatus("categoryId","VALID")
    });
    //. 初始化文件上传功能
    $("#fileupload").fileupload({
        dataType: 'json',
        //文件上传成功时，会执行的回调函数
        done: function (e, data) {
            //通过data.result可以获取到一个对象，这个对象的picAddr属性就是图片的地址
            console.log(data);
            var result = data.result.picAddr;
            $(".img_box img").attr("src", result);

            //修改隐藏域的value值
            $("#brandLogo").val(result);

            //让brandLogo改为VALID状态
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });
    //.表单校验功能
    var $form = $("form");
    $form.bootstrapValidator({
        //配置不做校验的内容，给空数组，目的是让隐藏的和禁用的都做校验
        excluded:[],
        //配置校验时显示的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置校验规则
        fields:{

            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入品牌的名称"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传品牌的图片"
                    }
                }
            }
        }
    });
    //注册表单检验成功事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            success: function (info) {
                if(info.success){
                    $('#addModal').modal('hide');
                    page = 1;
                    render();
                    $form.data("bootstrapValidator").resetForm(true);
                    $('.dropdown-text').text('请选择一级分类');
                    $('.img_box img').attr('src','images/none.png')
                }
            }
        })
    })
})();